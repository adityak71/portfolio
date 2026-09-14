"use client";

import type { ComponentType, CSSProperties } from "react";
import { motion, type Variants } from "motion/react";
import { VIEWPORT_MARGIN } from "@/config/animations";
import { CYAN, DURATION, EASING } from "@/config/theme";
import useMotionPreference from "@/hooks/useMotionPreference";
import SkillTagGroup from "./SkillTagGroup";

export type CategoryGlyph = ComponentType<{
   size?: number;
   strokeWidth?: number;
}>;

interface SkillCategoryProps {
   label: string;
   items: string[];
   glyph: CategoryGlyph;
   index: number;
   small?: boolean;
   breathe?: boolean;
}

const ruleVariants: Variants = {
   hidden: { opacity: 0, y: 12 },
   visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.default, ease: EASING.cinematic },
   },
};

const BREATH_TIMES = [0, 0.5, 1];
const BREATH_DURATION = 6;
const BREATH_OFFSET = 0.7;
const breathVariants: Variants = {
   visible: (index: number) => ({
      opacity: [1, 0.55, 1],
      scale: [1, 0.9, 1],
      transition: {
         duration: BREATH_DURATION,
         times: BREATH_TIMES,
         ease: BREATH_TIMES.slice(1).map(() => "easeInOut" as const),
         repeat: Infinity,
         delay: index * BREATH_OFFSET,
      },
   }),
};

const GLYPH_SIZE = 14;
const GLYPH_STYLE: CSSProperties = {
   display: "inline-flex",
   color: CYAN,
   lineHeight: 0,
};
const LABEL_STYLE: CSSProperties = {
   display: "inline-flex",
   alignItems: "center",
   gap: 8,
};

const SkillCategory = ({
   label,
   items,
   glyph: Glyph,
   index,
   small = false,
   breathe = false,
}: SkillCategoryProps) => {
   const { preference, reducedMotion } = useMotionPreference();
   const Heading = small ? motion.h4 : motion.h3;
   const breathing = breathe && !reducedMotion ? breathVariants : undefined;

   return (
      <motion.div
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true, margin: VIEWPORT_MARGIN as any }}
      >
         <Heading
            className="dashed-rule dashed-rule--centered"
            style={{ marginBottom: 28 }}
            variants={ruleVariants}
         >
            <span style={LABEL_STYLE}>
               <motion.span
                  key={preference}
                  aria-hidden="true"
                  style={GLYPH_STYLE}
                  variants={breathing}
                  custom={index}
               >
                  <Glyph size={GLYPH_SIZE} strokeWidth={2} />
               </motion.span>
               {label}
            </span>
         </Heading>
         <SkillTagGroup items={items} small={small} />
      </motion.div>
   );
};

export default SkillCategory;
