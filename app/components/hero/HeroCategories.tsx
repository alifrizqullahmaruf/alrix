export default function HeroCategories() {
  const categories = [
    "#Frontend",
    "#Backend",
    "#Smart_Contract",
  ];

  return (
    <div className="flex flex-col justify-between h-full py-4 pr-4">
      {/* Diagonal Arrow */}
      <div className="mb-6">
        <div className="w-16 h-16 bg-neutral-black flex items-center justify-center rounded-sm">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6L26 26M26 26V10M26 26H10"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Hashtag Categories */}
      <div className="flex flex-col gap-1">
        {categories.map((cat) => (
          <span
            key={cat}
            className="text-neutral-dark text-sm font-medium font-poppins leading-6"
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}
