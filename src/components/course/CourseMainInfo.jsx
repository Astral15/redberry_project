export default function CourseMainInfo() {
  return (
    <section className="w-[67.8%]">
      <h1 className="text-[2.18vw] font-semibold leading-[1.02] tracking-[-0.02em] text-[#141414]">
        Advanced React &amp; TypeScript Development
      </h1>

      <div className="mt-[2%] w-[78.7%]">
        <img
          src="/course.png"
          alt="Course"
          className="block w-full rounded-[0.7vw] object-cover"
        />
      </div>

      <div className="mt-[1.7%] flex w-[78.7%] items-center justify-between">
        <div className="flex items-center gap-[0.9vw] text-[0.84vw] text-[#666666]">
          <div className="flex items-center gap-[0.22vw]">
            <img src="/boxicons_calendar.png" alt="" className="w-[0.92vw]" />
            <span>12 Weeks</span>
          </div>

          <div className="flex items-center gap-[0.22vw]">
            <img src="/tabler_clock-hour.png" alt="" className="w-[0.92vw]" />
            <span>128 Hours</span>
          </div>
        </div>

        <div className="flex items-center gap-[0.55vw]">
          <div className="flex items-center gap-[0.2vw] text-[0.8vw] text-[#666666]">
            <img src="/star.png" alt="Rating" className="w-[0.76vw]" />
            <span>4.9</span>
          </div>

          <span className="inline-flex items-center rounded-[0.42vw] bg-[#f5f5f5] px-[0.62vw] py-[0.3vw] text-[0.7vw] text-[#666666]">
            &lt;/&gt; Development
          </span>
        </div>
      </div>

      <div className="mt-[1.8%] inline-flex items-center gap-[0.42vw] rounded-[0.5vw] bg-white px-[0.5vw] py-[0.42vw]">
        <img
          src="/instructor.png"
          alt="Instructor"
          className="h-[1.25vw] w-[1.25vw] rounded-full"
        />
        <span className="text-[0.86vw] text-[#4f4f4f]">Marilyn Mango</span>
      </div>

      <div className="mt-[2.5%] max-w-[72%]">
        <h2 className="text-[1.26vw] font-semibold text-[#666666]">
          Course Description
        </h2>

        <div className="mt-[2.15%] space-y-[2.3%] text-[0.94vw] leading-[1.48] text-[#4f4f4f]">
          <p>
            This course focuses on building scalable, production-level
            front-end applications using React and TypeScript. It covers
            advanced component architecture, strong typing strategies, state
            management patterns, and performance optimization techniques used in
            modern web products.
          </p>

          <p>
            Participants learn how to design reusable components, structure
            large codebases, and improve maintainability through strict typing
            and clear interfaces. The course also explores advanced hooks,
            custom hooks, API integration, error handling, and testing
            approaches commonly used in professional development environments.
          </p>

        </div>
      </div>
    </section>
  );
}