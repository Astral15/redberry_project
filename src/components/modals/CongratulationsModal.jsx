import ModalShell from "../common/ModalShell";

export default function CongratulationsModal({
  onClose,
  onDone,
  rating,
  onChangeRating,
  courseTitle = "this course",
}) {
  return (
    <ModalShell
      onClose={onClose}
      widthClass="w-[24%] min-w-[27rem]"
      minHeightClass="min-h-[28vw]"
    >
      <div className="flex flex-col items-center pt-[2.2%] text-center">
        <img src="/Congratulations_Icons.png" alt="" className="w-[5.2vw]" />

        <h2 className="mt-[6%] text-[2.15vw] font-semibold leading-[1.05] text-[#3A3A3A]">
          Congratulations!
        </h2>

        <p className="mt-[5.2%] text-[1.02vw] leading-[1.35] text-[#5A5A5A]">
          You’ve completed
          <br />
          “{courseTitle}” Course!
        </p>

        <p className="mt-[6.5%] text-[0.98vw] font-medium text-[#6C63FF]">
          Rate your experience
        </p>

        <div className="mt-[4.8%] flex items-center gap-[0.55vw]">
          {[1, 2, 3, 4, 5].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onChangeRating(item)}
              className="flex items-center justify-center"
            >
              <img
                src={item <= rating ? "/full_Star.png" : "/empty_Star.png"}
                alt={`Rate ${item}`}
                className="w-[1.85vw]"
              />
            </button>
          ))}
        </div>

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