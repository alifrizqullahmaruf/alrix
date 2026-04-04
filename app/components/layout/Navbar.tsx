import Image from "next/image";
import { FiSearch } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-4 bg-bg-white sm:px-5">
      {/* Icon + Name */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 rounded-full bg-neutral-black flex items-center justify-center shrink-0 overflow-hidden p-1">
          <Image
            src="/Icon.png"
            alt="Alrix logo"
            width={28}
            height={28}
            className="invert object-contain"
          />
        </div>
        <span className="text-neutral-black font-semibold text-sm font-poppins tracking-tight">
          Alrix
        </span>
      </div>

      {/* Title + Search */}
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-neutral-dark text-xs sm:text-sm font-medium font-poppins hidden sm:block">
          Fullstack Developer Portfolio
        </span>
        <span className="text-neutral-dark text-xs font-medium font-poppins sm:hidden">
          Portfolio
        </span>
        <button className="w-8 h-8 rounded-full border border-neutral-light flex items-center justify-center hover:bg-bg-light transition-colors shrink-0">
          <FiSearch className="text-neutral-dark" size={14} />
        </button>
      </div>
    </nav>
  );
}
