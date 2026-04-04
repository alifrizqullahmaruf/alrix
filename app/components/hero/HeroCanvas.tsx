"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Letter {
  char: string;
  finalX: number;
  finalY: number;
  finalRotation: number;
  fontSize: number;
}

// Scattered final positions mirroring the reference design
const ALRIX_LETTERS: Letter[] = [
  { char: "A", finalX: 10, finalY: 8, finalRotation: -12, fontSize: 80 },
  { char: "L", finalX: 42, finalY: 2, finalRotation: 8, fontSize: 76 },
  { char: "R", finalX: 68, finalY: 15, finalRotation: -6, fontSize: 82 },
  { char: "I", finalX: 85, finalY: 5, finalRotation: 15, fontSize: 70 },
  { char: "X", finalX: 72, finalY: 38, finalRotation: -18, fontSize: 88 },
];

const FOLIO_LETTERS: Letter[] = [
  { char: "F", finalX: 5, finalY: 45, finalRotation: 10, fontSize: 78 },
  { char: "O", finalX: 28, finalY: 52, finalRotation: -8, fontSize: 84 },
  { char: "L", finalX: 52, finalY: 44, finalRotation: 14, fontSize: 76 },
  { char: "I", finalX: 70, finalY: 58, finalRotation: -20, fontSize: 72 },
  { char: "O", finalX: 50, finalY: 65, finalRotation: 6, fontSize: 86 },
];

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const allLetters = letterRefs.current.filter(Boolean);

      // Set initial state — letters start high above
      gsap.set(allLetters, {
        y: -300,
        rotation: () => Math.random() * 120 - 60,
        opacity: 0,
        scale: 0.6,
      });

      // Animate in with stagger + bounce
      gsap.to(allLetters, {
        y: 0,
        rotation: (i) => {
          const all = [...ALRIX_LETTERS, ...FOLIO_LETTERS];
          return all[i]?.finalRotation ?? 0;
        },
        opacity: 1,
        scale: 1,
        duration: 1.4,
        stagger: 0.07,
        ease: "bounce.out",
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const allLetters = [...ALRIX_LETTERS, ...FOLIO_LETTERS];

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "#1e3cff",
        aspectRatio: "4/3",
        minHeight: "280px",
      }}
    >
      {/* Scattered letters */}
      {allLetters.map((letter, i) => (
        <span
          key={`${letter.char}-${i}`}
          ref={(el) => {
            letterRefs.current[i] = el;
          }}
          className="absolute font-poppins font-extrabold text-white select-none leading-none"
          style={{
            left: `${letter.finalX}%`,
            top: `${letter.finalY}%`,
            fontSize: `${letter.fontSize}px`,
            lineHeight: 1,
          }}
        >
          {letter.char}
        </span>
      ))}

      {/* Year label */}
      <div className="absolute bottom-4 left-5">
        <span className="text-white font-poppins font-bold text-2xl tracking-widest opacity-90">
          2026
        </span>
        <div className="w-8 h-1 bg-white mt-1 opacity-70 rounded-full" />
      </div>
    </div>
  );
}
