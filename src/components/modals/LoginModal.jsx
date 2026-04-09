import ModalShell from "../common/ModalShell";

export default function LoginModal({ onClose, onOpenSignUp }) {
  return (
    <ModalShell
      onClose={onClose}
      widthClass="w-[24%] min-w-[27rem]"
      minHeightClass="min-h-[25.1vw]"
    >
      <div className="pt-[1.8%] text-center">
        <h2 className="text-[2.2vw] font-semibold leading-none text-[#141414]">
          Welcome Back
        </h2>
        <p className="mt-[2.2%] text-[1vw] text-[#666666]">
          Log in to continue your learning
        </p>
      </div>

      <form className="mt-[5.2%]">
        <div>
          <label className="mb-[1.5%] block text-[0.98vw] font-medium text-[#3a3a3a]">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="h-[3vw] w-full rounded-[0.55vw] border border-[#cfcfcf] px-[3.5%] text-[1vw] text-[#141414] outline-none placeholder:text-[#a1a1a1]"
          />
        </div>

        <div className="mt-[4%]">
          <label className="mb-[1.5%] block text-[0.98vw] font-medium text-[#3a3a3a]">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="••••••••"
              className="h-[3vw] w-full rounded-[0.55vw] border border-[#cfcfcf] px-[3.5%] pr-[11%] text-[1vw] text-[#141414] outline-none placeholder:text-[#a1a1a1]"
            />
            <span className="absolute right-[4%] top-1/2 -translate-y-1/2 text-[1vw] text-[#b0b0b0]">
              ◉
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="mt-[4.8%] flex h-[3.15vw] w-full items-center justify-center rounded-[0.55vw] bg-[#4F46E5] text-[1.08vw] font-medium text-white hover:bg-[#4338ca]"
        >
          Log In
        </button>
      </form>

      <div className="mt-[4.8%]">
        <div className="flex items-center justify-center gap-[3%]">
          <span className="h-[0.05vw] w-[41%] bg-[#dddddd]" />
          <span className="text-[0.95vw] text-[#888888]">or</span>
          <span className="h-[0.05vw] w-[41%] bg-[#dddddd]" />
        </div>

        <p className="mt-[3.2%] text-center text-[0.95vw] text-[#666666]">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={onOpenSignUp}
            className="font-medium text-[#141414] underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </ModalShell>
  );
}