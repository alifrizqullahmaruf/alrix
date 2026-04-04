"use client";

import { motion, type Variants } from "framer-motion";
import ExperienceList from "./ExperienceList";
import ExpertiseCard from "./ExpertiseCard";
import HardSkillGrid from "./HardSkillGrid";
import SoftSkillBadges from "./SoftSkillBadges";
import EducationList from "./EducationList";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay: i * 0.08 },
  }),
};

export default function ResumeTab() {
  return (
    <motion.div
      key="resume"
      initial="hidden"
      animate="visible"
      className="px-5 py-4"
    >
      <div className="grid grid-cols-3 gap-4">
        {/* Column 1: Experience */}
        <motion.div variants={fadeUp} custom={0}>
          <ExperienceList />
        </motion.div>

        {/* Column 2: Expertise + Skills */}
        <motion.div variants={fadeUp} custom={1}>
          <ExpertiseCard />
          <HardSkillGrid />
          <SoftSkillBadges />
        </motion.div>

        {/* Column 3: Education */}
        <motion.div variants={fadeUp} custom={2}>
          <EducationList />
        </motion.div>
      </div>
    </motion.div>
  );
}
