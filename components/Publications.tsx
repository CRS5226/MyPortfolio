"use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import { publications } from "@/lib/data";
import HexGrid from "./HexGrid";

export default function Publications() {
  return (
    <section id="publications" className="py-28 px-6 relative overflow-hidden bg-slate-900/20">
      <HexGrid />
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-16 relative">
          <span className="hidden md:block absolute -top-6 right-0 text-[160px] font-bold opacity-[0.035] blur-sm select-none pointer-events-none text-slate-100 leading-none">05</span>
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Research</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100">Publications</h2>
        </motion.div>

        <div className="grid gap-4">
          {publications.map((pub, i) => (
            <motion.div key={pub.title}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex gap-4 p-5 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-sm hover:border-cyan-800/50 transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-cyan-950/60 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-cyan-950 transition-colors">
                <FileText size={15} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-200 leading-snug">{pub.title}</h3>
                  {pub.href !== "#" && (
                    <a href={pub.href} target="_blank" rel="noopener noreferrer"
                      className="text-slate-600 hover:text-primary transition-colors flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100">
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1">{pub.authors}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="text-xs text-slate-500 truncate">{pub.venue}</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-950/50 text-cyan-400 border border-cyan-900/40 flex-shrink-0">{pub.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
