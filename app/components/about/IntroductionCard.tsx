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
        <div className="shrink-0 w-14 h-14">
          <svg
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Simple developer at laptop illustration */}
            <rect x="15" y="40" width="50" height="32" rx="4" fill="#1e3cff" opacity="0.15" />
            <rect x="20" y="44" width="40" height="24" rx="2" fill="#1e3cff" opacity="0.3" />
            <rect x="24" y="48" width="32" height="2" rx="1" fill="#1e3cff" />
            <rect x="24" y="52" width="24" height="2" rx="1" fill="#1e3cff" opacity="0.6" />
            <rect x="24" y="56" width="28" height="2" rx="1" fill="#1e3cff" opacity="0.4" />
            {/* Head */}
            <circle cx="40" cy="26" r="10" fill="#f4a261" />
            {/* Body */}
            <rect x="30" y="35" width="20" height="8" rx="2" fill="#333" />
            {/* Arms */}
            <rect x="18" y="38" width="12" height="3" rx="1.5" fill="#f4a261" />
            <rect x="50" y="38" width="12" height="3" rx="1.5" fill="#f4a261" />
          </svg>
        </div>
      </div>
    </div>
  );
}
