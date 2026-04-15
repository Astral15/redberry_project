import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import DashboardGuestPage from "../pages/DashboardGuestPage";
import CoursesPage from "../pages/CoursesPage";
import CourseDetailsPage from "../pages/CourseDetailsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardGuestPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/courses" element={<CoursesPage isAuthenticated={true} />} />
        <Route path="/courses-guest" element={<CoursesPage isAuthenticated={false} />} />
        <Route
          path="/course-details"
          element={<CourseDetailsPage isAuthenticated={true} mode="enrolled" />}
        />
        <Route
          path="/course-details-completed"
          element={<CourseDetailsPage isAuthenticated={true} mode="completed" />}
        />
        <Route
          path="/course-details-authorized"
          element={<CourseDetailsPage isAuthenticated={true} mode="not_enrolled_authorized" />}
        />
        <Route
          path="/course-details-guest"
          element={<CourseDetailsPage isAuthenticated={false} mode="not_enrolled_guest" />}
        />
      </Routes>
    </BrowserRouter>
  );
}