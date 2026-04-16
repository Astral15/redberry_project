const lockedCards = [1, 2, 3];

function LockedCard() {
  return (
    <article className="relative overflow-hidden rounded-[1vw] bg-white px-[2.6%] py-[2.1%] shadow-[0_0.1vw_0.25vw_rgba(0,0,0,0.05)]">
      <div className="pointer-events-none blur-[0.22vw]">
        <div className="flex items-start gap-[2.6%]">
          <img
            src="/your_course.png"
            alt="Course"
            className="w-[26.5%] rounded-[0.85vw] object-cover"
          />

          <div className="flex flex-1 flex-col">
            <div className="flex items-start justify-between gap-[2%]">
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-[1vw]">
                  <p className="text-[0.82vw] text-[#8b8b8b]">
                    Lecturer Marilyn Mango
                  </p>

                  <div className="flex items-center gap-[0.25vw] text-[0.95vw] text-[#5c5c5c]">
                    <img src="/star.png" alt="Rating" className="w-[0.9vw]" />
                    <span>4.9</span>
                  </div>
                </div>

                <h3 className="mt-[1.1%] max-w-[95%] text-[1.08vw] font-semibold leading-[1.08] text-[#1d1d1d]">
                  Advanced React &amp; TypeScript Development
                </h3>
              </div>
            </div>

            <div className="mt-[3%] flex items-end gap-[3.2%]">
              <div className="flex-[1.2]">
                <p className="mb-[1.2%] text-[1.02vw] text-[#3e3e3e]">
                  65% Complete
                </p>

                <div className="h-[0.92vw] w-full rounded-full bg-[#d9d5fb]">
                  <div className="h-full w-[65%] rounded-full bg-[#4f46e5]" />
                </div>
              </div>

              <button className="flex h-[3.7vw] min-h-[2.8rem] w-[8vw] min-w-[5.8rem] items-center justify-center rounded-[0.8vw] border border-[#8e83ff] bg-white text-[1.25vw] font-medium text-[#4f46e5]">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ContinueLearningLockedSection({ onOpenLogin }) {
  return (
    <section className="mx-auto mt-[3.2%] w-[89.2%]">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-[2.5vw] font-semibold leading-none text-[#111111]">
            Continue Learning
          </h2>
          <p className="mt-[0.7%] text-[1.1vw] text-[#5f5f5f]">
            Pick up where you left
          </p>
        </div>
      </div>

      <div className="relative mt-[1.8%]">
        <div className="grid grid-cols-3 gap-[1.2%]">
          {lockedCards.map((item) => (
            <LockedCard key={item} />
          ))}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[1vw] bg-white/10">
          <img src="/lock.png" alt="Locked" className="w-[3.2vw]" />

          <p className="mt-[1.3%] text-[1.18vw] font-medium text-[#292929]">
            Sign in to track your learning progress
          </p>

          <button
            type="button"
            onClick={onOpenLogin}
            className="mt-[1.6%] flex h-[3.15vw] min-w-[7.2vw] items-center justify-center rounded-[0.5vw] bg-[#4F46E5] px-[1vw] text-[1vw] font-medium text-white hover:bg-[#4338ca]"
          >
            Log In
          </button>
        </div>
      </div>
    </section>
  );
}