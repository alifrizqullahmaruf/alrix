const EDUCATION = [
  {
    period: "2024",
    institution: "DeepLearning.AI",
    degree: "TensorFlow Developer Cert.",
    dark: true,
  },
  {
    period: "2022–Present",
    institution: "Universitas Gadjah Mada",
    degree: "Software Engineering Technology",
    note: "",
    dark: true,
  },
  {
    period: "2019–2022",
    institution: "SMA N 1 Yogyakarta",
    degree: "Science",
    dark: true,
  },
];

export default function EducationList() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-neutral-black font-poppins font-bold text-lg">
          Education
        </h3>
        <button className="w-7 h-7 rounded-full border border-neutral-light flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {EDUCATION.map((edu, i) => (
          <div
            key={i}
            className="rounded-2xl p-4"
            style={{ background: "#111111" }}
          >
            <div className="flex items-start justify-between mb-2">
              <span
                className="text-xs font-poppins font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "#1e3cff", color: "white" }}
              >
                {edu.period}
              </span>
              <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              </div>
            </div>
            <p className="text-white/50 text-xs font-poppins mb-1">
              {edu.institution}
            </p>
            <p className="text-white font-poppins font-bold text-sm">
              {edu.degree}
            </p>
            {edu.note && (
              <p className="text-white/40 text-xs font-poppins mt-1">
                {edu.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
