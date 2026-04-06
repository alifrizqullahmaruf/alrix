"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiGithub, FiExternalLink } from "react-icons/fi";

interface CropData {
  x: number; y: number; width: number; height: number;
}

interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
  imageUrl?: string;
  imageCrop?: CropData;
  github?: string;
  demo?: string;
}

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (project) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  const imgStyle = (crop?: CropData): React.CSSProperties =>
    crop
      ? {
          position: "absolute",
          width: `${(100 / crop.width) * 100}%`,
          height: `${(100 / crop.height) * 100}%`,
          left: `${(-crop.x / crop.width) * 100}%`,
          top: `${(-crop.y / crop.height) * 100}%`,
        }
      : { width: "100%", height: "100%", objectFit: "cover" };

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Mobile: full-width bottom sheet | Desktop: centered modal */}
          <motion.div
            key="modal"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-bg-white rounded-t-3xl overflow-hidden flex flex-col sm:hidden"
            style={{ maxHeight: "90dvh" }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-neutral-light" />
            </div>

            {/* Image */}
            <div className="w-full relative overflow-hidden bg-bg-light shrink-0" style={{ aspectRatio: "16/9" }}>
              {project.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.imageUrl} alt={project.name} style={imgStyle(project.imageCrop)} />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-neutral-light font-poppins font-bold text-5xl">
                    {project.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
              >
                <FiX size={14} className="text-neutral-black" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 pt-4 pb-safe">
              <h2 className="text-neutral-black font-poppins font-bold text-base mb-2">
                {project.name}
              </h2>
              <p className="text-neutral-medium font-poppins text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="mb-5">
                <p className="text-neutral-dark font-poppins font-semibold text-xs mb-2 uppercase tracking-wide">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-poppins font-medium"
                      style={{ background: "#f0f4ff", color: "#1e3cff" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pb-8">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-neutral-light text-xs font-poppins font-medium text-neutral-dark"
                  >
                    <FiGithub size={13} />
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-poppins font-semibold text-white"
                    style={{ background: "#1e3cff" }}
                  >
                    <FiExternalLink size={13} />
                    Live Demo
                  </a>
                )}
                {!project.github && !project.demo && (
                  <span className="text-neutral-medium text-xs font-poppins italic">Coming soon</span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Desktop: centered modal */}
          <motion.div
            key="modal-desktop"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[480px] max-h-[85vh] bg-bg-white rounded-2xl overflow-hidden flex-col hidden sm:flex"
          >
            <div className="w-full relative overflow-hidden bg-bg-light shrink-0" style={{ aspectRatio: "16/9" }}>
              {project.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.imageUrl} alt={project.name} style={imgStyle(project.imageCrop)} />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-neutral-light font-poppins font-bold text-5xl">
                    {project.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
              >
                <FiX size={14} className="text-neutral-black" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <h2 className="text-neutral-black font-poppins font-bold text-lg mb-2">
                {project.name}
              </h2>
              <p className="text-neutral-medium font-poppins text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="mb-5">
                <p className="text-neutral-dark font-poppins font-semibold text-xs mb-2 uppercase tracking-wide">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-poppins font-medium"
                      style={{ background: "#f0f4ff", color: "#1e3cff" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-neutral-light text-xs font-poppins font-medium text-neutral-dark hover:bg-bg-light transition-colors"
                  >
                    <FiGithub size={13} />
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-poppins font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ background: "#1e3cff" }}
                  >
                    <FiExternalLink size={13} />
                    Live Demo
                  </a>
                )}
                {!project.github && !project.demo && (
                  <span className="text-neutral-medium text-xs font-poppins italic">Coming soon</span>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
