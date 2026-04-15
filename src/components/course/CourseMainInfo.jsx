export default function CourseMainInfo() {
    return (
      <section className="w-[69%]">
        <h1 className="text-[3vw] font-semibold leading-[1.05] text-[#141414]">
          Advanced React &amp; TypeScript Development
        </h1>
  
        <div className="mt-[2.1%]">
          <img
            src="/course.png"
            alt="Course"
            className="w-full rounded-[0.85vw] object-cover"
          />
        </div>
  
        <div className="mt-[2%] flex items-center justify-between">
          <div className="flex items-center gap-[1vw] text-[0.92vw] text-[#666666]">
            <div className="flex items-center gap-[0.25vw]">
              <span>🗓</span>
              <span>12 Weeks</span>
            </div>
  
            <div className="flex items-center gap-[0.25vw]">
              <span>🕒</span>
              <span>128 Hours</span>
            </div>
          </div>
  
          <div className="flex items-center gap-[0.55vw]">
            <div className="flex items-center gap-[0.2vw] text-[0.86vw] text-[#666666]">
              <img src="/star.png" alt="Rating" className="w-[0.82vw]" />
              <span>4.9</span>
            </div>
  
            <span className="inline-flex items-center rounded-[0.45vw] bg-[#f5f5f5] px-[0.7vw] py-[0.35vw] text-[0.74vw] text-[#666666]">
              &lt;/&gt; Development
            </span>
          </div>
        </div>
  
        <div className="mt-[2.1%] inline-flex items-center gap-[0.45vw] rounded-[0.52vw] bg-white px-[0.55vw] py-[0.45vw]">
          <img
            src="/instructor.png"
            alt="Instructor"
            className="h-[1.35vw] w-[1.35vw] rounded-full"
          />
          <span className="text-[0.92vw] text-[#4f4f4f]">Marilyn Mango</span>
        </div>
  
        <div className="mt-[3.1%]">
          <h2 className="text-[1.55vw] font-semibold text-[#666666]">
            Course Description
          </h2>
  
          <div className="mt-[2.5%] max-w-[88%] space-y-[2.2%] text-[1vw] leading-[1.5] text-[#4f4f4f]">
            <p>
              This course focuses on building scalable, production-level front-end
              applications using React and TypeScript. It covers advanced
              component architecture, strong typing strategies, state management
              patterns, and performance optimization techniques used in modern web
              products.
            </p>
  
            <p>
              Participants learn how to design reusable components, structure
              large codebases, and improve maintainability through strict typing
              and clear interfaces. The course also explores advanced hooks,
              custom hooks, API integration, error handling, and testing
              approaches commonly used in professional development environments.
            </p>
  
            <p>
              This course focuses on building scalable, production-level front-end
              applications using React and TypeScript. It covers advanced
              component architecture, strong typing strategies, state management
              patterns, and performance optimization techniques used in modern web
              products.
            </p>
          </div>
        </div>
      </section>
    );
  }