import { motion, type Variants } from "motion/react";
import type { LearningBadge } from "@/types";
import {
   DURATION,
   EASING,
   MONO_FONT,
   TEXT_MUTED,
   TEXT_PRIMARY,
} from "@/config/theme";
import useMotionPreference from "@/hooks/useMotionPreference";

interface RailBadgeProps {
   badge: LearningBadge;
   size: number;
   /** The rail's second copy is decorative: hidden from AT and skipped by Tab. */
   decorative?: boolean;
}

/* Extra width under the image so the mono name gets two full lines. */
const NAME_PAD = 60;

/* One hover label on the anchor; image and name animate their own "hover"
   variant so the badge responds as a unit with zero React state. */
const HOVER = "hover";
const IMAGE_SPRING = { type: "spring", stiffness: 300, damping: 20 } as const;
const NAME_TRANSITION = { duration: DURATION.quick, ease: EASING.brisk };
const imageVariants: Variants = { [HOVER]: { scale: 1.08 } };
const nameVariants: Variants = { [HOVER]: { color: TEXT_PRIMARY } };

/**
 * A learning badge for the marquee rail.
 */
const RailBadge = ({ badge, size, decorative = false }: RailBadgeProps) => {
   const { reducedMotion } = useMotionPreference();
   const hover = reducedMotion ? undefined : HOVER;

   return (
      <motion.a
         href={badge.url || badge.badgeUrl || "#"}
         target="_blank"
         rel="noopener noreferrer"
         aria-label={`${badge.name} credential (opens in a new tab)`}
         tabIndex={decorative ? -1 : undefined}
         whileHover={hover}
         whileFocus={hover}
         style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            width: size + NAME_PAD,
            flexShrink: 0,
            textDecoration: "none",
         }}
      >
         <motion.div
            variants={imageVariants}
            transition={IMAGE_SPRING}
            style={{ 
               width: size, 
               height: size,
               backgroundColor: "#fff",
               padding: 4,
               borderRadius: 6,
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               overflow: "hidden"
            }}
         >
            <img
               src={badge.imageUrl}
               alt={badge.name}
               loading="lazy"
               style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
         </motion.div>
         <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <motion.span
               variants={nameVariants}
               transition={NAME_TRANSITION}
               style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: TEXT_MUTED,
                  textAlign: "center",
                  lineHeight: 1.2,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
               }}
            >
               {badge.name}
            </motion.span>

            {badge.issuer && (
               <span style={{ 
                  fontSize: 10, 
                  fontWeight: 600, 
                  color: "var(--color-accent-cyan)",
                  textAlign: "center",
                  fontFamily: MONO_FONT 
               }}>
                  {badge.issuer}
               </span>
            )}

            {badge.topics && badge.topics.length > 0 && (
               <span style={{ 
                  fontSize: 10, 
                  color: "var(--color-text-secondary)", 
                  textAlign: "center",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  lineHeight: 1.3
               }}>
                  {badge.topics.join(" • ")}
               </span>
            )}
         </div>
      </motion.a>
   );
};

export default RailBadge;
