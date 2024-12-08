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
import TeacherAttandance from "./components/AdminTeacherSection/TeacherAttandance/TeacherAttandance";
import TeacherAttandanceID from "./components/AdminTeacherSection/TeacherAttandance/TeacherAttandanceID";
import TeacherLeaving from "./components/AdminTeacherSection/TeacherLeaving/TeacherLeaving";
import TeacherLeavingID from "./components/AdminTeacherSection/TeacherLeaving/TeacherLeavingID";
import TeacherFeedback from "./components/AdminTeacherSection/TeacherFeedback/TeacherFeedback";
import TeacherFeedbackID from "./components/AdminTeacherSection/TeacherFeedback/TeacherFeedbackID";

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
          {/* teacher leaving section */}
          <Route path="/teacher-leaving" element={<TeacherLeaving />} />
          <Route path="/teacher-leaving/:id" element={<TeacherLeavingID />} />

          {/* teacher feedback section */}
          <Route path="/teacher-feedback" element={<TeacherFeedback />} />
          <Route path="/teacher-feedback/:id" element={<TeacherFeedbackID />} />
          <Route
            path="/admin/new_teacher_entry"
            element={<Admin_Add_Teacher />}
          />
          {/* teacher attandance system */}
          <Route path="/teacher-attandance" element={<TeacherAttandance />} />
          <Route
            path="/teacher-attandance/:id"
            element={<TeacherAttandanceID />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
