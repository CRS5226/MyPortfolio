"use client";

import { useEffect, useRef } from "react";

function makeCandles(n = 80) {
  const bars: { o: number; h: number; l: number; c: number }[] = [];
  let price = 100;
  for (let i = 0; i < n; i++) {
    const dir = Math.sin(i * 0.38) + Math.sin(i * 0.13) * 0.5;
    const o = price;
    const c = price + dir * 2.4 + (((i * 17 + 31) % 7) - 3) * 0.9;
    const hi = Math.max(o, c) + ((i * 11 + 7) % 5) * 0.7;
    const lo = Math.min(o, c) - ((i * 13 + 3) % 4) * 0.6;
    bars.push({ o, h: hi, l: lo, c });
    price = c;
  }
  return bars;
}
const CANDLES = makeCandles(80);

export default function MarketBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width, h = canvas.height;
      const barW = 16, gap = 5, step = barW + gap;

      offset += 0.2;
      if (offset > step) offset -= step;

      const prices = CANDLES.map(b => b.h).concat(CANDLES.map(b => b.l));
      const minP = Math.min(...prices), maxP = Math.max(...prices);
      const range = maxP - minP;

      const chartH = h * 0.52;
      const chartY = h * 0.82;
      const toY = (p: number) => chartY - ((p - minP) / range) * chartH;

      /* grid lines */
      for (let k = 0; k <= 5; k++) {
        const y = chartY - (chartH * k) / 5;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y);
        ctx.strokeStyle = `rgba(6,182,212,0.05)`; ctx.lineWidth = 0.5; ctx.stroke();
      }

      const visCount = Math.ceil(w / step) + 2;
      const startIdx = Math.floor(offset / step);
      const closePts: { x: number; y: number }[] = [];

      for (let i = 0; i < visCount; i++) {
        const bi = (startIdx + i) % CANDLES.length;
        const bar = CANDLES[bi];
        const x = i * step - (offset % step);
        const bullish = bar.c >= bar.o;

        const oY = toY(bar.o), cY = toY(bar.c);
        const hY = toY(bar.h), lY = toY(bar.l);
        closePts.push({ x: x + barW / 2, y: cY });

        /* wick */
        ctx.beginPath(); ctx.moveTo(x + barW / 2, hY); ctx.lineTo(x + barW / 2, lY);
        ctx.strokeStyle = bullish ? `rgba(6,182,212,0.55)` : `rgba(239,68,68,0.5)`;
        ctx.lineWidth = 1.2; ctx.stroke();

        /* body */
        const top = Math.min(oY, cY), bh = Math.max(2, Math.abs(oY - cY));
        ctx.fillStyle = bullish ? `rgba(6,182,212,0.38)` : `rgba(239,68,68,0.32)`;
        ctx.fillRect(x, top, barW, bh);
        ctx.strokeStyle = bullish ? `rgba(6,182,212,0.65)` : `rgba(239,68,68,0.55)`;
        ctx.lineWidth = 0.8; ctx.strokeRect(x, top, barW, bh);

        /* volume micro bar */
        const vh = Math.max(2, bh * 0.35);
        ctx.fillStyle = bullish ? `rgba(6,182,212,0.14)` : `rgba(239,68,68,0.11)`;
        ctx.fillRect(x, chartY + 4, barW, vh);
      }

      /* glowing close-price line */
      if (closePts.length > 1) {
        ctx.beginPath();
        closePts.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
        ctx.strokeStyle = `rgba(6,182,212,0.4)`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = `rgba(6,182,212,0.9)`;
        ctx.shadowBlur = 7;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      /* labels */
      ctx.font = "bold 10px monospace";
      ctx.fillStyle = `rgba(6,182,212,0.45)`;
      ctx.fillText("◉ LIVE  ML/ALGO TRADING", 14, chartY - chartH - 12);
      ctx.fillStyle = `rgba(6,182,212,0.35)`;
      ctx.fillText("◉ LIVE", w - 52, chartY - chartH - 12);

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />;
}
