import { useMemo, useRef, useState } from "react";
import ModalShell from "../common/ModalShell";

function StepBars({ step }) {
  return (
    <div className="mt-[5%] flex items-center gap-[2%]">
      <span
        className={`h-[0.38vw] flex-1 rounded-full ${
          step >= 1 ? "bg-[#4F46E5]" : "bg-[#d9d5fb]"
        }`}
      />
      <span
        className={`h-[0.38vw] flex-1 rounded-full ${
          step >= 2 ? "bg-[#4F46E5]" : "bg-[#d9d5fb]"
        }`}
      />
      <span
        className={`h-[0.38vw] flex-1 rounded-full ${
          step >= 3 ? "bg-[#4F46E5]" : "bg-[#d9d5fb]"
        }`}
      />
    </div>
  );
}

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

function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return "Confirm Password is required";
  if (confirmPassword !== password) return "Passwords do not match";
  return "";
}

function validateUsername(value) {
  const trimmed = value.trim();

  if (!trimmed) return "Username is required";
  if (trimmed.length < 3) return "Username must be at least 3 characters";
  return "";
}

function inputClass(hasError, isValid) {
  if (hasError) return "border border-[#E45A5A]";
  if (isValid) return "border border-[#23C12F]";
  return "border border-[#cfcfcf]";
}

