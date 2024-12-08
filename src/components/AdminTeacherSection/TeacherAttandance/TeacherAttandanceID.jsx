import React, { useState, useEffect } from "react";
import { get, getDatabase, ref, update } from "firebase/database";
import { useParams } from "react-router-dom";
import app from "../../firebase/firebaseConsole";

const TeacherAttandanceID = () => {
  const { id } = useParams(); // Teacher ID from URL
  const [attendance, setAttendance] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");

  // Fetch attendance data from Firebase
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const db = getDatabase(app);
        const teacherRef = ref(db, "teachers/" + id);
        const snapshot = await get(teacherRef);

        if (snapshot.exists()) {
          setAttendance(snapshot.val().attendance || {});
        } else {
          setAttendance({});
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, [id]);

  // Handle attendance submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentDate && currentStatus) {
      const db = getDatabase(app);
      const teacherRef = ref(db, "teachers/" + id);

      const updatedAttendance = {
        ...attendance,
        [currentDate]: currentStatus,
      };

      update(teacherRef, { attendance: updatedAttendance })
        .then(() => {
          setAttendance(updatedAttendance);
          alert("Attendance updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating attendance:", error);
        });
    } else {
      alert("Please provide both date and status.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance System</h2>

      {/* Current Attendance Records */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Attendance Records</h3>
        <ul className="space-y-2">
          {Object.entries(attendance).map(([date, status]) => (
            <li
              key={date}
              className={`flex justify-between items-center p-2 rounded-md ${
                status === "Present" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <span className="font-medium">{date}</span>
              <span className="text-gray-800">{status}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Attendance */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Mark Attendance</h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4"
        >
          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md p-2"
          />
          <select
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-6 py-2 hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Summary Section */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Attendance Summary</h3>
        <p>
          Total Days Present:{" "}
          <span className="text-green-500 font-bold">
            {
              Object.values(attendance).filter((status) => status === "Present")
                .length
            }
          </span>
        </p>
        <p>
          Total Days Absent:{" "}
          <span className="text-red-500 font-bold">
            {
              Object.values(attendance).filter((status) => status === "Absent")
                .length
            }
          </span>
        </p>
      </div>
    </div>
  );
};

export default TeacherAttandanceID;
