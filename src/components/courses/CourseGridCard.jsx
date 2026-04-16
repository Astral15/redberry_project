import { useNavigate } from "react-router-dom";
import { useApp } from "../../app/AppContext";

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
      <img
        src={course.image || "/course.png"}
        alt="Course"
        className="w-full rounded-[0.7vw] object-cover"
      />

      <div className="mt-[3.2%] flex items-center justify-between text-[0.66vw] text-[#9a9a9a]">
        <div className="flex items-center gap-[0.35vw]">
          <span>{course.instructor}</span>
          <span>|</span>
          <span>{course.duration || "12 Weeks"}</span>
        </div>

        <div className="flex items-center gap-[0.2vw] text-[0.76vw] text-[#666666]">
          <img src="/star.png" alt="Rating" className="w-[0.78vw]" />
          <span>{course.rating || 4.9}</span>
        </div>
      </div>

      <h3 className="mt-[2.2%] text-[1.42vw] font-semibold leading-[1.07] tracking-[-0.02em] text-[#1a1a1a]">
        {course.title}
      </h3>

      <div className="mt-[3.2%]">
        <span className="inline-flex items-center rounded-[0.45vw] bg-[#f5f5f5] px-[0.7vw] py-[0.35vw] text-[0.74vw] text-[#666666]">
          {course.category}
        </span>
      </div>

      <div className="mt-[6.2%] flex items-end justify-between">
        <div className="flex items-end gap-[0.3vw]">
          <span className="mb-[0.12vw] text-[0.62vw] text-[#a0a0a0]">
            Starting from
          </span>
          <span className="text-[2vw] font-semibold leading-none text-[#1d1d1d]">
            ${course.price}
          </span>
        </div>

        <button
          type="button"
          onClick={handleOpenDetails}
          className={`flex h-[2.95vw] w-[5.2vw] items-center justify-center rounded-[0.42vw] text-[0.9vw] font-medium ${
            isEnrolled
              ? "border border-[#8e83ff] bg-white text-[#4F46E5]"
              : "bg-[#4F46E5] text-white hover:bg-[#4338ca]"
          }`}
        >
          {isEnrolled ? "View" : "Details"}
        </button>
      </div>
    </article>
  );
}