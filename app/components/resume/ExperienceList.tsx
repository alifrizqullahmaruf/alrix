const EXPERIENCES = [
  {
    period: "2025–Present",
    badge: "Sep 2025–Present",
    company: "Dolfin · AdvisorLauren",
    role: "Frontend Engineer — Internship",
    bullets: [
      "Integrated AdvisorLauren's AI-powered equity research into Woori Bank's MyData platform.",
      "Built in-app WebView delivering real-time stock insights, financial charts & sentiment analysis.",
      "Architected with Next.js App Router, ISR, lazy loading & reusable Tailwind components.",
    ],
    dateFrom: "Sep",
    dateTo: "Present",
  },
  {
    period: "2024",
    badge: "Sep–Dec 2024",
    company: "Bangkit Academy",
    role: "Machine Learning Cohort",
    bullets: [
      "Built CNN, GAN & NLP models with TensorFlow.",
      "Led CultureConnect — mood-based café recommender.",
      "Top 50 nationally · Best Presenter.",
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
      "Built PKBI Click — mobile HR app with geolocation & secure login.",
      "Integrated APIs for nationwide employee data.",
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
      "Mentored students in web dev, Python & UI/UX.",
      "Supervised Agile teams — PM, Frontend, Backend.",
    ],
    dateFrom: "Jul",
    dateTo: "Jun",
  },
];

export default function ExperienceList() {
  return (
    <div>
      <h3 className="text-neutral-black font-poppins font-bold text-lg mb-4">
        Experience
      </h3>

      <div className="flex flex-col gap-4">
        {EXPERIENCES.map((exp, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 bg-bg-card border border-neutral-light hover:shadow-sm transition-shadow"
          >
            {/* Badge */}
            <span
              className="text-xs font-poppins font-semibold text-white px-3 py-1 rounded-full inline-block mb-2"
              style={{ background: "#1e3cff" }}
            >
              {exp.badge}
            </span>

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
