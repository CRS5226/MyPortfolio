"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function SectionReveal({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Content rises 30px as it enters and continues upward as it exits — classic parallax depth
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, clipPath: "inset(6% 0% 6% 0%)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
