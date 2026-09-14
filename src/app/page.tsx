"use client";

import { ReactLenis } from "lenis/react";
import AmbientBackground from "@/components/layout/AmbientBackground";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import Nav from "@/components/layout/Navigation/Nav";
import Hero from "@/components/layout/Header/Hero";
import PageSection from "@/components/layout/PageSection";
import About from "@/components/sections/About/About";
import Training from "@/components/sections/Training/Training";
import Education from "@/components/sections/Education/Education";
import Skills from "@/components/sections/Skills/Skills";
import Projects from "@/components/sections/Projects/Projects";
import Achievements from "@/components/sections/Achievements/Achievements";
import Stats from "@/components/sections/Stats/Stats";
import Contact from "@/components/sections/Contact/Contact";
import Footer from "@/components/layout/Footer/Footer";
import StackFieldBackdrop from "@/components/layout/StackFieldBackdrop";
import MotionPreferenceControl from "@/components/ui/MotionPreferenceControl";

export default function Home() {
  return (
    <ReactLenis root>
      <AmbientBackground />
      <StackFieldBackdrop />
      <CustomCursor />
      <ScrollProgress />
      <MotionPreferenceControl />
      <BackToTop />

      <a href="#about" className="skip-link">
        Skip to content
      </a>

      <Nav />
      <Hero />

      <main>
        <PageSection id="about" surface="section-darker">
          <About />
        </PageSection>

        <PageSection id="training" surface="section-dark">
          <Training />
        </PageSection>

        <PageSection id="education" surface="section-darker">
          <Education />
        </PageSection>

        <PageSection id="skills" surface="section-dark">
          <Skills />
        </PageSection>

        <PageSection id="projects" surface="section-darker">
          <Projects />
        </PageSection>

        <PageSection id="achievements" surface="section-dark">
          <Achievements />
        </PageSection>

        <PageSection id="stats" surface="section-darker">
          <Stats />
        </PageSection>

        <PageSection id="contact" surface="section-dark">
          <Contact />
        </PageSection>
      </main>

      <Footer />
    </ReactLenis>
  );
}
