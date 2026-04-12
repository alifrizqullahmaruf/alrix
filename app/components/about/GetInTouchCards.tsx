import { FiMail, FiLinkedin, FiInstagram } from "react-icons/fi";

const CONTACTS = [
  {
    icon: FiMail,
    href: "mailto:alifmaruf5923@gmail.com",
    bg: "#ffffff",
    iconColor: "#EA4335",
    border: true,
  },
  {
    icon: FiLinkedin,
    href: "https://linkedin.com/in/alirizm/",
    bg: "#0A66C2",
    iconColor: "white",
  },
  {
    icon: FiInstagram,
    href: "https://instagram.com/alifrizm",
    bg: "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%)",
    iconColor: "white",
  },
];

export default function GetInTouchCards() {
  return (
    <div>
      <h3 className="text-neutral-black font-poppins font-semibold text-base mb-3">
        Get In Touch
      </h3>

      <div className="grid grid-cols-3 gap-2">
        {CONTACTS.map(({ icon: Icon, href, bg, iconColor, border }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl flex items-center justify-center transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: bg,
              border: border ? "1px solid #e0e0e0" : "none",
              aspectRatio: "1/1",
            }}
          >
            <Icon size={20} color={iconColor} />
          </a>
        ))}
      </div>
    </div>
  );
}
