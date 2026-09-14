"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { fadeInUp, VIEWPORT_MARGIN } from "@/config/animations";
import { TEXT_SECONDARY } from "@/config/theme";
import personalData from "@/data/personal.json";
import type { PersonalData } from "@/types";
import ICON_MAP from "@/lib/iconMap";

const data = personalData as PersonalData;

const TILE_STYLE: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 10,
  border: "1px solid rgba(255, 255, 255, 0.08)",
  backgroundColor: "rgba(255, 255, 255, 0.04)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: TEXT_SECONDARY,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative">
      {/* Teal fade */}
      <div className="footer-fade" style={{ height: 120 }} />

      <div
        style={{
          backgroundColor: "rgb(34 130 143 / 0.75)",
          padding: "48px 24px 24px",
        }}
      >
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: VIEWPORT_MARGIN }}
          style={{ maxWidth: 1152, marginInline: "auto" }}
        >
          {/* Top row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            {/* Logo */}
            <button
              onClick={scrollToTop}
              className="text-xl font-bold"
              style={{
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.03em",
                cursor: "pointer",
                background: "none",
                border: "none",
              }}
            >
              {data.name}
            </button>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {data.social_profiles.map((profile) => {
                const IconComponent = ICON_MAP[profile.icon];
                if (!IconComponent) return null;
                return (
                  <a
                    key={profile.id}
                    href={profile.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={TILE_STYLE}
                    aria-label={`Visit ${profile.name} profile`}
                  >
                    <IconComponent size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8" style={{ fontSize: 13 }}>
            <div>
              <h4 className="font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontSize: 14 }}>
                Navigation
              </h4>
              <ul className="space-y-2">
                {["About", "Training", "Education", "Skills"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="footer-link"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontSize: 14 }}>
                More
              </h4>
              <ul className="space-y-2">
                {["Projects", "Certificates", "Stats", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="footer-link"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontSize: 14 }}>
                Connect
              </h4>
              <ul className="space-y-2">
                {data.social_profiles.map((profile) => (
                  <li key={profile.id}>
                    <a
                      href={profile.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {profile.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3" style={{ color: "var(--color-text-primary)", fontSize: 14 }}>
                Built With
              </h4>
              <ul className="space-y-2">
                {data.site.tech_stack.map((tech) => (
                  <li key={tech} style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.15)", fontSize: 12, color: "rgba(255,255,255,0.5)" }}
          >
            <span>© {currentYear} {data.name}. All rights reserved.</span>
            <span className="flex items-center gap-1">
              Made with <Heart size={12} style={{ color: "#ef4444" }} /> and lots of coffee
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

