"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/hero/HeroSection";
import TabNavigation, { TabId } from "./components/layout/TabNavigation";
import AboutTab from "./components/about/AboutTab";
import ResumeTab from "./components/resume/ResumeTab";
import WorkTab from "./components/work/WorkTab";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("about");

  return (
    <div className="min-h-screen bg-bg-white max-w-2xl mx-auto">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "about" && <AboutTab key="about" />}
        {activeTab === "resume" && <ResumeTab key="resume" />}
        {activeTab === "work" && <WorkTab key="work" />}
      </AnimatePresence>
    </div>
  );
}
