import { FiMail, FiLinkedin, FiInstagram } from "react-icons/fi";

const CONTACTS = [
  {
    icon: FiMail,
    label: "alifrizqullahmaruf2003\n@mail.ugm.ac.id",
    href: "mailto:alifrizqullahmaruf2003@mail.ugm.ac.id",
    bg: "#111111",
    iconColor: "white",
  },
  {
    icon: FiLinkedin,
    label: "linkedin.com/in/alirizm/",
    href: "https://linkedin.com/in/alirizm/",
    bg: "#1e3cff",
    iconColor: "white",
  },
  {
    icon: FiInstagram,
    label: "@alifrizm",
    href: "https://instagram.com/alifrizm",
    bg: "#ffffff",
    iconColor: "#111111",
    border: true,
  },
];

export default function GetInTouchCards() {
  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-neutral-black font-poppins font-semibold text-base">
          Get In Touch
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

      {/*
        Mobile:  3 columns (compact)
        sm+:     3 columns (normal)
        On very small screens the label text truncates gracefully
      */}
      <div className="grid grid-cols-3 gap-2">
        {CONTACTS.map(({ icon: Icon, label, href, bg, iconColor, border }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl p-3 sm:p-4 flex flex-col justify-between transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: bg,
              border: border ? "1px solid #e0e0e0" : "none",
              minHeight: "90px",
            }}
          >
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center mb-2 sm:mb-3"
              style={{
                background:
                  bg === "#ffffff"
                    ? "#f5f5f5"
                    : "rgba(255,255,255,0.15)",
              }}
            >
              <Icon size={14} color={iconColor} />
            </div>
            <div
              className="w-6 sm:w-8 h-0.5 mb-1.5 sm:mb-2 rounded-full"
              style={{
                background:
                  bg === "#ffffff"
                    ? "#e0e0e0"
                    : "rgba(255,255,255,0.3)",
              }}
            />
            <p
              className="text-xs font-poppins font-light leading-tight break-all line-clamp-2"
              style={{
                color:
                  bg === "#ffffff"
                    ? "#888888"
                    : "rgba(255,255,255,0.7)",
                fontSize: "10px",
              }}
            >
              {label}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
