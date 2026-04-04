const EXPERIENCES = [
  {
    period: "2024",
    badge: "Sep–Dec 2024",
    company: "Bangkit Academy",
    role: "Machine Learning Cohort",
    bullets: [
      "Built ML models (CNN, GAN, NLP) with TensorFlow for real-world problems.",
      "Led CultureConnect, a mood-based café recommendation system.",
      "Ranked Top 50 nationally and awarded Best Presenter.",
    ],
    dateFrom: "Sep",
    dateTo: "Dec",
  },
  {
    period: "2024",
    badge: "Jul–Dec 2024",
    company: "PKBI",
    role: "Mobile App Developer",
    bullets: [
      "Developed PKBI Click, a mobile HR app with geolocation attendance & secure login.",
      "Integrated backend APIs to manage nationwide employee data.",
    ],
    dateFrom: "Jul",
    dateTo: "Dec",
  },
  {
    period: "2023–2024",
    badge: "Jul 2023–Jun 2024",
    company: "Universitas Gadjah Mada",
    role: "Teaching Assistant",
    bullets: [
      "Mentored students in web development, Python, and UI/UX design.",
      "Supervised Agile project teams across PM, Frontend, and Backend tracks.",
    ],
    dateFrom: "Jul",
    dateTo: "Jun",
  },
  {
    period: "2022–2023",
    badge: "Aug 2022–Jan 2023",
    company: "UGM Stock Club",
    role: "Head of Education Division",
    bullets: [
      "Organized workshops on stock market fundamentals and portfolio management.",
    ],
    dateFrom: "Aug",
    dateTo: "Jan",
  },
];

export default function ExperienceList() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-neutral-black font-poppins font-bold text-lg">
          Experience
        </h3>
        <button className="w-7 h-7 rounded-full border border-neutral-light flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {EXPERIENCES.map((exp, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 bg-bg-card border border-neutral-light hover:shadow-sm transition-shadow"
          >
            {/* Badge + icon */}
            <div className="flex items-start justify-between mb-2">
              <span
                className="text-xs font-poppins font-semibold text-white px-3 py-1 rounded-full"
                style={{ background: "#1e3cff" }}
              >
                {exp.badge}
              </span>
              <div className="w-6 h-6 rounded-full border border-neutral-light flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-neutral-light" />
              </div>
            </div>

            {/* Company + role */}
            <p className="text-neutral-medium text-xs font-poppins mb-0.5">
              {exp.company}
            </p>
            <p className="text-neutral-black text-sm font-poppins font-semibold mb-2">
              {exp.role}
            </p>

            {/* Bullets */}
            <ul className="mb-3 space-y-1">
              {exp.bullets.map((b, j) => (
                <li key={j} className="text-neutral-medium text-xs font-poppins leading-relaxed flex gap-1.5">
                  <span className="text-blue-main mt-0.5">•</span>
                  {b}
                </li>
              ))}
            </ul>

            {/* Timeline bar */}
            <div className="flex items-center justify-between">
              <span className="text-neutral-medium text-xs font-poppins">{exp.dateFrom}</span>
              <div className="flex-1 mx-2 h-0.5 bg-neutral-light rounded-full relative">
                <div className="absolute left-0 w-1.5 h-1.5 rounded-full bg-neutral-medium -top-0.5" />
                <div className="absolute right-0 w-1.5 h-1.5 rounded-full bg-neutral-medium -top-0.5" />
              </div>
              <span className="text-neutral-medium text-xs font-poppins">{exp.dateTo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
