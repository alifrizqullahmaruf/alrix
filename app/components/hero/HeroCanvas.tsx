"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

const WORD = "ALRIXFOLIO";
const YEAR = "2026";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const W = container.clientWidth;
    const H = container.clientHeight;
    canvas.width = W;
    canvas.height = H;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Matter.js setup ──
    const engine = Matter.Engine.create();
    const world = engine.world;

    // Start with zero gravity (floating phase)
    engine.gravity.y = 0;
    engine.gravity.x = 0;

    // ── Letter sizes ──
    const fontSize = Math.min(W * 0.13, 100);
    ctx.font = `900 ${fontSize}px Poppins, sans-serif`;

    // Measure each letter width
    const letters = WORD.split("").map((char) => {
      const metrics = ctx.measureText(char);
      const w = metrics.width + 8;
      const h = fontSize * 1.1;
      return { char, w, h };
    });

    // ── Spawn letters floating randomly in canvas ──
    const bodies = letters.map((letter) => {
      const x = Matter.Common.random(letter.w, W - letter.w);
      const y = Matter.Common.random(letter.h, H * 0.7);
      const angle = Matter.Common.random(-0.4, 0.4);

      const body = Matter.Bodies.rectangle(x, y, letter.w, letter.h, {
        restitution: 0.4,  // bounciness
        friction: 0.3,
        frictionAir: 0.02,
        angle,
        label: letter.char,
        render: { visible: false },
      });

      // Random float velocity
      Matter.Body.setVelocity(body, {
        x: Matter.Common.random(-1.5, 1.5),
        y: Matter.Common.random(-1.5, 1.5),
      });

      return body;
    });

    // ── Walls (floor + sides) ──
    const floor  = Matter.Bodies.rectangle(W / 2, H + 25, W, 50, { isStatic: true, label: "floor" });
    const wallL  = Matter.Bodies.rectangle(-25, H / 2, 50, H, { isStatic: true, label: "wallL" });
    const wallR  = Matter.Bodies.rectangle(W + 25, H / 2, 50, H, { isStatic: true, label: "wallR" });
    const ceiling = Matter.Bodies.rectangle(W / 2, -25, W, 50, { isStatic: true, label: "ceiling" });

    Matter.Composite.add(world, [...bodies, floor, wallL, wallR, ceiling]);

    // ── Mouse interaction ──
    const mouse = Matter.Mouse.create(canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Matter.Composite.add(world, mouseConstraint);

    // ── Custom render loop ──
    let animId: number;
    const colorMap: Record<string, string> = {};
    bodies.forEach((b) => {
      colorMap[b.id] = "white";
    });

    function render() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, W, H);

      // Draw each letter body
      bodies.forEach((body) => {
        const { x, y } = body.position;
        const angle = body.angle;
        const char = body.label;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Letter text
        ctx.font = `900 ${fontSize}px Poppins, sans-serif`;
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(char, 0, 0);

        ctx.restore();
      });

      // Draw year label
      ctx.save();
      ctx.font = `700 ${Math.max(16, W * 0.035)}px Poppins, sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.fillText(YEAR, 20, H - 12);
      // Underline
      const yw = ctx.measureText(YEAR).width;
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillRect(20, H - 8, yw, 3);
      ctx.restore();

      Matter.Engine.update(engine, 1000 / 60);
      animId = requestAnimationFrame(render);
    }
    render();

    // ── Phase 2: Enable gravity after 1 second ──
    const gravityTimer = setTimeout(() => {
      // Remove ceiling so letters can fall freely from top
      Matter.Composite.remove(world, ceiling);
      // Enable gravity
      engine.gravity.y = 1.8;
      // Give each body a random horizontal nudge for spread effect
      bodies.forEach((body) => {
        Matter.Body.setVelocity(body, {
          x: Matter.Common.random(-4, 4),
          y: Matter.Common.random(-2, 1),
        });
      });
    }, 1000);

    // ── Cleanup ──
    return () => {
      clearTimeout(gravityTimer);
      cancelAnimationFrame(animId);
      Matter.Engine.clear(engine);
      Matter.Composite.clear(world, false);
    };
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
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ cursor: "grab" }}
      />
    </div>
  );
}
