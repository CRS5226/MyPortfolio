"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-slate-900/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">What I&apos;ve Built</h2>
        </motion.div>

        <div className="grid gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-800/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-lg font-bold text-slate-100">{project.name}</h3>
                {project.links.length > 0 && (
                  <div className="flex gap-3 flex-shrink-0">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-primary transition-colors"
                        aria-label={link.label}
                      >
                        <ExternalLink size={16} />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-slate-400 text-sm mb-5 leading-relaxed">{project.description}</p>

              <ul className="space-y-2 mb-5">
                {project.highlights.map((h, j) => (
                  <li key={j} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700"
                  >
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
