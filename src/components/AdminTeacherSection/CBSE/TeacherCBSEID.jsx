import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDatabase, ref, get, set, push } from "firebase/database";
import app from "../../firebase/firebaseConsole";

const TeacherCBSEID = () => {
  const { id } = useParams(); // Extract teacher_id from URL params
  const [teacherData, setTeacherData] = useState(null);
  const [trainings, setTrainings] = useState([
    {
      teacher_id: id,
      teacher_name:
        teacherData?.name?.first_name + " " + teacherData?.name?.last_name,
      training_name: "",
      date: "",
      certification_id: "",
      duration: "", // Add duration field to the training
    },
  ]);

  // Fetch teacher data from Firebase
  useEffect(() => {
    const db = getDatabase(app); // Get the database instance
    const teacherRef = ref(db, "teachers/" + id); // Get the reference to the teacher by ID
    get(teacherRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setTeacherData(snapshot.val()); // Set teacher data from Firebase
        } else {
          console.log("No teacher found with that ID");
        }
      })
      .catch((error) => {
        console.error("Error fetching teacher data: ", error);
      });
  }, [id]);

  // Handle change in input fields
  const handleChange = (index, e) => {
    const updatedTrainings = [...trainings];
    updatedTrainings[index][e.target.name] = e.target.value;
    setTrainings(updatedTrainings);
  };

  // Add a new training entry
  const handleAddTraining = () => {
    setTrainings([
      ...trainings,
      {
        teacher_id: id,
        teacher_name:
          teacherData?.name?.first_name + " " + teacherData?.name?.last_name,
        training_name: "",
        date: "",
        certification_id: "",
        duration: "",
      },
    ]);
  };

  // Remove a specific training entry
  const handleRemoveTraining = (index) => {
    const updatedTrainings = trainings.filter((_, i) => i !== index);
    setTrainings(updatedTrainings);
  };

  // Handle form submission (e.g., to save the data)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Trainings:", trainings);
    // Here you would send `trainings` to Firebase or handle it as needed
    const db = getDatabase(app); // Get the Realtime Database instance
    const teachersRef = ref(db, "cbse/" + id); // Reference to the 'cbse' node

    // Push the new teacher data to the 'cbse' node with a unique ID
    push(teachersRef, trainings)
      .then(() => {
        alert("Teacher added successfully!");
        // Reset teacherData or perform other necessary actions
        trainings({}); // Assuming you want to clear the form after adding
      })
      .catch((error) => {
        console.error("Error adding teacher: ", error);
      });
  };
  const nav = useNavigate();
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">CBSE Training Details</h2>
      <button
        onClick={() => nav("/cbse-teacher-module")}
        className="px-6 py-2 bg-green-600 text-white rounded-md"
      >
        Back
      </button>
      {teacherData && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Teacher Details</h3>
          <p>
            <strong>Teacher Name:</strong> {teacherData.name.first_name}{" "}
            {teacherData.name.last_name}
          </p>
          <p>
            <strong>Email:</strong> {teacherData.email}
          </p>
          <p>
            <strong>Phone:</strong> {teacherData.phone}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {trainings.map((training, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Teacher ID and Name */}
              <div>
                <label className="block font-medium text-gray-700">
                  Teacher ID
                </label>
                <input
                  type="text"
                  name="training_name"
                  value={id}
                  disabled
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Teacher Name
                </label>
                <input
                  type="text"
                  name="training_name"
                  value={
                    teacherData?.name?.first_name +
                    " " +
                    teacherData?.name?.last_name
                  }
                  disabled
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Training Name */}
              <div>
                <label className="block font-medium text-gray-700">
                  Training Name
                </label>
                <input
                  type="text"
                  name="training_name"
                  value={training.training_name}
                  onChange={(e) => handleChange(index, e)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="block font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={training.date}
                  onChange={(e) => handleChange(index, e)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>

              {/* Certification ID */}
              <div>
                <label className="block font-medium text-gray-700">
                  Certification ID
                </label>
                <input
                  type="text"
                  name="certification_id"
                  value={training.certification_id}
                  onChange={(e) => handleChange(index, e)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block font-medium text-gray-700">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={training.duration}
                  onChange={(e) => handleChange(index, e)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>

            {/* Remove Training Button */}
            <button
              type="button"
              onClick={() => handleRemoveTraining(index)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Remove Training
            </button>
          </div>
        ))}

        {/* Add Another Training Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleAddTraining}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Another Training
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherCBSEID;
