"use client";

import { useEffect, useRef } from "react";

interface Node3D { x: number; y: number; z: number; vx: number; vy: number; vz: number; }

const NODE_COUNT = 38;
const CONNECT_DIST = 2.4;
const R = 3.2;
const FOV = 7;

function project(x: number, y: number, z: number, cx: number, cy: number, scale: number) {
  const zOff = z + FOV;
  if (zOff <= 0) return null;
  const px = (x / zOff) * scale + cx;
  const py = (y / zOff) * scale + cy;
  const size = (1 / zOff) * scale * 0.06;
  const alpha = Math.max(0, Math.min(0.7, (zOff / (FOV + R)) * 0.75));
  return { px, py, size, alpha };
}

function rotateY(p: {x:number;y:number;z:number}, a: number) {
  return { x: p.x*Math.cos(a)+p.z*Math.sin(a), y: p.y, z: -p.x*Math.sin(a)+p.z*Math.cos(a) };
}
function rotateX(p: {x:number;y:number;z:number}, a: number) {
  return { x: p.x, y: p.y*Math.cos(a)-p.z*Math.sin(a), z: p.y*Math.sin(a)+p.z*Math.cos(a) };
}

export default function NeuralNet3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let rotY = 0, rotX = 0;

    const nodes: Node3D[] = Array.from({ length: NODE_COUNT }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.8 + Math.random() * (R - 0.8);
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        vx: (Math.random() - 0.5) * 0.004,
        vy: (Math.random() - 0.5) * 0.004,
        vz: (Math.random() - 0.5) * 0.004,
      };
    });

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouse.current = { x: (e.clientX/window.innerWidth-0.5)*2, y: -(e.clientY/window.innerHeight-0.5)*2 };
    };
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width/2, cy = canvas.height/2;
      const scale = Math.min(canvas.width, canvas.height) * 0.42;

      rotY += 0.004 + mouse.current.x * 0.0015;
      rotX += 0.001 + mouse.current.y * 0.0008;

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.z += n.vz;
        const d = Math.sqrt(n.x*n.x + n.y*n.y + n.z*n.z);
        if (d > R) { n.vx *= -1; n.vy *= -1; n.vz *= -1; }
      });

      const tf = nodes.map(n => { const p = rotateY(n, rotY); return rotateX(p, rotX); });

      /* edges */
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i+1; j < NODE_COUNT; j++) {
          const a = tf[i], b = tf[j];
          const dx = a.x-b.x, dy = a.y-b.y, dz = a.z-b.z;
          const d = Math.sqrt(dx*dx+dy*dy+dz*dz);
          if (d < CONNECT_DIST) {
            const pa = project(a.x, a.y, a.z, cx, cy, scale);
            const pb = project(b.x, b.y, b.z, cx, cy, scale);
            if (!pa || !pb) continue;
            const op = (1-d/CONNECT_DIST)*0.09*Math.min(pa.alpha, pb.alpha);
            ctx.beginPath(); ctx.moveTo(pa.px, pa.py); ctx.lineTo(pb.px, pb.py);
            ctx.strokeStyle = `rgba(6,182,212,${op})`; ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }

      /* nodes — small dots with tiny glow only */
      tf.forEach(t => {
        const p = project(t.x, t.y, t.z, cx, cy, scale);
        if (!p) return;
        const glowR = Math.max(1.5, p.size * 2.5);
        const grd = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, glowR);
        grd.addColorStop(0, `rgba(6,182,212,${p.alpha*0.35})`);
        grd.addColorStop(1, `rgba(6,182,212,0)`);
        ctx.beginPath(); ctx.arc(p.px, p.py, glowR, 0, Math.PI*2);
        ctx.fillStyle = grd; ctx.fill();
        ctx.beginPath(); ctx.arc(p.px, p.py, Math.max(0.8, p.size), 0, Math.PI*2);
        ctx.fillStyle = `rgba(6,182,212,${p.alpha*0.85})`; ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMouse); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.6 }} />;
}
