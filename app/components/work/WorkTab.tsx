"use client";

import { motion, type Variants } from "framer-motion";
import ProjectCard from "./ProjectCard";

const PROJECTS = [
  {
    name: "CultureConnect",
    description:
      "Mood-based café recommendation system using sentiment analysis & NLP. Ranked Top 50 at Bangkit Academy 2024.",
    stack: ["TensorFlow", "Python", "NLP", "Scikit-learn"],
    color: "#1e3cff",
  },
  {
    name: "PKBI Click",
    description:
      "Mobile HR app with geolocation attendance, leave requests, and secure login. Integrated backend APIs for nationwide data.",
    stack: ["Flutter", "Node.js", "PostgreSQL"],
    color: "#111111",
  },
  {
    name: "Portfolio Website",
    description:
      "This portfolio — built with Next.js 16, Tailwind CSS v4, GSAP animations, and Framer Motion.",
    stack: ["Next.js", "TypeScript", "GSAP", "Tailwind"],
    color: "#333333",
  },
  {
    name: "Coming Soon",
    description:
      "More projects in progress. Check back soon or reach out to collaborate on something exciting.",
    stack: [],
    color: "#888888",
  },
];

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

export default function WorkTab() {
  return (
    <motion.div
      key="work"
      initial="hidden"
      animate="visible"
      variants={container}
      className="px-4 py-4 sm:px-5"
    >
      {/*
        Mobile:  1 column
        Tablet+: 2 columns
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PROJECTS.map((project) => (
          <motion.div key={project.name} variants={item}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
