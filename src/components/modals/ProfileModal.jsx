import { useMemo, useRef, useState } from "react";
import ModalShell from "../common/ModalShell";

function normalizeMobile(value) {
  return value.replace(/\s/g, "");
}

function formatMobileDisplay(value) {
  const digits = value.replace(/\D/g, "").slice(0, 9);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

function validateFullName(value) {
  const trimmed = value.trim();

  if (!trimmed) return "Name is required";
  if (trimmed.length < 3) return "Name must be at least 3 characters";
  if (trimmed.length > 50) return "Name must not exceed 50 characters";

  return "";
}

function validateMobileNumber(value) {
  const digits = normalizeMobile(value);

  if (!digits) return "Mobile number is required";
  if (!/^\d+$/.test(digits)) {
    return "Please enter a valid Georgian mobile number (9 digits starting with 5)";
  }
  if (!digits.startsWith("5")) {
    return "Georgian mobile numbers must start with 5";
  }
  if (digits.length !== 9) {
    return "Mobile number must be exactly 9 digits";
  }

  return "";
}

function validateAge(value) {
  const trimmed = String(value).trim();

  if (!trimmed) return "Age is required";
  if (!/^\d+$/.test(trimmed)) return "Age must be a number";

  const ageNumber = Number(trimmed);

  if (ageNumber < 16) return "You must be at least 16 years old to enroll";
  if (ageNumber > 120) return "Please enter a valid age";

  return "";
}

function inputClass(hasError, isValid, extra = "") {
  if (hasError) return `border border-[#E45A5A] ${extra}`;
  if (isValid) return `border border-[#23C12F] ${extra}`;
  return `border border-[#bfbfbf] ${extra}`;
}

export default function ProfileModal({ onClose, profileData, onSave }) {
  const [formData, setFormData] = useState({
    fullName: profileData?.fullName || "",
    email: profileData?.email || "user@gmail.com",
    mobileNumber: profileData?.mobileNumber || "",
    age: profileData?.age || "",
    avatar: profileData?.avatar || "",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    mobileNumber: false,
    age: false,
  });

  const [avatarError, setAvatarError] = useState("");
  const fileInputRef = useRef(null);

  const errors = useMemo(() => {
    return {
      fullName: validateFullName(formData.fullName),
      mobileNumber: validateMobileNumber(formData.mobileNumber),
      age: validateAge(formData.age),
    };
  }, [formData]);

  const isValid = !errors.fullName && !errors.mobileNumber && !errors.age && !avatarError;

  const isProfileComplete =
    formData.fullName.trim().length >= 3 &&
    /^5\d{8}$/.test(normalizeMobile(formData.mobileNumber)) &&
    /^\d+$/.test(String(formData.age).trim()) &&
    Number(formData.age) >= 16 &&
    Number(formData.age) <= 120;

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleChange = (field, value) => {
    if (field === "mobileNumber") {
      setFormData((prev) => ({
        ...prev,
        mobileNumber: formatMobileDisplay(value),
      }));
      return;
    }

    if (field === "age") {
      setFormData((prev) => ({
        ...prev,
        age: value.replace(/\D/g, "").slice(0, 3),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      fullName: true,
      mobileNumber: true,
      age: true,
    });

    if (!isValid) return;

    onSave({
      ...formData,
      mobileNumber: formatMobileDisplay(formData.mobileNumber),
    });
  };

  return (
    <ModalShell
      onClose={onClose}
      widthClass="w-[24%] min-w-[27rem]"
      minHeightClass="min-h-[36.5vw]"
    >
      <div className="pt-[1.8%] text-center">
        <h2 className="text-[2.2vw] font-semibold leading-none text-[#141414]">
          Profile
        </h2>
      </div>

      <div className="mt-[4.2%] flex items-center gap-[3%]">
        <div className="relative w-[12.5%]">
          <img
            src={formData.avatar || "/instructor.png"}
            alt="User avatar"
            className="w-full rounded-full"
          />
          <span
            className={`absolute bottom-[2%] right-[2%] h-[0.62vw] w-[0.62vw] rounded-full ${
              isProfileComplete ? "bg-[#23c12f]" : "bg-[#F0B100]"
            }`}
          />
        </div>

        <div>
          <h3 className="text-[1.55vw] font-semibold leading-none text-[#141414]">
            Username
          </h3>
          <p
            className={`mt-[6%] text-[0.88vw] ${
              isProfileComplete ? "text-[#23c12f]" : "text-[#F0B100]"
            }`}
          >
            {isProfileComplete ? "Profile is Complete" : "Profile is Incomplete"}
          </p>
        </div>
      </div>

      <form className="mt-[4.3%]" onSubmit={handleSubmit}>
        <div>
          <label className="mb-[1.5%] block text-[0.98vw] font-medium text-[#3a3a3a]">
            Full Name
          </label>

          <div className="relative">
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              onBlur={() => handleBlur("fullName")}
              placeholder="Username"
              className={`h-[2.8vw] w-full rounded-[0.55vw] px-[3.5%] pr-[11%] text-[1vw] text-[#141414] outline-none placeholder:text-[#b1b1b1] ${inputClass(
                touched.fullName && !!errors.fullName,
                touched.fullName && !errors.fullName
              )}`}
            />

            <img
              src="/PencilSimple.png"
              alt="Edit"
              className="absolute right-[4%] top-1/2 w-[1vw] -translate-y-1/2"
            />
          </div>

          {touched.fullName && errors.fullName && (
            <p className="mt-[1.2%] text-[0.78vw] text-[#E45A5A]">
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="mt-[3.4%]">
          <label className="mb-[1.5%] block text-[0.98vw] font-medium text-[#3a3a3a]">
            Email
          </label>

          <div className="relative">
            <input
              type="email"
              value={formData.email}
              disabled
              className="h-[2.8vw] w-full rounded-[0.55vw] border border-[#bfbfbf] bg-white px-[3.5%] pr-[11%] text-[1vw] text-[#141414] outline-none"
            />

            <span className="absolute right-[4%] top-1/2 -translate-y-1/2 text-[1vw] text-[#23C12F]">
              ✓
            </span>
          </div>
        </div>

        <div className="mt-[3.4%] flex gap-[3%]">
          <div className="flex-[1.45]">
            <label className="mb-[1.5%] block text-[0.98vw] font-medium text-[#3a3a3a]">
              Mobile Number
            </label>

            <div className="relative">
              <input
                type="text"
                value={formData.mobileNumber}
                onChange={(e) => handleChange("mobileNumber", e.target.value)}
                onBlur={() => handleBlur("mobileNumber")}
                placeholder="555 123 456"
                className={`h-[2.8vw] w-full rounded-[0.55vw] px-[3.5%] pr-[11%] text-[1vw] text-[#141414] outline-none placeholder:text-[#b1b1b1] ${inputClass(
                  touched.mobileNumber && !!errors.mobileNumber,
                  touched.mobileNumber && !errors.mobileNumber
                )}`}
              />

              <span
                className={`absolute right-[4%] top-1/2 -translate-y-1/2 text-[1vw] ${
                  touched.mobileNumber && !errors.mobileNumber
                    ? "text-[#23C12F]"
                    : "text-[#b0b0b0]"
                }`}
              >
                ✓
              </span>
            </div>

            {touched.mobileNumber && errors.mobileNumber && (
              <p className="mt-[1.2%] text-[0.78vw] text-[#E45A5A]">
                {errors.mobileNumber}
              </p>
            )}
          </div>

          <div className="flex-[0.45]">
            <label className="mb-[1.5%] block text-[0.98vw] font-medium text-[#3a3a3a]">
              Age
            </label>

            <div className="relative">
              <input
                type="text"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                onBlur={() => handleBlur("age")}
                placeholder="29"
                className={`h-[2.8vw] w-full rounded-[0.55vw] px-[18%] pr-[26%] text-[1vw] text-[#141414] outline-none placeholder:text-[#b1b1b1] ${inputClass(
                  touched.age && !!errors.age,
                  touched.age && !errors.age
                )}`}
              />

              <span className="absolute right-[12%] top-1/2 -translate-y-1/2 text-[1vw] text-[#b0b0b0]">
                ˅
              </span>
            </div>

            {touched.age && errors.age && (
              <p className="mt-[1.2%] text-[0.78vw] text-[#E45A5A]">
                {errors.age}
              </p>
            )}
          </div>
        </div>

        <div className="mt-[3.7%]">
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

          <div className="flex h-[7.4vw] w-full flex-col items-center justify-center rounded-[0.55vw] border border-[#cfcfcf] text-center">
            {formData.avatar ? (
              <img
                src={formData.avatar}
                alt="Preview"
                className="mb-[2%] h-[3.2vw] w-[3.2vw] rounded-full object-cover"
              />
            ) : (
              <img
                src="/upload_icon.png"
                alt="Upload"
                className="w-[1.8vw]"
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

        <button
          type="submit"
          disabled={!isValid}
          className={`mt-[4.1%] flex h-[3vw] w-full items-center justify-center rounded-[0.55vw] text-[1.08vw] font-medium ${
            isValid
              ? "bg-[#4F46E5] text-white hover:bg-[#4338ca]"
              : "bg-[#d9d5fb] text-[#a9a2f8]"
          }`}
        >
          Save Profile
        </button>
      </form>
    </ModalShell>
  );
}