import Navbar from "../components/layout/Navbar";
import NavbarGuest from "../components/layout/NavbarGuest";
import Footer from "../components/layout/Footer";
import CourseDetailsLayout from "../components/course/CourseDetailsLayout";

export default function CourseDetailsPage({
  isAuthenticated = false,
  mode = "not_enrolled_guest",
}) {
  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#111111]">
      {isAuthenticated ? <Navbar /> : <NavbarGuest />}
      <CourseDetailsLayout isAuthenticated={isAuthenticated} mode={mode} />
      <Footer isAuthenticated={isAuthenticated} />
    </div>
  );
}