import { useState } from "react";
import NavbarGuest from "../components/layout/NavbarGuest";
import HeroSection from "../components/home/HeroSection";
import FeaturedCoursesSection from "../components/home/FeaturedCoursesSection";
import ContinueLearningLockedSection from "../components/home/ContinueLearningLockedSection";
import Footer from "../components/layout/Footer";
import LoginModal from "../components/modals/LoginModal";
import SignUpModal from "../components/modals/SignUpModal";

export default function DashboardGuestPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [signUpStep, setSignUpStep] = useState(1);

  const openLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };

  const openSignUp = () => {
    setIsLoginOpen(false);
    setSignUpStep(1);
    setIsSignUpOpen(true);
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#111111]">
      <NavbarGuest onOpenLogin={openLogin} onOpenSignUp={openSignUp} />
      <HeroSection />
      <FeaturedCoursesSection />
      <ContinueLearningLockedSection onOpenLogin={openLogin} />
      <Footer isAuthenticated={false} />

      {isLoginOpen && (
        <LoginModal onClose={closeModals} onOpenSignUp={openSignUp} />
      )}

      {isSignUpOpen && (
        <SignUpModal
          step={signUpStep}
          setStep={setSignUpStep}
          onClose={closeModals}
          onOpenLogin={openLogin}
        />
      )}
    </div>
  );
}