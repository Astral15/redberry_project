import { useMemo, useState } from "react";
import CourseGridCard from "./CourseGridCard";
import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination";

const allCourses = Array.from({ length: 90 }, (_, index) => ({
  id: index + 1,
  title: `Advanced React & TypeScript Development ${index + 1}`,
  price: 299 + (index % 7) * 10,
  popularity: 100 - index,
  createdAt: 90 - index,
}));

export default function CoursesGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("Newest First");

  const coursesPerPage = 9;
  const totalPages = Math.ceil(allCourses.length / coursesPerPage);

  const sortedCourses = useMemo(() => {
    const copied = [...allCourses];

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
  }, [selectedSort]);

  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = sortedCourses.slice(startIndex, startIndex + coursesPerPage);

  return (
    <section className="w-[76.2%]">
      <div className="flex items-center justify-between">
        <p className="text-[0.92vw] text-[#6f6f6f]">Showing 9 out of 90</p>

        <SortDropdown
          selected={selectedSort}
          onChange={(value) => {
            setSelectedSort(value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="mt-[1.5%] grid grid-cols-3 gap-x-[2.04%] gap-y-[2.1%]">
        {currentCourses.map((course) => (
          <CourseGridCard key={course.id} course={course} />
        ))}
      </div>

      <div className="mt-[5.8%] flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}