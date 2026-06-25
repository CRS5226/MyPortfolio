import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import SectionDivider from "@/components/SectionDivider";

const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), { ssr: false });

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main className="relative" style={{ zIndex: 2 }}>
        <Navbar />
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Publications />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Contact />
      </main>
    </>
  );
}
