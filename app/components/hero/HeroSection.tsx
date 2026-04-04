import HeroCanvas from "./HeroCanvas";
import HeroCategories from "./HeroCategories";
import { FiChevronDown } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="px-4 pb-2 sm:px-5">
      {/* Two-column layout: categories left (sm+), blue canvas right */}
      <div className="flex gap-3 items-stretch">
        {/* Left: arrow + categories — hidden on mobile, visible sm+ */}
        <div className="hidden sm:block sm:w-[18%] lg:w-[15%] shrink-0">
          <HeroCategories />
        </div>

        {/* Right: blue canvas — full width on mobile */}
        <div className="flex-1">
          <HeroCanvas />
        </div>
      </div>

      {/* Categories shown below canvas on mobile only */}
      <div className="flex gap-2 mt-3 sm:hidden flex-wrap">
        {["#Frontend", "#Backend", "#Smart_Contract"].map((cat) => (
          <span
            key={cat}
            className="text-neutral-dark text-xs font-medium font-poppins px-3 py-1 bg-bg-light rounded-full border border-neutral-light"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* See More */}
      <div className="flex justify-end items-center gap-2 mt-3 pr-1">
        <span className="text-neutral-dark text-sm font-medium font-poppins">
          See More
        </span>
        <div className="w-7 h-7 rounded-full border border-neutral-light flex items-center justify-center">
          <FiChevronDown className="text-neutral-dark" size={14} />
        </div>
      </div>
    </section>
  );
}
