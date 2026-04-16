import { useEffect, useMemo, useState } from "react";
import { filtersService } from "../../api/filters.service";

function CategoryChip({ icon, children, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[2vw] items-center gap-[0.38vw] rounded-[0.52vw] border px-[0.72vw] text-[0.84vw] transition-colors ${
        selected
          ? "border-[#d9d5fb] bg-[#d9d5fb] text-[#4F46E5]"
          : "border-transparent bg-white text-[#666666] hover:border-[#cfcafc] hover:bg-[#f6f5ff] hover:text-[#4F46E5]"
      }`}
    >
      {icon ? <img src={icon} alt="" className="w-[0.82vw]" /> : null}
      <span>{children}</span>
    </button>
  );
}

function TopicChip({ children, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[2vw] items-center rounded-[0.52vw] border px-[0.72vw] text-[0.84vw] transition-colors ${
        selected
          ? "border-[#d9d5fb] bg-[#d9d5fb] text-[#4F46E5]"
          : "border-transparent bg-white text-[#666666] hover:border-[#cfcafc] hover:bg-[#f6f5ff] hover:text-[#4F46E5]"
      }`}
    >
      {children}
    </button>
  );
}

function InstructorChip({ name, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[2vw] items-center gap-[0.45vw] rounded-[0.52vw] border px-[0.55vw] text-[0.84vw] transition-colors ${
        selected
          ? "border-[#4F46E5] bg-white text-[#4F46E5]"
          : "border-transparent bg-white text-[#666666] hover:border-[#cfcafc] hover:bg-[#f6f5ff] hover:text-[#4F46E5]"
      }`}
    >
      <img
        src="/instructor.png"
        alt={name}
        className="h-[1.12vw] w-[1.12vw] rounded-full"
      />
      <span>{name}</span>
    </button>
  );
}

function dedupeByIdOrName(items = []) {
  const map = new Map();

  items.forEach((item) => {
    const id = item?.id ?? item?.value ?? null;
    const name = item?.name ?? item?.title ?? item?.full_name ?? String(id ?? "");
    const key = id ?? name.toLowerCase();

    if (!map.has(key)) {
      map.set(key, {
        ...item,
        normalizedId: id ?? name,
        normalizedLabel: name,
      });
    }
  });

  return Array.from(map.values());
}

export default function FiltersSidebar({
  selectedCategories,
  setSelectedCategories,
  selectedTopics,
  setSelectedTopics,
  selectedInstructors,
  setSelectedInstructors,
}) {
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleItem = (value, selectedValues, setter) => {
    setter(
      selectedValues.includes(value)
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues, value]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedTopics([]);
    setSelectedInstructors([]);
  };

  useEffect(() => {
    async function loadFilters() {
      setIsLoading(true);

      try {
        const [categoriesData, topicsData, instructorsData] = await Promise.all([
          filtersService.getCategories(),
          filtersService.getTopics(),
          filtersService.getInstructors(),
        ]);

        const rawCategories = Array.isArray(categoriesData)
          ? categoriesData
          : categoriesData?.data || [];

        const rawTopics = Array.isArray(topicsData)
          ? topicsData
          : topicsData?.data || [];

        const rawInstructors = Array.isArray(instructorsData)
          ? instructorsData
          : instructorsData?.data || [];

        setCategories(dedupeByIdOrName(rawCategories));
        setTopics(dedupeByIdOrName(rawTopics));
        setInstructors(dedupeByIdOrName(rawInstructors));
      } catch (error) {
        console.error("Failed to load filters:", error);
        setCategories([]);
        setTopics([]);
        setInstructors([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadFilters();
  }, []);

  const activeFiltersCount =
    selectedCategories.length +
    selectedTopics.length +
    selectedInstructors.length;

  const hasActiveFilters = activeFiltersCount > 0;

  const visibleCategories = useMemo(() => categories, [categories]);
  const visibleTopics = useMemo(() => topics, [topics]);
  const visibleInstructors = useMemo(() => instructors, [instructors]);

  return (
    <aside className="w-[19.73%] min-h-[47.6vw]">
      <div className="flex items-center gap-[1.1vw]">
        <h1 className="text-[2.15vw] font-semibold leading-none text-[#141414]">
          Filters
        </h1>

        <button
          type="button"
          onClick={clearAllFilters}
          className={`text-[0.88vw] transition-colors ${
            hasActiveFilters
              ? "text-[#4F46E5] hover:text-[#4338ca]"
              : "text-[#9a9a9a]"
          }`}
        >
          Clear All Filters ✕
        </button>
      </div>

      <div className="mt-[8.5%]">
        <h3 className="text-[1vw] font-medium text-[#4a4a4a]">Categories</h3>

        <div className="mt-[5.2%] flex flex-wrap gap-[0.62vw]">
          {isLoading ? (
            <p className="text-[0.9vw] text-[#9a9a9a]">Loading...</p>
          ) : (
            visibleCategories.map((item) => (
              <CategoryChip
                key={String(item.normalizedId)}
                icon={item.icon || null}
                selected={selectedCategories.includes(item.normalizedId)}
                onClick={() =>
                  toggleItem(
                    item.normalizedId,
                    selectedCategories,
                    setSelectedCategories
                  )
                }
              >
                {item.normalizedLabel}
              </CategoryChip>
            ))
          )}
        </div>
      </div>

      <div className="mt-[11.5%]">
        <h3 className="text-[1vw] font-medium text-[#4a4a4a]">Topics</h3>

        <div className="mt-[5.2%] flex flex-wrap gap-[0.62vw]">
          {isLoading ? (
            <p className="text-[0.9vw] text-[#9a9a9a]">Loading...</p>
          ) : (
            visibleTopics.map((item) => (
              <TopicChip
                key={String(item.normalizedId)}
                selected={selectedTopics.includes(item.normalizedId)}
                onClick={() =>
                  toggleItem(item.normalizedId, selectedTopics, setSelectedTopics)
                }
              >
                {item.normalizedLabel}
              </TopicChip>
            ))
          )}
        </div>
      </div>

      <div className="mt-[11.5%]">
        <h3 className="text-[1vw] font-medium text-[#4a4a4a]">Instructor</h3>

        <div className="mt-[5.2%] flex flex-col gap-[0.72vw]">
          {isLoading ? (
            <p className="text-[0.9vw] text-[#9a9a9a]">Loading...</p>
          ) : (
            visibleInstructors.map((item) => (
              <InstructorChip
                key={String(item.normalizedId)}
                name={item.normalizedLabel}
                selected={selectedInstructors.includes(item.normalizedId)}
                onClick={() =>
                  toggleItem(
                    item.normalizedId,
                    selectedInstructors,
                    setSelectedInstructors
                  )
                }
              />
            ))
          )}
        </div>
      </div>

      <div className="mt-[12%] border-t border-black/10 pt-[4.5%] text-[0.84vw] text-[#9a9a9a]">
        {activeFiltersCount} Filters Active
      </div>
    </aside>
  );
}