"use client";

import { useEffect, useRef } from "react";

/* ─── Scroll zones (0..1) ─── */
const Z1_END = 0.22;   // neural net fades out after this
const Z2_START = 0.15; // market chart fades in (earlier, more visible)
const Z2_END = 0.62;   // market chart fades out
const Z3_START = 0.55; // matrix rain fades in

function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

/* ─── Zone blend alphas from scroll progress 0..1 ─── */
function zoneAlphas(p: number) {
  const neural = p < Z1_END
    ? 1
    : 1 - easeInOut((p - Z1_END) / 0.08);

  const market = p < Z2_START
    ? easeInOut((p - (Z2_START - 0.06)) / 0.06)
    : p < Z2_END
      ? 1
      : 1 - easeInOut((p - Z2_END) / 0.08);

  const matrix = p < Z3_START
    ? easeInOut((p - (Z3_START - 0.06)) / 0.06)
    : 1;

  return {
    neural: Math.max(0, Math.min(1, neural)),
    market: Math.max(0, Math.min(1, market)),
    matrix: Math.max(0, Math.min(1, matrix)),
  };
}

/* ─── Neural 2D particle net state ─── */
interface Particle { x: number; y: number; vx: number; vy: number; }
function makeParticles(w: number, h: number, n = 50): Particle[] {
  return Array.from({ length: n }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
  }));
}

/* ─── Market OHLC data ─── */
function makeCandles(n = 70) {
  const bars: { o: number; h: number; l: number; c: number }[] = [];
  let price = 100;
  for (let i = 0; i < n; i++) {
    const dir = Math.sin(i * 0.38) + Math.sin(i * 0.13) * 0.5;
    const o = price;
    const c = price + dir * 2.2 + (((i * 17 + 31) % 7) - 3) * 0.8;
    const hi = Math.max(o, c) + ((i * 11 + 7) % 5) * 0.6;
    const lo = Math.min(o, c) - ((i * 13 + 3) % 4) * 0.5;
    bars.push({ o, h: hi, l: lo, c });
    price = c;
  }
  return bars;
}
const CANDLES = makeCandles(70);

/* ─── Matrix rain state ─── */
const MATRIX_CHARS = "01アイウエオカキクケコサシスセソタチツテト".split("");
interface Drop { x: number; y: number; speed: number; chars: string[]; len: number; }
function makeDrops(w: number, h: number): Drop[] {
  const cols = Math.floor(w / 14);
  return Array.from({ length: cols }, (_, i) => ({
    x: i * 14 + 7,
    y: -Math.floor(Math.random() * h),
    speed: 0.8 + Math.random() * 1.4,
    chars: Array.from({ length: 20 }, () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]),
    len: 8 + Math.floor(Math.random() * 12),
  }));
}

