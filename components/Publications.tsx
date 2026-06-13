"use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import { publications } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Publications() {
  return (
    <section id="publications" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Research</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Publications</h2>
        </motion.div>

        <div className="grid gap-4">
          {publications.map((pub, i) => (
            <motion.div
              key={pub.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex gap-4 p-5 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-800/50 transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-cyan-950/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FileText size={16} className="text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-200 leading-snug">{pub.title}</h3>
                  {pub.href !== "#" && (
                    <a
                      href={pub.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-primary transition-colors flex-shrink-0 mt-0.5"
                      aria-label="View paper"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">{pub.authors}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-slate-500">{pub.venue}</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-950/50 text-cyan-400 border border-cyan-900/40">
                    {pub.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
