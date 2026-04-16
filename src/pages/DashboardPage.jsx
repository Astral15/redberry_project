import { useState } from "react";
import { useApp } from "../app/AppContext";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import ContinueLearningSection from "../components/home/ContinueLearningSection";
import FeaturedCoursesSection from "../components/home/FeaturedCoursesSection";
import Footer from "../components/layout/Footer";
import ProfileModal from "../components/modals/ProfileModal";
import EnrolledCoursesSidebar from "../components/sidebar/EnrolledCoursesSidebar";
import LoginModal from "../components/modals/LoginModal";

export default function DashboardPage() {
  const {
    isAuthenticated,
    isProfileComplete,
    profileData,
    saveProfile,
    enrollments = [],
    login,
  } = useApp();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEnrolledSidebarOpen, setIsEnrolledSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openEnrolledCourses = () => {
    if (!isAuthenticated) {
      setIsLoginOpen(true);
      return;
    }

    setIsEnrolledSidebarOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#111111]">
      <Navbar
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenEnrolledCourses={openEnrolledCourses}
        isProfileComplete={isProfileComplete}
      />

      <HeroSection />

      {isAuthenticated && enrollments.length > 0 && (
        <ContinueLearningSection
          courses={enrollments}
          onSeeAll={() => setIsEnrolledSidebarOpen(true)}
        />
      )}

      <FeaturedCoursesSection />
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

      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onOpenSignUp={() => {}}
          onLoginSuccess={(formData) => login(formData)}
        />
      )}
    </div>
  );
}