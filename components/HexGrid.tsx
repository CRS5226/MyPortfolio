"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const HEX_SIZE = 22;
const HEX_W = HEX_SIZE * 2;
const HEX_H = Math.sqrt(3) * HEX_SIZE;
const COLS = 28;
const ROWS = 14;

function hexPoints(cx: number, cy: number, s: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i - 30);
    return `${cx + s * Math.cos(angle)},${cy + s * Math.sin(angle)}`;
  }).join(" ");
}

export default function HexGrid() {
  const hexes = useMemo(() => {
    const list: { cx: number; cy: number; points: string; idx: number }[] = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cx = col * HEX_W * 0.75 + HEX_SIZE;
        const cy = row * HEX_H + (col % 2 === 1 ? HEX_H / 2 : 0) + HEX_H / 2;
        list.push({ cx, cy, points: hexPoints(cx, cy, HEX_SIZE - 2), idx: row * COLS + col });
      }
    }
    return list;
  }, []);

  const svgW = COLS * HEX_W * 0.75 + HEX_SIZE;
  const svgH = ROWS * HEX_H + HEX_H;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        {hexes.map(({ points, idx }) => (
          <motion.polygon
            key={idx}
            points={points}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="0.6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.18 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.004 }}
            whileHover={{ opacity: 0.5, fill: "rgba(6,182,212,0.06)" }}
            style={{ pointerEvents: "auto" }}
          />
        ))}
      </svg>
    </div>
  );
}
