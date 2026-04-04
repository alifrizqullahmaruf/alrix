import Image from "next/image";

export default function ProfileCard() {
  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{ aspectRatio: "3/4", background: "#1a1a1a" }}
    >
      {/* Photo — grayscale filter like the reference */}
      <Image
        src="/GambarAlif.jpg"
        alt="Alif Rizqullah Maruf"
        fill
        className="object-cover object-center"
        style={{ filter: "grayscale(100%)" }}
        priority
      />

      {/* Dark gradient overlay so text stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <p className="text-white/70 text-xs font-poppins font-light">Hello,</p>
        <div>
          <h2
            className="text-white font-poppins font-bold leading-tight mb-3"
            style={{ fontSize: "clamp(26px, 5vw, 36px)" }}
          >
            My name
            <br />
            is Alrix
          </h2>
          <p className="text-white/60 text-xs font-poppins font-light leading-relaxed">
            Always learning. Always building.
          </p>
        </div>
      </div>
    </div>
  );
}
