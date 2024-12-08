import { get, getDatabase, ref, update } from "firebase/database";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import app from "../../firebase/firebaseConsole";
// Import Firebase methods

const TeacherClassAllocationID = () => {
  const { id } = useParams(); // Get the teacher's ID from the URL parameter
  const [classAllocations, setClassAllocations] = useState([]);
  //   const [newClass, setNewClass] = useState("");
  //   const [newSections, setNewSections] = useState("");
  const [allocateClass, setAllocateClass] = useState([
    {
      newClass: "",
      newSections: "",
    },
  ]);

  // Fetch the teacher's class allocation data from Firebase on component mount
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        // Here you would send `trainings` to Firebase or handle it as needed
        const db = getDatabase(app); // Get the Realtime Database instance
        const teacherRef = ref(db, "teachers/" + id); // Path to teacher's data in Firebase
        const snapshot = await get(teacherRef);

        if (snapshot.exists()) {
          // If teacher data exists, update state with class allocations
          setClassAllocations(snapshot.val().class_allocation || []);
          console.log(snapshot.val());
        } else {
          setClassAllocations([]); // If no class allocation exists for the teacher, set an empty array
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };

    fetchTeacherData();
  }, [id]); // Fetch data when teacher ID changes

  // Handle adding a new class allocation
  const handleAddClassAllocation = () => {
    setAllocateClass([
      ...allocateClass,
      {
        newClass: "",
        newSections: "",
      },
    ]);
  };

  // Handle removing a class allocation
  const handleRemoveClassAllocation = (index) => {
    const updatedAllocations = classAllocations.filter((_, i) => i !== index);
    setClassAllocations(updatedAllocations);
  };

  // Handle form submission (update Firebase)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from reloading

    if (allocateClass.some((item) => item.newClass && item.newSections)) {
      const db = getDatabase(app); // Get the Realtime Database instance
      const teacherRef = ref(db, "teachers/" + id); // Reference to teacher data

      // Transform `allocateClass` to match the required structure
      const newAllocations = allocateClass.map((item) => ({
        class: item.newClass,
        sections: item.newSections.split(",").map((section) => section.trim()), // Split sections by comma and trim spaces
      }));

      // Merge existing allocations with the new ones
      const updatedAllocations = [...classAllocations, ...newAllocations];

      try {
        // Update Firebase with the updated allocations
        await update(teacherRef, {
          class_allocation: updatedAllocations, // Save the updated class allocation list
        });

        alert("Class allocations updated successfully");
        setClassAllocations(updatedAllocations); // Update the state with the new data
        setAllocateClass([{ newClass: "", newSections: "" }]); // Reset the input fields
      } catch (error) {
        console.error("Error updating data in Firebase:", error);
        alert("Failed to update class allocations. Please try again.");
      }
    } else {
      alert("Please add valid class and section allocations.");
    }
  };

  // Handle change in input fields
  // Handle adding a new subject
  const handleChange = (index, field, value) => {
    const updatedAllocateClass = [...allocateClass];
    updatedAllocateClass[index][field] = value;
    setAllocateClass(updatedAllocateClass);
  };
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Class Allocations</h2>

      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Current Allocations</h3>
        <ul className="space-y-2">
          {classAllocations.map((allocation, index) => (
            <li key={index} className="flex justify-between items-center">
              <span className="text-gray-800">
                Class: {allocation.class}, Sections:{" "}
                {allocation.sections.join(", ")}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveClassAllocation(index)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Add New Class Allocation</h3>

        {allocateClass.map((training, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              value={training.newClass || ""}
              onChange={(e) => handleChange(index, "newClass", e.target.value)}
              placeholder="Enter class (e.g., 10, 12)"
              className="flex-1 border border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              value={training.newSections || ""}
              onChange={(e) =>
                handleChange(index, "newSections", e.target.value)
              }
              placeholder="Enter sections (e.g., A, B)"
              className="flex-1 border border-gray-300 rounded-md p-2"
            />
            <button
              type="button"
              onClick={handleAddClassAllocation}
              className="bg-blue-500 text-white rounded-md px-6 py-2 hover:bg-blue-600"
            >
              Add Allocation
            </button>
          </div>
        ))}

        {allocateClass.some(
          (training) => training.newClass && training.newSections
        ) && (
          <p className="mt-2 text-sm text-gray-600">
            Click "Add Allocation" to add class{" "}
            <strong>
              {allocateClass
                .map((item) => item.newClass)
                .filter((cls) => cls)
                .join(", ")}
            </strong>{" "}
            with sections{" "}
            <strong>
              {allocateClass
                .map((item) => item.newSections)
                .filter((sec) => sec)
                .join(", ")}
            </strong>
            .
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

export default TeacherClassAllocationID;
