"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function DotNavigator() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {sections.map(({ id, label }) => (
        <a key={id} href={`#${id}`} aria-label={label} title={label}>
          <div className="relative w-2.5 h-2.5 flex items-center justify-center">
            {active === id && (
              <motion.div
                layoutId="dot-active"
                className="absolute inset-0 rounded-full bg-cyan-400"
                style={{ boxShadow: "0 0 8px rgba(6,182,212,0.8)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${active === id ? "bg-transparent" : "bg-slate-600 hover:bg-slate-400"}`} />
          </div>
        </a>
      ))}
    </div>
  );
}
