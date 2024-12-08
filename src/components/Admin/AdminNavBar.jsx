import React from "react";
import { NavLink } from "react-router-dom";

const AdminNavBar = () => {
  return (
    <div className="bg-gray-50 border-r border-gray-200 h-screen py-4 px-4">
      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-gray-700 hover:text-blue-500 text-sm ${
              isActive ? "font-semibold text-blue-600" : ""
            }`
          }
        >
          Admin Summary
        </NavLink>
        <NavLink
          to="/admin/new_teacher_entry"
          className={({ isActive }) =>
            `text-gray-700 hover:text-blue-500 text-sm ${
              isActive ? "font-semibold text-blue-600" : ""
            }`
          }
        >
          Teacher Section
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminNavBar;
