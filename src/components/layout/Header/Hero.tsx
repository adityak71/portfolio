"use client";

import { motion } from "motion/react";
import { ChevronDown, ArrowDownRight, Download, FileText } from "lucide-react";
import { CYAN, GREEN, TEXT_SECONDARY } from "@/config/theme";
import { EASING, DURATION } from "@/config/theme";
import { stagger, type Variants } from "motion/react";
import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import personalData from "@/data/personal.json";
import ICON_MAP from "@/lib/iconMap";
import type { PersonalData } from "@/types";
import HeroStackField from "./HeroStackField";
import VideoCVModal from "./VideoCVModal";
import PdfCVModal from "./PdfCVModal";

const data = personalData as PersonalData;

/* ===== Hero Motion Variants (from reference heroMotion.ts) ===== */
const STAGGER_VAL = 0.09;
const LEAD_IN = 0.15;
const LINE_STAGGER = 0.08;
const LOGO_DURATION = 0.5;

const entrance = (duration: number) => ({
  duration,
  ease: EASING.cinematic,
});

const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: stagger(STAGGER_VAL, { startDelay: LEAD_IN }) },
  },
};

const heroLogo: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: entrance(LOGO_DURATION) },
};

const heroLabel: Variants = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: entrance(DURATION.default) },
};

const heroHeadline: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: stagger(LINE_STAGGER) } },
};

const heroHeadlineLine: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: entrance(DURATION.slow) },
};

const heroIntro: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: entrance(DURATION.default) },
};

const heroRow: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: entrance(DURATION.default) },
};

const HEADLINE_MASK_STYLE: CSSProperties = {
  display: "block",
  overflow: "hidden",
  paddingBottom: "0.08em",
  marginBottom: "-0.08em",
};

const TILE_STYLE: CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: 10,
  border: "1px solid rgba(255, 255, 255, 0.08)",
  backgroundColor: "rgba(255, 255, 255, 0.04)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: TEXT_SECONDARY,
};

const CTA_TAP = { scale: 0.97 };

const RESUME_URL = "/assets/resume/resume.pdf";

const Hero = () => {
  const hostRef = useRef<HTMLElement>(null);
  const [showVideoCV, setShowVideoCV] = useState(false);
  const [showPdfCV, setShowPdfCV] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section
        id="hero"
        ref={hostRef}
        tabIndex={-1}
        className="relative min-h-dvh overflow-hidden flex items-start md:items-center justify-center"
      >
        <HeroStackField hostRef={hostRef} />
        
        <motion.div
          className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-24 md:pt-20 gap-5 md:gap-6 max-w-4xl mx-auto"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Logo tile */}
          <motion.div variants={heroLogo}>
            <div
              style={{
                width: "clamp(48px, 8vw, 64px)",
                height: "clamp(48px, 8vw, 64px)",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: CYAN,
                overflow: "hidden"
              }}
              aria-hidden="true"
            >
              <img 
                src="/assets/profile/profile.png" 
                alt="AK" 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            </div>
          </motion.div>

          {/* Status badge */}
          <motion.div variants={heroLabel}>
            <span className="badge-pill hero-role">
              <span
                className="animate-glow-pulse"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: GREEN,
                  flexShrink: 0,
                }}
              />
              <span>{data.role_label}</span>
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="display-heading leading-[1.12] text-text-primary"
            style={{ fontSize: "clamp(2.25rem, 1rem + 5.5vw, 4.5rem)" }}
            variants={heroHeadline}
          >
            <span style={HEADLINE_MASK_STYLE}>
              <motion.span className="block text-balance" variants={heroHeadlineLine}>
                Hi, I&apos;m <span style={{ color: CYAN }}>{data.name.split(" ")[0]}</span>.
              </motion.span>
            </span>
            <span style={HEADLINE_MASK_STYLE}>
              <motion.span
                className="block text-balance text-text-secondary"
                variants={heroHeadlineLine}
              >
                {data.headline}
              </motion.span>
            </span>
          </motion.h1>

          {/* Intro */}
          <motion.p
            className="text-base md:text-lg"
            style={{ color: TEXT_SECONDARY, maxWidth: 680, lineHeight: 1.6 }}
            variants={heroIntro}
          >
            {data.intro}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="hero-actions grid w-full max-w-sm items-center gap-3 sm:flex sm:w-auto sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-4"
            variants={heroRow}
          >
            <motion.button
              onClick={() => scrollToSection("projects")}
              className="btn-primary col-span-2 inline-flex items-center justify-center gap-2 text-sm sm:col-span-1"
              whileTap={CTA_TAP}
            >
              Explore Projects
              <ArrowDownRight size={16} aria-hidden="true" />
            </motion.button>
            <motion.button
              onClick={() => setShowPdfCV(true)}
              className="btn-outline inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold"
              style={{ paddingInline: 16 }}
              whileTap={CTA_TAP}
            >
              <FileText size={15} aria-hidden="true" />
              View CV
            </motion.button>
            <motion.button
              onClick={() => setShowVideoCV(true)}
              className="btn-outline inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold"
              style={{ paddingInline: 16 }}
              whileTap={CTA_TAP}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Video CV
            </motion.button>
            <motion.a
              href={RESUME_URL}
              download
              className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              whileTap={CTA_TAP}
            >
              <Download size={15} aria-hidden="true" />
              Download CV
            </motion.a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mt-2"
            variants={heroRow}
          >
            {data.social_profiles.map((profile) => {
              const IconComponent = ICON_MAP[profile.icon];
              if (!IconComponent) return null;
              return (
                <motion.a
                  key={profile.id}
                  href={profile.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={TILE_STYLE}
                  whileHover={{
                    y: -3,
                    scale: 1.06,
                    color: "#f4f6f7",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: DURATION.quick, ease: EASING.brisk }}
                  aria-label={`Visit ${profile.name} profile`}
                >
                  <IconComponent size={18} />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex min-h-11 min-w-11 flex-col items-center justify-center gap-1 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          aria-label="Scroll to About section"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-scroll-hint" />
        </motion.button>
      </section>

      <VideoCVModal
        isOpen={showVideoCV}
        onClose={() => setShowVideoCV(false)}
        videoSrc="/assets/video-cv/videocv.mp4"
      />

      <PdfCVModal
        isOpen={showPdfCV}
        onClose={() => setShowPdfCV(false)}
        pdfSrc={RESUME_URL}
      />
    </>
  );
};

export default Hero;
