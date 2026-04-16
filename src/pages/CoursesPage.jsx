import { useState } from "react";
import { useApp } from "../app/AppContext";
import Navbar from "../components/layout/Navbar";
import NavbarGuest from "../components/layout/NavbarGuest";
import Footer from "../components/layout/Footer";
import CoursesLayout from "../components/courses/CoursesLayout";
import ProfileModal from "../components/modals/ProfileModal";
import EnrolledCoursesSidebar from "../components/sidebar/EnrolledCoursesSidebar";

export default function CoursesPage() {
  const {
    isAuthenticated,
    profileData,
    saveProfile,
    isProfileComplete,
    enrollments = [],
  } = useApp();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEnrolledSidebarOpen, setIsEnrolledSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#111111]">
      {isAuthenticated ? (
        <Navbar
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenEnrolledCourses={() => setIsEnrolledSidebarOpen(true)}
          isProfileComplete={isProfileComplete}
        />
      ) : (
        <NavbarGuest />
      )}

      <CoursesLayout />
      <Footer />

      {isProfileOpen && (
        <ProfileModal
          onClose={() => setIsProfileOpen(false)}
          profileData={profileData}
          onSave={saveProfile}
        />
      )}

      <EnrolledCoursesSidebar
        isOpen={isEnrolledSidebarOpen}
        onClose={() => setIsEnrolledSidebarOpen(false)}
        isEmpty={enrollments.length === 0}
        enrollments={enrollments}
      />
    </div>
  );
}