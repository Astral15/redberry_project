const featuredCourses = [1, 2, 3];

function FeaturedCard() {
  return (
    <article className="rounded-[1vw] bg-white p-[3.5%] shadow-[0_0.1vw_0.25vw_rgba(0,0,0,0.05)]">
      <img src="/course.png" alt="Course" className="w-full rounded-[0.9vw] object-cover" />

      <div className="mt-[3.6%] flex items-center justify-between text-[0.75vw] text-[#8b8b8b]">
        <p>Lecturer Marilyn Mango</p>
        <div className="flex items-center gap-[0.2vw] text-[0.8vw] text-[#5c5c5c]">
          <img src="/star.png" alt="Rating" className="w-[0.8vw]" />
          <span>4.9</span>
        </div>
      </div>

      <h3 className="mt-[2%] text-[1.5vw] font-semibold leading-[1.15] text-[#1d1d1d]">
        Advanced React &amp; TypeScript Development
      </h3>

      <p className="mt-[3%] text-[1vw] leading-[1.45] text-[#696969]">
        Master modern React patterns, hooks, and TypeScript integration for building scalable web applications.
      </p>

      <div className="mt-[7%] flex items-end justify-between">
        <div>
          <p className="text-[0.7vw] text-[#9a9a9a]">Starting from</p>
          <p className="mt-[4%] text-[2.3vw] font-semibold leading-none text-[#1d1d1d]">
            $299
          </p>
        </div>

        <button className="rounded-[0.6vw] bg-[#4f46e5] px-[5.2%] py-[3.3%] text-[1vw] font-medium text-white hover:bg-[#4338ca]">
          Details
        </button>
      </div>
    </article>
  );
}

export default function FeaturedCoursesSection() {
  return (
    <section className="mx-auto mt-[3.4%] w-[89.2%]">
      <div>
        <h2 className="text-[2.5vw] font-semibold leading-none text-[#111111]">
          Start Learning Today
        </h2>
        <p className="mt-[0.7%] text-[1.1vw] text-[#5f5f5f]">
          Choose from our most popular courses and begin your journey
        </p>
      </div>

      <div className="mt-[1.8%] grid grid-cols-3 gap-[1.5%]">
        {featuredCourses.map((item) => (
          <FeaturedCard key={item} />
        ))}
      </div>
    </section>
  );
}