"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ArrowDown, Mail, BookOpen } from "lucide-react";
import { personalInfo } from "@/lib/data";
import ParticleCanvas from "./ParticleCanvas";
import MarketLine from "./MarketLine";
import NeuralNet3D from "./NeuralNet3D";

const TITLES = [
  "Machine Learning Engineer",
  "AI Systems Architect",
  "Cybersecurity Researcher",
  "Agentic AI Builder",
];

function TypewriterTitle() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = TITLES[idx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else {
      setDeleting(false);
      setIdx((i) => (i + 1) % TITLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx]);

  return (
    <span className="text-primary font-semibold">
      {displayed}
      <span className="inline-block w-0.5 h-6 bg-primary ml-0.5 align-middle animate-pulse" />
    </span>
  );
}

function AnimatedName() {
  const letters = personalInfo.name.split("");
  return (
    <span className="inline-flex flex-wrap justify-center">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.04, ease: [0.215, 0.61, 0.355, 1] }}
          className={char === " " ? "mr-4" : "gradient-text"}
          style={{ display: "inline-block", transformOrigin: "bottom" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function MagneticButton({ children, className, href }: { children: React.ReactNode; className: string; href: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy }} className="inline-block">
      <a href={href} className={className}>{children}</a>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Radial top glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,182,212,0.10) 0%, transparent 70%)" }} />

      {/* Market line SVG — desktop only */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <MarketLine />
      </div>

      {/* 3D Neural Net — desktop */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <NeuralNet3D />
      </div>

      {/* Particle canvas — mobile fallback */}
      <div className="md:hidden absolute inset-0 pointer-events-none">
        <ParticleCanvas />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-800/50 bg-cyan-950/30 text-cyan-400 text-xs font-medium mb-8 tracking-wider uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Open to Opportunities
        </motion.div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-none mb-5">
          <AnimatedName />
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="text-lg md:text-2xl text-slate-400 mb-5 h-8"
        >
          <TypewriterTitle />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="text-slate-500 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <MagneticButton
            href="#experience"
            className="group relative px-8 py-3 rounded-lg bg-primary text-slate-950 font-semibold text-sm overflow-hidden transition-all hover:shadow-lg hover:shadow-cyan-900/40 block"
          >
            <span className="relative z-10">View Work</span>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="px-8 py-3 rounded-lg border border-slate-700 text-slate-400 font-semibold text-sm hover:border-primary hover:text-primary transition-all duration-300 block"
          >
            Contact Me
          </MagneticButton>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="flex items-center justify-center gap-6 mb-16"
        >
          {[
            { href: personalInfo.github, label: "GitHub", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
            { href: personalInfo.linkedin, label: "LinkedIn", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
            { href: `mailto:${personalInfo.email}`, label: "Email", svg: <Mail size={18} /> },
            { href: personalInfo.scholar, label: "Scholar", svg: <BookOpen size={18} /> },
          ].map(({ href, label, svg }) => (
            <a key={label} href={href} target={label !== "Email" ? "_blank" : undefined} rel="noopener noreferrer"
              aria-label={label} className="text-slate-600 hover:text-primary transition-colors duration-200">
              {svg}
            </a>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }}
          className="flex justify-center">
          <a href="#about" className="text-slate-700 hover:text-primary transition-colors animate-bounce" aria-label="Scroll">
            <ArrowDown size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
