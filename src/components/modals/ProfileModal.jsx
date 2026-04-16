import { useState } from "react";
import ModalShell from "../common/ModalShell";

export default function ProfileModal({ onClose, profileData, onSave }) {
  const [formData, setFormData] = useState(profileData);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
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
            src="/instructor.png"
            alt="User avatar"
            className="w-full rounded-full"
          />
          <span className="absolute bottom-[2%] right-[2%] h-[0.62vw] w-[0.62vw] rounded-full bg-[#23c12f]" />
        </div>

        <div>
          <h3 className="text-[1.55vw] font-semibold leading-none text-[#141414]">
            Username
          </h3>
          <p className="mt-[6%] text-[0.88vw] text-[#23c12f]">
            Profile is Complete
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
              placeholder="Username"
              className="h-[2.8vw] w-full rounded-[0.55vw] border border-[#bfbfbf] px-[3.5%] pr-[11%] text-[1vw] text-[#141414] outline-none placeholder:text-[#b1b1b1]"
            />
            <img
              src="/PencilSimple.png"
              alt="Edit"
              className="absolute right-[4%] top-1/2 w-[1vw] -translate-y-1/2"
            />
          </div>
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
            <span className="absolute right-[4%] top-1/2 -translate-y-1/2 text-[1vw] text-[#b0b0b0]">
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
                placeholder="+995 599209820"
                className="h-[2.8vw] w-full rounded-[0.55vw] border border-[#bfbfbf] px-[3.5%] pr-[11%] text-[1vw] text-[#141414] outline-none placeholder:text-[#b1b1b1]"
              />
              <span className="absolute right-[4%] top-1/2 -translate-y-1/2 text-[1vw] text-[#b0b0b0]">
                ✓
              </span>
            </div>
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
                placeholder="29"
                className="h-[2.8vw] w-full rounded-[0.55vw] border border-[#bfbfbf] px-[18%] pr-[26%] text-[1vw] text-[#141414] outline-none placeholder:text-[#b1b1b1]"
              />
              <span className="absolute right-[12%] top-1/2 -translate-y-1/2 text-[1vw] text-[#b0b0b0]">
                ˅
              </span>
            </div>
          </div>
        </div>

        <div className="mt-[3.7%]">
          <label className="mb-[1.5%] block text-[0.98vw] font-medium text-[#3a3a3a]">
            Upload Avatar
          </label>

          <div className="flex h-[7.4vw] w-full flex-col items-center justify-center rounded-[0.55vw] border border-[#cfcfcf] text-center">
            <img
              src="/upload_icon.png"
              alt="Upload"
              className="w-[1.8vw]"
            />
            <p className="mt-[2%] text-[0.98vw] text-[#666666]">
              Drag and drop or{" "}
              <span className="font-medium text-[#4F46E5] underline">
                Upload file
              </span>
            </p>
            <p className="mt-[1%] text-[0.78vw] text-[#b0b0b0]">
              JPG, PNG or WebP
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="mt-[4.1%] flex h-[3vw] w-full items-center justify-center rounded-[0.55vw] bg-[#4F46E5] text-[1.08vw] font-medium text-white hover:bg-[#4338ca]"
        >
          Save Profile
        </button>
      </form>
    </ModalShell>
  );
}