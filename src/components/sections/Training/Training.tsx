"use client";

import { motion } from "motion/react";
import experienceData from "@/data/experience.json";
import { staggerContainer } from "@/config/animations";
import { CYAN } from "@/config/theme";
import useBreakpoint from "@/hooks/useBreakpoint";
import SectionHeader from "@/components/ui/SectionHeader";
import TimelineSpine from "@/components/ui/TimelineSpine";
import TrainingCard from "./TrainingCard";
import type { ExperienceData } from "@/types";

const data = experienceData as ExperienceData;

const Training = () => {
  const { isMobile } = useBreakpoint();

  if (!data.training || data.training.length === 0) return null;

  return (
    <>
      <SectionHeader number="02" eyebrow="Learning" title="Training" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        className="space-y-6"
        style={{ maxWidth: 960, marginInline: "auto" }}
      >
        <TimelineSpine accentColor={CYAN} count={data.training.length}>
          {data.training.map((item, index) => (
            <TrainingCard
              key={item.id}
              item={item}
              index={index}
              accentColor={CYAN}
              isMobile={isMobile}
            />
          ))}
        </TimelineSpine>
      </motion.div>
    </>
  );
};

export default Training;
