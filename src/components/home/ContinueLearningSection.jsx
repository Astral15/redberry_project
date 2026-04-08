const continueCourses = [1, 2, 3];

function ContinueCard() {
  return (
    <article className="rounded-[1vw] bg-white p-[3.2%] shadow-[0_0.1vw_0.25vw_rgba(0,0,0,0.05)]">
      <div className="flex gap-[3.4%]">
        <img
          src="/your_course.png"
          alt="Course"
          className="w-[24%] rounded-[0.8vw] object-cover"
        />

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-[2%]">
              <p className="text-[0.7vw] text-[#8b8b8b]">Lecturer Marilyn Mango</p>
              <div className="flex items-center gap-[0.2vw] text-[0.8vw] text-[#5c5c5c]">
                <img src="/star.png" alt="Rating" className="w-[0.8vw]" />
                <span>4.9</span>
              </div>
            </div>

            <h3 className="mt-[1%] max-w-[78%] text-[1.25vw] font-semibold leading-[1.15] text-[#1d1d1d]">
              Advanced React &amp; TypeScript Development
            </h3>
          </div>

          <div className="mt-[4.5%] flex items-end gap-[4%]">
            <div className="flex-1">
              <p className="mb-[1.6%] text-[0.7vw] text-[#3e3e3e]">65% Complete</p>
              <div className="h-[0.7vw] rounded-full bg-[#d9d5fb]">
                <div className="h-full w-[65%] rounded-full bg-[#4f46e5]" />
              </div>
            </div>

            <button className="rounded-[0.6vw] border border-[#7468f8] px-[3.2%] py-[2%] text-[1vw] font-medium text-[#4f46e5] hover:bg-[#f5f4ff]">
              View
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ContinueLearningSection() {
  return (
    <section className="mx-auto mt-[3.2%] w-[89.2%]">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-[2.5vw] font-semibold leading-none text-[#111111]">
            Continue Learning
          </h2>
          <p className="mt-[0.7%] text-[1.1vw] text-[#5f5f5f]">Pick up where you left</p>
        </div>

        <a href="#" className="text-[1.1vw] font-medium text-[#4f46e5] underline">
          See All
        </a>
      </div>

      <div className="mt-[1.8%] grid grid-cols-3 gap-[1.5%]">
        {continueCourses.map((item) => (
          <ContinueCard key={item} />
        ))}
      </div>
    </section>
  );
}