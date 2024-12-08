import React from "react";
import { NavLink } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";

const AdminSection = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        {/* nav div start */}
        <AdminNavBar />
        {/* content div start */}
      </div>
      {/* admin summary */}
      <div className="col-span-10">hii</div>
    </div>
  );
};

export default AdminSection;
