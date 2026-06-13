"use client";

import { motion } from "framer-motion";
import { Brain, FileText, Cpu } from "lucide-react";

const stats = [
  { icon: FileText, value: "5+", label: "Research Papers" },
  { icon: Brain, value: "9.27", label: "M.Tech GPA" },
  { icon: Cpu, value: "2+", label: "Years Industry Exp." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">About</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Who I Am</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-slate-400 leading-relaxed mb-5 text-base">
              I&apos;m a Machine Learning Engineer with an M.Tech from IIIT Gwalior (GPA 9.27) and a
              B.Tech from the University of Mumbai (GPA 9.13). My work sits at the intersection of
              agentic AI, cybersecurity, and quantitative finance.
            </p>
            <p className="text-slate-400 leading-relaxed mb-5 text-base">
              At Frondeur Labs and H to H, I built autonomous trading systems powered by Claude 3.5,
              high-concurrency data pipelines for 1,500+ stocks, and NLP-driven sentiment engines —
              all deployed on production infrastructure.
            </p>
            <p className="text-slate-400 leading-relaxed text-base">
              On the research side, I&apos;ve co-authored 5 papers spanning kill-chain inference
              (ATT&CK/MITRE), satellite semantic segmentation, RF fingerprinting, and DDoS
              resilience — with publications in IEEE conferences and arXiv.
            </p>
          </motion.div>

          {/* Stat cards */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 gap-4"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-5 p-5 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-800/60 transition-colors"
              >
                <div className="w-11 h-11 rounded-lg bg-cyan-950/60 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-100">{value}</p>
                  <p className="text-sm text-slate-500">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
