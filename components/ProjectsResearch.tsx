"use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import { projects, publications } from "@/lib/data";
import Image from "next/image";
import SectionReveal from "./SectionReveal";
import TiltCard from "./TiltCard";

// KillChainGraph papers (index 0,1) are surfaced inside the project card
// Hamiltonian (index 2) and DDoS (index 4) are standalone below
const projectPapers: Record<string, number[]> = {
  KillChainGraph: [0, 1],
};
const standalonePaperIndexes = [2, 4];

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
    <section id="projects" className="py-28 px-6 relative overflow-hidden" style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(16,185,129,0.05) 0%, transparent 65%)" }}>
      <SectionReveal>
        <div className="relative z-10 max-w-5xl mx-auto">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-16 relative">
            <span className="hidden md:block absolute -top-6 right-0 text-[160px] font-bold opacity-[0.035] blur-sm select-none pointer-events-none text-slate-100 leading-none">04</span>
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Projects & Research</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100">What I&apos;ve Built & Researched</h2>
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
                  className="overflow-hidden">
                  <TiltCard className="group rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-sm hover:border-cyan-800/50 transition-all duration-300 overflow-hidden">

                  {/* Project image */}
                  {project.image && (
                    <div className="relative w-full h-52 overflow-hidden">
                      <Image src={project.image} alt={project.name} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/90" />
                    </div>
                  )}

                  <div className="p-7">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg font-bold text-slate-100">{project.name}</h3>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {project.links.map((link) => (
                          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-primary transition-colors text-xs font-medium">
                            <ExternalLink size={14} />
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>

                    <p className="text-slate-400 text-sm mb-5 leading-relaxed">{project.description}</p>

                    <ul className="space-y-2 mb-6">
                      {project.highlights.map((h, j) => (
                        <motion.li key={j}
                          initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }} transition={{ duration: 0.3, delay: j * 0.06 }}
                          className="flex gap-3 text-[13px] text-slate-400 leading-relaxed">
                          <span className="mt-2 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                          {h}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800/80 text-slate-400 border border-slate-700/60">{tech}</span>
                      ))}
                    </div>

                    {/* Related publications inside card */}
                    {relatedPubs.length > 0 && (
                      <div className="border-t border-slate-800 pt-5 mt-1 space-y-2">
                        <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3">Published Research</p>
                        {relatedPubs.map((pub) => (
                          <a key={pub.href} href={pub.href} target="_blank" rel="noopener noreferrer"
                            className="flex items-start gap-3 group/pub hover:text-primary transition-colors">
                            <FileText size={13} className="text-cyan-600 group-hover/pub:text-primary mt-0.5 flex-shrink-0 transition-colors" />
                            <div className="min-w-0">
                              <p className="text-xs text-cyan-300/80 group-hover/pub:text-cyan-200 transition-colors leading-snug">{pub.title}</p>
                              <p className="text-[10px] text-slate-500 mt-0.5">{pub.venue} · {pub.year}</p>
                            </div>
                            <ExternalLink size={11} className="text-cyan-600 group-hover/pub:text-primary flex-shrink-0 mt-0.5 transition-colors" />
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Satellite: show venue attribution without link */}
                    {isSatellite && (
                      <div className="border-t border-slate-800 pt-5 mt-1">
                        <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-2">Published Research</p>
                        <div className="flex items-start gap-3">
                          <FileText size={13} className="text-slate-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-slate-400 leading-snug">Towards U-Net Based Semantic Segmentation for Satellite Images</p>
                            <p className="text-[10px] text-slate-600 mt-0.5">{satelliteVenue}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Standalone research papers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-violet-400/70" />
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em]">Standalone Research</h3>
            </div>

            {/* PVNet image banner */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800 mb-6">
              <Image
                src="/images/PVNet_thinking_process.png"
                alt="Research process"
                width={1000}
                height={220}
                className="w-full object-cover"
                style={{ maxHeight: 180, objectFit: "cover", objectPosition: "center top" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest">Ongoing Research</span>
              </div>
            </div>

            <motion.div
              className="grid gap-4"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {standalonePaperIndexes.map((idx) => {
                const pub = publications[idx];
                return (
                  <motion.div key={pub.title}
                    variants={item}
                    className="group flex gap-4 p-5 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-violet-800/40 transition-all duration-300">
                    <div className="w-8 h-8 rounded-lg bg-violet-950/50 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-violet-950/80 transition-colors">
                      <FileText size={14} className="text-violet-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-sm font-semibold text-slate-200 leading-snug">{pub.title}</h4>
                        {pub.href !== "#" && (
                          <a href={pub.href} target="_blank" rel="noopener noreferrer"
                            className="text-violet-500 hover:text-violet-300 transition-colors flex-shrink-0 mt-0.5">
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{pub.authors}</p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-xs text-slate-500 truncate">{pub.venue}</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-950/50 text-violet-400 border border-violet-900/40 flex-shrink-0">{pub.year}</span>
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
