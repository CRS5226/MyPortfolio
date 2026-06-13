"use client";

import { useEffect, useRef } from "react";

const CHARS = "01アイウエオカキクケコサシスセソタチツテト∑∇λπ".split("");

interface Drop { x: number; y: number; speed: number; chars: string[]; len: number; }

function makeDrops(w: number, h: number): Drop[] {
  const cols = Math.floor(w / 15);
  return Array.from({ length: cols }, (_, i) => ({
    x: i * 15 + 7,
    y: -Math.floor(Math.random() * h),
    speed: 0.9 + Math.random() * 1.5,
    chars: Array.from({ length: 22 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
    len: 9 + Math.floor(Math.random() * 14),
  }));
}

export default function MatrixBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let drops: Drop[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drops = makeDrops(canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const h = canvas.height;

      drops.forEach(drop => {
        drop.y += drop.speed;
        if (drop.y > h + drop.len * 15) {
          drop.y = -drop.len * 15;
          drop.chars = Array.from({ length: 22 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]);
        }

        ctx.font = "12px monospace";
        drop.chars.slice(0, drop.len).forEach((ch, k) => {
          const cy = drop.y + k * 15;
          if (cy < 0 || cy > h) return;
          const fade = 1 - k / drop.len;
          if (k === 0) {
            ctx.fillStyle = `rgba(200,255,200,0.75)`;
          } else {
            ctx.fillStyle = `rgba(0,255,65,${fade * 0.18})`;
          }
          ctx.fillText(ch, drop.x, cy);
        });
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />;
}
