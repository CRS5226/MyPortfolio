"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import {
  SiPython, SiCplusplus, SiHtml5, SiCss, SiFlask, SiScikitlearn,
  SiNodedotjs, SiPytorch, SiTensorflow, SiGit, SiDocker, SiMongodb,
  SiFastapi, SiRedis, SiNextdotjs, SiNginx,
} from "react-icons/si";
import { certificates } from "@/lib/data";
import SectionReveal from "./SectionReveal";

const allTechs = [
  "C++", "Python", "PyTorch", "TensorFlow", "Flask", "NodeJS", "Scikit-learn",
  "Docker", "MongoDB", "Git", "FastAPI", "Redis", "Next.js", "Claude API",
  "Zerodha API", "Nginx", "PM2", "HTML", "CSS",
];

const iconGrid = [
  { Icon: SiPython,     name: "Python",       color: "#3776AB" },
  { Icon: SiCplusplus,  name: "C++",          color: "#00599C" },
  { Icon: SiHtml5,      name: "HTML5",        color: "#E34F26" },
  { Icon: SiCss,        name: "CSS3",         color: "#1572B6" },
  { Icon: SiFlask,      name: "Flask",        color: "#ffffff" },
  { Icon: SiScikitlearn,name: "Scikit-learn", color: "#F7931E" },
  { Icon: SiNodedotjs,  name: "Node.js",      color: "#339933" },
  { Icon: SiPytorch,    name: "PyTorch",      color: "#EE4C2C" },
  { Icon: SiTensorflow, name: "TensorFlow",   color: "#FF6F00" },
  { Icon: SiGit,        name: "Git",          color: "#F05032" },
  { Icon: SiDocker,     name: "Docker",       color: "#2496ED" },
  { Icon: SiMongodb,    name: "MongoDB",      color: "#47A248" },
  { Icon: SiFastapi,    name: "FastAPI",      color: "#009688" },
  { Icon: SiRedis,      name: "Redis",        color: "#DC382D" },
  { Icon: SiNextdotjs,  name: "Next.js",      color: "#ffffff" },
  { Icon: SiNginx,      name: "Nginx",        color: "#009639" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 overflow-hidden">
      <SectionReveal><div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-10 relative">
          <span className="hidden md:block absolute -top-6 right-0 text-[160px] font-bold opacity-[0.035] blur-sm select-none pointer-events-none text-slate-100 leading-none">03</span>
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Skills</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100">Tech Stack</h2>
        </motion.div>

        {/* Infinite marquee ticker */}
        <div className="relative overflow-hidden mb-12 py-3 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-16 before:bg-gradient-to-r before:from-slate-950 before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-16 after:bg-gradient-to-l after:from-slate-950 after:z-10">
          <div className="marquee-track flex gap-3 w-max">
            {[...allTechs, ...allTechs].map((tech, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/60 text-slate-400 border border-slate-700/50 whitespace-nowrap flex-shrink-0">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Icon grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 mb-14">
          {iconGrid.map(({ Icon, name, color }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-800/60 bg-slate-900/40 hover:border-cyan-800/50 hover:bg-slate-900/70 transition-all duration-200 cursor-default"
            >
              <Icon size={36} style={{ color }} />
              <span className="text-xs text-slate-400 text-center leading-tight">{name}</span>
            </motion.div>
          ))}
        </div>

        {/* Certifications section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em]">Certifications</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert, i) => (
              <motion.a
                key={cert.file}
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group flex items-start gap-4 p-5 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-cyan-800/50 hover:bg-slate-900/80 transition-all duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-950/50 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-950/80 transition-colors">
                  <Award size={18} className="text-amber-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-200 leading-snug mb-0.5">{cert.name}</p>
                  <p className="text-xs text-slate-500 mb-2">{cert.issuer}</p>
                  <span className="text-xs text-primary font-medium group-hover:text-cyan-300 transition-colors">
                    View Certificate →
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div></SectionReveal>
    </section>
  );
}
