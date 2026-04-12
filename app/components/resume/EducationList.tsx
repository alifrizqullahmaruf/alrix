const EDUCATION = [
  {
    period: "2022–Present",
    institution: "Universitas Gadjah Mada",
    degree: "Software Engineering Technology",
  },
];

export default function EducationList() {
  return (
    <div>
      <h3 className="text-neutral-black font-poppins font-bold text-lg mb-4">
        Education
      </h3>

      <div className="flex flex-col gap-3">
        {EDUCATION.map((edu, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 bg-bg-card border border-neutral-light hover:shadow-sm transition-shadow"
          >
            <span
              className="text-xs font-poppins font-semibold text-white px-2.5 py-1 rounded-full inline-block mb-2"
              style={{ background: "#1e3cff" }}
            >
              {edu.period}
            </span>
            <p className="text-neutral-medium text-xs font-poppins mb-1">
              {edu.institution}
            </p>
            <p className="text-neutral-black font-poppins font-semibold text-sm">
              {edu.degree}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
