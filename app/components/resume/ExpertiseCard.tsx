const EXPERTISE = [
  "Fullstack Web Dev",
  "Mobile (Flutter)",
  "Machine Learning",
  "API & Database Design",
];

export default function ExpertiseCard() {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-neutral-black font-poppins font-bold text-lg">
          Expertise
        </h3>
        <button className="w-7 h-7 rounded-full border border-neutral-light flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="rounded-2xl p-4 bg-bg-card border border-neutral-light">
        <p className="text-neutral-dark text-sm font-poppins leading-relaxed">
          {EXPERTISE.join(", ")}
        </p>
      </div>
    </div>
  );
}
