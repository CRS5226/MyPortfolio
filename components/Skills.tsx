"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { skills, certificates } from "@/lib/data";

const categoryConfig: Record<string, { tag: string; dot: string }> = {
  Languages:      { tag: "bg-cyan-950/60 text-cyan-300 border-cyan-900/50",     dot: "bg-cyan-400" },
  Frameworks:     { tag: "bg-violet-950/60 text-violet-300 border-violet-900/50", dot: "bg-violet-400" },
  Tools:          { tag: "bg-emerald-950/60 text-emerald-300 border-emerald-900/50", dot: "bg-emerald-400" },
  Certifications: { tag: "bg-amber-950/60 text-amber-300 border-amber-900/50",   dot: "bg-amber-400" },
};

const allTechs = [
  "C++", "Python", "PyTorch", "TensorFlow", "Flask", "NodeJS", "Scikit-learn",
  "Docker", "MongoDB", "Git", "FastAPI", "Redis", "Next.js", "Claude API",
  "Zerodha API", "Nginx", "PM2", "HTML", "CSS",
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
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

        {/* Category cards */}
        <div className="grid sm:grid-cols-2 gap-5">
          {skills.map((group, i) => {
            const cfg = categoryConfig[group.category] ?? { tag: "bg-slate-800 text-slate-300 border-slate-700", dot: "bg-slate-400" };
            return (
              <motion.div key={group.category}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em]">{group.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, j) => (
                    <motion.span key={item}
                      initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 + j * 0.05 }}
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${cfg.tag} hover:scale-105 transition-transform cursor-default`}>
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
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
      </div>
    </section>
  );
}
