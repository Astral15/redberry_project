import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "../src/pages/DashboardPage";
import DashboardGuestPage from "../src/pages/DashboardGuestPage";
import CoursesPage from "../src/pages/CoursesPage";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoursesPage />} />
      </Routes>
    </BrowserRouter>
  );
}