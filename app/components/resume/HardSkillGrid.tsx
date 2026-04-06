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
      <h3 className="text-neutral-black font-poppins font-bold text-base mb-3">
        Hardskill
      </h3>

      <div className="rounded-2xl border border-neutral-light p-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {SKILLS.map(({ icon: Icon, color }, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-xl bg-bg-light border border-neutral-light flex items-center justify-center"
            >
              <Icon size={22} color={color} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
