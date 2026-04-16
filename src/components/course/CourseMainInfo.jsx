export default function CourseMainInfo({ course }) {
  const title = course?.title || "Untitled Course";
  const image = course?.image || course?.thumbnail || "/course.png";
  const duration = course?.duration || course?.length || "12 Weeks";
  const hours = course?.hours || course?.total_hours || "128 Hours";
  const rating = course?.rating ?? 4.9;
  const category =
    course?.category?.name ||
    course?.category ||
    "Development";
  const instructor =
    course?.instructor?.name ||
    course?.instructor ||
    "Unknown";
  const instructorImage =
    course?.instructor?.avatar ||
    "/instructor.png";
  const description = course?.description || "No description available.";

  return (
    <section className="w-[67.8%]">
      <h1 className="text-[2.18vw] font-semibold leading-[1.02] tracking-[-0.02em] text-[#141414]">
        {title}
      </h1>

      <div className="mt-[2%] w-[78.7%]">
        <img
          src={image}
          alt={title}
          className="block w-full rounded-[0.7vw] object-cover"
        />
      </div>

      <div className="mt-[1.7%] flex w-[78.7%] items-center justify-between">
        <div className="flex items-center gap-[0.9vw] text-[0.84vw] text-[#666666]">
          <div className="flex items-center gap-[0.22vw]">
            <img src="/boxicons_calendar.png" alt="" className="w-[0.92vw]" />
            <span>{duration}</span>
          </div>

          <div className="flex items-center gap-[0.22vw]">
            <img src="/tabler_clock-hour.png" alt="" className="w-[0.92vw]" />
            <span>{hours}</span>
          </div>
        </div>

        <div className="flex items-center gap-[0.55vw]">
          <div className="flex items-center gap-[0.2vw] text-[0.8vw] text-[#666666]">
            <img src="/star.png" alt="Rating" className="w-[0.76vw]" />
            <span>{rating}</span>
          </div>

          <span className="inline-flex items-center rounded-[0.42vw] bg-[#f5f5f5] px-[0.62vw] py-[0.3vw] text-[0.7vw] text-[#666666]">
            &lt;/&gt; {category}
          </span>
        </div>
      </div>

      <div className="mt-[1.8%] inline-flex items-center gap-[0.42vw] rounded-[0.5vw] bg-white px-[0.5vw] py-[0.42vw]">
        <img
          src={instructorImage}
          alt={instructor}
          className="h-[1.25vw] w-[1.25vw] rounded-full"
        />
        <span className="text-[0.86vw] text-[#4f4f4f]">{instructor}</span>
      </div>

      <div className="mt-[2.5%] max-w-[72%]">
        <h2 className="text-[1.26vw] font-semibold text-[#666666]">
          Course Description
        </h2>

        <div className="mt-[2.15%] space-y-[2.3%] text-[0.94vw] leading-[1.48] text-[#4f4f4f]">
          {Array.isArray(description) ? (
            description.map((paragraph, index) => <p key={index}>{paragraph}</p>)
          ) : (
            <p>{description}</p>
          )}
        </div>
      </div>
    </section>
  );
}