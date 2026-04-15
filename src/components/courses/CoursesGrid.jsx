import { useMemo, useState } from "react";
import CourseGridCard from "./CourseGridCard";
import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination";

const categoryList = ["Development", "Design", "Business", "Data Science", "Marketing"];
const topicList = ["React", "TypeScript", "Phyton", "UX/UI", "Figma", "JavaScript", "Node.js", "Machine Learning", "Seo", "Analytics"];
const instructorList = ["Marilyn Mango", "Ryan Dorwart", "Roger Calzoni", "Zain Philips"];


const allCourses = Array.from({ length: 90 }, (_, index) => ({
  id: index + 1,
  title: `Advanced React & TypeScript Development ${index + 1}`,
  price: 250 + (index % 8) * 15,
  popularity: 100 - (index % 30),
  createdAt: 200 - index,
  category: categoryList[index % categoryList.length],
  topic: topicList[index % topicList.length],
  instructor: instructorList[index % instructorList.length],
}));

export default function CoursesGrid({
  selectedCategories,
  selectedTopics,
  selectedInstructors,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("Newest First");

  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(course.category);

      const topicMatch =
        selectedTopics.length === 0 || selectedTopics.includes(course.topic);

      const instructorMatch =
        selectedInstructors.length === 0 ||
        selectedInstructors.includes(course.instructor);

      return categoryMatch && topicMatch && instructorMatch;
    });
  }, [selectedCategories, selectedTopics, selectedInstructors]);

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
        return copied.sort((a, b) => b.createdAt - a.createdAt);
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
          {sortedCourses.length === 0
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

      <div className="mt-[1.5%] grid grid-cols-3 gap-x-[2.04%] gap-y-[2.1%]">
        {currentCourses.length > 0 ? (
          currentCourses.map((course) => (
            <CourseGridCard key={course.id} course={course} />
          ))
        ) : (
          <div className="col-span-3 py-[8%] text-center text-[1.1vw] text-[#8a8a8a]">
            No courses found
          </div>
        )}
      </div>

      {sortedCourses.length > 0 && (
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