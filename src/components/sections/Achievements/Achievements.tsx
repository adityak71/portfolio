"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import achievementsData from "@/data/achievements.json";
import type { AchievementsData } from "@/types";
import CertBadgeShowcase from "./CertBadgeShowcase";
import "./achievements.css";

import BadgesSection from "./BadgesSection";

const data = achievementsData as AchievementsData;

const Achievements = () => {
  if (!data.certifications || data.certifications.length === 0) return null;

  return (
    <>
      <SectionHeader number="06" eyebrow="Milestones & certifications" title="Achievements" />
      <div style={{ maxWidth: 960, marginInline: "auto" }}>
        <CertBadgeShowcase certifications={data.certifications} />
        {data.learning_training && (
          <BadgesSection badges={data.learning_training} />
        )}
      </div>
    </>
  );
};

export default Achievements;
