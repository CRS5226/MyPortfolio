"use client";
import { useEffect, useRef } from "react";

interface Trail { x: number; y: number; life: number; }

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const trail: Trail[] = [];
    const onMove = (e: MouseEvent) => {
      trail.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (trail.length > 24) trail.shift();
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < trail.length; i++) {
        const t = trail[i];
        t.life -= 0.045;
        if (t.life <= 0) continue;
        const r = (i / trail.length) * 8 * t.life;
        ctx.beginPath();
        ctx.arc(t.x, t.y, Math.max(0.1, r), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6,182,212,${t.life * 0.25})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}
