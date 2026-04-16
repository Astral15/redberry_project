import { useMemo, useState } from "react";
import ModalShell from "../common/ModalShell";

function validateEmail(value) {
  const trimmed = value.trim();

  if (!trimmed) return "Email is required";
  if (trimmed.length < 3) return "Email must be at least 3 characters";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Please enter a valid email address";
  }

  return "";
}

function validatePassword(value) {
  if (!value) return "Password is required";
  if (value.length < 3) return "Password must be at least 3 characters";
  return "";
}

function inputClass(hasError, isValid) {
  if (hasError) return "border border-[#E45A5A]";
  if (isValid) return "border border-[#23C12F]";
  return "border border-[#cfcfcf]";
}

export default function LoginModal({
  onClose,
  onOpenSignUp,
  onLoginSuccess,
  apiError = "",
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const errors = useMemo(() => {
    return {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };
  }, [formData]);

  const isValid = !errors.email && !errors.password;

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      email: true,
      password: true,
    });

    if (!isValid) return;

    try {
      const success = onLoginSuccess ? await onLoginSuccess(formData) : true;

      if (success !== false) {
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalShell
      onClose={onClose}
      widthClass="w-[24%] min-w-[27rem]"
      minHeightClass="min-h-[25.1vw]"
    >
      <div className="pt-[1.8%] text-center">
        <h2 className="text-[2.2vw] font-semibold leading-none text-[#141414]">
          Welcome Back
        </h2>
        <p className="mt-[2.2%] text-[1vw] text-[#666666]">
          Log in to continue your learning
        </p>
      </div>

      <form className="mt-[5.2%]" onSubmit={handleSubmit}>
        <div>
          <label className="mb-[1.5%] block text-[0.98vw] font-medium text-[#3a3a3a]">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="you@example.com"
            className={`h-[3vw] w-full rounded-[0.55vw] px-[3.5%] text-[1vw] text-[#141414] outline-none placeholder:text-[#a1a1a1] ${inputClass(
              touched.email && !!errors.email,
              touched.email && !errors.email
            )}`}
          />
          {touched.email && errors.email && (
            <p className="mt-[1.2%] text-[0.78vw] text-[#E45A5A]">
              {errors.email}
            </p>
          )}
        </div>

        <div className="mt-[4%]">
          <label className="mb-[1.5%] block text-[0.98vw] font-medium text-[#3a3a3a]">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={() => handleBlur("password")}
              placeholder="••••••••"
              className={`h-[3vw] w-full rounded-[0.55vw] px-[3.5%] pr-[11%] text-[1vw] text-[#141414] outline-none placeholder:text-[#a1a1a1] ${inputClass(
                touched.password && !!errors.password,
                touched.password && !errors.password
              )}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-[4%] top-1/2 -translate-y-1/2 text-[1vw] text-[#b0b0b0]"
            >
              {showPassword ? "◡" : "◉"}
            </button>
          </div>
          {touched.password && errors.password && (
            <p className="mt-[1.2%] text-[0.78vw] text-[#E45A5A]">
              {errors.password}
            </p>
          )}
        </div>

        {apiError && (
          <p className="mt-[2%] text-[0.82vw] text-[#E45A5A]">
            {apiError}
          </p>
        )}

        <button
          type="submit"
          disabled={!isValid}
          className={`mt-[4.8%] flex h-[3.15vw] w-full items-center justify-center rounded-[0.55vw] text-[1.08vw] font-medium ${
            isValid
              ? "bg-[#4F46E5] text-white hover:bg-[#4338ca]"
              : "bg-[#d9d5fb] text-[#a9a2f8]"
          }`}
        >
          Log In
        </button>
      </form>

      <div className="mt-[4.8%]">
        <div className="flex items-center justify-center gap-[3%]">
          <span className="h-[0.05vw] w-[41%] bg-[#dddddd]" />
          <span className="text-[0.95vw] text-[#888888]">or</span>
          <span className="h-[0.05vw] w-[41%] bg-[#dddddd]" />
        </div>

        <p className="mt-[3.2%] text-center text-[0.95vw] text-[#666666]">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={onOpenSignUp}
            className="font-medium text-[#141414] underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </ModalShell>
  );
}