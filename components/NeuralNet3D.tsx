"use client";

import { useEffect, useRef } from "react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

const NODE_COUNT = 45;
const CONNECT_DIST = 2.6;
const R = 3.5;
const FOV = 6;

function randRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function project(x: number, y: number, z: number, cx: number, cy: number, scale: number) {
  const zOff = z + FOV;
  if (zOff <= 0) return null;
  const px = (x / zOff) * scale + cx;
  const py = (y / zOff) * scale + cy;
  const size = (1 / zOff) * scale * 0.18;
  const alpha = Math.max(0, Math.min(1, (zOff / (FOV + R)) * 0.9));
  return { px, py, size, alpha };
}

function rotateY(node: { x: number; y: number; z: number }, angle: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: node.x * cos + node.z * sin,
    y: node.y,
    z: -node.x * sin + node.z * cos,
  };
}

function rotateX(node: { x: number; y: number; z: number }, angle: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: node.x,
    y: node.y * cos - node.z * sin,
    z: node.y * sin + node.z * cos,
  };
}

export default function NeuralNet3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let rotY = 0;
    let rotX = 0;

    const nodes: Node3D[] = Array.from({ length: NODE_COUNT }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = randRange(0.5, R);
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        vx: randRange(-0.003, 0.003),
        vy: randRange(-0.003, 0.003),
        vz: randRange(-0.003, 0.003),
      };
    });

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const scale = Math.min(canvas.width, canvas.height) * 0.55;

      rotY += 0.004 + mouseRef.current.x * 0.002;
      rotX += 0.001 + mouseRef.current.y * 0.001;

      /* drift nodes slightly */
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy; n.z += n.vz;
        const dist = Math.sqrt(n.x * n.x + n.y * n.y + n.z * n.z);
        if (dist > R) { n.vx *= -1; n.vy *= -1; n.vz *= -1; }
      });

      /* rotate all nodes for display */
      const transformed = nodes.map((n) => {
        let p = rotateY(n, rotY);
        p = rotateX(p, rotX);
        return p;
      });

      /* draw edges */
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const a = transformed[i];
          const b = transformed[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dz = a.z - b.z;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < CONNECT_DIST) {
            const pa = project(a.x, a.y, a.z, cx, cy, scale);
            const pb = project(b.x, b.y, b.z, cx, cy, scale);
            if (!pa || !pb) continue;
            const opacity = (1 - d / CONNECT_DIST) * 0.12 * Math.min(pa.alpha, pb.alpha);
            ctx.beginPath();
            ctx.moveTo(pa.px, pa.py);
            ctx.lineTo(pb.px, pb.py);
            ctx.strokeStyle = `rgba(6,182,212,${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      /* draw nodes */
      transformed.forEach((t) => {
        const p = project(t.x, t.y, t.z, cx, cy, scale);
        if (!p) return;
        const grd = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, p.size * 4);
        grd.addColorStop(0, `rgba(6,182,212,${p.alpha * 0.9})`);
        grd.addColorStop(1, `rgba(6,182,212,0)`);
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(1, p.size), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6,182,212,${p.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.75 }}
    />
  );
}
