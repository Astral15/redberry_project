import FiltersSidebar from "./FiltersSidebar";
import CoursesGrid from "./CoursesGrid";

export default function CoursesLayout() {
  return (
    <main className="mx-auto w-[81.56%] pt-[2.6%] pb-[7%]">
      <div className="flex items-center gap-[0.45vw] text-[0.92vw] text-[#6f6f6f]">
        <span>Home</span>
        <span>›</span>
        <span className="text-[#4F46E5]">Browse</span>
      </div>

      <div className="mt-[1.8%] flex items-start justify-between gap-[4.3%]">
        <FiltersSidebar />
        <CoursesGrid />
      </div>
    </main>
  );
}