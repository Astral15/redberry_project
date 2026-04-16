import { useEffect, useMemo, useState } from "react";
import { useApp } from "../app/AppContext";
import { coursesService } from "../api/courses.service";
import { scheduleService } from "../api/schedule.service";
import { reviewsService } from "../api/reviews.service";

import Navbar from "../components/layout/Navbar";
import NavbarGuest from "../components/layout/NavbarGuest";
import Footer from "../components/layout/Footer";
import CourseDetailsLayout from "../components/course/CourseDetailsLayout";

import EnrolledCoursesSidebar from "../components/sidebar/EnrolledCoursesSidebar";
import LoginModal from "../components/modals/LoginModal";
import ProfileModal from "../components/modals/ProfileModal";
import CompleteProfilePromptModal from "../components/modals/CompleteProfilePromptModal";
import EnrollmentConfirmedModal from "../components/modals/EnrollmentConfirmedModal";
import EnrollmentConflictModal from "../components/modals/EnrollmentConflictModal";
import CongratulationsModal from "../components/modals/CongratulationsModal";
import SignUpModal from "../components/modals/SignUpModal";

function normalizeCourse(course, fallbackCourse) {
  return {
    id: course?.id ?? fallbackCourse?.courseId ?? fallbackCourse?.id ?? 1,
    courseId: course?.id ?? fallbackCourse?.courseId ?? fallbackCourse?.id ?? 1,
    title: course?.title || fallbackCourse?.title || "Untitled Course",
    instructor:
      course?.instructor?.name ||
      course?.instructor ||
      fallbackCourse?.instructor ||
      "Unknown",
    image:
      course?.image ||
      course?.thumbnail ||
      fallbackCourse?.image ||
      "/course.png",
    price: course?.price ?? fallbackCourse?.price ?? 349,
    rating: course?.rating ?? fallbackCourse?.rating ?? 4.9,
    description: course?.description || fallbackCourse?.description || "No description available.",
    duration: course?.duration || fallbackCourse?.duration || "12 Weeks",
    hours: course?.hours || course?.total_hours || fallbackCourse?.hours || "128 Hours",
    category:
      course?.category?.name ||
      course?.category ||
      fallbackCourse?.category ||
      "Development",
    instructorData: course?.instructor || null,
    raw: course,
  };
}

function normalizeWeeklySchedule(item) {
  return {
    id: item?.id ?? item?.value ?? item?.name,
    label:
      item?.name ||
      item?.label ||
      item?.title ||
      String(item?.id ?? item),
    raw: item,
  };
}

function normalizeTimeSlot(item) {
  return {
    id: item?.id ?? item?.value ?? item?.label,
    label: item?.label || item?.name || "Time Slot",
    time:
      item?.time ||
      item?.time_range ||
      item?.value ||
      item?.label ||
      "",
    raw: item,
  };
}

function normalizeSessionType(item) {
  console.log("session type raw:", item);

  const label = item?.label || item?.name || item?.title || "Session Type";

  let icon = "/Property 1=Online.png";
  if (/in.?person/i.test(label)) icon = "/Property 1=In Person.png";
  if (/hybrid/i.test(label)) icon = "/Property 1=Hybrid.png";

  return {
    id: item?.id ?? item?.value ?? label,
    label,
    modifier: item?.modifier ?? item?.price_modifier ?? item?.extra_price ?? 0,
    seats:
      item?.seats ??
      item?.available_seats ??
      item?.availableSeats ??
      item?.remaining_seats ??
      999,
    location: item?.location || "",
    icon,
    raw: item,
  };
}

