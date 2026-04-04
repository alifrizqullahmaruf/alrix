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
  { icon: DiJavascript1, color: "#f7df1e" },
  { icon: DiPython, color: "#3776ab" },
  { icon: SiTypescript, color: "#3178c6" },
  { icon: DiReact, color: "#61dafb" },
  { icon: DiNodejs, color: "#339933" },
  { icon: SiFlutter, color: "#54c5f8" },
  { icon: DiPostgresql, color: "#336791" },
  { icon: SiTensorflow, color: "#ff6f00" },
  { icon: DiGit, color: "#f05032" },
  { icon: SiFigma, color: "#f24e1e" },
  { icon: DiMysql, color: "#4479a1" },
  { icon: SiDocker, color: "#2496ed" },
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

      {/* Dark card matching reference style */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "#111111" }}>
        {/* Top: abstract workspace illustration (SVG) */}
        <div
          className="relative w-full flex items-center justify-center overflow-hidden"
          style={{ height: "110px", background: "#1a1a1a" }}
        >
          {/* Abstract desk/workspace SVG */}
          <svg viewBox="0 0 280 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Desk surface */}
            <rect x="0" y="70" width="280" height="40" fill="#222222" />
            {/* Laptop screen */}
            <rect x="80" y="20" width="120" height="75" rx="4" fill="#2a2a2a" stroke="#444" strokeWidth="1" />
            <rect x="86" y="26" width="108" height="62" rx="2" fill="#1e3cff" opacity="0.15" />
            {/* Code lines on screen */}
            <rect x="94" y="34" width="45" height="3" rx="1.5" fill="#1e3cff" opacity="0.8" />
            <rect x="94" y="41" width="70" height="3" rx="1.5" fill="#3b5bff" opacity="0.6" />
            <rect x="94" y="48" width="55" height="3" rx="1.5" fill="#1e3cff" opacity="0.5" />
            <rect x="94" y="55" width="80" height="3" rx="1.5" fill="#3b5bff" opacity="0.7" />
            <rect x="94" y="62" width="40" height="3" rx="1.5" fill="#1e3cff" opacity="0.4" />
            {/* Laptop base */}
            <rect x="70" y="93" width="140" height="5" rx="2" fill="#333" />
            {/* Coffee cup */}
            <rect x="220" y="55" width="28" height="32" rx="4" fill="#333" />
            <rect x="224" y="59" width="20" height="24" rx="2" fill="#1e3cff" opacity="0.2" />
            <path d="M248 65 Q258 65 258 72 Q258 79 248 79" stroke="#444" strokeWidth="2" fill="none" />
            {/* Notebook */}
            <rect x="24" y="60" width="42" height="32" rx="3" fill="#2a2a2a" stroke="#444" strokeWidth="1" />
            <rect x="30" y="66" width="28" height="2" rx="1" fill="#444" />
            <rect x="30" y="71" width="22" height="2" rx="1" fill="#444" />
            <rect x="30" y="76" width="26" height="2" rx="1" fill="#444" />
            {/* Small plant */}
            <rect x="240" y="48" width="6" height="10" rx="1" fill="#333" />
            <ellipse cx="243" cy="44" rx="10" ry="8" fill="#2d5a27" opacity="0.8" />
            <ellipse cx="237" cy="48" rx="7" ry="5" fill="#3a7a32" opacity="0.7" />
          </svg>
        </div>

        {/* Bottom: icon row */}
        <div className="px-3 py-3">
          <div className="flex flex-wrap gap-2 justify-center">
            {SKILLS.map(({ icon: Icon, color }, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                <Icon size={20} color={color} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
