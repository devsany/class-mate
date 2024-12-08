import React, { useState } from "react";

const LoginSection = () => {
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 font-sans">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Welcome to the Login Portal
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Please select your Role and Enter your Password
        </p>
        <form className="space-y-4">
          {/* Role Selection */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Your Role:
            </label>
            <select
              name="role"
              id="role"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" disabled selected>
                Select role
              </option>
              <option value="admin">Login As Admin</option>
              <option value="student">Login As Student</option>
              <option value="teacher">Login As Teacher</option>
              <option value="parent">Login As Parent</option>
              <option value="nts">Login As Non-Teaching Staff</option>
              <option value="bus_incharge">Login As Bus In-Charge</option>
              <option value="guard">Login As Security Guard</option>
            </select>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter Your Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSection;