export default function CourseDetailsPage({
  isAuthenticated: initialAuth = false,
  mode = "not_enrolled_guest",
}) {
  const {
    isAuthenticated: contextAuth,
    login,
    register,
    profileData,
    saveProfile,
    isProfileComplete,
    addEnrollment,
    completeEnrollment,
    updateEnrollmentRating,
    enrollments = [],
    selectedCourse,
  } = useApp();

  const isAuthenticated = contextAuth || initialAuth;
  const [signUpStep, setSignUpStep] = useState(1);

  const fallbackCourseId = selectedCourse?.courseId || selectedCourse?.id || 1;

  const [course, setCourse] = useState(
    normalizeCourse(selectedCourse, selectedCourse)
  );
  const [isCourseLoading, setIsCourseLoading] = useState(false);

  const [isEnrolledSidebarOpen, setIsEnrolledSidebarOpen] = useState(false);

  const [weeklySchedules, setWeeklySchedules] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [availableSessionTypes, setAvailableSessionTypes] = useState([]);

  const [selectedWeeklySchedule, setSelectedWeeklySchedule] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedSessionType, setSelectedSessionType] = useState(null);

  const existingEnrollment = enrollments.find(
    (item) => item.courseId === course.courseId
  );

  const [courseRating, setCourseRating] = useState(existingEnrollment?.rating || 0);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCompleteProfilePromptOpen, setIsCompleteProfilePromptOpen] = useState(false);
  const [isEnrollmentConfirmedOpen, setIsEnrollmentConfirmedOpen] = useState(false);
  const [isEnrollmentConflictOpen, setIsEnrollmentConflictOpen] = useState(false);
  const [isCongratulationsOpen, setIsCongratulationsOpen] = useState(false);

  const [currentMode, setCurrentMode] = useState(
    existingEnrollment
      ? existingEnrollment.progress === 100
        ? "completed"
        : "enrolled"
      : mode
  );

  useEffect(() => {
    async function loadCourseDetails() {
      if (!fallbackCourseId) return;

      setIsCourseLoading(true);

      try {
        const data = await coursesService.getCourseById(fallbackCourseId);
        const normalized = normalizeCourse(data?.data ?? data, selectedCourse);
        setCourse(normalized);
      } catch (error) {
        console.error("Failed to load course details:", error);
        setCourse(normalizeCourse(selectedCourse, selectedCourse));
      } finally {
        setIsCourseLoading(false);
      }
    }

    loadCourseDetails();
  }, [fallbackCourseId, selectedCourse]);

  useEffect(() => {
    async function loadWeeklySchedules() {
      if (!course?.courseId) return;

      try {
        const data = await scheduleService.getWeeklySchedules(course.courseId);
        const list = Array.isArray(data) ? data : data?.data || [];
        const normalized = list.map(normalizeWeeklySchedule);
        setWeeklySchedules(normalized);
      } catch (error) {
        console.error("Failed to load weekly schedules:", error);
        setWeeklySchedules([]);
      }
    }

    loadWeeklySchedules();
  }, [course?.courseId]);

  useEffect(() => {
    async function loadTimeSlots() {
      if (!course?.courseId || !selectedWeeklySchedule?.id) {
        setAvailableTimeSlots([]);
        return;
      }

      try {
        const data = await scheduleService.getTimeSlots(
          course.courseId,
          selectedWeeklySchedule.id
        );
        const list = Array.isArray(data) ? data : data?.data || [];
        setAvailableTimeSlots(list.map(normalizeTimeSlot));
      } catch (error) {
        console.error("Failed to load time slots:", error);
        setAvailableTimeSlots([]);
      }
    }

    loadTimeSlots();
  }, [course?.courseId, selectedWeeklySchedule]);

  useEffect(() => {
    async function loadSessionTypes() {
      if (!course?.courseId || !selectedWeeklySchedule?.id || !selectedTimeSlot?.id) {
        setAvailableSessionTypes([]);
        return;
      }

      try {
        const data = await scheduleService.getSessionTypes(
          course.courseId,
          selectedWeeklySchedule.id,
          selectedTimeSlot.id
        );
        const list = Array.isArray(data) ? data : data?.data || [];
        setAvailableSessionTypes(list.map(normalizeSessionType));
      } catch (error) {
        console.error("Failed to load session types:", error);
        setAvailableSessionTypes([]);
      }
    }

    loadSessionTypes();
  }, [course?.courseId, selectedWeeklySchedule, selectedTimeSlot]);

  useEffect(() => {
    if (existingEnrollment) {
      setCurrentMode(existingEnrollment.progress === 100 ? "completed" : "enrolled");
      setCourseRating(existingEnrollment.rating || 0);
    }
  }, [existingEnrollment]);

  const sessionModifier = selectedSessionType?.modifier || 0;
  const totalPrice = (course?.price || 0) + sessionModifier;

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

  const openLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };

  const openSignUp = () => {
    setIsLoginOpen(false);
    setSignUpStep(1);
    setIsSignUpOpen(true);
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

    const hasConflict = enrollments.some(
      (item) =>
        item.courseId !== course.courseId &&
        item.weeklySchedule === selectedWeeklySchedule?.label &&
        item.timeSlot === selectedTimeSlot?.time
    );

    if (hasConflict) {
      setIsEnrollmentConflictOpen(true);
      return;
    }

    setIsEnrollmentConfirmedOpen(true);
  };

 const commitEnrollment = async () => {
  if (!addEnrollment) return;

  const payloadToSend = {
    courseId: course?.courseId || course?.id,
    courseScheduleId: selectedSessionType?.raw?.courseScheduleId,

    title: course.title,
    image: course.image,
    instructor: course.instructor,
    weeklySchedule: selectedWeeklySchedule?.label || "",
    timeSlot: selectedTimeSlot?.time || "",
    sessionType: selectedSessionType?.label || "",
    location: selectedSessionType?.location || "",
    sessionModifier,
    totalPrice,
    progress: 0,
    rating: 0,
  };

  console.log("enrollment payload before context:", payloadToSend);

  try {
    await addEnrollment(payloadToSend);
    setCurrentMode("enrolled");
  } catch (error) {
    console.error("Failed to create enrollment:", error);
    alert(
      error?.data?.message ||
        JSON.stringify(error?.data?.errors || {}) ||
        error?.message ||
        "Enrollment failed"
    );
  }
};

  const handleConfirmEnrollment = async () => {
    setIsEnrollmentConfirmedOpen(false);
    await commitEnrollment();
  };

  const handleContinueAnyway = () => {
    setIsEnrollmentConflictOpen(false);
    setIsEnrollmentConfirmedOpen(true);
  };

  const handleCompleteCourse = async () => {
    try {
      if (completeEnrollment) {
        await completeEnrollment(course.courseId);
      }
      setCurrentMode("completed");
      setIsCongratulationsOpen(true);
    } catch (error) {
      console.error("Failed to complete course:", error);
    }
  };

  const handleRetakeCourse = () => {
    setCurrentMode("enrolled");
  };

  const handleRatingChange = async (value) => {
    setCourseRating(value);

    if (updateEnrollmentRating) {
      updateEnrollmentRating(course.courseId, value);
    }

    try {
      await reviewsService.submitReview(course.courseId, {
        rating: value,
      });
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#111111]">
      {isAuthenticated ? (
        <Navbar
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenEnrolledCourses={() => setIsEnrolledSidebarOpen(true)}
          isProfileComplete={isProfileComplete}
        />
      ) : (
        <NavbarGuest onOpenLogin={openLogin} onOpenSignUp={openSignUp} />
      )}

      <CourseDetailsLayout
        course={course}
        isAuthenticated={isAuthenticated}
        mode={currentMode}
        basePrice={course.price || 0}
        totalPrice={totalPrice}
        sessionModifier={sessionModifier}
        weeklySchedules={weeklySchedules.map((item) => item.label)}
        availableTimeSlots={availableTimeSlots}
        availableSessionTypes={availableSessionTypes}
        selectedWeeklySchedule={selectedWeeklySchedule?.label || null}
        selectedTimeSlot={selectedTimeSlot}
        selectedSessionType={selectedSessionType}
        onSelectWeeklySchedule={(label) => {
          const found = weeklySchedules.find((item) => item.label === label);
          handleSelectWeeklySchedule(found || null);
        }}
        onSelectTimeSlot={handleSelectTimeSlot}
        onSelectSessionType={handleSelectSessionType}
        onEnroll={handleEnroll}
        onCompleteCourse={handleCompleteCourse}
        onRetakeCourse={handleRetakeCourse}
        isReadyToEnroll={isReadyToEnroll}
        courseRating={courseRating}
        onChangeRating={handleRatingChange}
      />

      <Footer isAuthenticated={isAuthenticated} />

      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onOpenSignUp={openSignUp}
          onLoginSuccess={(formData) => login(formData)}
        />
      )}

      {isSignUpOpen && (
        <SignUpModal
          step={signUpStep}
          setStep={setSignUpStep}
          onClose={() => setIsSignUpOpen(false)}
          onOpenLogin={openLogin}
          onSignUpSuccess={async (formData) => {
            try {
              await register(formData);
              return true;
            } catch (error) {
              console.error(error);
              return false;
            }
          }}
        />
      )}

      {isProfileOpen && (
        <ProfileModal
          onClose={() => setIsProfileOpen(false)}
          profileData={profileData}
          onSave={saveProfile}
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
    conflictCourseTitle={
      enrollments.find(
        (item) =>
          item.courseId !== course.courseId &&
          item.weeklySchedule === selectedWeeklySchedule?.label &&
          item.timeSlot === selectedTimeSlot?.time
      )?.title || "another course"
    }
    conflictSchedule={selectedWeeklySchedule?.label || "Selected schedule"}
    conflictTime={selectedTimeSlot?.time || "Selected time"}
  />
)}

      {isEnrollmentConfirmedOpen && (
        <EnrollmentConfirmedModal
          onClose={handleConfirmEnrollment}
          onDone={handleConfirmEnrollment}
          courseTitle={course.title}
        />
      )}

      {isCongratulationsOpen && (
        <CongratulationsModal
          onClose={() => setIsCongratulationsOpen(false)}
          onDone={() => setIsCongratulationsOpen(false)}
          rating={courseRating}
          onChangeRating={handleRatingChange}
          courseTitle={course.title}
        />
      )}
      
      <EnrolledCoursesSidebar
        isOpen={isEnrolledSidebarOpen}
        onClose={() => setIsEnrolledSidebarOpen(false)}
        isEmpty={enrollments.length === 0}
        enrollments={enrollments}
      />

      {isCourseLoading && (
        <div className="fixed bottom-[2%] right-[2%] rounded-[0.5vw] bg-white px-[1.2vw] py-[0.8vw] text-[0.9vw] text-[#666666] shadow-[0_0.15vw_0.6vw_rgba(0,0,0,0.08)]">
          Loading course...
        </div>
      )}
    </div>
  );
}