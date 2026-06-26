"use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import { projects, publications } from "@/lib/data";
import Image from "next/image";
import SectionReveal from "./SectionReveal";

// KillChainGraph paper (index 0) is surfaced inside the project card
// Policy-Value (1), Hamiltonian (2), DDoS (4) are shown as research paper cards
const projectPapers: Record<string, number[]> = {
  KillChainGraph: [0],
};
const researchPaperIndexes = [1, 2, 4];

// Satellite project's venue attribution (no public link yet)
const satelliteVenue = "IEEE International Conference on Intelligent Signal Processing, 2024";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 48, scale: 0.96, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function ProjectsResearch() {
  return (
    <section id="projects" className="py-28 px-6 relative overflow-hidden">
      <SectionReveal>
        <div className="relative z-10 max-w-5xl mx-auto">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-16 relative">
            <span className="hidden md:block absolute -top-6 right-0 text-[160px] font-bold opacity-[0.035] blur-sm select-none pointer-events-none text-slate-900 dark:text-slate-100 leading-none">04</span>
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Projects & Research</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100">What I&apos;ve Built & Researched</h2>
          </motion.div>

          {/* Project cards */}
          <motion.div
            className="grid gap-8 mb-16"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {projects.map((project) => {
              const relatedIdxs = projectPapers[project.name] ?? [];
              const relatedPubs = relatedIdxs.map((idx) => publications[idx]);
              const isSatellite = project.name.includes("Satellite");

              return (
                <motion.div key={project.name}
                  variants={item}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm hover:border-cyan-800/50 transition-all duration-300 overflow-hidden shadow-sm dark:shadow-none">

                  {/* Project image */}
                  {project.image && (
                    <div className="relative w-full h-52 overflow-hidden">
                      <Image src={project.image} alt={project.name} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/90" />
                    </div>
                  )}

                  <div className="p-7">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{project.name}</h3>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {project.links.map((link) => (
                          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-500 hover:text-primary transition-colors text-xs font-medium">
                            <ExternalLink size={14} />
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>

                    <p className="text-slate-700 dark:text-slate-400 text-sm mb-5 leading-relaxed">{project.description}</p>

                    <ul className="space-y-2 mb-6">
                      {project.highlights.map((h, j) => (
                        <motion.li key={j}
                          initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }} transition={{ duration: 0.3, delay: j * 0.06 }}
                          className="flex gap-3 text-[13px] text-slate-700 dark:text-slate-400 leading-relaxed">
                          <span className="mt-2 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                          {h}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border border-slate-300/60 dark:border-slate-700/60">{tech}</span>
                      ))}
                    </div>

                    {/* Related publications inside card */}
                    {relatedPubs.length > 0 && (
                      <div className="border-t border-slate-200 dark:border-slate-800 pt-5 mt-1 space-y-2">
                        <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-3">Published Research</p>
                        {relatedPubs.map((pub) => (
                          <a key={pub.href} href={pub.href} target="_blank" rel="noopener noreferrer"
                            className="flex items-start gap-3 group/pub hover:text-primary transition-colors">
                            <FileText size={13} className="text-cyan-600 group-hover/pub:text-primary mt-0.5 flex-shrink-0 transition-colors" />
                            <div className="min-w-0">
                              <p className="text-xs text-cyan-700 dark:text-cyan-300/80 group-hover/pub:text-cyan-600 dark:group-hover/pub:text-cyan-200 transition-colors leading-snug">{pub.title}</p>
                              <p className="text-[10px] text-slate-500 mt-0.5">{pub.venue} · {pub.year}</p>
                            </div>
                            <ExternalLink size={11} className="text-cyan-600 group-hover/pub:text-primary flex-shrink-0 mt-0.5 transition-colors" />
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Satellite: show venue attribution without link */}
                    {isSatellite && (
                      <div className="border-t border-slate-200 dark:border-slate-800 pt-5 mt-1">
                        <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-2">Published Research</p>
                        <div className="flex items-start gap-3">
                          <FileText size={13} className="text-slate-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-slate-700 dark:text-slate-400 leading-snug">Towards U-Net Based Semantic Segmentation for Satellite Images</p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-600 mt-0.5">{satelliteVenue}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Research papers section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 rounded-full bg-violet-400/70" />
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-[0.15em]">Research Papers</h3>
            </div>

            <motion.div
              className="grid gap-6"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {researchPaperIndexes.map((idx) => {
                const pub = publications[idx];
                return (
                  <motion.div key={pub.title}
                    variants={item}
                    className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 shadow-sm dark:shadow-none hover:border-violet-400/40 dark:hover:border-violet-800/40 transition-all duration-300 overflow-hidden">

                    {/* Image or placeholder */}
                    {pub.image ? (
                      <div className="relative w-full h-44 overflow-hidden">
                        <Image src={pub.image} alt={pub.title} fill className="object-cover object-top" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/80" />
                      </div>
                    ) : (
                      <div className="w-full h-32 flex items-center justify-center bg-slate-100/80 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex flex-col items-center gap-2 opacity-30">
                          <FileText size={32} className="text-violet-500" />
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">image coming soon</span>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">{pub.title}</h4>
                        {pub.href !== "#" && (
                          <a href={pub.href} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-violet-500 hover:text-violet-400 transition-colors text-xs font-medium flex-shrink-0 mt-0.5">
                            <ExternalLink size={13} />Paper
                          </a>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-500 mb-3">{pub.authors}</p>

                      {pub.description && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{pub.description}</p>
                      )}

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-slate-500 dark:text-slate-500 truncate">{pub.venue}</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 border border-violet-300/60 dark:border-violet-900/40 flex-shrink-0">{pub.year}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

        </div>
      </SectionReveal>
    </section>
  );
}
