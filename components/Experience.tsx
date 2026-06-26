"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, ExternalLink } from "lucide-react";
import { experiences } from "@/lib/data";
import Image from "next/image";
import SectionReveal from "./SectionReveal";
import TypewriterText from "./TypewriterText";
import TiltCard from "./TiltCard";

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
    <section id="experience" className="py-28 px-6 bg-slate-900/20 relative overflow-hidden" style={{ background: "radial-gradient(ellipse at 70% 40%, rgba(139,92,246,0.07) 0%, transparent 65%)" }}>
      <SectionReveal><div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-16 relative">
          <span className="hidden md:block absolute -top-6 right-0 text-[160px] font-bold opacity-[0.035] blur-sm select-none pointer-events-none text-slate-100 leading-none">02</span>
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Experience</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100"><TypewriterText text="Where I've Worked" /></h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-slate-700 to-transparent" />
          <motion.div
            className="space-y-10"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {experiences.map((exp, i) => (
              <motion.div key={`${exp.company}-${i}`}
                variants={item}
                className="relative pl-14">
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                  className="absolute left-[14px] top-5 w-3 h-3 rounded-full bg-primary border-2 border-slate-950 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                <TiltCard className="group p-6 rounded-2xl border border-slate-800/80 bg-slate-900/60 hover:border-cyan-800/50 hover:bg-slate-900/80 transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div className="flex items-center gap-4">
                      {exp.logo && (
                        <div className="bg-slate-800/50 rounded-lg px-3 py-2 flex items-center justify-center flex-shrink-0">
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            width={80}
                            height={40}
                            style={{ objectFit: "contain", height: "40px", width: "auto" }}
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-slate-100">{exp.role}</h3>
                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-cyan-950/60 text-primary border border-cyan-900/40">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500"><Calendar size={11} className="text-primary/60" />{exp.duration}</span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500"><MapPin size={11} className="text-primary/60" />{exp.location}</span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {exp.achievements.map((ach, j) => (
                      <motion.li key={j}
                        initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 + j * 0.05 + 0.3 }}
                        className="flex gap-3 text-[13px] text-slate-400 leading-relaxed">
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
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div></SectionReveal>
    </section>
  );
}
