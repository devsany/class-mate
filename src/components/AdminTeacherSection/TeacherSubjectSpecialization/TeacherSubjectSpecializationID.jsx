import { getDatabase, ref, set, update } from "firebase/database";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import app from "../../firebase/firebaseConsole";

const TeacherSubjectSpecializationID = () => {
  const { id } = useParams(); // Get the teacher's ID from the URL parameter
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");

  // Fetch the teacher's specialization data from Firebase on component mount
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        // Get teacher data based on teacher_id
        const teacherRef = ref(db, "teachers/" + id); // Path to teacher's data in Firebase
        const snapshot = await get(teacherRef);

        if (snapshot.exists()) {
          // If teacher data exists, update state with subjects
          setSubjects(snapshot.val().subjects || []);
        } else {
          setSubjects([]); // If no subjects exist for the teacher, set an empty array
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };

    fetchTeacherData();
  }, [id]); // Fetch data when teacher ID changes

  // Handle adding a new subject
  const handleAddSubject = () => {
    if (newSubject && !subjects.includes(newSubject)) {
      setSubjects([...subjects, newSubject]);
      setNewSubject("");
    }
  };

  // Handle removing a subject
  const handleRemoveSubject = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(updatedSubjects);
  };

  // Handle form submission (update Firebase)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the page from reloading

    if (subjects.length > 0) {
      // Here you would send `trainings` to Firebase or handle it as needed
      const db = getDatabase(app); // Get the Realtime Database instance
      // Update Firebase with the new subjects

      const teacherRef = ref(db, "teachers/" + id); // Reference to teacher data
      update(teacherRef, {
        subjects: subjects, // Save the updated list of subjects
      })
        .then(() => {
          alert("Subjects updated successfully");
        })
        .catch((error) => {
          console.error("Error updating data in Firebase:", error);
        });
    } else {
      alert("Please add at least one subject.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Subjects Specialization</h2>

      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Current Specializations</h3>
        <ul className="space-y-2">
          {subjects.map((subject, index) => (
            <li key={index} className="flex justify-between items-center">
              <span className="text-gray-800">{subject}</span>
              <button
                type="button"
                onClick={() => handleRemoveSubject(index)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Add New Subject</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Enter new subject"
            className="flex-1 border border-gray-300 rounded-md p-2"
          />
          <button
            type="button"
            onClick={handleAddSubject}
            className="bg-blue-500 text-white rounded-md px-6 py-2 hover:bg-blue-600"
          >
            Add Subject
          </button>
        </div>
        {newSubject && !subjects.includes(newSubject) && (
          <p className="mt-2 text-sm text-gray-600">
            Click "Add Subject" to add <strong>{newSubject}</strong>.
          </p>
        )}
        {subjects.includes(newSubject) && newSubject && (
          <p className="mt-2 text-sm text-gray-600 text-red-500">
            This subject already exists in the list.
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-green-500 text-white rounded-md px-6 py-2 hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TeacherSubjectSpecializationID;
