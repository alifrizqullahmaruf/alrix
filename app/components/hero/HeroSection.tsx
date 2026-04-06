import HeroCanvas from "./HeroCanvas";
import HeroCategories from "./HeroCategories";

export default function HeroSection() {
  return (
    <section className="px-4 pb-2 sm:px-5">
      {/* Two-column layout: categories left (sm+), blue canvas right */}
      <div className="flex gap-3 items-stretch">
        {/* Left: arrow + categories — hidden on mobile, visible sm+ */}
        <div className="hidden sm:flex sm:w-[30%] lg:w-[28%] shrink-0 overflow-hidden">
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

    </section>
  );
}
