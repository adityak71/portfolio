"use client";

import { motion } from "motion/react";
import { fadeInUp } from "@/config/animations";

interface SectionHeaderProps {
  number: string;
  eyebrow: string;
  title: string;
}

const SectionHeader = ({ number, eyebrow, title }: SectionHeaderProps) => {
  return (
    <motion.div
      className="section-header"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
    >
      <div className="section-header-eyebrow">
        <span className="section-header-number">{number} /</span>
        <span>{eyebrow}</span>
      </div>
      <div className="section-header-heading">
        <h2 className="display-heading">{title}</h2>
        <span className="section-header-rule" aria-hidden="true" />
      </div>
    </motion.div>
  );
};

export default SectionHeader;
