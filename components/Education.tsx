"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { education } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 bg-slate-900/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Education</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Academic Background</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-800/50 transition-colors"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-lg bg-cyan-950/60 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100 leading-snug">{edu.degree}</h3>
                  <p className="text-sm text-primary font-medium mt-1">{edu.institution}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar size={11} />
                  {edu.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin size={11} />
                  {edu.location}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-900/40">
                  GPA {edu.gpa}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {edu.achievements.map((ach) => (
                  <span
                    key={ach}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700"
                  >
                    {ach}
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
