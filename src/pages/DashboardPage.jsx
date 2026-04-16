import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import ContinueLearningSection from "../components/home/ContinueLearningSection";
import FeaturedCoursesSection from "../components/home/FeaturedCoursesSection";
import Footer from "../components/layout/Footer";
import ProfileModal from "../components/modals/ProfileModal";
import EnrolledCoursesSidebar from "../components/sidebar/EnrolledCoursesSidebar";

export default function DashboardPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEnrolledSidebarOpen, setIsEnrolledSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#111111]">
      <Navbar
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenEnrolledCourses={() => setIsEnrolledSidebarOpen(true)}
      />

      <HeroSection />
      <ContinueLearningSection />
      <FeaturedCoursesSection />
      <Footer />

      {isProfileOpen && (
        <ProfileModal onClose={() => setIsProfileOpen(false)} />
      )}

      <EnrolledCoursesSidebar
        isOpen={isEnrolledSidebarOpen}
        onClose={() => setIsEnrolledSidebarOpen(false)}
        isEmpty={false}
      />
    </div>
  );
}