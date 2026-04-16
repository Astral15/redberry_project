import { useEffect, useMemo, useState } from "react";
import CourseGridCard from "./CourseGridCard";
import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination";
import { coursesService } from "../../api/courses.service";

function normalizeCourse(course) {
  const categoryId =
    course?.category?.id ?? course?.category_id ?? course?.categoryId ?? null;
  const topicId =
    course?.topic?.id ?? course?.topic_id ?? course?.topicId ?? null;
  const instructorId =
    course?.instructor?.id ?? course?.instructor_id ?? course?.instructorId ?? null;

  return {
    id: course?.id,
    courseId: course?.id ?? course?.courseId,
    title: course?.title || "Untitled Course",
    price: Number(course?.price ?? 0),
    popularity: Number(course?.popularity ?? 0),
    createdAt: course?.created_at || course?.createdAt || course?.id || 0,
    category: course?.category?.name || course?.category || "Uncategorized",
    categoryId,
    topic: course?.topic?.name || course?.topic || "",
    topicId,
    instructor:
      course?.instructor?.name || course?.instructor || "Unknown",
    instructorId,
    duration: course?.duration || course?.length || "12 Weeks",
    rating: Number(course?.rating ?? 4.9),
    image: course?.image || course?.thumbnail || "/course.png",
    description: course?.description || "",
    raw: course,
  };
}

function matchesSelected(selectedValues, value) {
  if (selectedValues.length === 0) return true;
  return selectedValues.includes(value);
}

export default function CoursesGrid({
  selectedCategories,
  selectedTopics,
  selectedInstructors,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("Newest First");
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedTopics, selectedInstructors, selectedSort]);

  useEffect(() => {
    async function loadCourses() {
      setIsLoading(true);
      setLoadError("");

      try {
        const allCourses = [];
        let page = 1;
        let keepLoading = true;

        while (keepLoading && allCourses.length < 90) {
          const data = await coursesService.getCourses({ page });

          const list = Array.isArray(data) ? data : data?.data || [];
          const normalized = list.map(normalizeCourse);

          allCourses.push(...normalized);

          if (list.length === 0 || list.length < 10) {
            keepLoading = false;
          } else {
            page += 1;
          }
        }

        setCourses(allCourses.slice(0, 90));
      } catch (error) {
        console.error("Failed to load courses:", error);
        setLoadError(error?.data?.message || error?.message || "Failed to load courses");
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const categoryMatch = matchesSelected(selectedCategories, course.categoryId);
      const topicMatch = matchesSelected(selectedTopics, course.topicId);
      const instructorMatch = matchesSelected(selectedInstructors, course.instructorId);

      return categoryMatch && topicMatch && instructorMatch;
    });
  }, [courses, selectedCategories, selectedTopics, selectedInstructors]);

  const sortedCourses = useMemo(() => {
    const copied = [...filteredCourses];

    switch (selectedSort) {
      case "Price: Low to High":
        return copied.sort((a, b) => a.price - b.price);

      case "Price: High to Low":
        return copied.sort((a, b) => b.price - a.price);

      case "Most Popular":
        return copied.sort((a, b) => b.popularity - a.popularity);

      case "Title: A-Z":
        return copied.sort((a, b) => a.title.localeCompare(b.title));

      case "Newest First":
      default:
        return copied.sort((a, b) => {
          const aValue =
            typeof a.createdAt === "string"
              ? new Date(a.createdAt).getTime()
              : Number(a.createdAt) || 0;

          const bValue =
            typeof b.createdAt === "string"
              ? new Date(b.createdAt).getTime()
              : Number(b.createdAt) || 0;

          return bValue - aValue;
        });
    }
  }, [filteredCourses, selectedSort]);

  const coursesPerPage = 9;
  const totalPages = Math.max(1, Math.ceil(sortedCourses.length / coursesPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * coursesPerPage;
  const currentCourses = sortedCourses.slice(startIndex, startIndex + coursesPerPage);

  return (
    <section className="w-[76.2%]">
      <div className="flex items-center justify-between">
        <p className="text-[0.92vw] text-[#6f6f6f]">
          {isLoading
            ? "Loading courses..."
            : sortedCourses.length === 0
            ? "Showing 0 out of 0"
            : `Showing ${currentCourses.length} out of ${sortedCourses.length}`}
        </p>

        <SortDropdown
          selected={selectedSort}
          onChange={(value) => {
            setSelectedSort(value);
            setCurrentPage(1);
          }}
        />
      </div>

      {loadError && (
        <div className="mt-[1.5%] rounded-[0.6vw] bg-white px-[2%] py-[2%] text-[0.95vw] text-[#E45A5A]">
          {loadError}
        </div>
      )}

      <div className="mt-[1.5%] grid grid-cols-3 gap-x-[2.04%] gap-y-[2.1%]">
        {isLoading ? (
          <div className="col-span-3 py-[8%] text-center text-[1.1vw] text-[#8a8a8a]">
            Loading courses...
          </div>
        ) : currentCourses.length > 0 ? (
          currentCourses.map((course) => (
            <CourseGridCard key={course.courseId || course.id} course={course} />
          ))
        ) : (
          <div className="col-span-3 py-[8%] text-center text-[1.1vw] text-[#8a8a8a]">
            No courses found
          </div>
        )}
      </div>

      {!isLoading && sortedCourses.length > 0 && (
        <div className="mt-[5.8%] flex justify-center">
          <Pagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </section>
  );
}