"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isTouch = useRef(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const springConfig = { stiffness: 180, damping: 22 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0) {
      isTouch.current = true;
      return;
    }

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(!!t.closest("a, button, [data-hover]"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [visible, rawX, rawY]);

  if (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0) return null;
  if (!visible) return null;

  return (
    <>
      {/* Dot — exact position, no lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: rawX, y: rawY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="w-[5px] h-[5px] rounded-full bg-white" />
      </motion.div>

      {/* Ring — spring lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 52 : 28,
          height: hovered ? 52 : 28,
          borderColor: hovered ? "#7c3aed" : "#06b6d4",
          boxShadow: hovered
            ? "0 0 12px rgba(124,58,237,0.6)"
            : "0 0 8px rgba(6,182,212,0.5)",
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
        }}
      />
    </>
  );
}
