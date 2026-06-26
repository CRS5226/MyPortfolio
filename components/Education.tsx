"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { education } from "@/lib/data";
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

export default function Education() {
  return (
    <section id="education" className="py-28 px-6 bg-slate-100/20 dark:bg-slate-900/20 grid-bg relative">
      <SectionReveal><div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-16 relative">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Education</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100"><TypewriterText text="Academic Background" /></h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {education.map((edu) => (
            <motion.div key={edu.degree}
              variants={item}
              className="relative group p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:border-cyan-800/50 transition-all duration-300 overflow-hidden shadow-sm dark:shadow-none">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-slate-200/80 dark:bg-slate-800/50 flex items-center justify-center p-2 flex-shrink-0">
                  <Image
                    src={edu.logo}
                    alt={`${edu.institution} logo`}
                    width={48}
                    height={48}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">{edu.degree}</h3>
                  <p className="text-sm text-primary font-medium mt-1 leading-snug">{edu.institution}</p>
                </div>
              </div>
              <div className="relative flex flex-wrap gap-x-5 gap-y-1.5 mb-5">
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500"><Calendar size={11} className="text-primary/50" />{edu.duration}</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500"><MapPin size={11} className="text-primary/50" />{edu.location}</span>
              </div>
              <div className="relative">
                <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-emerald-100/80 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-300/60 dark:border-emerald-900/40">GPA {edu.gpa}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div></SectionReveal>
    </section>
  );
}
