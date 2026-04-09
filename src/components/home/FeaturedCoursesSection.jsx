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

<p className="mt-[3%] text-[1.10vw] leading-[1.45] text-[#696969]">
  Master modern React patterns, hooks, and TypeScript integration for building scalable web applications.
      </p>

      <div className="mt-[4%] flex items-end justify-between">
        <div className="flex items-end gap-[0.45vw]">
          <p className="mb-[0.65vw] text-[0.7vw] text-[#9a9a9a]">Starting from</p>
          <p className="text-[2.3vw] font-semibold leading-none text-[#1d1d1d]">$299</p>
        </div>

        <button className="flex h-[3.02vw] w-[6.04vw] items-center justify-center rounded-[0.42vw] bg-[#4F46E5] text-[1vw] font-medium text-white hover:bg-[#4338ca]">
          Details
        </button>
      </div>
    </article>
  );
}

export default function FeaturedCoursesSection() {
  return (
    <section className="mx-auto mt-[3.4%] w-[81.56%]">
      <div>
        <h2 className="text-[2.5vw] font-semibold leading-none text-[#111111]">
          Start Learning Today
        </h2>
        <p className="mt-[0.7%] text-[1.1vw] text-[#5f5f5f]">
          Choose from our most popular courses and begin your journey
        </p>
      </div>

      <div className="mt-[1.8%] grid grid-cols-3 gap-[2.04%]">
        {featuredCourses.map((item) => (
          <FeaturedCard key={item} />
        ))}
      </div>
    </section>
  );
}