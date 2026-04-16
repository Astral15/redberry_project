export default function ModalShell({
  children,
  onClose,
  onBack,
  showBack = false,
  widthClass = "w-[24%]",
  minHeightClass = "",
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
      <div
        className={`relative rounded-[1vw] bg-white px-[2.2%] py-[1.5%] shadow-[0_0.4vw_1.2vw_rgba(0,0,0,0.12)] ${widthClass} ${minHeightClass}`}
      >
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className="absolute left-[4%] top-[4%] text-[1.8vw] leading-none text-[#8b8b8b]"
          >
            ‹
          </button>
        )}

        <button
          type="button"
          onClick={onClose}
          className="absolute right-[4%] top-[4%] text-[1.8vw] leading-none text-[#8b8b8b]"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
}