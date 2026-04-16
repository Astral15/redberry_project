import { useState } from "react";
import { useApp } from "../app/AppContext";
import NavbarGuest from "../components/layout/NavbarGuest";
import HeroSection from "../components/home/HeroSection";
import FeaturedCoursesSection from "../components/home/FeaturedCoursesSection";
import ContinueLearningLockedSection from "../components/home/ContinueLearningLockedSection";
import Footer from "../components/layout/Footer";
import LoginModal from "../components/modals/LoginModal";
import SignUpModal from "../components/modals/SignUpModal";
import DashboardPage from "./DashboardPage";

export default function DashboardGuestPage() {
  const { isAuthenticated, login, register } = useApp();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [signUpStep, setSignUpStep] = useState(1);

  const [loginError, setLoginError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  if (isAuthenticated) {
    return <DashboardPage />;
  }

  const openLogin = () => {
    setSignUpError("");
    setLoginError("");
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };

  const openSignUp = () => {
    setLoginError("");
    setSignUpError("");
    setIsLoginOpen(false);
    setSignUpStep(1);
    setIsSignUpOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#111111]">
      <NavbarGuest onOpenLogin={openLogin} onOpenSignUp={openSignUp} />

      <HeroSection />
      <FeaturedCoursesSection />
      <ContinueLearningLockedSection onOpenLogin={openLogin} />
      <Footer />

      {isLoginOpen && (
        <LoginModal
          onClose={() => {
            setLoginError("");
            setIsLoginOpen(false);
          }}
          onOpenSignUp={openSignUp}
          apiError={loginError}
          onLoginSuccess={async (formData) => {
            try {
              setLoginError("");
              await login(formData);
              return true;
            } catch (error) {
              setLoginError(
                error?.data?.message ||
                  error?.message ||
                  "Invalid email or password"
              );
              return false;
            }
          }}
        />
      )}

      {isSignUpOpen && (
        <SignUpModal
          step={signUpStep}
          setStep={setSignUpStep}
          onClose={() => {
            setSignUpError("");
            setIsSignUpOpen(false);
          }}
          onOpenLogin={openLogin}
          apiError={signUpError}
          onSignUpSuccess={async (formData) => {
            try {
              setSignUpError("");
              await register(formData);
              return true;
            } catch (error) {
              const backendErrors = error?.data?.errors;
              const firstFieldError =
                backendErrors && Object.values(backendErrors)?.[0]?.[0];

              setSignUpError(
                firstFieldError ||
                  error?.data?.message ||
                  error?.message ||
                  "Registration failed"
              );
              return false;
            }
          }}
        />
      )}
    </div>
  );
}