"use client";

import { useMemo } from "react";
import {
   BookOpen,
   Braces,
   Server,
   Database,
   HeartHandshake,
   PanelsTopLeft,
   Wrench,
   Webhook,
   Workflow,
   Compass,
   Target
} from "lucide-react";
import type { SkillsData } from "@/types";
import { MAX_WIDTH } from "@/config/theme";
import SectionHeader from "@/components/ui/SectionHeader";
import SkillCategory, { type CategoryGlyph } from "./SkillCategory";
import SecondarySkills from "./SecondarySkills";
import skillsData from "@/data/skills.json";

const skills = skillsData as SkillsData;

interface CategoryConfig {
   label: string;
   glyph: CategoryGlyph;
}

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
   languages: { label: "Languages", glyph: Braces },
   frontend: { label: "Frontend", glyph: PanelsTopLeft },
   backend: { label: "Backend", glyph: Server },
   databases: { label: "Databases", glyph: Database },
   apis: { label: "APIs", glyph: Webhook },
   dev_tools: { label: "Development Tools", glyph: Wrench },
};

const SECONDARY_GLYPHS: Record<string, CategoryGlyph> = {
   cs_fundamentals: BookOpen,
   development_practices: Workflow,
   soft_skills: HeartHandshake,
   areas_of_interest: Compass,
   currently_practicing: Target,
};

const Skills = () => {
   const primaryCategories = useMemo(
      () =>
         Object.entries(CATEGORY_CONFIG)
            .filter(([key]) => key in skills)
            .map(([key, { label, glyph }]) => ({
               key,
               label,
               glyph,
               items: skills[key as keyof SkillsData] as string[],
            })),
      []
   );

   const secondaryCategories = useMemo(
      () =>
         Object.entries(SECONDARY_GLYPHS)
            .filter(([key]) => key in skills)
            .map(([key, glyph]) => ({
               key,
               label: key
                  .replaceAll("_", " ")
                  .replaceAll(/\b\w/g, (c) => c.toUpperCase()),
               glyph,
               items: skills[key as keyof SkillsData] as string[],
            })),
      []
   );

   return (
      <>
         <SectionHeader number="04" eyebrow="What I work with" title="Skills & Technologies" />
         
         <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto", marginTop: 48 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
               {primaryCategories.map(({ key, label, glyph, items }, index) => (
                  <SkillCategory
                     key={key}
                     label={label}
                     glyph={glyph}
                     items={items}
                     index={index}
                     breathe
                  />
               ))}
            </div>

            <SecondarySkills categories={secondaryCategories} />
         </div>
      </>
   );
};

export default Skills;
