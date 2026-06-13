"use client";

import { useEffect, useRef } from "react";

const WAVES = [
  { freq: 0.004, amp: 45, speed: 0.4, phase: 0,    color: "6,182,212",  opacity: 0.04 },
  { freq: 0.007, amp: 25, speed: 0.9, phase: 1.1,  color: "6,182,212",  opacity: 0.025 },
  { freq: 0.003, amp: 60, speed: 0.3, phase: 2.3,  color: "124,58,237", opacity: 0.035 },
  { freq: 0.006, amp: 30, speed: 1.2, phase: 0.7,  color: "124,58,237", opacity: 0.02 },
];

export default function SineWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mobile = canvas.width < 768;

      WAVES.forEach((w) => {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 2) {
          const y =
            canvas.height / 2 +
            (w.amp * (mobile ? 0.5 : 1)) *
              Math.sin(w.freq * x + w.phase + t * w.speed);
          if (x === 0) { ctx.moveTo(x, y); } else { ctx.lineTo(x, y); }
        }
        ctx.strokeStyle = `rgba(${w.color},${w.opacity})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      t += 0.012;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden
    />
  );
}
