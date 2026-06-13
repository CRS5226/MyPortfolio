"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 pointer-events-none"
      style={{
        scaleX,
        transformOrigin: "left",
        height: 2,
        background: "linear-gradient(90deg, #06b6d4, #7c3aed)",
        zIndex: 100,
      }}
    />
  );
}
