"use client";

import { useEffect, useRef, useState } from "react";

const LOG_LINES = [
  { text: "root@killchain:~$ nmap -sS -O 192.168.1.0/24", type: "cmd" },
  { text: "Starting Nmap 7.94 — host discovery", type: "info" },
  { text: "PORT     STATE  SERVICE    VERSION", type: "header" },
  { text: "22/tcp   open   ssh        OpenSSH 8.9", type: "open" },
  { text: "80/tcp   open   http       nginx 1.24", type: "open" },
  { text: "443/tcp  open   https      TLS 1.3", type: "open" },
  { text: "3306/tcp open   mysql      MySQL 8.0.35", type: "warn" },
  { text: "root@killchain:~$ python3 cve_2024_3094.py --target 192.168.1.7", type: "cmd" },
  { text: "[*] CVE-2024-3094 — liblzma backdoor loader", type: "info" },
  { text: "[*] Injecting payload into SSH auth flow...", type: "info" },
  { text: "[+] Auth bypass successful → 192.168.1.7", type: "success" },
  { text: "root@killchain:~$ sudo -l", type: "cmd" },
  { text: "⚠  sudo: 3 incorrect password attempts", type: "warn" },
  { text: "root@killchain:~$ ./privesc_polkit.sh", type: "cmd" },
  { text: "[+] Privilege escalation: root obtained", type: "success" },
  { text: "[*] Lateral movement → 192.168.1.12, .14, .21", type: "info" },
  { text: "[*] KillChainGraph: T1190→T1059→T1078→T1571", type: "info" },
  { text: "[*] ATT&CK mapped: Initial Access → Execution", type: "info" },
  { text: "⚠  IDS Alert: anomalous exfil traffic 4.2 MB/s", type: "warn" },
  { text: "[*] Deploying countermeasure — rate limit injected", type: "info" },
  { text: "[+] Kill-chain inference model: confidence 0.94", type: "success" },
  { text: "root@killchain:~$ python3 policy_mcts.py --simulate", type: "cmd" },
  { text: "[*] MDP-MCTS framework initializing...", type: "info" },
  { text: "[*] Policy-value tree depth: 12 | rollouts: 800", type: "info" },
  { text: "[+] Optimal response path computed in 1.2s", type: "success" },
  { text: "⚠  New threat detected: RF fingerprint anomaly", type: "warn" },
  { text: "[*] Hamiltonian attention layer activated", type: "info" },
  { text: "[+] Transmitter identified — confidence 0.97", type: "success" },
];

const TYPE_COLORS: Record<string, string> = {
  cmd:     "text-cyan-300",
  info:    "text-slate-400",
  header:  "text-slate-500",
  open:    "text-green-400",
  warn:    "text-yellow-400",
  success: "text-emerald-400",
};

export default function CyberTerminal() {
  const [lines, setLines] = useState<{ text: string; type: string }[]>([]);
  const [visible, setVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const lineIdx = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  /* scroll-reactive visibility */
  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const prog = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const op = prog > 0.55
        ? Math.min(1, (prog - 0.55) / 0.08)
        : prog > 0.48
          ? Math.max(0, (prog - 0.48) / 0.07)
          : 0;
      setOpacity(op);
      setVisible(op > 0.01);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* typewriter — new line every 900-1800ms */
  useEffect(() => {
    if (!visible) return;
    const tick = () => {
      const idx = lineIdx.current % LOG_LINES.length;
      setLines(prev => {
        const next = [...prev, LOG_LINES[idx]];
        return next.length > 14 ? next.slice(next.length - 14) : next;
      });
      lineIdx.current++;
      const delay = LOG_LINES[idx].type === "cmd" ? 1400 : 700 + Math.floor((idx * 137) % 600);
      timer = setTimeout(tick, delay);
    };
    let timer = setTimeout(tick, 300);
    return () => clearTimeout(timer);
  }, [visible]);

  /* auto-scroll terminal */
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  if (!visible && opacity === 0) return null;

  return (
    <div
      className="fixed pointer-events-none select-none"
      style={{
        bottom: "6vh",
        right: "2vw",
        width: "min(420px, 44vw)",
        zIndex: 3,
        opacity: opacity * 0.82,
        transition: "opacity 0.4s ease",
      }}
    >
      {/* title bar */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg bg-slate-800/80 border border-slate-700/60 backdrop-blur-sm">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-[10px] font-mono text-slate-500">root@killchain — attack-sim</span>
        <span className="ml-auto text-[9px] font-mono text-emerald-400 animate-pulse">● LIVE</span>
      </div>

      {/* terminal body */}
      <div
        ref={containerRef}
        className="rounded-b-lg bg-slate-950/85 border border-t-0 border-slate-700/60 backdrop-blur-sm overflow-hidden"
        style={{ height: "200px", overflowY: "hidden" }}
      >
        <div className="p-3 font-mono text-[10px] leading-[1.6] space-y-0.5">
          {lines.map((line, i) => (
            <div key={i} className={`${TYPE_COLORS[line.type] ?? "text-slate-400"} truncate`}>
              {line.text}
              {i === lines.length - 1 && (
                <span className="inline-block w-1.5 h-3 bg-cyan-400 ml-0.5 align-middle animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
