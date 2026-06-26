"use client";
import { useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

interface Props { text: string; className?: string; }

export default function ScrambleText({ text, className = "" }: Props) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = () => {
    let iter = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplay(
        text.split("").map((ch, i) => {
          if (ch === " ") return " ";
          if (i < iter) return text[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );
      if (iter >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      iter += 0.4;
    }, 30);
  };

  return (
    <span className={className} onMouseEnter={scramble} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
    </span>
  );
}
