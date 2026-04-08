import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import ContinueLearningSection from "../components/home/ContinueLearningSection";
import FeaturedCoursesSection from "../components/home/FeaturedCoursesSection";
import Footer from "../components/layout/Footer";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#111111]">
      <Navbar />
      <HeroSection />
      <ContinueLearningSection />
      <FeaturedCoursesSection />
      <Footer />
    </div>
  );
}