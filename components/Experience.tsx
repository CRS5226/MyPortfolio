"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { experiences } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-slate-900/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Where I&apos;ve Worked</h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-slate-800" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${i}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-12 md:pl-16"
              >
                {/* Dot */}
                <div className="absolute left-[10px] md:left-[18px] top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-slate-950" />

                <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-800/50 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-100">{exp.role}</h3>
                      <p className="text-primary font-semibold text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar size={12} />
                        {exp.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {exp.achievements.length > 0 && (
                    <ul className="space-y-2.5">
                      {exp.achievements.map((ach, j) => (
                        <li key={j} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {ach}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
