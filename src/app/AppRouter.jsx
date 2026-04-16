import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardGuestPage from "../pages/DashboardGuestPage";
import CoursesPage from "../pages/CoursesPage";
import CourseDetailsPage from "../pages/CourseDetailsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardGuestPage />} />
        <Route path="/dashboard" element={<DashboardGuestPage />} />

        <Route path="/browse-courses" element={<CoursesPage />} />
        <Route path="/browse-courses-guest" element={<CoursesPage />} />

        <Route path="/course-details" element={<CourseDetailsPage />} />
        <Route path="/course-details-completed" element={<CourseDetailsPage mode="completed" />} />
        <Route path="/course-details-authorized" element={<CourseDetailsPage />} />
        <Route path="/course-details-guest" element={<CourseDetailsPage mode="not_enrolled_guest" />} />
      </Routes>
    </BrowserRouter>
  );
}