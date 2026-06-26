"use client";
import { useEffect, useRef, useState } from "react";

interface Props { text: string; className?: string; speed?: number; }

export default function TypewriterText({ text, className = "", speed = 40 }: Props) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let i = 0;
        const id = setInterval(() => {
          setDisplayed(text.slice(0, i + 1));
          i++;
          if (i >= text.length) {
            clearInterval(id);
            setDone(true);
          }
        }, speed);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, speed]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {!done && <span className="animate-pulse text-cyan-400">|</span>}
    </span>
  );
}
