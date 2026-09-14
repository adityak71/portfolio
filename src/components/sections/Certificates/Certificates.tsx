"use client";

import { motion } from "motion/react";
import { Award, Calendar } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { staggerContainer, staggerItem, VIEWPORT_MARGIN } from "@/config/animations";
import achievementsData from "@/data/achievements.json";
import type { AchievementsData } from "@/types";

const data = achievementsData as AchievementsData;

const Certificates = () => {
  if (!data.certifications || data.certifications.length === 0) return null;

  return (
    <>
      <SectionHeader number="06" eyebrow="Recognition" title="Certificates" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: VIEWPORT_MARGIN }}
        className="grid gap-4 sm:grid-cols-2"
        style={{ maxWidth: 960, marginInline: "auto" }}
      >
        {data.certifications.map((cert) => (
          <motion.div
            key={cert.id}
            variants={staggerItem}
            className="glass-card p-5 flex items-start gap-4"
          >
            <div
              className="flex-shrink-0 flex items-center justify-center"
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgb(var(--ch-blue) / 0.12)",
                color: "var(--color-accent-cyan)",
              }}
            >
              <Award size={20} />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                {cert.name}
              </h3>
              <p className="text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>
                {cert.issuer}
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                <Calendar size={12} style={{ color: "var(--color-text-muted)" }} />
                <span className="text-xs" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                  {cert.issueDate}
                </span>
                <span className="tag tag-purple ml-2" style={{ fontSize: 10, padding: "2px 6px" }}>
                  {cert.type}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default Certificates;
