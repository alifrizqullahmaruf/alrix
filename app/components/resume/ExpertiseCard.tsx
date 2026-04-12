const EXPERTISE = [
  "Fullstack Web Development",
  "Smart Contract Developer",
  "Machine Learning",
  "API & Database Design",
];

export default function ExpertiseCard() {
  return (
    <div className="mb-4">
      <h3 className="text-neutral-black font-poppins font-bold text-lg mb-3">
        Expertise
      </h3>
      <div className="flex flex-wrap gap-2">
        {EXPERTISE.map((item) => (
          <span
            key={item}
            className="px-3 py-1.5 rounded-full text-xs font-poppins font-semibold bg-bg-light border border-neutral-light text-neutral-dark"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
