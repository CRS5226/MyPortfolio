"use client";

import { useEffect, useRef } from "react";

/* Deterministic price-like curve using nested sines — no Math.random at render time */
function generatePoints(count: number, w: number, h: number): string {
  const mid = h * 0.5;
  return Array.from({ length: count }, (_, i) => {
    const x = (i / (count - 1)) * w;
    const t = i / count;
    const y =
      mid +
      Math.sin(t * 14) * (h * 0.12) +
      Math.sin(t * 31 + 1.2) * (h * 0.06) +
      Math.sin(t * 7.5 + 0.5) * (h * 0.09) +
      Math.sin(t * 53 + 2.1) * (h * 0.03);
    return `${x},${y}`;
  }).join(" ");
}

export default function MarketLine() {
  const svgRef = useRef<SVGPolylineElement>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const len = el.getTotalLength?.() ?? 2000;
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = `${len}`;
    el.style.animation = "marketDraw 3s ease-out forwards, marketDrift 12s 3s ease-in-out infinite";
  }, []);

  const W = 1200;
  const H = 160;
  const points = generatePoints(80, W, H);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-20 w-full pointer-events-none"
      style={{ height: 160, opacity: 0.09 }}
      aria-hidden
    >
      <defs>
        <linearGradient id="mktGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
          <stop offset="20%" stopColor="#06b6d4" stopOpacity="1" />
          <stop offset="80%" stopColor="#06b6d4" stopOpacity="1" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        ref={svgRef}
        points={points}
        fill="none"
        stroke="url(#mktGrad)"
        strokeWidth="1.5"
      />
      {/* Second line offset */}
      <polyline
        points={generatePoints(80, W, H).split(" ").map((p) => {
          const [x, y] = p.split(",").map(Number);
          return `${x},${y + 18}`;
        }).join(" ")}
        fill="none"
        stroke="#7c3aed"
        strokeWidth="0.8"
        opacity="0.4"
      />
    </svg>
  );
}
