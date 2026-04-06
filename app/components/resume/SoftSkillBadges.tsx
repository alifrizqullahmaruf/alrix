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
      <h3 className="text-neutral-black font-poppins font-bold text-base mb-3">
        Softskill
      </h3>
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
