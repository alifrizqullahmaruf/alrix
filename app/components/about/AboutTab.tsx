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
      className="px-4 py-4 sm:px-5"
    >
      {/* Stack on mobile, side-by-side on sm+ */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Profile Card — full width on mobile, 38% on sm+ */}
        <div className="w-full sm:w-[38%] sm:shrink-0">
          <ProfileCard />
        </div>

        {/* Introduction + Contact — full width on mobile */}
        <div className="flex-1 flex flex-col gap-4">
          <IntroductionCard />
          <GetInTouchCards />
        </div>
      </div>
    </motion.div>
  );
}
