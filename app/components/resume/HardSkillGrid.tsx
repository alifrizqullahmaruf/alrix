import {
  DiJavascript1,
  DiPython,
  DiReact,
  DiNodejs,
  DiPostgresql,
  DiMysql,
  DiGit,
} from "react-icons/di";
import {
  SiTensorflow,
  SiFigma,
  SiTypescript,
  SiDocker,
  SiFlutter,
} from "react-icons/si";

const SKILLS = [
  { icon: DiJavascript1, label: "JavaScript", color: "#f7df1e" },
  { icon: DiPython, label: "Python", color: "#3776ab" },
  { icon: SiTypescript, label: "TypeScript", color: "#3178c6" },
  { icon: DiReact, label: "React", color: "#61dafb" },
  { icon: DiNodejs, label: "Node.js", color: "#339933" },
  { icon: SiFlutter, label: "Flutter", color: "#02569b" },
  { icon: DiPostgresql, label: "PostgreSQL", color: "#336791" },
  { icon: DiMysql, label: "MySQL", color: "#4479a1" },
  { icon: SiTensorflow, label: "TensorFlow", color: "#ff6f00" },
  { icon: DiGit, label: "Git", color: "#f05032" },
  { icon: SiFigma, label: "Figma", color: "#f24e1e" },
  { icon: SiDocker, label: "Docker", color: "#2496ed" },
];

export default function HardSkillGrid() {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-neutral-black font-poppins font-bold text-base">
          Hardskill
        </h3>
        <button className="w-7 h-7 rounded-full border border-neutral-light flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Icon grid */}
      <div className="rounded-2xl p-4 bg-bg-card border border-neutral-light">
        <div className="grid grid-cols-4 gap-3">
          {SKILLS.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 group"
              title={label}
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-neutral-light flex items-center justify-center group-hover:border-blue-main transition-colors shadow-sm">
                <Icon size={22} color={color} />
              </div>
              <span className="text-neutral-medium text-xs font-poppins text-center leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
