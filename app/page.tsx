import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import ProjectsResearch from "@/components/ProjectsResearch";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import SectionDivider from "@/components/SectionDivider";
import DotNavigator from "@/components/DotNavigator";

const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), { ssr: false });
const CursorTrail = dynamic(() => import("@/components/CursorTrail"), { ssr: false });

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorTrail />
      <DotNavigator />
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
        <ProjectsResearch />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Contact />
      </main>
    </>
  );
}
