export default function IntroductionCard() {
  return (
    <div className="mb-4">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-neutral-black font-poppins font-semibold text-base">
          Introduction
        </h3>
        <button className="w-7 h-7 rounded-full border border-neutral-light flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 4L6 8L10 4"
              stroke="#888"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Bio card */}
      <div
        className="rounded-2xl p-4 flex gap-3 items-start"
        style={{ background: "#f5f5f5" }}
      >
        <div className="flex-1">
          <p className="text-neutral-black font-poppins font-semibold text-sm mb-2">
            Fullstack Developer · Yogyakarta
          </p>
          <p className="text-neutral-medium font-poppins text-xs leading-relaxed">
            Software Engineering student at UGM. Passionate about building
            scalable apps — from web to mobile to ML.
          </p>
        </div>

        {/* Developer illustration */}
        {/* Illustration — developer at laptop, colorful like undraw style */}
        <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Chair */}
            <rect x="44" y="90" width="32" height="5" rx="2" fill="#e07b4f" />
            <rect x="54" y="95" width="4" height="14" rx="2" fill="#c96a3f" />
            <rect x="62" y="95" width="4" height="14" rx="2" fill="#c96a3f" />
            <rect x="46" y="107" width="28" height="4" rx="2" fill="#e07b4f" />
            {/* Chair back */}
            <rect x="40" y="68" width="6" height="26" rx="3" fill="#e07b4f" />
            {/* Laptop base */}
            <rect x="32" y="78" width="56" height="5" rx="2" fill="#555" />
            {/* Laptop screen */}
            <rect x="36" y="42" width="48" height="38" rx="4" fill="#2a2a2a" />
            <rect x="40" y="46" width="40" height="30" rx="2" fill="#1e3cff" opacity="0.9" />
            {/* Code lines on screen */}
            <rect x="44" y="51" width="18" height="2.5" rx="1.2" fill="white" opacity="0.9" />
            <rect x="44" y="56" width="28" height="2.5" rx="1.2" fill="#a5f3fc" opacity="0.8" />
            <rect x="48" y="61" width="22" height="2.5" rx="1.2" fill="#fde68a" opacity="0.8" />
            <rect x="48" y="66" width="16" height="2.5" rx="1.2" fill="#a5f3fc" opacity="0.7" />
            <rect x="44" y="71" width="10" height="2.5" rx="1.2" fill="white" opacity="0.6" />
            {/* Body */}
            <rect x="50" y="63" width="20" height="18" rx="4" fill="#f4845f" />
            {/* Shirt */}
            <rect x="48" y="68" width="24" height="14" rx="3" fill="#1e3cff" />
            {/* Left arm */}
            <path d="M48 72 Q38 74 36 80" stroke="#f4845f" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Right arm — pointing at screen */}
            <path d="M72 72 Q80 70 82 65" stroke="#f4845f" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Hand on keyboard area */}
            <circle cx="36" cy="81" r="4" fill="#f4845f" />
            <circle cx="82" cy="64" r="4" fill="#f4845f" />
            {/* Head */}
            <circle cx="60" cy="54" r="13" fill="#f4845f" />
            {/* Hair */}
            <ellipse cx="60" cy="43" rx="12" ry="6" fill="#2d1b0e" />
            <ellipse cx="52" cy="46" rx="5" ry="4" fill="#2d1b0e" />
            {/* Eyes */}
            <circle cx="56" cy="54" r="2" fill="#2d1b0e" />
            <circle cx="64" cy="54" r="2" fill="#2d1b0e" />
            {/* Smile */}
            <path d="M56 59 Q60 63 64 59" stroke="#c96a3f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* Floating sparkles — code energy */}
            <circle cx="98" cy="38" r="3" fill="#fde68a" opacity="0.9" />
            <circle cx="106" cy="52" r="2" fill="#a5f3fc" opacity="0.8" />
            <circle cx="14" cy="55" r="2.5" fill="#1e3cff" opacity="0.6" />
            <text x="90" y="35" fontSize="10" fill="#fde68a" opacity="0.9" fontFamily="monospace">&lt;/&gt;</text>
          </svg>
        </div>
      </div>
    </div>
  );
}
