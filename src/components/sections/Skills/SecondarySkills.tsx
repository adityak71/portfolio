"use client";

import SkillCategory, { type CategoryGlyph } from "./SkillCategory";

interface CategoryEntry {
   key: string;
   label: string;
   glyph: CategoryGlyph;
   items: string[];
}

interface SecondarySkillsProps {
   categories: CategoryEntry[];
}

const SecondarySkills = ({ categories }: SecondarySkillsProps) => {
   if (categories.length === 0) return null;

   return (
      <div
         style={{
            marginTop: 56,
            display: "flex",
            flexDirection: "column",
            gap: 48,
         }}
      >
         {categories.map(({ key, label, glyph, items }, index) => (
            <SkillCategory
               key={key}
               label={label}
               glyph={glyph}
               items={items}
               index={index}
               small
            />
         ))}
      </div>
   );
};

export default SecondarySkills;
