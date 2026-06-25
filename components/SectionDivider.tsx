"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center py-2 px-6 overflow-hidden">
      {/* left line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-px flex-1 origin-left"
        style={{ background: "linear-gradient(to right, transparent, rgba(6,182,212,0.25))" }}
      />

      {/* centre diamond */}
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: 45 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 45 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="w-1.5 h-1.5 bg-cyan-500/50 mx-4 flex-shrink-0"
      />

      {/* right line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-px flex-1 origin-right"
        style={{ background: "linear-gradient(to left, transparent, rgba(6,182,212,0.25))" }}
      />
    </div>
  );
}
