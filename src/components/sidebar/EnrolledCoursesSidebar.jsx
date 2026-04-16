import { useNavigate } from "react-router-dom";
import { useApp } from "../../app/AppContext";

function displayValue(value, fallback = "") {
  if (value == null) return fallback;
  if (typeof value === "string" || typeof value === "number") return value;

  if (typeof value === "object") {
    if (typeof value.label === "string") return value.label;
    if (typeof value.name === "string") return value.name;
    if (typeof value.title === "string") return value.title;

    if (
      "weeklySchedule" in value ||
      "timeSlot" in value ||
      "sessionType" in value ||
      "location" in value
    ) {
      return [
        value.weeklySchedule,
        value.timeSlot,
        value.sessionType,
        value.location,
      ]
        .filter(Boolean)
        .join(" • ");
    }
  }

  return fallback;
}

function SidebarCourseCard({ course, onView }) {
  const weeklySchedule = displayValue(course.weeklySchedule);
  const timeSlot = displayValue(course.timeSlot);
  const sessionType = displayValue(course.sessionType);
  const location = displayValue(course.location);

  return (
    <article className="rounded-[0.9vw] bg-white px-[2.1%] py-[2.1%] shadow-[0_0.08vw_0.2vw_rgba(0,0,0,0.04)]">
      <div className="flex items-start gap-[2.25%]">
        <img
          src={course.image || "/course.png"}
          alt={course.title || "Course"}
          className="h-[9.95vw] w-[14.01vw] rounded-[0.52vw] object-cover"
        />

        <div className="flex h-[9.7vw] w-[17.1vw] flex-col justify-between">
          <div className="flex items-start justify-between gap-[0.7vw]">
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-[0.5vw]">
                <p className="truncate text-[0.78vw] text-[#8b8b8b]">
                  Instructor {course.instructor || "Unknown"}
                </p>

                <div className="flex shrink-0 items-center gap-[0.2vw] text-[0.9vw] text-[#5c5c5c]">
                  <img src="/star.png" alt="Rating" className="w-[0.82vw]" />
                  <span>{course.rating || 4.9}</span>
                </div>
              </div>

              <h3 className="mt-[1.1%] max-w-[95%] text-[1.08vw] font-semibold leading-[1.08] text-[#1d1d1d]">
                {course.title}
              </h3>
            </div>
          </div>

          <div className="space-y-[0.45vw] text-[0.92vw] text-[#6b6b6b]">
            {weeklySchedule && (
              <div className="flex items-center gap-[0.45vw]">
                <img src="/calendar_days.png" alt="" className="w-[0.92vw]" />
                <span>{weeklySchedule}</span>
              </div>
            )}

            {timeSlot && (
              <div className="flex items-center gap-[0.45vw]">
                <img src="/tabler_clock-hour.png" alt="" className="w-[0.92vw]" />
                <span>{timeSlot}</span>
              </div>
            )}

            {sessionType && (
              <div className="flex items-center gap-[0.45vw]">
                <img src="/computer_icon.png" alt="" className="w-[0.92vw]" />
                <span>{sessionType}</span>
              </div>
            )}

            {location && (
              <div className="flex items-center gap-[0.45vw]">
                <img src="/location.png" alt="" className="w-[0.92vw]" />
                <span>{location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-[2.5%] flex items-end gap-[1.05vw]">
        <div className="w-[30.36vw]">
          <p className="mb-[0.55vw] text-[1.02vw] text-[#3e3e3e]">
            {course.progress ?? 0}% Complete
          </p>

          <div className="h-[0.92vw] w-full rounded-full bg-[#d9d5fb]">
            <div
              className="h-full rounded-full bg-[#4f46e5]"
              style={{ width: `${course.progress ?? 0}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => onView(course)}
          className="flex h-[3.02vw] w-[6.04vw] items-center justify-center rounded-[0.42vw] border border-[#8e83ff] bg-white text-[1vw] font-medium text-[#4F46E5] hover:bg-[#f6f5ff]"
        >
          View
        </button>
      </div>
    </article>
  );
}

function EmptyState({ onBrowse }) {
  return (
    <div className="flex h-[82%] flex-col items-center justify-center text-center">
      <img src="/embty_box.png" alt="Empty" className="w-[7.8vw]" />

      <h3 className="mt-[4.5%] whitespace-nowrap text-[2.2vw] font-semibold leading-none text-[#17178A]">
        No Enrolled Courses Yet
      </h3>

      <p className="mt-[2%] text-[1.12vw] leading-[1.35] text-[#262626]">
        Your learning journey starts here!
        <br />
        Browse courses to get started.
      </p>

      <button
        type="button"
        onClick={onBrowse}
        className="mt-[5%] flex h-[3.15vw] min-w-[9.2vw] items-center justify-center rounded-[0.5vw] bg-[#4F46E5] px-[1.1vw] text-[1.02vw] font-medium text-white hover:bg-[#4338ca]"
      >
        Browse Courses
      </button>
    </div>
  );
}

export default function EnrolledCoursesSidebar({
  isOpen,
  onClose,
  isEmpty = false,
  enrollments = [],
}) {
  const navigate = useNavigate();
  const { setSelectedCourse, isAuthenticated } = useApp();

  if (!isOpen) return null;

  const totalEnrollments = isEmpty ? 0 : enrollments.length;

  const handleView = (course) => {
    setSelectedCourse(course);
    onClose();

    if ((course.progress ?? 0) >= 100) {
      navigate("/course-details-completed");
      return;
    }

    navigate("/course-details");
  };

  const handleBrowse = () => {
    onClose();
    navigate(isAuthenticated ? "/browse-courses" : "/browse-courses-guest");
  };

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close overlay"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
      />

      <aside className="absolute right-0 top-0 h-full w-[41.2%] bg-[#f4f4f4] px-[3%] pb-[2.2%] pt-[2.2%] shadow-[-0.2vw_0_1vw_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between gap-[1vw]">
          <h2 className="h-[2.29vw] w-[17.03vw] whitespace-nowrap text-[2vw] font-semibold leading-none text-[#111111]">
            Enrolled Courses
          </h2>

          <div className="text-right">
            <p className="whitespace-nowrap text-[0.92vw] text-[#222222]">
              Total Enrollments {totalEnrollments}
            </p>
          </div>
        </div>

        {isEmpty ? (
          <EmptyState onBrowse={handleBrowse} />
        ) : (
          <div className="mt-[4.2%] flex h-[88%] flex-col gap-[1.1vw] overflow-y-auto pr-[0.4%]">
            {enrollments.map((course) => (
              <SidebarCourseCard
                key={course.id || course.courseId}
                course={course}
                onView={handleView}
              />
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}