import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { getDatabase, ref, set } from "firebase/database";
import app from "../../firebase/firebaseConsole"; // Assuming you've configured Firebase
import { useParams } from "react-router-dom";

const TeacherLeavingID = () => {
  const { id } = useParams();
  const [leaveRequest, setLeaveRequest] = useState({
    leave_id: "",
    start_date: "",
    end_date: "",
    reason: "",
    status: "Pending",
    teacher_comments: "",
    approvals: {
      vice_principal: "Pending",
    },
  });
  const [loading, setLoading] = useState(false); // For loading state

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Generate PDF for leave request
  const generatePDF = () => {
    const doc = new jsPDF();

    // Title and Header
    doc.setFontSize(18);
    doc.text("Leave Request Form", 20, 20);
    doc.setFontSize(12);
    doc.text(`Leave ID: ${leaveRequest.leave_id}`, 20, 30);
    doc.text(`Teacher Name: ${id}`, 20, 40); // Dynamic Teacher Name based on id
    doc.text(`Start Date: ${leaveRequest.start_date}`, 20, 50);
    doc.text(`End Date: ${leaveRequest.end_date}`, 20, 60);
    doc.text(`Reason for Leave: ${leaveRequest.reason}`, 20, 70);
    doc.text(`Teacher Comments: ${leaveRequest.teacher_comments}`, 20, 80);

    // Approval Section
    doc.text("Approvals:", 20, 100);
    doc.text(
      `Vice Principal: ${leaveRequest.approvals.vice_principal}`,
      20,
      110
    );

    // Signature Areas
    doc.text("Vice Principal Signature: ______________________", 20, 130);
    doc.text("Principal Signature: ______________________", 20, 140); // Omit principal approval from the request

    // Footer
    doc.setFontSize(10);
    doc.text("Class-Mate (SDMS) Web Application", 20, 180);

    // Save the PDF
    doc.save(`${leaveRequest.leave_id}_leave_request.pdf`);
  };

  // Submit leave request to Firebase and generate PDF
  const submitLeaveRequest = async () => {
    if (
      !leaveRequest.start_date ||
      !leaveRequest.end_date ||
      !leaveRequest.reason
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    setLoading(true);
    const db = getDatabase(app);
    const leaveId = `LV${Math.floor(Math.random() * 1000) + 1}`; // Generating a random leave ID for the request

    const leaveRef = ref(db, `teachers/${id}/leave_requests/${leaveId}`);

    try {
      // Save the leave request data in Firebase
      await set(leaveRef, {
        ...leaveRequest,
        leave_id: leaveId, // Make sure the leave ID is part of the data
      });
      alert("Leave request submitted successfully!");
      generatePDF(); // Generate and download the PDF after submitting the request
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("There was an error submitting the leave request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Leave Request</h2>

      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Leave Request Details</h3>

        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={leaveRequest.start_date}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            name="end_date"
            value={leaveRequest.end_date}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Reason</label>
          <input
            type="text"
            name="reason"
            value={leaveRequest.reason}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Teacher Comments</label>
          <textarea
            name="teacher_comments"
            value={leaveRequest.teacher_comments}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Leave Status</label>
          <input
            type="text"
            value={leaveRequest.status}
            disabled
            className="w-full px-4 py-2 border rounded-lg bg-gray-200"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={submitLeaveRequest}
          disabled={loading} // Disable button while submitting
          className={`${
            loading ? "bg-gray-400" : "bg-blue-500"
          } text-white rounded-md px-6 py-2 hover:bg-blue-600`}
        >
          {loading ? "Submitting..." : "Submit Leave Request"}
        </button>
      </div>
    </div>
  );
};

export default TeacherLeavingID;
