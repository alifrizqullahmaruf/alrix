import HeroCanvas from "./HeroCanvas";
import HeroCategories from "./HeroCategories";
import { FiChevronDown } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="px-5 pb-2">
      {/* Two-column layout: categories left, blue canvas right */}
      <div className="flex gap-3 items-stretch">
        {/* Left: arrow + categories (~18% width) */}
        <div className="w-[18%] shrink-0">
          <HeroCategories />
        </div>

        {/* Right: blue canvas (~82% width) */}
        <div className="flex-1">
          <HeroCanvas />
        </div>
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
