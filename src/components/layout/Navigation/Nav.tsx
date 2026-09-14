"use client";

import { useState, useEffect, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { NAV_SECTIONS } from "@/config/sections";
import NavBar from "./NavBar";
import MobileMenu from "./MobileMenu";

const SCROLLED_AFTER = 50;
const HIDE_AFTER = 120;

const Nav = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? y;
    setScrolled(y > SCROLLED_AFTER);
    setHidden(y > HIDE_AFTER && y > previous);
  });

  // Breakpoint detection
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Intersection observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-35% 0px -60% 0px",
      },
    );
    for (const id of ["hero", ...NAV_SECTIONS.map((s) => s.id)]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => setMobileMenuOpen((o) => !o), []);
  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <>
      <NavBar
        scrolled={scrolled}
        hidden={hidden && !mobileMenuOpen}
        isMobile={isMobile}
        sections={NAV_SECTIONS}
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        onNavigate={scrollToSection}
        onToggleMenu={toggleMenu}
      />
      <MobileMenu
        open={mobileMenuOpen}
        sections={NAV_SECTIONS}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onClose={closeMenu}
      />
    </>
  );
};

export default Nav;
