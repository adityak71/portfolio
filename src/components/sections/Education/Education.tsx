"use client";

import { motion } from "motion/react";
import educationData from "@/data/education.json";
import { staggerContainer } from "@/config/animations";
import { PURPLE } from "@/config/theme";
import useBreakpoint from "@/hooks/useBreakpoint";
import SectionHeader from "@/components/ui/SectionHeader";
import TimelineSpine from "@/components/ui/TimelineSpine";
import EducationCard from "./EducationCard";
import type { Education as EducationType } from "@/types";

const data = educationData as EducationType[];

const Education = () => {
  const { isMobile } = useBreakpoint();

  return (
    <>
      <SectionHeader number="03" eyebrow="Background" title="Education" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        className="space-y-6"
        style={{ maxWidth: 960, marginInline: "auto" }}
      >
        <TimelineSpine accentColor={PURPLE} count={data.length}>
          {data.map((item, index) => (
            <EducationCard
              key={item.id}
              item={item}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </TimelineSpine>
      </motion.div>
    </>
  );
};

export default Education;
