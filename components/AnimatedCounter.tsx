"use client";
import { useEffect, useRef, useState } from "react";

interface Props { to: number; duration?: number; decimals?: number; suffix?: string; }

export default function AnimatedCounter({ to, duration = 1500, decimals = 0, suffix = "" }: Props) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(parseFloat((eased * to).toFixed(decimals)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration, decimals]);

  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
}
