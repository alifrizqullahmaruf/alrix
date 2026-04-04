"use client";

import { motion } from "framer-motion";
import { FiUser, FiFileText, FiEdit2 } from "react-icons/fi";

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
    <div className="flex items-center justify-between px-5 py-3 bg-bg-white border-b border-neutral-light sticky top-0 z-10">
      {/* Avatar icon */}
      <div className="w-8 h-8 rounded-full bg-neutral-black flex items-center justify-center shrink-0">
        <span className="text-white text-xs font-bold font-poppins">A</span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mx-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="relative pb-1 text-sm font-medium font-poppins transition-colors"
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
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-full border border-neutral-light flex items-center justify-center hover:bg-bg-light transition-colors">
          <FiUser size={13} className="text-neutral-dark" />
        </button>
        <button className="w-8 h-8 rounded-full border border-neutral-light flex items-center justify-center hover:bg-bg-light transition-colors">
          <FiFileText size={13} className="text-neutral-dark" />
        </button>
        <button className="w-8 h-8 rounded-full border border-neutral-light flex items-center justify-center hover:bg-bg-light transition-colors">
          <FiEdit2 size={13} className="text-neutral-dark" />
        </button>
      </div>
    </div>
  );
}
