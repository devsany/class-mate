import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import app from "../../firebase/firebaseConsole"; // Assuming you've configured Firebase

const TeacherFeedbackID = () => {
  const { id } = useParams(); // Get teacher's ID from URL
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    from: "",
    date: "",
    comment: "",
    rating: 0,
  });

  // Fetch feedback from Firebase
  useEffect(() => {
    const db = getDatabase(app);
    const feedbackRef = ref(db, `teachers/${id}/feedback`);

    // Real-time listener to fetch feedback
    onValue(feedbackRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFeedbacks(Object.values(data));
      }
    });
  }, [id]);

  // Handle input changes for new feedback
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new feedback to Firebase
  const submitFeedback = () => {
    if (newFeedback.from && newFeedback.comment && newFeedback.rating > 0) {
      const db = getDatabase(app);
      const feedbackRef = ref(db, `teachers/${id}/feedback`);

      // Push new feedback to Firebase
      push(feedbackRef, newFeedback)
        .then(() => {
          alert("Feedback submitted successfully!");
          setNewFeedback({ from: "", date: "", comment: "", rating: 0 });
        })
        .catch((error) => {
          console.error("Error submitting feedback:", error);
        });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Teacher Feedback</h2>

      {/* Feedback List */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">
          Feedback from Students and Staff
        </h3>
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback, index) => (
            <div
              key={index}
              className="p-4 mb-4 bg-gray-100 rounded-lg shadow-lg"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">{feedback.from}</span>
                <span className="text-sm text-gray-600">{feedback.date}</span>
              </div>
              <p className="mt-2">{feedback.comment}</p>
              <div className="mt-2">
                <span className="text-yellow-500">
                  Rating: {feedback.rating}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No feedback available yet.</p>
        )}
      </div>

      {/* New Feedback Form */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Submit New Feedback</h3>

        <div className="mb-4">
          <label className="block text-gray-700">Your Name</label>
          <input
            type="text"
            name="from"
            value={newFeedback.from}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={newFeedback.date}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Comment</label>
          <textarea
            name="comment"
            value={newFeedback.comment}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Rating</label>
          <input
            type="number"
            name="rating"
            value={newFeedback.rating}
            onChange={handleInputChange}
            min="1"
            max="5"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          onClick={submitFeedback}
          className="bg-blue-500 text-white rounded-md px-6 py-2 hover:bg-blue-600"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default TeacherFeedbackID;
