"use client";

import { motion, type Variants } from "framer-motion";
import ProfileCard from "./ProfileCard";
import IntroductionCard from "./IntroductionCard";
import GetInTouchCards from "./GetInTouchCards";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function AboutTab() {
  return (
    <motion.div
      key="about"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="px-5 py-4"
    >
      <div className="flex gap-4">
        {/* Left: Profile Card */}
        <div className="w-[38%] shrink-0">
          <ProfileCard />
        </div>

        {/* Right: Introduction + Contact */}
        <div className="flex-1 flex flex-col gap-4">
          <IntroductionCard />
          <GetInTouchCards />
        </div>
      </div>
    </motion.div>
  );
}
