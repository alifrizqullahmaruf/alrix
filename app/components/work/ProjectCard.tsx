interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Project {
  id?: string;
  name: string;
  description: string;
  stack: string[];
  imageUrl?: string;
  imageCrop?: CropData;
  github?: string;
  demo?: string;
}

interface Props {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: Props) {
  const imgStyle: React.CSSProperties = project.imageCrop
    ? {
        position: "absolute",
        width: `${(100 / project.imageCrop.width) * 100}%`,
        height: `${(100 / project.imageCrop.height) * 100}%`,
        left: `${(-project.imageCrop.x / project.imageCrop.width) * 100}%`,
        top: `${(-project.imageCrop.y / project.imageCrop.height) * 100}%`,
      }
    : { width: "100%", height: "100%", objectFit: "cover" };

  return (
    <div
      onClick={onClick}
      className="rounded-2xl overflow-hidden bg-bg-card border border-neutral-light hover:shadow-md transition-all hover:-translate-y-0.5 group cursor-pointer"
    >
      {/* Image area — 16:9 ratio */}
      <div className="w-full relative overflow-hidden bg-bg-light" style={{ aspectRatio: "16/9" }}>
        {project.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.imageUrl}
            alt={project.name}
            style={imgStyle}
            className=" transition-transform duration-300"
          />
        ) : (
          <p className="absolute inset-0 flex items-center justify-center text-neutral-light font-poppins font-bold text-4xl tracking-wider">
            {project.name.slice(0, 2).toUpperCase()}
          </p>
        )}

        {/* Subtle gradient overlay at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-10 bg-linear-to-t from-black/10 to-transparent" />
      </div>

      {/* Card content */}
      <div className="p-4">
        <h4 className="text-neutral-black font-poppins font-bold text-sm mb-1">
          {project.name}
        </h4>
        <p className="text-neutral-medium font-poppins text-xs leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack badges — max 4 */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-full text-xs font-poppins font-medium"
              style={{ background: "#f0f4ff", color: "#1e3cff" }}
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="px-2 py-0.5 rounded-full text-xs font-poppins font-medium text-neutral-medium bg-bg-light border border-neutral-light">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        {/* Hint to open detail */}
        <p className="text-neutral-light font-poppins text-xs">
          Tap to view details →
        </p>
      </div>
    </div>
  );
}
