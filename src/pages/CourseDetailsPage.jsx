import { useMemo, useState } from "react";
import Navbar from "../components/layout/Navbar";
import NavbarGuest from "../components/layout/NavbarGuest";
import Footer from "../components/layout/Footer";
import CourseDetailsLayout from "../components/course/CourseDetailsLayout";

import LoginModal from "../components/modals/LoginModal";
import ProfileModal from "../components/modals/ProfileModal";
import CompleteProfilePromptModal from "../components/modals/CompleteProfilePromptModal";
import EnrollmentConfirmedModal from "../components/modals/EnrollmentConfirmedModal";
import EnrollmentConflictModal from "../components/modals/EnrollmentConflictModal";
import CongratulationsModal from "../components/modals/CongratulationsModal";

export default function CourseDetailsPage({
  isAuthenticated = false,
  mode = "not_enrolled_guest",
}) {
  const basePrice = 349;

  const weeklySchedules = [
    "Mon - Wed",
    "Tue - Thu",
    "Wed - Fri",
    "Weekend",
  ];

  const timeSlotsBySchedule = {
    "Mon - Wed": [
      { id: "morning", label: "Morning", time: "9:00 AM - 12:00 PM" },
      { id: "afternoon", label: "Afternoon", time: "12:00 PM - 6:00 PM" },
      { id: "evening", label: "Evening", time: "6:00 PM - 9:00 PM" },
    ],
    "Tue - Thu": [
      { id: "morning", label: "Morning", time: "9:00 AM - 12:00 PM" },
      { id: "evening", label: "Evening", time: "6:00 PM - 9:00 PM" },
    ],
    "Wed - Fri": [
      { id: "afternoon", label: "Afternoon", time: "12:00 PM - 6:00 PM" },
      { id: "evening", label: "Evening", time: "6:00 PM - 9:00 PM" },
    ],
    Weekend: [
      { id: "morning", label: "Morning", time: "9:00 AM - 12:00 PM" },
    ],
  };

  const sessionTypesBySelection = {
    "Mon - Wed|morning": [
      {
        id: "online",
        label: "Online",
        modifier: 0,
        seats: 50,
        location: "",
        icon: "/Property 1=Online.png",
      },
      {
        id: "in-person",
        label: "In-Person",
        modifier: 30,
        seats: 3,
        location: "Chavchavadze St.34",
        icon: "/Property 1=In Person.png",
      },
      {
        id: "hybrid",
        label: "Hybrid",
        modifier: 50,
        seats: 130,
        location: "Chavchavadze St.34",
        icon: "/Property 1=Hybrid.png",
      },
    ],
    "Mon - Wed|afternoon": [
      {
        id: "online",
        label: "Online",
        modifier: 0,
        seats: 25,
        location: "",
        icon: "/Property 1=Online.png",
      },
      {
        id: "in-person",
        label: "In-Person",
        modifier: 30,
        seats: 0,
        location: "Chavchavadze St.34",
        icon: "/Property 1=In Person.png",
      },
    ],
    "Mon - Wed|evening": [
      {
        id: "online",
        label: "Online",
        modifier: 0,
        seats: 40,
        location: "",
        icon: "/Property 1=Online.png",
      },
      {
        id: "hybrid",
        label: "Hybrid",
        modifier: 50,
        seats: 2,
        location: "Chavchavadze St.34",
        icon: "/Property 1=Hybrid.png",
      },
    ],
    "Tue - Thu|morning": [
      {
        id: "online",
        label: "Online",
        modifier: 0,
        seats: 20,
        location: "",
        icon: "/Property 1=Online.png",
      },
    ],
    "Tue - Thu|evening": [
      {
        id: "in-person",
        label: "In-Person",
        modifier: 30,
        seats: 8,
        location: "Chavchavadze St.34",
        icon: "/Property 1=In Person.png",
      },
    ],
    "Wed - Fri|afternoon": [
      {
        id: "hybrid",
        label: "Hybrid",
        modifier: 50,
        seats: 12,
        location: "Chavchavadze St.34",
        icon: "/Property 1=Hybrid.png",
      },
    ],
    "Wed - Fri|evening": [
      {
        id: "online",
        label: "Online",
        modifier: 0,
        seats: 18,
        location: "",
        icon: "/Property 1=Online.png",
      },
      {
        id: "in-person",
        label: "In-Person",
        modifier: 30,
        seats: 1,
        location: "Chavchavadze St.34",
        icon: "/Property 1=In Person.png",
      },
    ],
    "Weekend|morning": [
      {
        id: "online",
        label: "Online",
        modifier: 0,
        seats: 10,
        location: "",
        icon: "/Property 1=Online.png",
      },
      {
        id: "hybrid",
        label: "Hybrid",
        modifier: 50,
        seats: 4,
        location: "Chavchavadze St.34",
        icon: "/Property 1=Hybrid.png",
      },
    ],
  };

  const [selectedWeeklySchedule, setSelectedWeeklySchedule] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedSessionType, setSelectedSessionType] = useState(null);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCompleteProfilePromptOpen, setIsCompleteProfilePromptOpen] =
    useState(false);
  const [isEnrollmentConfirmedOpen, setIsEnrollmentConfirmedOpen] =
    useState(false);
  const [isEnrollmentConflictOpen, setIsEnrollmentConflictOpen] =
    useState(false);
  const [isCongratulationsOpen, setIsCongratulationsOpen] = useState(false);

  const [currentMode, setCurrentMode] = useState(mode);

  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "user@gmail.com",
    mobileNumber: "",
    age: "",
  });

  const isProfileComplete =
    profileData.fullName.trim().length >= 3 &&
    /^5\d{8}$/.test(profileData.mobileNumber.replace(/\s/g, "")) &&
    Number(profileData.age) >= 16;

  const availableTimeSlots = selectedWeeklySchedule
    ? timeSlotsBySchedule[selectedWeeklySchedule] || []
    : [];

  const availableSessionTypes = useMemo(() => {
    if (!selectedWeeklySchedule || !selectedTimeSlot) return [];
    const key = `${selectedWeeklySchedule}|${selectedTimeSlot.id}`;
    return sessionTypesBySelection[key] || [];
  }, [selectedWeeklySchedule, selectedTimeSlot]);

  const sessionModifier = selectedSessionType?.modifier || 0;
  const totalPrice = basePrice + sessionModifier;

  const isReadyToEnroll =
    !!selectedWeeklySchedule &&
    !!selectedTimeSlot &&
    !!selectedSessionType &&
    selectedSessionType.seats > 0;

  const handleSelectWeeklySchedule = (schedule) => {
    setSelectedWeeklySchedule(schedule);
    setSelectedTimeSlot(null);
    setSelectedSessionType(null);
  };

  const handleSelectTimeSlot = (slot) => {
    setSelectedTimeSlot(slot);
    setSelectedSessionType(null);
  };

  const handleSelectSessionType = (session) => {
    if (session.seats === 0) return;
    setSelectedSessionType(session);
  };

  const handleEnroll = () => {
    if (!isAuthenticated) {
      setIsLoginOpen(true);
      return;
    }

    if (!isProfileComplete) {
      setIsCompleteProfilePromptOpen(true);
      return;
    }

    if (!isReadyToEnroll) return;

    const hasConflict =
      selectedWeeklySchedule === "Wed - Fri" &&
      selectedTimeSlot?.id === "afternoon";

    if (hasConflict) {
      setIsEnrollmentConflictOpen(true);
      return;
    }

    setIsEnrollmentConfirmedOpen(true);
  };

  const handleConfirmEnrollment = () => {
    setIsEnrollmentConfirmedOpen(false);
    setCurrentMode("enrolled");
  };

  const handleContinueAnyway = () => {
    setIsEnrollmentConflictOpen(false);
    setIsEnrollmentConfirmedOpen(true);
  };

  const handleCompleteCourse = () => {
    setCurrentMode("completed");
    setIsCongratulationsOpen(true);
  };

  const handleRetakeCourse = () => {
    setCurrentMode("enrolled");
  };

  const handleSaveProfile = (newProfileData) => {
    setProfileData(newProfileData);
    setIsProfileOpen(false);
    setIsCompleteProfilePromptOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#111111]">
      {isAuthenticated ? (
        <Navbar onOpenProfile={() => setIsProfileOpen(true)} />
      ) : (
        <NavbarGuest />
      )}

      <CourseDetailsLayout
        isAuthenticated={isAuthenticated}
        mode={currentMode}
        basePrice={basePrice}
        totalPrice={totalPrice}
        sessionModifier={sessionModifier}
        weeklySchedules={weeklySchedules}
        availableTimeSlots={availableTimeSlots}
        availableSessionTypes={availableSessionTypes}
        selectedWeeklySchedule={selectedWeeklySchedule}
        selectedTimeSlot={selectedTimeSlot}
        selectedSessionType={selectedSessionType}
        onSelectWeeklySchedule={handleSelectWeeklySchedule}
        onSelectTimeSlot={handleSelectTimeSlot}
        onSelectSessionType={handleSelectSessionType}
        onEnroll={handleEnroll}
        onCompleteCourse={handleCompleteCourse}
        onRetakeCourse={handleRetakeCourse}
        isReadyToEnroll={isReadyToEnroll}
      />

      <Footer isAuthenticated={isAuthenticated} />

      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onOpenSignUp={() => {}}
        />
      )}

      {isProfileOpen && (
        <ProfileModal
          onClose={() => setIsProfileOpen(false)}
          profileData={profileData}
          onSave={handleSaveProfile}
        />
      )}

      {isCompleteProfilePromptOpen && (
        <CompleteProfilePromptModal
          onClose={() => setIsCompleteProfilePromptOpen(false)}
          onCompleteProfile={() => {
            setIsCompleteProfilePromptOpen(false);
            setIsProfileOpen(true);
          }}
        />
      )}

      {isEnrollmentConflictOpen && (
        <EnrollmentConflictModal
          onClose={() => setIsEnrollmentConflictOpen(false)}
          onContinue={handleContinueAnyway}
        />
      )}

      {isEnrollmentConfirmedOpen && (
        <EnrollmentConfirmedModal
          onClose={handleConfirmEnrollment}
          onDone={handleConfirmEnrollment}
        />
      )}

      {isCongratulationsOpen && (
        <CongratulationsModal
          onClose={() => setIsCongratulationsOpen(false)}
          onDone={() => setIsCongratulationsOpen(false)}
        />
      )}
    </div>
  );
}