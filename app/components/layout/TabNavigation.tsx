"use client";

import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";

const CV_PATH = "/CV Alif Rizqullah Maruf - Software Engineer.pdf";

export type TabId = "about" | "resume" | "work";

const TABS: { id: TabId; label: string }[] = [
  { id: "about", label: "About me" },
  { id: "resume", label: "Resume" },
  { id: "work", label: "Work" },
];

interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function TabNavigation({
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-bg-white border-b border-neutral-light sticky top-0 z-10 sm:px-5">

      {/* Tabs */}
      <div className="flex items-center gap-4 mx-2 sm:gap-6 sm:mx-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="relative pb-1 text-xs sm:text-sm font-medium font-poppins transition-colors whitespace-nowrap"
            style={{
              color: activeTab === tab.id ? "#111111" : "#888888",
            }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-black rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <a
          href={CV_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-light items-center justify-center hover:bg-bg-light transition-colors hidden sm:flex"
          title="View & download CV"
        >
          <FiFileText size={12} className="text-neutral-dark" />
        </a>
      </div>
    </div>
  );
}
