import { FiSearch } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-5 py-4 bg-bg-white">
      {/* Avatar + Name */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-neutral-black flex items-center justify-center">
          <span className="text-white text-xs font-bold font-poppins">A</span>
        </div>
        <span className="text-neutral-black font-semibold text-sm font-poppins tracking-tight">
          Alrix
        </span>
      </div>

      {/* Title + Search */}
      <div className="flex items-center gap-3">
        <span className="text-neutral-dark text-sm font-medium font-poppins">
          Fullstack Developer Portfolio
        </span>
        <button className="w-8 h-8 rounded-full border border-neutral-light flex items-center justify-center hover:bg-bg-light transition-colors">
          <FiSearch className="text-neutral-dark" size={14} />
        </button>
      </div>
    </nav>
  );
}
