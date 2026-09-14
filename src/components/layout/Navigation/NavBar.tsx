"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { DURATION, TEXT_PRIMARY, TEXT_SECONDARY } from "@/config/theme";
import type { NavSection } from "@/config/sections";
import DesktopNav from "./DesktopNav";

interface NavBarProps {
  scrolled: boolean;
  hidden: boolean;
  isMobile: boolean;
  sections: NavSection[];
  activeSection: string;
  mobileMenuOpen: boolean;
  onNavigate: (id: string) => void;
  onToggleMenu: () => void;
}

const HIDDEN_Y = -72;
const ENTRANCE_TRANSITION = {
  duration: DURATION.slow,
  ease: "easeOut" as const,
};
const SLIDE_TRANSITION = { duration: 0.3, ease: "easeOut" as const };
const ICON_TRANSITION = { duration: 0.18, ease: "easeOut" as const };
const ICON_ENTER = { rotate: -90, opacity: 0 };
const ICON_REST = { rotate: 0, opacity: 1 };
const ICON_EXIT = { rotate: 90, opacity: 0 };
const ICON_STYLE: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const NavBar = ({
  scrolled,
  hidden,
  isMobile,
  sections,
  activeSection,
  mobileMenuOpen,
  onNavigate,
  onToggleMenu,
}: NavBarProps) => {
  const [entered, setEntered] = useState(false);

  return (
    <motion.nav
      layoutRoot
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 64,
        backgroundColor: scrolled
          ? "rgba(11, 16, 18, 0.92)"
          : "rgba(11, 16, 18, 0.5)",
        borderBottom: scrolled
          ? "1px solid rgba(255, 255, 255, 0.06)"
          : "1px solid transparent",
        transition: "background-color 0.3s, border-color 0.3s",
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? HIDDEN_Y : 0, opacity: 1 }}
      transition={entered ? SLIDE_TRANSITION : ENTRANCE_TRANSITION}
      onAnimationComplete={() => setEntered(true)}
      aria-label="Primary"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          paddingLeft: 24,
          paddingRight: 24,
          maxWidth: 1280,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Logo mark */}
        <button
          onClick={() => onNavigate("hero")}
          style={{
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 50,
            overflow: "hidden"
          }}
          aria-label="Scroll to top"
        >
          <img 
            src="/assets/profile/profile-nav.png" 
            alt="AK" 
            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
          />
        </button>

        {/* Desktop nav links + CTA */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <DesktopNav
              sections={sections.filter((s) => s.id !== "contact")}
              activeSection={activeSection}
              onNavigate={onNavigate}
            />
            <button
              onClick={() => onNavigate("contact")}
              className="btn-pill"
              style={{ fontSize: 13, minHeight: 44 }}
              aria-label="Navigate to Contact"
            >
              Contact Me
            </button>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <motion.button
            onClick={onToggleMenu}
            style={{
              position: "relative",
              width: 44,
              height: 44,
              borderRadius: 10,
              color: TEXT_SECONDARY,
              cursor: "pointer",
              background: "none",
              border: "none",
            }}
            whileHover={{ color: TEXT_PRIMARY }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.span
                  key="close"
                  style={ICON_STYLE}
                  initial={ICON_ENTER}
                  animate={ICON_REST}
                  exit={ICON_EXIT}
                  transition={ICON_TRANSITION}
                  aria-hidden="true"
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  style={ICON_STYLE}
                  initial={ICON_ENTER}
                  animate={ICON_REST}
                  exit={ICON_EXIT}
                  transition={ICON_TRANSITION}
                  aria-hidden="true"
                >
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </div>
    </motion.nav>
  );
};

export default memo(NavBar);
