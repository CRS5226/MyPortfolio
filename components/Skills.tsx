"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const categoryColors: Record<string, string> = {
  Languages: "bg-cyan-950/60 text-cyan-300 border-cyan-900/50",
  Frameworks: "bg-violet-950/60 text-violet-300 border-violet-900/50",
  Tools: "bg-emerald-950/60 text-emerald-300 border-emerald-900/50",
  Certifications: "bg-amber-950/60 text-amber-300 border-amber-900/50",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Skills</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Tech Stack</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {skills.map((group, i) => {
            const tagClass = categoryColors[group.category] ?? "bg-slate-800 text-slate-300 border-slate-700";
            return (
              <motion.div
                key={group.category}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-colors"
              >
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${tagClass}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
