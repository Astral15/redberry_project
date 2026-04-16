import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../app/AppContext";
import { coursesService } from "../../api/courses.service";

function normalizeFeaturedCourse(course) {
  return {
    id: course?.id ?? course?.courseId,
    courseId: course?.id ?? course?.courseId,
    title: course?.title || "Untitled Course",
    description:
      course?.description ||
      "No description available for this course yet.",
    image: course?.image || course?.thumbnail || "/course.png",
    instructor:
      course?.instructor?.name ||
      course?.instructor ||
      "Unknown Instructor",
    rating: Number(course?.rating ?? 4.9) || 4.9,
    price: Number(course?.price ?? 0) || 0,
    raw: course,
  };
}

function FeaturedCard({ course }) {
  const navigate = useNavigate();
  const { setSelectedCourse } = useApp();

  const handleOpenDetails = () => {
    setSelectedCourse(course);
    navigate("/course-details");
  };

  return (
    <article className="overflow-hidden rounded-[1vw] bg-white px-[3.5%] pb-[3.5%] pt-[3.5%] shadow-[0_0.1vw_0.25vw_rgba(0,0,0,0.05)]">
      <div className="overflow-hidden rounded-[0.9vw]">
        <img
          src={course.image}
          alt={course.title}
          className="h-[14.6vw] w-full object-cover"
        />
      </div>

      <div className="mt-[3.6%] flex items-center justify-between">
        <div className="min-w-0">
          <p className="text-[0.68vw] font-medium uppercase tracking-[0.08em] text-[#A0A0A0]">
            Lecturer
          </p>
          <p className="mt-[0.35vw] truncate text-[0.82vw] text-[#7C7C7C]">
            {course.instructor}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[0.68vw] font-medium uppercase tracking-[0.08em] text-[#A0A0A0]">
            Rating
          </p>
          <div className="mt-[0.35vw] flex items-center justify-end gap-[0.2vw] text-[0.8vw] text-[#5C5C5C]">
            <img src="/star.png" alt="Rating" className="w-[0.8vw]" />
            <span>{course.rating}</span>
          </div>
        </div>
      </div>

      <h3 className="mt-[2.2%] min-h-[3.5vw] text-[1.42vw] font-semibold leading-[1.12] tracking-[-0.02em] text-[#1D1D1D]">
        {course.title}
      </h3>

      <p className="mt-[3%] min-h-[4.95vw] text-[1vw] leading-[1.45] text-[#696969] overflow-hidden">
        {course.description}
      </p>

      <div className="mt-[4.3%] flex items-end justify-between gap-[1vw]">
        <div className="min-w-0">
          <p className="mb-[0.55vw] text-[0.7vw] text-[#9A9A9A]">
            Starting from
          </p>
          <p className="text-[2.15vw] font-semibold leading-none text-[#1D1D1D]">
            ${course.price}
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenDetails}
          className="flex h-[3.02vw] min-h-[2.7rem] w-[6.04vw] min-w-[5.5rem] items-center justify-center rounded-[0.42vw] bg-[#4F46E5] text-[1vw] font-medium text-white hover:bg-[#4338ca]"
        >
          Details
        </button>
      </div>
    </article>
  );
}

export default function FeaturedCoursesSection() {
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    async function loadFeaturedCourses() {
      try {
        const data = await coursesService.getFeaturedCourses();
        const normalized = (Array.isArray(data) ? data : data?.data || []).map(
          normalizeFeaturedCourse
        );
        setFeaturedCourses(normalized.slice(0, 3));
      } catch (error) {
        console.error("Failed to load featured courses:", error);
        setFeaturedCourses([]);
      }
    }

    loadFeaturedCourses();
  }, []);

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
        {featuredCourses.map((course) => (
          <FeaturedCard key={course.id || course.courseId} course={course} />
        ))}
      </div>
    </section>
  );
}