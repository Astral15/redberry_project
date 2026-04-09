import NavbarGuest from "../components/layout/NavbarGuest";
import HeroSection from "../components/home/HeroSection";
import FeaturedCoursesSection from "../components/home/FeaturedCoursesSection";
import ContinueLearningLockedSection from "../components/home/ContinueLearningLockedSection";
import Footer from "../components/layout/Footer";

export default function DashboardGuestPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#111111]">
      <NavbarGuest />
      <HeroSection />
      <FeaturedCoursesSection />
      <ContinueLearningLockedSection />
      <Footer isAuthenticated={false} />
    </div>
  );
}