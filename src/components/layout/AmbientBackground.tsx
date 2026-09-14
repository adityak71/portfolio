"use client";

import { motion } from "motion/react";
import type { Easing } from "motion/react";

const EASE_IN_OUT: Easing = "easeInOut";
const GLOW_EASE: Easing[] = [EASE_IN_OUT, EASE_IN_OUT];
const drift = (from: string, to: string) => ({ transform: [from, to, from] });

const glowStyle = {
  position: "absolute",
  borderRadius: "50%",
} as const;

const AmbientBackground = () => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        background: "var(--color-bg-primary)",
      }}
    >
      {/* Dot lattice */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 80%)",
        }}
      />

      {/* Aurora glow: top */}
      <motion.div
        style={{
          ...glowStyle,
          top: "-30%",
          left: "50%",
          width: 1100,
          height: 800,
          marginLeft: -550,
          background:
            "radial-gradient(ellipse at center, rgb(37 99 235 / 0.14), rgb(34 211 238 / 0.05) 40%, transparent 75%)",
        }}
        animate={drift(
          "translate(-80px, 0px) scale(1)",
          "translate(80px, 40px) scale(1.08)",
        )}
        transition={{ duration: 26, repeat: Infinity, ease: GLOW_EASE }}
      />

      {/* Aurora glow: bottom-right teal */}
      <motion.div
        style={{
          ...glowStyle,
          bottom: "-35%",
          right: "-15%",
          width: 900,
          height: 700,
          background:
            "radial-gradient(ellipse at center, rgb(34 130 143 / 0.12), transparent 70%)",
        }}
        animate={drift("translate(40px, 20px)", "translate(-60px, -30px)")}
        transition={{ duration: 32, repeat: Infinity, ease: GLOW_EASE }}
      />

      {/* Aurora glow: bottom-left */}
      <motion.div
        style={{
          ...glowStyle,
          bottom: "-25%",
          left: "-15%",
          width: 700,
          height: 600,
          background:
            "radial-gradient(ellipse at center, rgb(37 99 235 / 0.07), transparent 70%)",
        }}
        animate={drift("translate(30px, -20px)", "translate(-40px, 30px)")}
        transition={{ duration: 40, repeat: Infinity, ease: GLOW_EASE }}
      />

      {/* Beam 1 */}
      <motion.div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-20%",
          width: 1,
          height: "130%",
          background:
            "linear-gradient(180deg, transparent, rgb(96 165 250 / 0.35) 30%, rgb(96 165 250 / 0.35) 70%, transparent)",
          rotate: 24,
          transformOrigin: "top center",
        }}
        animate={{ x: ["0vw", "140vw"], opacity: [0, 0.9, 0.9, 0] }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.1, 0.9, 1],
        }}
      />

      {/* Beam 2 */}
      <motion.div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-20%",
          width: 1,
          height: "130%",
          background:
            "linear-gradient(180deg, transparent, rgb(56 189 248 / 0.22) 30%, rgb(56 189 248 / 0.22) 70%, transparent)",
          rotate: 24,
          transformOrigin: "top center",
        }}
        animate={{ x: ["0vw", "140vw"], opacity: [0, 0.8, 0.8, 0] }}
        transition={{
          duration: 21,
          repeat: Infinity,
          ease: "linear",
          delay: 7,
          times: [0, 0.1, 0.9, 1],
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 120% 90% at 50% 40%, transparent 50%, rgb(11 16 18 / 0.85) 100%)",
        }}
      />
    </div>
  );
};

export default AmbientBackground;
