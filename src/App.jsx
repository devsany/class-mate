import React from "react";
import LoginSection from "./components/LoginSection";
import AdminSection from "./components/Admin/AdminSection";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin_Add_Teacher from "./components/AdminTeacherSection/Admin_Teacher";
import AddTeacher from "./components/AdminTeacherSection/AddTeacher";
import TeacherCBSE from "./components/AdminTeacherSection/CBSE/TeacherCBSE";
import Teacher_leaving_section from "./components/AdminTeacherSection/Teacher_leaving_section";
import TeacherCBSEID from "./components/AdminTeacherSection/CBSE/TeacherCBSEID";
import TeacherSubjectSpecialization from "./components/AdminTeacherSection/TeacherSubjectSpecialization/TeacherSubjectSpecialization";
import TeacherSubjectSpecializationID from "./components/AdminTeacherSection/TeacherSubjectSpecialization/TeacherSubjectSpecializationID";
import TeacherClassAllocated from "./components/AdminTeacherSection/TeacherClassAllocated/TeacherClassAllocated";
import TeacherClassAllocatedID from "./components/AdminTeacherSection/TeacherClassAllocated/TeacherClassAllocatedID";

const App = () => {
  return (
    <div>
      {/* <LoginSection /> */}
      {/* <AdminSection /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminSection />} />
          <Route path="/add-teacher" element={<AddTeacher />} />
          <Route path="/cbse-teacher-module" element={<TeacherCBSE />} />
          <Route
            path="/teacher-subjects-specialization"
            element={<TeacherSubjectSpecialization />}
          />
          <Route
            path="/teacher-class-Allocated"
            element={<TeacherClassAllocated />}
          />
          <Route
            path="/teacher-class-Allocated/:id"
            element={<TeacherClassAllocatedID />}
          />
          <Route
            path="/teacher-subjects-specialization/:id"
            element={<TeacherSubjectSpecializationID />}
          />
          <Route path="/cbse-teacher-module/:id" element={<TeacherCBSEID />} />
          <Route
            path="/teacher-leaving-section"
            element={<Teacher_leaving_section />}
          />
          <Route
            path="/admin/new_teacher_entry"
            element={<Admin_Add_Teacher />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
