"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  DiJavascript1, DiPython, DiReact,
  DiNodejs, DiPostgresql, DiMysql, DiGit,
} from "react-icons/di";
import {
  SiTensorflow, SiFigma, SiTypescript,
  SiDocker, SiFlutter,
} from "react-icons/si";

const SKILLS = [
  { icon: DiJavascript1, color: "#f7df1e" },
  { icon: DiPython,      color: "#3776ab" },
  { icon: SiTypescript,  color: "#3178c6" },
  { icon: DiReact,       color: "#61dafb" },
  { icon: DiNodejs,      color: "#339933" },
  { icon: SiFlutter,     color: "#54c5f8" },
  { icon: DiPostgresql,  color: "#336791" },
  { icon: SiTensorflow,  color: "#ff6f00" },
  { icon: DiGit,         color: "#f05032" },
  { icon: SiFigma,       color: "#f24e1e" },
  { icon: DiMysql,       color: "#4479a1" },
  { icon: SiDocker,      color: "#2496ed" },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const iconVariant: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

export default function HardSkillGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="mb-4" ref={ref}>
      <h3 className="text-neutral-black font-poppins font-bold text-base mb-3">
        Hardskill
      </h3>

      <div className="rounded-2xl border border-neutral-light p-4">
        <motion.div
          className="flex flex-wrap gap-2 justify-center"
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {SKILLS.map(({ icon: Icon, color }, i) => (
            <motion.div
              key={i}
              variants={iconVariant}
              whileHover={{
                scale: 1.2,
                boxShadow: `0 0 12px 2px ${color}55`,
                borderColor: `${color}88`,
                transition: { duration: 0.15 },
              }}
              className="w-10 h-10 rounded-xl bg-bg-light border border-neutral-light flex items-center justify-center cursor-default"
              style={{ willChange: "transform" }}
            >
              <Icon size={22} color={color} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
