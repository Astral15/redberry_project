const categories = [
  { name: "Development", icon: "/Development.png" },
  { name: "Design", icon: "/Design.png" },
  { name: "Business", icon: "/Business.png" },
  { name: "Data Science", icon: "/DataScience.png" },
  { name: "Marketing", icon: "/Marketing.png" },
];

const topics = [
  "React",
  "TypeScript",
  "Phyton",
  "UX/UI",
  "Figma",
  "JavaScript",
  "Node.js",
  "Machine Learning",
  "Seo",
  "Analytics",
];

const instructors = [
  "Marilyn Mango",
  "Ryan Dorwart",
  "Roger Calzoni",
  "Zain Philips",
];

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
      <img src={icon} alt="" className="w-[0.82vw]" />
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

export default function FiltersSidebar({
  selectedCategories,
  setSelectedCategories,
  selectedTopics,
  setSelectedTopics,
  selectedInstructors,
  setSelectedInstructors,
}) {
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

  const activeFiltersCount =
    selectedCategories.length +
    selectedTopics.length +
    selectedInstructors.length;

  const hasActiveFilters = activeFiltersCount > 0;

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
          {categories.map((item) => (
            <CategoryChip
              key={item.name}
              icon={item.icon}
              selected={selectedCategories.includes(item.name)}
              onClick={() =>
                toggleItem(item.name, selectedCategories, setSelectedCategories)
              }
            >
              {item.name}
            </CategoryChip>
          ))}
        </div>
      </div>

      <div className="mt-[11.5%]">
        <h3 className="text-[1vw] font-medium text-[#4a4a4a]">Topics</h3>

        <div className="mt-[5.2%] flex flex-wrap gap-[0.62vw]">
          {topics.map((item) => (
            <TopicChip
              key={item}
              selected={selectedTopics.includes(item)}
              onClick={() => toggleItem(item, selectedTopics, setSelectedTopics)}
            >
              {item}
            </TopicChip>
          ))}
        </div>
      </div>

      <div className="mt-[11.5%]">
        <h3 className="text-[1vw] font-medium text-[#4a4a4a]">Instructor</h3>

        <div className="mt-[5.2%] flex flex-col gap-[0.72vw]">
          {instructors.map((item) => (
            <InstructorChip
              key={item}
              name={item}
              selected={selectedInstructors.includes(item)}
              onClick={() =>
                toggleItem(item, selectedInstructors, setSelectedInstructors)
              }
            />
          ))}
        </div>
      </div>

      <div className="mt-[12%] border-t border-black/10 pt-[4.5%] text-[0.84vw] text-[#9a9a9a]">
        {activeFiltersCount} Filters Active
      </div>
    </aside>
  );
}