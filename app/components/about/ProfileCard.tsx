export default function ProfileCard() {
  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{ aspectRatio: "3/4", background: "#1a1a1a" }}
    >
      {/* Placeholder gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #2a2a2a 0%, #111111 60%, #1a1a1a 100%)",
        }}
      />

      {/* Grayscale overlay texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, #555 0%, transparent 60%)",
        }}
      />

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <p className="text-white/60 text-xs font-poppins font-light">Hello,</p>
        <div>
          <h2 className="text-white font-poppins font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(28px, 5vw, 38px)" }}>
            My name{"\n"}is Alrix
          </h2>
          <p className="text-white/50 text-xs font-poppins font-light leading-relaxed">
            I consider myself a detail-oriented engineer who constantly seeks
            new skills and explores diverse tech stacks to deliver the best
            result in every project.
          </p>
        </div>
      </div>
    </div>
  );
}
