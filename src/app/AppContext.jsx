import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../api/auth.service";
import { profileService } from "../api/profile.service";
import { enrollmentsService } from "../api/enrollments.service";
import { setToken } from "../api/client";

const AppContext = createContext(null);

const STORAGE_KEYS = {
  currentUser: "redbery_user",
  profile: "redbery_profile",
  selectedCourse: "redbery_selected_course",
};

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Storage save failed for ${key}:`, error);
  }
}

function normalizeEnrollment(item) {
  const course = item?.course || item?.course_data || {};

  return {
    id: item?.id,
    courseId:
      item?.courseId ||
      item?.course_id ||
      course?.id ||
      item?.id,
    title:
      item?.title ||
      course?.title ||
      "Untitled Course",
    image:
      item?.image ||
      course?.image ||
      course?.thumbnail ||
      "/course.png",
    instructor:
      item?.instructor ||
      course?.instructor?.name ||
      course?.instructor ||
      "Unknown",
    weeklySchedule:
      item?.weeklySchedule ||
      item?.weekly_schedule ||
      item?.schedule ||
      "",
    timeSlot:
      item?.timeSlot ||
      item?.time_slot ||
      "",
    sessionType:
      item?.sessionType ||
      item?.session_type ||
      "",
    location:
      item?.location ||
      "",
    sessionModifier:
      item?.sessionModifier ||
      item?.session_modifier ||
      0,
    totalPrice:
      item?.totalPrice ||
      item?.total_price ||
      course?.price ||
      0,
    progress:
      item?.progress ??
      item?.completion_percentage ??
      0,
    rating:
      item?.rating ??
      0,
    raw: item,
  };
}

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() =>
    readStorage(STORAGE_KEYS.currentUser, null)
  );

  const [profileData, setProfileData] = useState(() =>
    readStorage(STORAGE_KEYS.profile, {
      fullName: "",
      email: "",
      mobileNumber: "",
      age: "",
      avatar: "",
    })
  );

  const [selectedCourse, setSelectedCourse] = useState(() =>
    readStorage(STORAGE_KEYS.selectedCourse, null)
  );

  const [enrollments, setEnrollments] = useState([]);
  const [isEnrollmentsLoading, setIsEnrollmentsLoading] = useState(false);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.currentUser, currentUser);
  }, [currentUser]);

  useEffect(() => {
    const { avatar, ...profileWithoutAvatar } = profileData;
    safeSetItem(STORAGE_KEYS.profile, profileWithoutAvatar);
  }, [profileData]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.selectedCourse, selectedCourse);
  }, [selectedCourse]);

  const isAuthenticated = !!currentUser;

  const isProfileComplete =
    profileData.fullName.trim().length >= 3 &&
    /^5\d{8}$/.test(profileData.mobileNumber.replace(/\s/g, "")) &&
    /^\d+$/.test(String(profileData.age).trim()) &&
    Number(profileData.age) >= 16 &&
    Number(profileData.age) <= 120;

  const loadEnrollments = async () => {
    if (!isAuthenticated) {
      setEnrollments([]);
      return [];
    }

    setIsEnrollmentsLoading(true);

    try {
      const data = await enrollmentsService.getEnrollments();
      const list = Array.isArray(data) ? data : data?.data || [];
      const normalized = list.map(normalizeEnrollment);
      setEnrollments(normalized);
      return normalized;
    } catch (error) {
      console.error("Failed to load enrollments:", error);
      setEnrollments([]);
      return [];
    } finally {
      setIsEnrollmentsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadEnrollments();
    } else {
      setEnrollments([]);
    }
  }, [isAuthenticated]);

  const register = async (formData) => {
    const payload = {
      username: formData.username.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      password_confirmation: formData.confirmPassword,
    };

    const data = await authService.register(payload);

    const token =
      data?.token ||
      data?.access_token ||
      data?.data?.token ||
      data?.data?.access_token;

    if (!token) {
      throw new Error("Register response did not include token");
    }

    setToken(token);

    const me = await authService.me();

    setCurrentUser(me);
    setProfileData((prev) => ({
      ...prev,
      email: me.email || payload.email,
      fullName: prev.fullName || payload.username,
    }));

    await loadEnrollments();

    return data;
  };

  const login = async (formData) => {
    const payload = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    const data = await authService.login(payload);

    const token =
      data?.token ||
      data?.access_token ||
      data?.data?.token ||
      data?.data?.access_token;

    if (!token) {
      throw new Error("Login response did not include token");
    }

    setToken(token);

    const me = await authService.me();

    setCurrentUser(me);
    setProfileData((prev) => ({
      ...prev,
      email: me.email || payload.email,
    }));

    await loadEnrollments();

    return data;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.warn(error);
    }

    setToken(null);
    setCurrentUser(null);
    setEnrollments([]);
  };

  const saveProfile = async (newProfileData) => {
    const payload = {
      full_name: newProfileData.fullName,
      mobile_number: newProfileData.mobileNumber,
      age: Number(newProfileData.age),
    };

    const data = await profileService.updateProfile(payload);

    setProfileData((prev) => ({
      ...prev,
      ...newProfileData,
      email: prev.email,
    }));

    return data;
  };

  const addEnrollment = async (enrollment) => {
  const payload = {
    courseId: enrollment.courseId,
    courseScheduleId: enrollment.courseScheduleId,
  };

  console.log("POST /enrollments payload:", payload);

  const data = await enrollmentsService.createEnrollment(payload);

  await loadEnrollments();

  return data;
};

  const completeEnrollment = async (courseId) => {
    const enrollmentToComplete = enrollments.find(
      (item) => item.courseId === courseId
    );

    if (!enrollmentToComplete?.id) {
      console.warn("Enrollment id not found for course:", courseId);
      return;
    }

    const data = await enrollmentsService.completeEnrollment(
      enrollmentToComplete.id
    );

    await loadEnrollments();

    return data;
  };

  const updateEnrollmentRating = (courseId, rating) => {
    setEnrollments((prev) =>
      prev.map((item) =>
        item.courseId === courseId ? { ...item, rating } : item
      )
    );
  };

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      isAuthenticated,
      profileData,
      setProfileData,
      isProfileComplete,
      selectedCourse,
      setSelectedCourse,
      enrollments,
      setEnrollments,
      isEnrollmentsLoading,
      loadEnrollments,
      register,
      login,
      logout,
      saveProfile,
      addEnrollment,
      completeEnrollment,
      updateEnrollmentRating,
    }),
    [
      currentUser,
      isAuthenticated,
      profileData,
      isProfileComplete,
      selectedCourse,
      enrollments,
      isEnrollmentsLoading,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}