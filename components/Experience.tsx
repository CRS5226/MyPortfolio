"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, ExternalLink } from "lucide-react";
import { experiences } from "@/lib/data";
import Image from "next/image";
import SectionReveal from "./SectionReveal";
import TypewriterText from "./TypewriterText";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 48, scale: 0.96, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-28 px-4 sm:px-6 bg-slate-100/20 dark:bg-slate-900/20 relative overflow-hidden">
      <SectionReveal><div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16 relative">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Experience</p>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-100"><TypewriterText text="Where I've Worked" /></h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-slate-300 dark:via-slate-700 to-transparent" />
          <motion.div
            className="space-y-6 md:space-y-10"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {experiences.map((exp, i) => (
              <motion.div key={`${exp.company}-${i}`}
                variants={item}
                className="relative pl-10 sm:pl-14">
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                  className="absolute left-[10px] sm:left-[14px] top-5 w-3 h-3 rounded-full bg-primary border-2 border-slate-100 dark:border-slate-950 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                <div className="group p-4 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 hover:border-cyan-800/50 hover:bg-white/90 dark:hover:bg-slate-900/80 transition-all duration-300 shadow-sm dark:shadow-none">
                  {/* Header: logo + title stacked on mobile, side-by-side on sm+ */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      {exp.logo && (
                        <div className="bg-slate-200/80 dark:bg-slate-800/50 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 flex items-center justify-center flex-shrink-0">
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            width={70}
                            height={32}
                            style={{ objectFit: "contain", height: "32px", width: "auto", maxWidth: "70px" }}
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">{exp.role}</h3>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-cyan-100/80 dark:bg-cyan-950/60 text-cyan-700 dark:text-primary border border-cyan-300/60 dark:border-cyan-900/40">{exp.company}</span>
                      </div>
                    </div>
                    {/* Date + location: row on mobile, column on sm+ */}
                    <div className="flex flex-row sm:flex-col items-start sm:items-end gap-3 sm:gap-1.5 flex-shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500 whitespace-nowrap"><Calendar size={11} className="text-primary/60" />{exp.duration}</span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500 whitespace-nowrap"><MapPin size={11} className="text-primary/60" />{exp.location}</span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {exp.achievements.map((ach, j) => (
                      <motion.li key={j}
                        initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 + j * 0.05 + 0.3 }}
                        className="flex gap-3 text-[13px] text-slate-700 dark:text-slate-400 leading-relaxed">
                        <span className="mt-2 w-1 h-1 rounded-full bg-primary/70 flex-shrink-0" />
                        <span>
                          {ach.text}
                          {ach.link && (
                            <a href={ach.link.href} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 ml-2 text-primary hover:text-cyan-300 text-xs font-medium transition-colors">
                              <ExternalLink size={11} />{ach.link.label}
                            </a>
                          )}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div></SectionReveal>
    </section>
  );
}
