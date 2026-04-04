export default function HeroCategories() {
  const categories = ["#Frontend", "#Backend", "#Smart_Contract"];

  return (
    <div className="flex flex-col gap-3 pr-3 h-full justify-end pb-2">
      {/* Arrow — top */}
      <div>
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 sm:w-14 sm:h-14"
        >
          <line x1="8" y1="8" x2="68" y2="68" stroke="#111111" strokeWidth="12" strokeLinecap="round" />
          <polyline
            points="32,68 68,68 68,32"
            stroke="#111111"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Categories — below arrow */}
      <div className="flex flex-col gap-1">
        {categories.map((cat) => (
          <span
            key={cat}
            className="text-neutral-dark font-semibold font-poppins leading-tight text-lg sm:text-xl lg:text-2xl"
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}
