const continueCourses = [1, 2, 3];

function ContinueCard() {
  return (
    <article className="rounded-[1vw] bg-white px-[2.4%] py-[2%] shadow-[0_0.1vw_0.25vw_rgba(0,0,0,0.05)]">
      <div className="ml-[2.2%] mt-[2.5%] mb-[2.5%] mr-[2.2%] flex items-start gap-[2.6%]">
        <img
          src="/your_course.png"
          alt="Course"
          className="w-[29.5%] rounded-[0.85vw] object-cover"
        />

      <div className="flex items-start justify-between gap-[2%]">
        <div className="min-w-0 flex-1">
          <div className="flex mb-[1.5%] items-center justify-between gap-[1%]">
            <p className="text-[0.82vw] text-[#8b8b8b]">
              Lecturer Marilyn Mango
            </p>

            <div className="flex items-center gap-[0.25vw] text-[0.95vw] text-[#5c5c5c]">
              <img src="/star.png" alt="Rating" className="w-[0.9vw]" />
              <span>4.9</span>
            </div>
          </div>

          <h3 className="mt-[1.2%] max-w-[100%] text-[1.10vw] font-semibold leading-[1.0] text-[#141414]">
            Advanced React &amp; TypeScript Development
          </h3>
          </div>
        </div>
      </div>

      <div className="flex items-end ml-[2.2%] mb-[2.5%] mr-[2.2%]">
        <div className="flex-1">
          <p className="text-[1.02vw] text-[#3e3e3e]">
            65% Complete
          </p>

          <div className="h-[1.08vw] w-full rounded-full bg-[#d9d5fb]">
            <div className="h-full w-[65%] rounded-full bg-[#4f46e5]" />
          </div>
        </div>

        <button className="ml-[7.2%] flex h-[2.28vw] min-h-[2.9rem] w-[4.7vw] min-w-[5rem] items-center justify-center rounded-[0.8vw] border border-[#8e83ff] bg-white text-[1.25vw] font-medium text-[#4f46e5] hover:bg-[#f6f5ff]">
          View
        </button>
      </div>
    </article>
  );
}

export default function ContinueLearningSection() {
  return (
    <section className="mx-auto mt-[3.2%] w-[81.56%]">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-[2.5vw] font-semibold leading-none text-[#111111]">
            Continue Learning
          </h2>
          <p className="mt-[0.7%] text-[1.1vw] text-[#5f5f5f]">
            Pick up where you left
          </p>
        </div>

        <a href="#" className="text-[1.1vw] font-medium text-[#4f46e5] underline">
          See All
        </a>
      </div>

      <div className="mt-[1.8%] grid grid-cols-3 gap-[2.04%]">
        {continueCourses.map((item) => (
          <ContinueCard key={item} />
        ))}
      </div>
    </section>
  );
}