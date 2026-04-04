const SOFTSKILLS = [
  "#Problem_Solving",
  "#Teamwork",
  "#Agile_Scrum",
  "#Leadership",
  "#Communication",
];

const COLORS = [
  { bg: "#dbeafe", text: "#1e40af" },
  { bg: "#dcfce7", text: "#166534" },
  { bg: "#fef9c3", text: "#854d0e" },
  { bg: "#fce7f3", text: "#9d174d" },
  { bg: "#ede9fe", text: "#5b21b6" },
];

export default function SoftSkillBadges() {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-neutral-black font-poppins font-bold text-base">
          Softskill
        </h3>
        <button className="w-7 h-7 rounded-full border border-neutral-light flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {SOFTSKILLS.map((skill, i) => (
          <span
            key={skill}
            className="px-3 py-1.5 rounded-full text-xs font-poppins font-semibold"
            style={{
              background: COLORS[i % COLORS.length].bg,
              color: COLORS[i % COLORS.length].text,
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
