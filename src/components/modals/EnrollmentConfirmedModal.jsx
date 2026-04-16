import ModalShell from "../common/ModalShell";

export default function EnrollmentConfirmedModal({ onClose, onDone }) {
  return (
    <ModalShell
      onClose={onClose}
      widthClass="w-[24%] min-w-[27rem]"
      minHeightClass="min-h-[26vw]"
    >
      <div className="flex flex-col items-center pt-[2.2%] text-center">
        <img
          src="/copmlete_Icons.png"
          alt=""
          className="w-[5.2vw]"
        />

        <h2 className="mt-[6%] text-[2.15vw] font-semibold leading-[1.05] text-[#3A3A3A]">
          Enrollment Confirmed!
        </h2>

        <p className="mt-[5.2%] text-[1.02vw] leading-[1.35] text-[#5A5A5A]">
          You’ve successfully enrolled in
          <br />
          “Advanced React &amp; TypeScript
          <br />
          Development” Course!
        </p>

        <button
          type="button"
          onClick={onDone}
          className="mt-[9%] flex h-[3vw] w-full items-center justify-center rounded-[0.5vw] bg-[#4F46E5] text-[0.98vw] font-medium text-white"
        >
          Done
        </button>
      </div>
    </ModalShell>
  );
}