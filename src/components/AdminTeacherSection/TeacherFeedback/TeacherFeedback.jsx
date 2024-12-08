import React, { useState, useEffect } from "react";
import { ref, get, getDatabase } from "firebase/database"; // Firebase functions to interact with database
import app from "../../firebase/firebaseConsole";
import { NavLink, useNavigate } from "react-router-dom";

const TeacherFeedback = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to handle UI when data is being fetched

  // Fetch teachers data from Firebase
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const db = getDatabase(app);
        const teachersRef = ref(db, "teachers");
        const snapshot = await get(teachersRef);
        if (snapshot.exists()) {
          const teachersData = snapshot.val();
          const teacherList = Object.keys(teachersData).map((key) => ({
            teacher_id: key,
            ...teachersData[key],
          }));
          setTeachers(teacherList);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching teachers data: ", error);
      } finally {
        setLoading(false); // Set loading to false after data fetch is complete
      }
    };
    fetchTeachers();
  }, []);

  const nav = useNavigate();

  if (loading) {
    return <div>Loading...</div>; // Simple loading message while fetching data
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Teacher Details</h1>
      <button
        onClick={() => nav("/admin/new_teacher_entry")}
        className="px-6 py-2 bg-green-600 text-white rounded-md"
      >
        Back
      </button>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-lg">
          <thead>
            <tr>
              <th className="p-4 text-left border-b">Teacher ID</th>
              <th className="p-4 text-left border-b">Name</th>
              <th className="p-4 text-left border-b">Email</th>
              <th className="p-4 text-left border-b">Phone</th>
              <th className="p-4 text-left border-b">Qualification</th>
              <th className="p-4 text-left border-b">Experience</th>
              <th className="p-4 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.teacher_id} className="hover:bg-gray-100">
                <td className="p-4 border-b">{teacher.teacher_id}</td>
                <td className="p-4 border-b">
                  {teacher.name?.first_name} {teacher.name?.last_name}
                </td>
                <td className="p-4 border-b">{teacher.email}</td>
                <td className="p-4 border-b">{teacher.phone}</td>
                <td className="p-4 border-b">
                  {teacher.qualification?.length > 0 ? (
                    teacher.qualification.map((qual, index) => (
                      <div key={index}>
                        <li>
                          {qual.degree} <b>in</b> {qual.subject} <b>from</b>{" "}
                          {qual.institution} ({qual.year_of_passing})
                        </li>
                      </div>
                    ))
                  ) : (
                    <p>No qualifications available</p>
                  )}
                </td>
                <td className="p-4 border-b">
                  {teacher.experience?.length > 0 ? (
                    teacher.experience.map((exp, index) => (
                      <div key={index}>
                        <li>
                          {exp.position} <b>at</b> {exp.school} (
                          {exp.start_date} <b>to</b> {exp.end_date})
                        </li>
                      </div>
                    ))
                  ) : (
                    <p>No experience available</p>
                  )}
                </td>
                <td className="p-4 border-b">
                  <NavLink
                    to={`/teacher-feedback/${teacher.teacher_id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Teacher Feedback
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherFeedback;
