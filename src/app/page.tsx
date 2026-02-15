"use client";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

// Dynamic import for the global 3D scene (no SSR for R3F)
const Scene = dynamic(() => import("@/components/3d/Scene"), { ssr: false });

export default function Home() {
  return (
    <SmoothScroll>
      <Scene />
      <Navbar />
      <main className="relative z-[1] min-h-screen">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
