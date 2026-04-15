
const categories = [
    { name: "Development", icon: "../../../public/Development.png" },
    { name: "Design", icon: "../../../public/Design.png" },
    { name: "Business", icon: "../../../public/Business.png" },
    { name: "Data Science", icon: "../../../public/DataScience.png" },
    { name: "Marketing", icon: "../../../public/Marketing.png" },
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
  
  function CategoryChip({ icon, children }) {
    return (
      <button
        type="button"
        className="flex h-[2vw] items-center gap-[0.38vw] rounded-[0.52vw] bg-white px-[0.72vw] text-[0.84vw] text-[#666666]"
      >
        <img src={icon} alt="" className="w-[0.82vw]" />
        <span>{children}</span>
      </button>
    );
  }
  
  function TopicChip({ children }) {
    return (
      <button
        type="button"
        className="flex h-[2vw] items-center rounded-[0.52vw] bg-white px-[0.72vw] text-[0.84vw] text-[#666666]"
      >
        {children}
      </button>
    );
  }
  
  function InstructorChip({ name }) {
    return (
      <button
        type="button"
        className="flex h-[2vw] items-center gap-[0.45vw] rounded-[0.52vw] bg-white px-[0.55vw] text-[0.84vw] text-[#666666]"
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
  
  export default function FiltersSidebar() {
    return (
      <aside className="w-[19.73%] min-h-[47.6vw]">
        <div className="flex items-center gap-[1.1vw]">
          <h1 className="text-[2.15vw] font-semibold leading-none text-[#141414]">
            Filters
          </h1>
  
          <button type="button" className="text-[0.88vw] text-[#9a9a9a]">
            Clear All Filters ✕
          </button>
        </div>
  
        <div className="mt-[8.5%]">
          <h3 className="text-[1vw] font-medium text-[#4a4a4a]">Categories</h3>
  
          <div className="mt-[5.2%] flex flex-wrap gap-[0.62vw]">
            {categories.map((item) => (
              <CategoryChip key={item.name} icon={item.icon}>
                {item.name}
              </CategoryChip>
            ))}
          </div>
        </div>
  
        <div className="mt-[11.5%]">
          <h3 className="text-[1vw] font-medium text-[#4a4a4a]">Topics</h3>
  
          <div className="mt-[5.2%] flex flex-wrap gap-[0.62vw]">
            {topics.map((item) => (
              <TopicChip key={item}>{item}</TopicChip>
            ))}
          </div>
        </div>
  
        <div className="mt-[11.5%]">
          <h3 className="text-[1vw] font-medium text-[#4a4a4a]">Instructor</h3>
  
          <div className="mt-[5.2%] flex flex-col gap-[0.72vw]">
            {instructors.map((item) => (
              <InstructorChip key={item} name={item} />
            ))}
          </div>
        </div>
  
        <div className="mt-[12%] border-t border-black/10 pt-[4.5%] text-[0.84vw] text-[#9a9a9a]">
          0 Filters Active
        </div>
      </aside>
    );
  }