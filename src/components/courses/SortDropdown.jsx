import { useEffect, useRef, useState } from "react";

const options = [
  "Newest First",
  "Price: Low to High",
  "Price: High to Low",
  "Most Popular",
  "Title: A-Z",
];

export default function SortDropdown({ selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-[10.8vw]">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-[2.6vw] w-full items-center justify-between rounded-[0.42vw] border border-[#ececec] bg-white px-[0.8vw] text-[0.82vw] text-[#666666]"
      >
        <span className="whitespace-nowrap">
          Sort By: <span className="font-medium text-[#4F46E5]">{selected}</span>
        </span>
        <span className="ml-[0.5vw] shrink-0 text-[0.8vw] text-[#7a7a7a]">˅</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[108%] z-20 w-full overflow-hidden rounded-[0.52vw] border border-[#ececec] bg-white shadow-[0_0.15vw_0.6vw_rgba(0,0,0,0.06)]">
          {options.map((item) => {
            const isSelected = item === selected;

            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  onChange(item);
                  setIsOpen(false);
                }}
                className={`flex h-[2.25vw] w-full items-center px-[0.8vw] text-left text-[0.88vw] ${
                  isSelected
                    ? "bg-[#d9d5fb] text-[#4F46E5]"
                    : "bg-white text-[#666666] hover:bg-[#f6f5ff]"
                }`}
              >
                <span className="whitespace-nowrap">{item}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}