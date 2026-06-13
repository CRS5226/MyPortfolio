"use client";

import { useEffect, useRef } from "react";

const WAVES = [
  { freq: 0.005, amp: 38, speed: 0.35, phase: 0,   color: "6,182,212",  opacity: 0.055 },
  { freq: 0.008, amp: 22, speed: 0.8,  phase: 1.2, color: "6,182,212",  opacity: 0.03  },
  { freq: 0.003, amp: 55, speed: 0.25, phase: 2.5, color: "124,58,237", opacity: 0.04  },
  { freq: 0.006, amp: 28, speed: 1.1,  phase: 0.8, color: "124,58,237", opacity: 0.025 },
];

export default function SectionSineWave() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const h = canvas.height, w = canvas.width;
      WAVES.forEach(wave => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const y = h * 0.5 + wave.amp * Math.sin(wave.freq * x + wave.phase + t * wave.speed);
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${wave.color},${wave.opacity})`;
        ctx.lineWidth = 1.3;
        ctx.stroke();
      });
      t += 0.012;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />;
}