export default function PageBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;

    let animId: number;
    let scrollProg = 0;
    let marketOffset = 0;

    let particles: Particle[] = [];
    let drops: Drop[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = makeParticles(canvas.width, canvas.height);
      drops = makeDrops(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProg = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const cv = canvas;

    /* ─── Draw neural net ─── */
    function drawNeural(alpha: number) {
      if (alpha <= 0.01) return;
      const w = cv.width, h = cv.height;

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });

      const maxDist = Math.min(w, h) * 0.22;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            const op = (1 - d / maxDist) * 0.055 * alpha;
            c.beginPath();
            c.moveTo(particles[i].x, particles[i].y);
            c.lineTo(particles[j].x, particles[j].y);
            c.strokeStyle = `rgba(6,182,212,${op})`;
            c.lineWidth = 0.7;
            c.stroke();
          }
        }
      }

      particles.forEach(p => {
        c.beginPath();
        c.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        c.fillStyle = `rgba(6,182,212,${alpha * 0.35})`;
        c.fill();
      });
    }

    /* ─── Draw market chart ─── */
    function drawMarket(alpha: number) {
      if (alpha <= 0.01) return;
      const w = cv.width, h = cv.height;
      const barW = 14, gap = 4;
      const step = barW + gap;

      marketOffset += 0.22;
      if (marketOffset > step) marketOffset -= step;

      const prices = CANDLES.map(bar => bar.h).concat(CANDLES.map(bar => bar.l));
      const minP = Math.min(...prices);
      const maxP = Math.max(...prices);
      const range = maxP - minP;

      const chartH = h * 0.42;
      const chartY = h * 0.72;

      const toY = (p: number) => chartY - ((p - minP) / range) * chartH;

      /* horizontal grid lines */
      for (let k = 0; k <= 5; k++) {
        const y = chartY - (chartH * k) / 5;
        c.beginPath();
        c.moveTo(0, y);
        c.lineTo(w, y);
        c.strokeStyle = `rgba(6,182,212,${alpha * 0.06})`;
        c.lineWidth = 0.5;
        c.stroke();
      }

      const visibleBars = Math.ceil(w / step) + 2;
      const startBar = Math.floor(marketOffset / step);
      const closePts: { x: number; y: number }[] = [];

      for (let i = 0; i < visibleBars; i++) {
        const bi = (startBar + i) % CANDLES.length;
        const bar = CANDLES[bi];
        const x = i * step - (marketOffset % step);

        const oY = toY(bar.o);
        const cY = toY(bar.c);
        const hY = toY(bar.h);
        const lY = toY(bar.l);
        const bullish = bar.c >= bar.o;

        closePts.push({ x: x + barW / 2, y: cY });

        /* wick */
        c.beginPath();
        c.moveTo(x + barW / 2, hY);
        c.lineTo(x + barW / 2, lY);
        c.strokeStyle = bullish ? `rgba(6,182,212,${alpha * 0.5})` : `rgba(239,68,68,${alpha * 0.45})`;
        c.lineWidth = 1.2;
        c.stroke();

        /* body */
        const bodyTop = Math.min(oY, cY);
        const bodyH = Math.max(2, Math.abs(oY - cY));
        c.fillStyle = bullish ? `rgba(6,182,212,${alpha * 0.45})` : `rgba(239,68,68,${alpha * 0.38})`;
        c.fillRect(x, bodyTop, barW, bodyH);

        /* body border */
        c.strokeStyle = bullish ? `rgba(6,182,212,${alpha * 0.7})` : `rgba(239,68,68,${alpha * 0.6})`;
        c.lineWidth = 0.8;
        c.strokeRect(x, bodyTop, barW, bodyH);

        /* volume bar at bottom */
        const volH = Math.max(2, bodyH * 0.4);
        c.fillStyle = bullish ? `rgba(6,182,212,${alpha * 0.15})` : `rgba(239,68,68,${alpha * 0.12})`;
        c.fillRect(x, chartY + 6, barW, volH);
      }

      /* glowing price close line */
      if (closePts.length > 1) {
        c.beginPath();
        closePts.forEach((pt, i) => { if (i === 0) c.moveTo(pt.x, pt.y); else c.lineTo(pt.x, pt.y); });
        c.strokeStyle = `rgba(6,182,212,${alpha * 0.35})`;
        c.lineWidth = 1.5;
        c.shadowColor = `rgba(6,182,212,0.8)`;
        c.shadowBlur = 6;
        c.stroke();
        c.shadowBlur = 0;
      }

      /* "LIVE" label top-right */
      c.font = `bold 10px monospace`;
      c.fillStyle = `rgba(6,182,212,${alpha * 0.5})`;
      c.fillText("◉ LIVE", w - 52, chartY - chartH - 10);
      c.font = `9px monospace`;
      c.fillStyle = `rgba(100,200,255,${alpha * 0.3})`;
      c.fillText("ML/ALGO TRADING SYS", 12, chartY - chartH - 10);
    }

    /* ─── Draw matrix rain ─── */
    function drawMatrix(alpha: number) {
      if (alpha <= 0.01) return;
      const h = cv.height;

      drops.forEach(drop => {
        drop.y += drop.speed;
        if (drop.y > h + drop.len * 14) {
          drop.y = -drop.len * 14;
          drop.chars = Array.from({ length: 20 }, () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]);
        }

        c.font = "11px monospace";
        drop.chars.slice(0, drop.len).forEach((ch, k) => {
          const cy = drop.y + k * 14;
          if (cy < 0 || cy > h) return;
          const fade = (1 - k / drop.len);
          const op = fade * alpha * (k === 0 ? 0.55 : 0.13);
          c.fillStyle = k === 0
            ? `rgba(180,255,180,${alpha * 0.45})`
            : `rgba(0,255,65,${op})`;
          c.fillText(ch, drop.x, cy);
        });
      });
    }

    const draw = () => {
      c.clearRect(0, 0, cv.width, cv.height);
      const a = zoneAlphas(scrollProg);
      drawNeural(a.neural);
      drawMarket(a.market);
      drawMatrix(a.matrix);
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
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
