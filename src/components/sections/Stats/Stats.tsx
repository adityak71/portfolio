"use client";

import { motion } from "motion/react";
import { GitHubCalendar } from "react-github-calendar";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, VIEWPORT_MARGIN } from "@/config/animations";
import personalData from "@/data/personal.json";
import { useState, useEffect } from "react";
import type { PersonalData } from "@/types";

const data = personalData as PersonalData;

const Stats = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <SectionHeader number="07" eyebrow="Activity" title="Coding Activity" />

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: VIEWPORT_MARGIN }}
        className="glass-card p-6 md:p-8"
        style={{ maxWidth: 960, marginInline: "auto", marginBottom: 32 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>
            Contribution Calendar
          </h3>
          <a
            href={`https://github.com/${data.contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-action"
            style={{ fontSize: 12 }}
          >
            @{data.contact.github}
          </a>
        </div>

        <div className="calendar-reveal overflow-x-auto">
          <GitHubCalendar
            username={data.contact.github}
            colorScheme="dark"
            blockSize={12}
            blockMargin={4}
            fontSize={12}
            theme={{
              dark: [
                "rgb(var(--ch-bg-sec))",
                "#0e4429",
                "#006d32",
                "#26a641",
                "#39d353",
              ],
            }}
          />
        </div>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: VIEWPORT_MARGIN }}
        className="glass-card p-6 md:p-8"
        style={{ maxWidth: 960, marginInline: "auto" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>
            LeetCode Progress
          </h3>
          <a
            href="https://leetcode.com/adityak71"
            target="_blank"
            rel="noopener noreferrer"
            className="text-action"
            style={{ fontSize: 12 }}
          >
            @adityak71
          </a>
        </div>
        <div className="flex justify-center overflow-x-auto" style={{ minHeight: 200 }}>
          <img 
            src="https://leetcard.jacoblin.cool/adityak71?theme=dark&font=Inter&ext=heatmap" 
            alt="LeetCode Stats for adityak71" 
            loading="lazy"
            style={{ width: "100%", maxWidth: 800, borderRadius: 8 }}
          />
        </div>
      </motion.div>
    </>
  );
};

export default Stats;
