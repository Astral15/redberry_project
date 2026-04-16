import ModalShell from "../common/ModalShell";

export default function CompleteProfilePromptModal({
  onClose,
  onCompleteProfile,
}) {
  return (
    <ModalShell
      onClose={onClose}
      widthClass="w-[24%] min-w-[27rem]"
      minHeightClass="min-h-[25vw]"
    >
      <div className="flex flex-col items-center pt-[2.2%] text-center">
        <img src="/Profile.png" alt="" className="w-[5.2vw]" />

        <h2 className="mt-[6%] text-[2.15vw] font-semibold leading-[1.05] text-[#3A3A3A]">
          Complete your profile
          <br />
          to continue
        </h2>

        <p className="mt-[5.2%] text-[1.02vw] leading-[1.35] text-[#5A5A5A]">
          You need to complete your profile
          <br />
          before enrolling in this course.
        </p>

        <div className="mt-[8%] flex w-full gap-[2.4%]">
          <button
            type="button"
            onClick={onCompleteProfile}
            className="flex h-[3vw] flex-1 items-center justify-center rounded-[0.5vw] border border-[#B7B3F4] bg-white text-[0.98vw] font-medium text-[#4F46E5]"
          >
            Complete Profile
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex h-[3vw] flex-1 items-center justify-center rounded-[0.5vw] bg-[#4F46E5] text-[0.98vw] font-medium text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalShell>
  );
}