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

export default function SignUpModal({
  step,
  setStep,
  onClose,
  onOpenLogin,
}) {
  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const minHeightClass =
    step === 1
      ? "min-h-[21.67vw]"
      : step === 2
      ? "min-h-[26.72vw]"
      : "min-h-[32.4vw]";

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
            placeholder="you@example.com"
            className="h-[3vw] w-full rounded-[0.55vw] border border-[#cfcfcf] px-[3.5%] text-[1vw] text-[#141414] outline-none placeholder:text-[#a1a1a1]"
          />

          <button
            type="button"
            onClick={() => setStep(2)}
            className="mt-[4.8%] flex h-[3.15vw] w-full items-center justify-center rounded-[0.55vw] bg-[#4F46E5] text-[1.08vw] font-medium text-white hover:bg-[#4338ca]"
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
                type="password"
                placeholder="Password"
                className="h-[3vw] w-full rounded-[0.55vw] border border-[#cfcfcf] px-[3.5%] pr-[11%] text-[1vw] text-[#141414] outline-none placeholder:text-[#a1a1a1]"
              />
              <span className="absolute right-[4%] top-1/2 -translate-y-1/2 text-[1vw] text-[#b0b0b0]">
                ◉
              </span>
            </div>
          </div>

          <div className="mt-[4%]">
            <label className="mb-[1.5%] block text-[0.98vw] font-medium text-[#3a3a3a]">
              Confirm Password*
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                className="h-[3vw] w-full rounded-[0.55vw] border border-[#cfcfcf] px-[3.5%] pr-[11%] text-[1vw] text-[#141414] outline-none placeholder:text-[#a1a1a1]"
              />
              <span className="absolute right-[4%] top-1/2 -translate-y-1/2 text-[1vw] text-[#b0b0b0]">
                ◡
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStep(3)}
            className="mt-[4.8%] flex h-[3.15vw] w-full items-center justify-center rounded-[0.55vw] bg-[#4F46E5] text-[1.08vw] font-medium text-white hover:bg-[#4338ca]"
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
              placeholder="Username"
              className="h-[3vw] w-full rounded-[0.55vw] border border-[#cfcfcf] px-[3.5%] text-[1vw] text-[#141414] outline-none placeholder:text-[#a1a1a1]"
            />
          </div>

          <div className="mt-[4.2%]">
            <label className="mb-[1.5%] block text-[0.98vw] font-medium text-[#3a3a3a]">
              Upload Avatar
            </label>

            <div className="flex h-[7.5vw] w-full flex-col items-center justify-center rounded-[0.55vw] border border-[#cfcfcf] text-center">
              <img
                src="/upload_icon.png"
                alt="Upload"
                className="w-[2.1vw]"
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
            type="button"
            className="mt-[4.8%] flex h-[3.15vw] w-full items-center justify-center rounded-[0.55vw] bg-[#4F46E5] text-[1.08vw] font-medium text-white hover:bg-[#4338ca]"
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