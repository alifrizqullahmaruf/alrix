interface Project {
  name: string;
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
  color: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-bg-card border border-neutral-light hover:shadow-md transition-all hover:-translate-y-0.5 group">
      {/* Placeholder image area */}
      <div
        className="w-full flex items-center justify-center relative overflow-hidden"
        style={{ height: "160px", background: project.color }}
      >
        {/* Decorative abstract shape */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
            style={{ background: "rgba(255,255,255,0.3)" }}
          />
          <div
            className="absolute top-4 right-4 w-16 h-16 rounded-2xl rotate-12"
            style={{ background: "rgba(255,255,255,0.2)" }}
          />
        </div>
        <p className="text-white/70 font-poppins font-bold text-3xl tracking-wider z-10 group-hover:scale-105 transition-transform">
          {project.name.slice(0, 2).toUpperCase()}
        </p>
      </div>

      {/* Card content */}
      <div className="p-4">
        <h4 className="text-neutral-black font-poppins font-bold text-sm mb-1">
          {project.name}
        </h4>
        <p className="text-neutral-medium font-poppins text-xs leading-relaxed mb-3">
          {project.description}
        </p>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-full text-xs font-poppins font-medium"
              style={{ background: "#f0f4ff", color: "#1e3cff" }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-1.5 rounded-xl border border-neutral-light text-xs font-poppins font-medium text-neutral-dark hover:bg-bg-light transition-colors"
            >
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-1.5 rounded-xl text-xs font-poppins font-semibold text-white transition-colors hover:opacity-90"
              style={{ background: "#1e3cff" }}
            >
              Live Demo
            </a>
          )}
          {!project.github && !project.demo && (
            <span className="text-neutral-medium text-xs font-poppins italic">
              Coming soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
