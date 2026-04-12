"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

function getSizes(W: number) {
  if (W < 480) return { letterSize: 44, iconSize: 20, gap: 5 };
  if (W < 768) return { letterSize: 60, iconSize: 28, gap: 7 };
  if (W < 1024) return { letterSize: 76, iconSize: 34, gap: 9 };
  return { letterSize: 88, iconSize: 42, gap: 11 };
}

const ROW1 = ["A", "L", "R", "I", "X"];
const ROW2 = ["F", "O", "L", "I", "O"];

const TECH = [
  { char: "{}", color: "#a5f3fc" },
  { char: "</>", color: "#fde68a" },
  { char: "=>", color: "#86efac" },
  { char: "()", color: "#f9a8d4" },
  { char: "#", color: "#c4b5fd" },
  { char: "[]", color: "#fdba74" },
];

type ShapeType = "circle" | "triangle" | "diamond" | "hexagon" | "star";
const GEO: { type: ShapeType; color: string }[] = [
  { type: "circle",   color: "rgba(255,255,255,0.55)" },
  { type: "triangle", color: "rgba(165,243,252,0.7)"  },
  { type: "diamond",  color: "rgba(253,224,71,0.7)"   },
  { type: "hexagon",  color: "rgba(134,239,172,0.7)"  },
  { type: "star",     color: "rgba(249,168,212,0.7)"  },
];

function drawGeo(
  ctx: CanvasRenderingContext2D,
  type: ShapeType,
  x: number, y: number,
  size: number, angle: number,
  color: string
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  if (type === "circle") {
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
  } else if (type === "triangle") {
    ctx.moveTo(0, -size / 2); ctx.lineTo(size / 2, size / 2); ctx.lineTo(-size / 2, size / 2); ctx.closePath();
  } else if (type === "diamond") {
    ctx.moveTo(0, -size / 2); ctx.lineTo(size / 2.5, 0); ctx.lineTo(0, size / 2); ctx.lineTo(-size / 2.5, 0); ctx.closePath();
  } else if (type === "hexagon") {
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      const px = (size / 2) * Math.cos(a), py = (size / 2) * Math.sin(a);
      if (i === 0) { ctx.moveTo(px, py); } else { ctx.lineTo(px, py); }
    }
    ctx.closePath();
  } else if (type === "star") {
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? size / 2 : size / 4;
      const a = (Math.PI / 5) * i - Math.PI / 2;
      const px = r * Math.cos(a), py = r * Math.sin(a);
      if (i === 0) { ctx.moveTo(px, py); } else { ctx.lineTo(px, py); }
    }
    ctx.closePath();
  }
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

