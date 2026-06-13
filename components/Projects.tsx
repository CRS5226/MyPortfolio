"use client";

import { motion } from "framer-motion";
import { ExternalLink, Layers } from "lucide-react";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6 bg-slate-900/20 grid-bg">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Projects</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100">What I&apos;ve Built</h2>
        </motion.div>

        <div className="grid gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative p-7 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-cyan-800/50 transition-all duration-300 overflow-hidden"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-900/20 to-transparent rounded-bl-full" />

              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-950/60 flex items-center justify-center">
                    <Layers size={16} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-100">{project.name}</h3>
                </div>
                {project.links.length > 0 && project.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                    className="text-slate-500 hover:text-primary transition-colors">
                    <ExternalLink size={16} />
                  </a>
                ))}
              </div>

              <p className="text-slate-400 text-sm mb-5 leading-relaxed">{project.description}</p>

              <ul className="space-y-2.5 mb-6">
                {project.highlights.map((h, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: j * 0.07 }}
                    className="flex gap-3 text-[13px] text-slate-400 leading-relaxed"
                  >
                    <span className="mt-2 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    {h}
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800/80 text-slate-400 border border-slate-700/60">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
