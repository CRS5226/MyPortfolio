"use client";

import { motion } from "framer-motion";
import { Mail, BookOpen, Send } from "lucide-react";
import SectionReveal from "./SectionReveal";
import { personalInfo } from "@/lib/data";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

function GithubIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>;
}
function LinkedinIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
}

const socialLinks = [
  { label: "Email",         href: `mailto:${personalInfo.email}`, Icon: () => <Mail size={16} />,    display: personalInfo.email },
  { label: "LinkedIn",      href: personalInfo.linkedin,           Icon: LinkedinIcon,                display: "linkedin.com/in/chitraksh-singh" },
  { label: "GitHub",        href: personalInfo.github,             Icon: GithubIcon,                  display: "github.com/CRS5226" },
  { label: "Google Scholar",href: personalInfo.scholar,            Icon: () => <BookOpen size={16} />, display: "Google Scholar" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6 relative" style={{ background: "radial-gradient(ellipse at 50% 70%, rgba(244,63,94,0.05) 0%, transparent 65%)" }}>
      <SectionReveal><div className="max-w-5xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-16 relative">
          <span className="hidden md:block absolute -top-6 right-0 text-[160px] font-bold opacity-[0.035] blur-sm select-none pointer-events-none text-slate-100 leading-none">07</span>
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Contact</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100">Get In Touch</h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto text-base leading-relaxed">
            Open to new opportunities, research collaborations, and interesting projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em] mb-5">Find me on</h3>
            {socialLinks.map(({ label, href, Icon, display }) => (
              <a key={label} href={href} target={label !== "Email" ? "_blank" : undefined} rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-800/50 hover:text-primary transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-cyan-950/50 flex items-center justify-center flex-shrink-0 text-primary"><Icon /></div>
                <div>
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="text-sm text-slate-300 group-hover:text-primary transition-colors">{display}</p>
                </div>
              </a>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em] mb-5">Send a message</h3>
            <form action={`mailto:${personalInfo.email}`} method="POST" encType="text/plain" className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-slate-500 mb-1.5">Your Name</label>
                <input id="name" name="name" type="text" required placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-primary/60 transition-colors" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-slate-500 mb-1.5">Your Email</label>
                <input id="email" name="email" type="email" required placeholder="john@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-primary/60 transition-colors" />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-slate-500 mb-1.5">Message</label>
                <textarea id="message" name="message" rows={5} required placeholder="Hi Chitraksh, I'd like to..."
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-primary/60 transition-colors resize-none" />
              </div>
              <button type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-slate-950 font-semibold text-sm hover:bg-primary-dark transition-colors">
                <Send size={15} />Send Message
              </button>
            </form>
          </motion.div>
        </div>

        <motion.p variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-xs text-slate-600 mt-20">
          © {new Date().getFullYear()} Chitraksh Singh. Built with Next.js & Tailwind CSS.
        </motion.p>
      </div></SectionReveal>
    </section>
  );
}