export default function SignUpModal({
  step,
  setStep,
  onClose,
  onOpenLogin,
  onSignUpSuccess,
  apiError = "",
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    avatar: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    username: false,
  });

  const [avatarError, setAvatarError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef(null);

  const errors = useMemo(() => {
    return {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      ),
      username: validateUsername(formData.username),
    };
  }, [formData]);

  const step1Valid = !errors.email;
  const step2Valid = !errors.password && !errors.confirmPassword;
  const step3Valid = !errors.username && !avatarError;
  const allValid = step1Valid && step2Valid && step3Valid;

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const minHeightClass =
    step === 1
      ? "min-h-[21.67vw]"
      : step === 2
      ? "min-h-[26.72vw]"
      : "min-h-[32.4vw]";

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleNextFromStep1 = () => {
    setTouched((prev) => ({ ...prev, email: true }));
    if (step1Valid) setStep(2);
  };

  const handleNextFromStep2 = () => {
    setTouched((prev) => ({
      ...prev,
      password: true,
      confirmPassword: true,
    }));
    if (step2Valid) setStep(3);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setAvatarError("Please upload a JPG, PNG or WebP image");
      return;
    }

    setAvatarError("");

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
      username: true,
    });

    if (!allValid) return;

    try {
      const success = onSignUpSuccess ? await onSignUpSuccess(formData) : true;

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
      onBack={goBack}
      showBack={step > 1}
      widthClass="w-[24%] min-w-[27rem]"
      minHeightClass={minHeightClass}
    >
      <div className="pt-[1.8%] text-center">
        <h2 className="text-[2.2vw] font-semibold leading-none text-[#141414]">
          Create Account
        </h2>
        <p className="mt-[2.2%] text-[1vw] text-[#666666]">
          Join and start learning today
        </p>
      </div>

      <StepBars step={step} />

      {step === 1 && (
        <div className="mt-[5.2%]">
          <label className="mb-[1.5%] block text-[0.98vw] font-medium text-[#3a3a3a]">
            Email*
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

          <button
            type="button"
            onClick={handleNextFromStep1}
            className={`mt-[4.8%] flex h-[3.15vw] w-full items-center justify-center rounded-[0.55vw] text-[1.08vw] font-medium ${
              step1Valid
                ? "bg-[#4F46E5] text-white hover:bg-[#4338ca]"
                : "bg-[#d9d5fb] text-[#a9a2f8]"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="mt-[5.2%]">
          <div>
            <label className="mb-[1.5%] block text-[0.98vw] font-medium text-[#3a3a3a]">
              Password*
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                placeholder="Password"
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

          <div className="mt-[4%]">
            <label className="mb-[1.5%] block text-[0.98vw] font-medium text-[#3a3a3a]">
              Confirm Password*
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                onBlur={() => handleBlur("confirmPassword")}
                placeholder="••••••••"
                className={`h-[3vw] w-full rounded-[0.55vw] px-[3.5%] pr-[11%] text-[1vw] text-[#141414] outline-none placeholder:text-[#a1a1a1] ${inputClass(
                  touched.confirmPassword && !!errors.confirmPassword,
                  touched.confirmPassword && !errors.confirmPassword
                )}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-[4%] top-1/2 -translate-y-1/2 text-[1vw] text-[#b0b0b0]"
              >
                {showConfirmPassword ? "◡" : "◉"}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="mt-[1.2%] text-[0.78vw] text-[#E45A5A]">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleNextFromStep2}
            className={`mt-[4.8%] flex h-[3.15vw] w-full items-center justify-center rounded-[0.55vw] text-[1.08vw] font-medium ${
              step2Valid
                ? "bg-[#4F46E5] text-white hover:bg-[#4338ca]"
                : "bg-[#d9d5fb] text-[#a9a2f8]"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="mt-[5.2%]">
          <div>
            <label className="mb-[1.5%] block text-[0.98vw] font-medium text-[#3a3a3a]">
              Username*
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              onBlur={() => handleBlur("username")}
              placeholder="Username"
              className={`h-[3vw] w-full rounded-[0.55vw] px-[3.5%] text-[1vw] text-[#141414] outline-none placeholder:text-[#a1a1a1] ${inputClass(
                touched.username && !!errors.username,
                touched.username && !errors.username
              )}`}
            />
            {touched.username && errors.username && (
              <p className="mt-[1.2%] text-[0.78vw] text-[#E45A5A]">
                {errors.username}
              </p>
            )}
          </div>

          <div className="mt-[4.2%]">
            <label className="mb-[1.5%] block text-[0.98vw] font-medium text-[#3a3a3a]">
              Upload Avatar
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleAvatarChange}
              className="hidden"
            />

            <div className="flex h-[7.5vw] w-full flex-col items-center justify-center rounded-[0.55vw] border border-[#cfcfcf] text-center">
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="Preview"
                  className="mb-[2%] h-[3vw] w-[3vw] rounded-full object-cover"
                />
              ) : (
                <img
                  src="/upload_icon.png"
                  alt="Upload"
                  className="w-[2.1vw]"
                />
              )}

              <p className="mt-[2%] text-[0.98vw] text-[#666666]">
                Drag and drop or{" "}
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  className="font-medium text-[#4F46E5] underline"
                >
                  Upload file
                </button>
              </p>

              <p className="mt-[1%] text-[0.78vw] text-[#b0b0b0]">
                JPG, PNG or WebP
              </p>
            </div>

            {avatarError && (
              <p className="mt-[1.2%] text-[0.78vw] text-[#E45A5A]">
                {avatarError}
              </p>
            )}
          </div>

          {apiError && (
            <p className="mt-[2%] text-[0.82vw] text-[#E45A5A]">
              {apiError}
            </p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className={`mt-[4.8%] flex h-[3.15vw] w-full items-center justify-center rounded-[0.55vw] text-[1.08vw] font-medium ${
              allValid
                ? "bg-[#4F46E5] text-white hover:bg-[#4338ca]"
                : "bg-[#d9d5fb] text-[#a9a2f8]"
            }`}
          >
            Sign Up
          </button>
        </div>
      )}

      <div className="mt-[4.8%]">
        <div className="flex items-center justify-center gap-[3%]">
          <span className="h-[0.05vw] w-[41%] bg-[#dddddd]" />
          <span className="text-[0.95vw] text-[#888888]">or</span>
          <span className="h-[0.05vw] w-[41%] bg-[#dddddd]" />
        </div>

        <p className="mt-[3.2%] text-center text-[0.95vw] text-[#666666]">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onOpenLogin}
            className="font-medium text-[#141414] underline"
          >
            Log In
          </button>
        </p>
      </div>
    </ModalShell>
  );
}