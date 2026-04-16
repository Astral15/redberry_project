export default function Navbar({ onOpenProfile, onOpenEnrolledCourses }) {
  return (
    <header className="border-b border-black/10 bg-[#f4f4f4] py-[1.1%]">
      <div className="mx-auto flex w-[81.56%] items-center justify-between py-[0.2%]">
        <a href="/" className="block w-[3.2%] min-w-[3.2rem]">
          <img src="/Logo.png" alt="Bootcamp logo" className="w-full" />
        </a>

        <nav className="flex items-center gap-[2.2vw] text-[1.08vw] text-[#3e3e3e]">
          <a
            href="/browse-courses"
            className="flex items-center gap-[0.45vw] hover:text-[#4f46e5]"
          >
            <img src="/Sparkle.png" alt="" className="w-[1.1vw] min-w-[1rem]" />
            <span>Browse Courses</span>
          </a>

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
            className="w-[2.9vw] min-w-[2.7rem]"
          >
            <img src="/avatar.png" alt="Profile" className="w-full" />
          </button>
        </nav>
      </div>
    </header>
  );
}