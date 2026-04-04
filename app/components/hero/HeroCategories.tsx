export default function HeroCategories() {
  const categories = ["#Frontend", "#Backend", "#Smart_Contract"];

  return (
    <div className="flex flex-col justify-between h-full py-2 pr-3">
      {/* Big dramatic diagonal arrow — fills most of the panel */}
      <div className="flex-1 flex items-start justify-center pt-2">
        <svg
          viewBox="0 0 100 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-22"
        >
          {/* Thick diagonal arrow pointing bottom-right */}
          <line
            x1="10"
            y1="10"
            x2="88"
            y2="100"
            stroke="#111111"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Arrowhead */}
          <polyline
            points="48,100 88,100 88,58"
            stroke="#111111"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Hashtag categories */}
      <div className="flex flex-col gap-0.5 pb-2">
        {categories.map((cat) => (
          <span
            key={cat}
            className="text-neutral-dark font-medium font-poppins leading-6"
            style={{ fontSize: "clamp(9px, 1.4vw, 13px)" }}
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}
