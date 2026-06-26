"use client";

import { motion } from "framer-motion";
import { FileText, Brain, Cpu } from "lucide-react";
import Image from "next/image";
import SectionReveal from "./SectionReveal";
import TypewriterText from "./TypewriterText";
import AnimatedCounter from "./AnimatedCounter";


const stats = [
  { icon: FileText, value: 5, suffix: "+", label: "Research Papers" },
  { icon: Brain, value: 9.27, suffix: "", label: "M.Tech GPA", decimal: true },
  { icon: Cpu, value: 2, suffix: "+", label: "Years Exp." },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-6 relative overflow-hidden">
      <SectionReveal><div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-16 relative">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">About</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100"><TypewriterText text="Who I Am" /></h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="md:col-span-3">

            {/* Mobile profile photo */}
            <div className="flex justify-center mb-6 md:hidden">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                <Image
                  src="/images/myimage.png"
                  alt="Chitraksh Singh"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <p className="text-slate-700 dark:text-slate-400 leading-relaxed mb-5 text-[15px]">
              I&apos;m a Machine Learning Engineer with an M.Tech from IIIT Gwalior (GPA 9.27) and a
              B.Tech from the University of Mumbai (GPA 9.13). My work sits at the intersection of
              agentic AI, cybersecurity research, and quantitative finance.
            </p>
            <p className="text-slate-700 dark:text-slate-400 leading-relaxed mb-5 text-[15px]">
              At Frondeur Labs, I built a kill-chain inference engine for cybersecurity threat
              analysis — mapping CVE/TTP data into ML-driven attack path predictions. At H to H,
              I architect autonomous trading systems powered by Claude 3.5 with high-concurrency
              pipelines across 1,500+ instruments.
            </p>
            <p className="text-slate-700 dark:text-slate-400 leading-relaxed text-[15px]">
              On the research side, 5 papers spanning cyber kill-chains, satellite segmentation,
              RF fingerprinting, and DDoS resilience — published in IEEE conferences and arXiv.
            </p>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3 mt-7">
              {["Agentic AI", "Cybersecurity ML", "Quant Finance", "Computer Vision", "NLP"].map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full border border-cyan-300/60 dark:border-cyan-900/60 bg-cyan-100/80 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400">
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="md:col-span-2 grid gap-4">
            {stats.map(({ icon: Icon, value, suffix, label, decimal }, i) => (
              <motion.div key={label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/50 hover:border-cyan-800/60 transition-colors shadow-sm dark:shadow-none">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-100/80 dark:bg-cyan-950/60 flex items-center justify-center">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                      {decimal
                        ? <AnimatedCounter to={9.27} decimals={2} />
                        : <AnimatedCounter to={value} suffix={suffix} />}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">{label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div></SectionReveal>
    </section>
  );
}
