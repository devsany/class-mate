import React from "react";
import AdminNavBar from "../Admin/AdminNavBar";
import { NavLink } from "react-router-dom";

const Admin_Teacher = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <AdminNavBar />
      </div>
      <div className="col-span-10">
        {/* teacher header content graph 3/4 and 
      1/4 content number of total teacher present
       todat along with date */}
        <div>
          <div></div>
          <div></div>
        </div>
        {/* content link to add teacher, Cbse Teacher Module, Leaving Section,   */}
        <div>
          <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Teacher Management
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Add Teacher */}
              <NavLink
                to="/add-teacher"
                className={({ isActive }) =>
                  `block bg-white shadow-md rounded-md p-4 transition ${
                    isActive ? "ring-2 ring-blue-500" : "hover:shadow-lg"
                  }`
                }
              >
                <h2 className="text-lg font-semibold text-gray-700">
                  Add Teacher
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Quickly add new teacher information to the system.
                </p>
                <button className="mt-4 text-sm text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                  Go to Add Teacher
                </button>
              </NavLink>

              {/* CBSE Teacher Module */}
              <NavLink
                to="/cbse-teacher-module"
                className={({ isActive }) =>
                  `block bg-white shadow-md rounded-md p-4 transition ${
                    isActive ? "ring-2 ring-green-500" : "hover:shadow-lg"
                  }`
                }
              >
                <h2 className="text-lg font-semibold text-gray-700">
                  CBSE Teacher Module
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Manage and update CBSE teacher data efficiently.
                </p>
                <button className="mt-4 text-sm text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600">
                  Open CBSE Module
                </button>
              </NavLink>
              {/* subjects_specialization */}
              <NavLink
                to="/teacher-subjects-specialization"
                className={({ isActive }) =>
                  `block bg-white shadow-md rounded-md p-4 transition ${
                    isActive ? "ring-2 ring-gray-500" : "hover:shadow-lg"
                  }`
                }
              >
                <h2 className="text-lg font-semibold text-gray-700">
                  Teacher Subject Specialization
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Add the teacher subject which they are teaching
                </p>
                <button className="mt-4 text-sm text-white bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600">
                  Add Subject Specialization
                </button>
              </NavLink>

              {/* teacher class allocated id */}
              <NavLink
                to="/teacher-class-Allocated"
                className={({ isActive }) =>
                  `block bg-white shadow-md rounded-md p-4 transition ${
                    isActive ? "ring-2 ring-red-500" : "hover:shadow-lg"
                  }`
                }
              >
                <h2 className="text-lg font-semibold text-gray-700">
                  Teacher Class Allocation
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Assign the teacher class (Allocate the teacher class)
                </p>
                <button className="mt-4 text-sm text-white bg-purple-500 px-4 py-2 rounded hover:bg-purple-600">
                  Teacher Class Allocation
                </button>
              </NavLink>
              {/* Leaving Section */}
              <NavLink
                to="/teacher-leaving-section"
                className={({ isActive }) =>
                  `block bg-white shadow-md rounded-md p-4 transition ${
                    isActive ? "ring-2 ring-red-500" : "hover:shadow-lg"
                  }`
                }
              >
                <h2 className="text-lg font-semibold text-gray-700">
                  Leaving Section
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Track and process teacher leaving requests.
                </p>
                <button className="mt-4 text-sm text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                  View Leaving Section
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        {/* content teachers with a single class wise list */}
        <div></div>
      </div>
    </div>
  );
};

export default Admin_Teacher;
