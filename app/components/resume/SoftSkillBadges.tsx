"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

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

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const badgeVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 280, damping: 22 },
  },
};

export default function SoftSkillBadges() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="mb-4" ref={ref}>
      <h3 className="text-neutral-black font-poppins font-bold text-base mb-3">
        Softskill
      </h3>
      <motion.div
        className="flex flex-wrap gap-2"
        variants={container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {SOFTSKILLS.map((skill, i) => (
          <motion.span
            key={skill}
            variants={badgeVariant}
            whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
            className="px-3 py-1.5 rounded-full text-xs font-poppins font-semibold cursor-default"
            style={{
              background: COLORS[i % COLORS.length].bg,
              color: COLORS[i % COLORS.length].text,
            }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