interface EngineRef {
  cleanup?: () => void;
  requestOrientation?: () => void;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<EngineRef>({});
  const [showTiltBtn, setShowTiltBtn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const W = container.clientWidth;
    const H = container.clientHeight;
    if (W < 10 || H < 10) return;

    canvas.width = W;
    canvas.height = H;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { letterSize, iconSize, gap } = getSizes(W);
    const c = ctx; // non-null alias for use inside nested functions

    // ── Matter.js world — gravity starts at 0 (static display phase) ──
    const engine = Matter.Engine.create();
    engine.gravity.x = 0;
    engine.gravity.y = 0;
    const world = engine.world;

    // ── Layout helper: centers a row of chars at given y ──
    function layoutRow(chars: string[], cy: number) {
      c.font = `900 ${letterSize}px Poppins, sans-serif`;
      const charWidths = chars.map((ch) => c.measureText(ch).width);
      const bodyWidths = charWidths.map((w) => Math.max(w + 6, letterSize * 0.5));
      const totalW = bodyWidths.reduce((a, b) => a + b, 0) + gap * (chars.length - 1);
      let curX = (W - totalW) / 2;
      return chars.map((char, i) => {
        const bw = bodyWidths[i];
        const cx = curX + bw / 2;
        curX += bw + gap;
        return { char, cx, cy, bw, bh: letterSize * 1.0 };
      });
    }

    const letterBodies: Matter.Body[] = [];
    const letterMeta: { char: string }[] = [];

    // ── Two centered rows: ALRIX (top) and FOLIO (bottom) ──
    const row1Y = H * 0.30;
    const row2Y = H * 0.56;

    [...layoutRow(ROW1, row1Y), ...layoutRow(ROW2, row2Y)].forEach(({ char, cx, cy, bw, bh }) => {
      const body = Matter.Bodies.rectangle(cx, cy, bw, bh, {
        restitution: 0.55,
        friction: 0.25,
        frictionAir: 0.02,
        angle: 0,
        label: `letter:${char}`,
      });
      Matter.Body.setVelocity(body, { x: 0, y: 0 });
      letterBodies.push(body);
      letterMeta.push({ char });
    });

    // ── Tech symbols — evenly spaced row near bottom ──
    const techBodies: Matter.Body[] = [];
    const techMeta: { char: string; color: string }[] = [];
    const techY = H * 0.82;
    const techSpacing = W / (TECH.length + 1);

    TECH.forEach(({ char, color }, i) => {
      c.font = `700 ${iconSize}px monospace`;
      const bw = c.measureText(char).width + 16;
      const bh = iconSize * 1.2;
      const cx = techSpacing * (i + 1);
      const body = Matter.Bodies.rectangle(cx, techY, bw, bh, {
        restitution: 0.55,
        friction: 0.2,
        frictionAir: 0.02,
        angle: 0,
        label: `tech:${char}`,
      });
      Matter.Body.setVelocity(body, { x: 0, y: 0 });
      techBodies.push(body);
      techMeta.push({ char, color });
    });

    // ── Geo shapes — decorative positions: corners + top-center ──
    const geoBodies: Matter.Body[] = [];
    const geoMeta: { type: ShapeType; color: string; size: number }[] = [];
    const geoSize = iconSize * 0.9;

    const geoPositions = [
      { x: W * 0.06, y: H * 0.10 },
      { x: W * 0.94, y: H * 0.10 },
      { x: W * 0.05, y: H * 0.43 },
      { x: W * 0.95, y: H * 0.43 },
      { x: W * 0.50, y: H * 0.10 },
    ];

    GEO.forEach(({ type, color }, i) => {
      const pos = geoPositions[i];
      const body = Matter.Bodies.circle(pos.x, pos.y, geoSize / 2, {
        restitution: 0.65,
        friction: 0.15,
        frictionAir: 0.01,
        label: `geo:${type}`,
      });
      (body as Matter.Body & { geoSize: number }).geoSize = geoSize;
      Matter.Body.setVelocity(body, { x: 0, y: 0 });
      geoBodies.push(body);
      geoMeta.push({ type, color, size: geoSize });
    });

    // ── Walls ──
    const floor   = Matter.Bodies.rectangle(W / 2, H + 40, W * 3, 80, { isStatic: true });
    const wallL   = Matter.Bodies.rectangle(-40, H / 2, 80, H * 3, { isStatic: true });
    const wallR   = Matter.Bodies.rectangle(W + 40, H / 2, 80, H * 3, { isStatic: true });
    const ceiling = Matter.Bodies.rectangle(W / 2, -40, W * 3, 80, { isStatic: true });

    Matter.Composite.add(world, [
      ...letterBodies, ...techBodies, ...geoBodies,
      floor, wallL, wallR, ceiling,
    ]);

    // ── Mouse constraint (push & drag) ──
    const mouse = Matter.Mouse.create(canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Matter.Composite.add(world, mouseConstraint);

    // ── Render loop ──
    let animId: number;

    function render() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, W, H);

      Matter.Engine.update(engine, 1000 / 60);

      // Letters
      letterBodies.forEach((body, i) => {
        const { x, y } = body.position;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(body.angle);
        ctx.font = `900 ${letterSize}px Poppins, sans-serif`;
        ctx.fillStyle = "white";
        ctx.shadowColor = "rgba(255,255,255,0.45)";
        ctx.shadowBlur = 14;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(letterMeta[i].char, 0, 0);
        ctx.shadowBlur = 0;
        ctx.restore();
      });

      // Tech symbols
      techBodies.forEach((body, i) => {
        const { x, y } = body.position;
        const { char, color } = techMeta[i];
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(body.angle);
        ctx.font = `700 ${iconSize}px monospace`;
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(char, 0, 0);
        ctx.shadowBlur = 0;
        ctx.restore();
      });

      // Geo shapes
      geoBodies.forEach((body, i) => {
        const { x, y } = body.position;
        const size = (body as Matter.Body & { geoSize: number }).geoSize ?? iconSize;
        drawGeo(ctx, geoMeta[i].type, x, y, size, body.angle, geoMeta[i].color);
      });

      animId = requestAnimationFrame(render);
    }

    render();

    // ── After 1.5s: enable gravity → everything falls & stacks ──
    const tGravity = setTimeout(() => {
      engine.gravity.y = 1.2;
      const allBodies = [...letterBodies, ...techBodies, ...geoBodies];
      allBodies.forEach((body) => {
        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 5,
          y: body.velocity.y,
        });
      });
    }, 1500);

    // ── Device orientation: tilt to change gravity ──
    function handleOrientation(e: DeviceOrientationEvent) {
      const gamma = e.gamma ?? 0;
      const beta  = e.beta  ?? 0;
      engine.gravity.x = Math.max(-1, Math.min(1, gamma / 45));
      engine.gravity.y = Math.max(-1, Math.min(1, beta  / 45));
    }

    const isIOS =
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: unknown }).requestPermission === "function";

    if (!isIOS) {
      // Android / non-iOS: register immediately after gravity drop
      const tOrientation = setTimeout(() => {
        window.addEventListener("deviceorientation", handleOrientation);
      }, 2000);
      engineRef.current = { cleanup: () => clearTimeout(tOrientation) };
    } else {
      // iOS: expose handler so the button can trigger permission
      engineRef.current = {
        requestOrientation: () => {
          (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> })
            .requestPermission()
            .then((state) => {
              if (state === "granted") {
                window.addEventListener("deviceorientation", handleOrientation);
              }
            })
            .catch(() => {/* silently skip */});
        },
      };
      // Show the button after objects have settled
      const tBtn = setTimeout(() => setShowTiltBtn(true), 2000);
      engineRef.current.cleanup = () => clearTimeout(tBtn);
    }

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(tGravity);
      engineRef.current?.cleanup?.();
      window.removeEventListener("deviceorientation", handleOrientation);
      Matter.Engine.clear(engine);
      Matter.Composite.clear(world, false);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden"
      style={{ backgroundColor: "#1e3cff", aspectRatio: "4/3", minHeight: "260px" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ cursor: "grab" }}
      />
      {showTiltBtn && (
        <button
          onClick={() => engineRef.current?.requestOrientation?.()}
          className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-poppins font-semibold"
          style={{ background: "rgba(255,255,255,0.2)", color: "white", backdropFilter: "blur(6px)" }}
        >
          🌀 Enable Tilt
        </button>
      )}
    </div>
  );
}
