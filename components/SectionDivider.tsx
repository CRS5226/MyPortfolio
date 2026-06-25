"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="py-6 px-6">
      <div className="relative h-px w-full" style={{ background: "rgba(6,182,212,0.12)" }}>
        {/* Shimmer scan line */}
        <motion.div
          className="absolute inset-0 h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.5) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Diamond centre */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500/70 rotate-45"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
