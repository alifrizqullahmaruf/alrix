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
    <div className="min-h-screen bg-bg-white w-full max-w-sm mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* Tab Navigation */}
      <div id="main-content">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "about" && <AboutTab key="about" />}
        {activeTab === "resume" && <ResumeTab key="resume" />}
        {activeTab === "work" && <WorkTab key="work" />}
      </AnimatePresence>
    </div>
  );
}
