import { Link } from "react-router-dom";

export default function Navbar({
  onOpenProfile,
  onOpenEnrolledCourses,
  isProfileComplete = false,
}) {
  return (
    <header className="border-b border-black/10 bg-[#f4f4f4] py-[1.1%]">
      <div className="mx-auto flex w-[81.56%] items-center justify-between py-[0.2%]">
        <Link to="/dashboard" className="block w-[3.2%] min-w-[3.2rem]">
          <img src="/Logo.png" alt="Bootcamp logo" className="w-full" />
        </Link>

        <nav className="flex items-center gap-[2.2vw] text-[1.08vw] text-[#3e3e3e]">
          <Link
            to="/browse-courses"
            className="flex items-center gap-[0.45vw] hover:text-[#4f46e5]"
          >
            <img src="/Sparkle.png" alt="" className="w-[1.1vw] min-w-[1rem]" />
            <span>Browse Courses</span>
          </Link>

          <button
            type="button"
            onClick={onOpenEnrolledCourses}
            className="flex items-center gap-[0.45vw] hover:text-[#4f46e5]"
          >
            <img src="/booking.png" alt="" className="w-[1.1vw] min-w-[1rem]" />
            <span>Enrolled Courses</span>
          </button>

          <button
            type="button"
            onClick={onOpenProfile}
            className="relative w-[2.9vw] min-w-[2.7rem]"
          >
            <img src="/avatar.png" alt="Profile" className="w-full" />

            {isProfileComplete ? (
              <span className="absolute bottom-[2%] right-[2%] flex h-[0.95vw] w-[0.95vw] min-h-[0.8rem] min-w-[0.8rem] items-center justify-center rounded-full bg-[#23C12F] text-[0.58vw] font-semibold text-white" />
            ) : (
              <span className="absolute bottom-[2%] right-[2%] h-[0.85vw] w-[0.85vw] min-h-[0.72rem] min-w-[0.72rem] rounded-full border border-white bg-[#F0B100]" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}