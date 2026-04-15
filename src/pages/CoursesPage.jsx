import Navbar from "../components/layout/Navbar";
import NavbarGuest from "../components/layout/NavbarGuest";
import Footer from "../components/layout/Footer";
import CoursesLayout from "../components/courses/CoursesLayout";

export default function CoursesPage({ isAuthenticated = false }) {
  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#111111]">
      {isAuthenticated ? <Navbar /> : <NavbarGuest />}
      <CoursesLayout />
      <Footer isAuthenticated={isAuthenticated} />
    </div>
  );
}