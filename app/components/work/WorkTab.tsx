"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProjectCard, { type Project } from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

export default function WorkTab() {
  const [projects, setProjects] = useState<(Project & { id: string; order: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<(Project & { id: string }) | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const q = query(collection(db, "projects"), orderBy("order", "asc"));
        const snap = await getDocs(q);
        const data = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Project & { order: number }, "id">) }));
        setProjects(data);
      } catch {
        // Firestore empty or offline
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-neutral-medium font-poppins text-sm">Loading projects...</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-neutral-medium font-poppins text-sm">No projects yet.</p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        key="work"
        initial="hidden"
        animate="visible"
        variants={container}
        className="px-4 py-4 sm:px-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {projects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <ProjectCard
                project={project}
                onClick={() => setSelected(project)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <ProjectDetailModal
        project={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
