import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import app from "../firebase/firebaseConsole";

const AddTeacher = () => {
  const [teacherData, setTeacherData] = useState({
    teacher_id: "",
    name: {
      first_name: "",
      last_name: "",
    },
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: {
      street: "",
      city: "",
      state: "",
      postal_code: "",
    },
    qualification: [
      {
        degree: "",
        subject: "",
        institution: "",
        year_of_passing: "",
      },
    ],
    experience: [
      {
        school: "",
        position: "",
        start_date: "",
        end_date: "",
      },
    ],
    password: "",
  });
  const nav = useNavigate();
  // Function to generate a random Teacher ID
  const generateTeacherID = () => {
    const randomID = "TID" + Math.floor(Math.random() * 1000000);
    setTeacherData({ ...teacherData, teacher_id: randomID });
  };

  // Function to generate a random password starting with TCH and 4 letters
  const generatePassword = () => {
    const randomChars = Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase();
    const password = `TCH${randomChars}`;
    setTeacherData({ ...teacherData, password });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split(".");
    if (nameParts.length === 2) {
      setTeacherData({
        ...teacherData,
        [nameParts[0]]: {
          ...teacherData[nameParts[0]],
          [nameParts[1]]: value,
        },
      });
    } else if (nameParts.length === 3) {
      const [outerKey, middleKey, innerKey] = nameParts;
      setTeacherData({
        ...teacherData,
        [outerKey]: [
          ...teacherData[outerKey].map((item, index) =>
            index === parseInt(middleKey)
              ? { ...item, [innerKey]: value }
              : item
          ),
        ],
      });
    } else {
      setTeacherData({
        ...teacherData,
        [name]: value,
      });
    }
  };

  // Function to add a new qualification field
  const addQualification = () => {
    setTeacherData({
      ...teacherData,
      qualification: [
        ...teacherData.qualification,
        {
          degree: "",
          subject: "",
          institution: "",
          year_of_passing: "",
        },
      ],
    });
  };

  // Function to remove a qualification field
  const removeQualification = (index) => {
    const updatedQualifications = teacherData.qualification.filter(
      (_, i) => i !== index
    );
    setTeacherData({ ...teacherData, qualification: updatedQualifications });
  };

  // Function to add a new experience field
  const addExperience = () => {
    setTeacherData({
      ...teacherData,
      experience: [
        ...teacherData.experience,
        {
          school: "",
          position: "",
          start_date: "",
          end_date: "",
        },
      ],
    });
  };

  // Function to remove an experience field
  const removeExperience = (index) => {
    const updatedExperience = teacherData.experience.filter(
      (_, i) => i !== index
    );
    setTeacherData({ ...teacherData, experience: updatedExperience });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the submit action like sending data to server
    console.log("Teacher Data submitted:", teacherData);
  };
  // Function to add teacher data to Firebase Realtime Database
  const addTeacherToDatabase = () => {
    const db = getDatabase(app); // Get the Realtime Database instance
    const teacherRef = ref(db, "teachers/" + teacherData.teacher_id); // Create a reference using teacher_id as the key

    set(teacherRef, teacherData)
      .then(() => {
        alert("Teacher added successfully!");
        teacherData({});
      })
      .catch((error) => {
        console.error("Error adding teacher: ", error);
      });
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <button
        onClick={() => nav("/admin/new_teacher_entry")}
        className="px-6 py-2 bg-green-600 text-white rounded-md"
      >
        Back
      </button>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Teacher Information
      </h1>

      {/* Teacher ID */}
      <div className="mb-4">
        <label className="block text-gray-700">Teacher ID</label>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            name="teacher_id"
            value={teacherData.teacher_id}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Teacher ID"
            readOnly
          />
          <button
            onClick={generateTeacherID}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Generate ID
          </button>
        </div>
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            name="password"
            value={teacherData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Generated Password"
            readOnly
          />
          <button
            onClick={generatePassword}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Generate Password
          </button>
        </div>
      </div>

      {/* Name Section */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">Name</h2>
        <input
          type="text"
          name="name.first_name"
          value={teacherData.name.first_name}
          onChange={handleChange}
          className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-md"
          placeholder="First Name"
        />
        <input
          type="text"
          name="name.last_name"
          value={teacherData.name.last_name}
          onChange={handleChange}
          className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Last Name"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={teacherData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Email"
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="block text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          value={teacherData.phone}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Phone"
        />
      </div>

      {/* DOB */}
      <div className="mb-4">
        <label className="block text-gray-700">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={teacherData.dob}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Gender */}
      <div className="mb-4">
        <label className="block text-gray-700">Gender</label>
        <select
          name="gender"
          value={teacherData.gender}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Address Section */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">Address</h2>
        <input
          type="text"
          name="address.street"
          value={teacherData.address.street}
          onChange={handleChange}
          className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Street"
        />
        <input
          type="text"
          name="address.city"
          value={teacherData.address.city}
          onChange={handleChange}
          className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-md"
          placeholder="City"
        />
        <input
          type="text"
          name="address.state"
          value={teacherData.address.state}
          onChange={handleChange}
          className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-md"
          placeholder="State"
        />
        <input
          type="text"
          name="address.postal_code"
          value={teacherData.address.postal_code}
          onChange={handleChange}
          className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Postal Code"
        />
      </div>

      {/* Qualification Section */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">Qualifications</h2>
        {teacherData.qualification.map((qual, index) => (
          <div key={index} className="border p-4 rounded-md mb-4">
            <input
              type="text"
              name={`qualification.${index}.degree`}
              value={qual.degree}
              onChange={handleChange}
              className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Degree"
            />
            <input
              type="text"
              name={`qualification.${index}.subject`}
              value={qual.subject}
              onChange={handleChange}
              className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Subject"
            />
            <input
              type="text"
              name={`qualification.${index}.institution`}
              value={qual.institution}
              onChange={handleChange}
              className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Institution"
            />
            <input
              type="text"
              name={`qualification.${index}.year_of_passing`}
              value={qual.year_of_passing}
              onChange={handleChange}
              className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Year of Passing"
            />
            <button
              type="button"
              onClick={() => removeQualification(index)}
              className="mt-2 text-red-600"
            >
              Remove Qualification
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addQualification}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Add Qualification
        </button>
      </div>

      {/* Experience Section */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">Experience</h2>
        {teacherData.experience.map((exp, index) => (
          <div key={index} className="border p-4 rounded-md mb-4">
            <input
              type="text"
              name={`experience.${index}.school`}
              value={exp.school}
              onChange={handleChange}
              className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-md"
              placeholder="School"
            />
            <input
              type="text"
              name={`experience.${index}.position`}
              value={exp.position}
              onChange={handleChange}
              className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Position"
            />
            <input
              type="text"
              name={`experience.${index}.start_date`}
              value={exp.start_date}
              onChange={handleChange}
              className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Start Date"
            />
            <input
              type="text"
              name={`experience.${index}.end_date`}
              value={exp.end_date}
              onChange={handleChange}
              className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-md"
              placeholder="End Date"
            />
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="mt-2 text-red-600"
            >
              Remove Experience
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addExperience}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Add Experience
        </button>
      </div>

      {/* Submit Button */}
      <button
        onClick={addTeacherToDatabase}
        className="px-6 py-2 bg-green-600 text-white rounded-md"
      >
        Submit
      </button>
    </div>
  );
};

export default AddTeacher;
