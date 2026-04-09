function LockedCard() {
    return (
      <article className="rounded-[1vw] bg-white px-[2.4%] py-[2%] opacity-60 blur-[3px] shadow-[0_0.1vw_0.25vw_rgba(0,0,0,0.05)]">
        <div className="flex items-start gap-[2.6%]">
          <img
            src="/your_course.png"
            alt="Course"
            className="w-[20.5%] rounded-[0.85vw] object-cover"
          />
  
          <div className="flex flex-1 items-start justify-between gap-[2%]">
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-[1%]">
                <p className="text-[0.82vw] text-[#8b8b8b]">Lecturer Marilyn Mango</p>
                <div className="flex items-center gap-[0.25vw] text-[0.95vw] text-[#5c5c5c]">
                  <img src="/star.png" alt="Rating" className="w-[0.9vw]" />
                  <span>4.9</span>
                </div>
              </div>
  
              <h3 className="mt-[1.2%] max-w-[100%] text-[1.15vw] font-semibold leading-[1.02] tracking-[-0.02em] text-[#141414]">
                Advanced React &amp; TypeScript Development
              </h3>
            </div>
          </div>
        </div>
  
        <div className="mt-[2.4%] flex items-end gap-[3%]">
          <div className="flex-1">
            <p className="mb-[1.2%] text-[1.02vw] text-[#3e3e3e]">65% Complete</p>
            <div className="h-[1.08vw] w-full rounded-full bg-[#d9d5fb]">
              <div className="h-full w-[65%] rounded-full bg-[#4f46e5]" />
            </div>
          </div>
  
          <button className="flex h-[3.8vw] w-[8.2vw] items-center justify-center rounded-[0.8vw] border border-[#8e83ff] bg-white text-[1.25vw] font-medium text-[#4f46e5]">
            View
          </button>
        </div>
      </article>
    );
  }
  
  export default function ContinueLearningLockedSection(onOpenLogin) {
    return (
      <section className="mx-auto mt-[2.9%] w-[81.56%]">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-[2.5vw] font-semibold leading-none text-[#111111]">
              Continue Learning
            </h2>
            <p className="mt-[0.7%] text-[1.1vw] text-[#5f5f5f]">Pick up where you left</p>
          </div>
  
          <a href="#" className="text-[1.1vw] font-medium text-[#4F46E5] underline">
            See All
          </a>
        </div>
  
        <div className="relative mt-[1.8%]">
          <div className="grid grid-cols-3 gap-[2.04%]">
            <LockedCard />
            <LockedCard />
            <LockedCard />
          </div>
  
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex w-[26%] flex-col items-center rounded-[1vw] border border-black/10 bg-white px-[3%] py-[3.2%] shadow-[0_0.2vw_0.6vw_rgba(0,0,0,0.06)]">
              <img src="/lock.png" alt="Locked" className="w-[20%]" />
  
              <p className="mt-[5%] text-center text-[1.05vw] font-medium text-[#1d1d1d]">
                Sign in to track your learning progress
              </p>
  
              <button type="button" onClick={onOpenLogin} className="mt-[5%] flex h-[2.5vw] w-[5vw] items-center justify-center rounded-[0.42vw] bg-[#4F46E5] text-[0.92vw] font-medium text-white hover:bg-[#4338ca]">
                Log In
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }