import { useNavigate } from "react-router-dom";
import { useApp } from "../../app/AppContext";

function getCategoryIcon(category) {
  const normalized = String(category || "").toLowerCase();

  if (normalized.includes("development")) return "/Development.png";
  if (normalized.includes("design")) return "/Design.png";
  if (normalized.includes("business")) return "/Business.png";
  if (normalized.includes("marketing")) return "/Marketing.png";
  if (normalized.includes("data")) return "/DataScience.png";

  return "/Sparkle.png";
}

export default function CourseGridCard({ course }) {
  const navigate = useNavigate();
  const { setSelectedCourse, enrollments = [] } = useApp();

  const isEnrolled = enrollments.some((item) => item.courseId === course.courseId);

  const handleOpenDetails = () => {
    setSelectedCourse(course);
    navigate("/course-details");
  };

  return (
    <article className="rounded-[0.9vw] bg-white p-[3.1%] shadow-[0_0.08vw_0.2vw_rgba(0,0,0,0.04)]">
      <div className="overflow-hidden rounded-[0.7vw]">
        <img
          src={course.image || "/course.png"}
          alt={course.title || "Course"}
          className="h-[10.8vw] w-full object-cover"
        />
      </div>

      <div className="mt-[3.2%] flex items-center justify-between">
        <div className="min-w-0">
          <p className="text-[0.62vw] font-medium uppercase tracking-[0.08em] text-[#A0A0A0]">
            Course
          </p>

          <div className="mt-[0.25vw] flex items-center gap-[0.35vw] text-[0.72vw] text-[#8B8B8B]">
            <span className="truncate">{course.instructor || "Unknown"}</span>
            <span>|</span>
            <span>{course.duration || "12 Weeks"}</span>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[0.62vw] font-medium uppercase tracking-[0.08em] text-[#A0A0A0]">
            Rating
          </p>

          <div className="mt-[0.25vw] flex items-center justify-end gap-[0.2vw] text-[0.76vw] text-[#666666]">
            <img src="/star.png" alt="Rating" className="w-[0.78vw]" />
            <span>{course.rating || 4.9}</span>
          </div>
        </div>
      </div>

      <h3 className="mt-[2.2%] min-h-[3.2vw] text-[1.42vw] font-semibold leading-[1.07] tracking-[-0.02em] text-[#1A1A1A]">
        {course.title}
      </h3>

      <div className="mt-[3.2%] min-h-[2vw]">
        <span className="inline-flex items-center gap-[0.32vw] rounded-[0.45vw] bg-[#F5F5F5] px-[0.7vw] py-[0.35vw] text-[0.74vw] text-[#666666]">
          <img
            src={getCategoryIcon(course.category)}
            alt=""
            className="h-[0.82vw] w-[0.82vw]"
          />
          <span>{course.category}</span>
        </span>
      </div>

      <div className="mt-[6.2%] flex items-end justify-between">
        <div className="flex flex-col">
          <span className="text-[0.62vw] text-[#A0A0A0]">
            Starting from
          </span>
          <span className="mt-[6%] text-[2vw] font-semibold leading-none text-[#1D1D1D]">
            ${course.price ?? 0}
          </span>
        </div>

        <button
          type="button"
          onClick={handleOpenDetails}
          className={`flex h-[2.95vw] min-h-[2.6rem] w-[5.2vw] min-w-[5.2rem] items-center justify-center rounded-[0.42vw] text-[0.9vw] font-medium ${
            isEnrolled
              ? "border border-[#8e83ff] bg-white text-[#4F46E5] hover:bg-[#F6F5FF]"
              : "bg-[#4F46E5] text-white hover:bg-[#4338ca]"
          }`}
        >
          {isEnrolled ? "View" : "Details"}
        </button>
      </div>
    </article>
  );
}