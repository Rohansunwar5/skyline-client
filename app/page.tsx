"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import WhyUs from "@/components/WhyUs";
import Clients from "@/components/Clients";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div id="skyline-app-container" className="relative selection:bg-skyline-blue selection:text-white">
      <main id="skyline-main-content">
        <Hero />
        <About />
        <Services />
        <Projects />
        <WhyUs />
        <Clients />
        <ContactSection />
      </main>
    </div>
  );
}
