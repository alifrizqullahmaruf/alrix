"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Letter {
  char: string;
  // Final position as % of container
  x: number;
  y: number;
  rotation: number;
  size: number;
}

// Mimic the reference: letters heavily overlapping, bottom-right cluster
// "ALRIX" top area, "FOLIO" bottom-right — very large, chaotic
const LETTERS: Letter[] = [
  // A — top-left, tilted
  { char: "A", x: -2, y: -5, rotation: -15, size: 110 },
  // L — top-center, slight tilt
  { char: "L", x: 22, y: -8, rotation: 8, size: 100 },
  // R — overlapping L, rotated
  { char: "R", x: 44, y: 2, rotation: -10, size: 115 },
  // I — thin, right area
  { char: "I", x: 72, y: -4, rotation: 12, size: 95 },
  // X — far right, big tilt
  { char: "X", x: 60, y: 28, rotation: -22, size: 120 },
  // F — middle-left
  { char: "F", x: 2, y: 38, rotation: 14, size: 105 },
  // O — center, heavy overlap
  { char: "O", x: 28, y: 44, rotation: -8, size: 118 },
  // L — right-center
  { char: "L", x: 55, y: 50, rotation: 10, size: 100 },
  // I — thin, tucked in
  { char: "I", x: 75, y: 42, rotation: -18, size: 90 },
  // O — bottom-right, biggest
  { char: "O", x: 45, y: 62, rotation: 6, size: 122 },
];

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = letterRefs.current.filter(Boolean);

      // Start: scattered above, invisible
      gsap.set(els, {
        y: () => gsap.utils.random(-400, -200),
        x: () => gsap.utils.random(-60, 60),
        rotation: () => gsap.utils.random(-80, 80),
        opacity: 0,
        scale: 0.4,
      });

      // Drop in with stagger — heavy bounce like physical letters falling
      gsap.to(els, {
        y: 0,
        x: 0,
        rotation: (i) => LETTERS[i]?.rotation ?? 0,
        opacity: 1,
        scale: 1,
        duration: 1.6,
        stagger: 0.06,
        ease: "bounce.out",
        delay: 0.15,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "#1e3cff",
        aspectRatio: "4/3",
        minHeight: "260px",
      }}
    >
      {/* Letters — absolutely positioned with % coords */}
      {LETTERS.map((letter, i) => (
        <span
          key={i}
          ref={(el) => { letterRefs.current[i] = el; }}
          className="absolute font-poppins font-extrabold text-white select-none"
          style={{
            left: `${letter.x}%`,
            top: `${letter.y}%`,
            fontSize: `${letter.size}px`,
            lineHeight: 1,
            transform: `rotate(${letter.rotation}deg)`,
            transformOrigin: "center center",
            willChange: "transform, opacity",
          }}
        >
          {letter.char}
        </span>
      ))}

      {/* 2026 label + underline — bottom-left like reference */}
      <div className="absolute bottom-4 left-5 z-10">
        <span className="text-white font-poppins font-bold text-xl sm:text-2xl tracking-widest opacity-90">
          2026
        </span>
        <div className="w-8 h-1 bg-white mt-1 opacity-60 rounded-full" />
      </div>
    </div>
  );
}
