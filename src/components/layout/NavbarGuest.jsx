import { Link } from "react-router-dom";

export default function NavbarGuest({ onOpenLogin, onOpenSignUp }) {
  return (
    <header className="border-b border-black/10 bg-[#f4f4f4]">
      <div className="mx-auto flex w-[81.56%] items-center justify-between py-[0.9%]">
        <Link to="/" className="block w-[3.2%] min-w-[3.2rem]">
          <img src="/Logo.png" alt="Bootcamp logo" className="w-full" />
        </Link>

        <nav className="flex items-center gap-[1vw] text-[1.08vw] text-[#3e3e3e]">
          <Link
            to="/browse-courses"
            className="flex items-center gap-[0.45vw] text-[#3e3e3e] hover:text-[#4F46E5]"
          >
            <img src="/Sparkle.png" alt="" className="w-[1.1vw] min-w-[1rem]" />
            <span>Browse Courses</span>
          </Link>

          <button
            type="button"
            onClick={onOpenLogin}
            className="flex h-[3.02vw] min-h-[2.7rem] w-[6.04vw] min-w-[5.5rem] items-center justify-center rounded-[0.42vw] border border-[#8e83ff] bg-white text-[1vw] font-medium text-[#4F46E5] hover:bg-[#f6f5ff]"
          >
            Log In
          </button>

          <button
            type="button"
            onClick={onOpenSignUp}
            className="flex h-[3.02vw] min-h-[2.7rem] w-[6.04vw] min-w-[5.5rem] items-center justify-center rounded-[0.42vw] bg-[#4F46E5] text-[1vw] font-medium text-white hover:bg-[#4338ca]"
          >
            Sign Up
          </button>
        </nav>
      </div>
    </header>
  );
}