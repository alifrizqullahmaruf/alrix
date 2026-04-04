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
      className="px-4 py-4 sm:px-5"
    >
      {/*
        Mobile:  1 column (stacked)
        Tablet:  2 columns (experience | skills+education)
        Desktop: 3 columns (experience | skills | education)
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

        {/* Column 3: Education — on tablet merges into col 2 area */}
        <motion.div
          variants={fadeUp}
          custom={2}
          className="md:col-span-1 lg:col-span-1"
        >
          <EducationList />
        </motion.div>
      </div>
    </motion.div>
  );
}
