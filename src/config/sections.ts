/* Section definitions — order, IDs, labels, surface classes.
   Exact match of reference sections.ts. */

export interface NavSection {
  id: string;
  label: string;
  surface: string;
}

export const NAV_SECTIONS: NavSection[] = [
  { id: "about", label: "About", surface: "section-darker" },
  { id: "training", label: "Training", surface: "section-dark" },
  { id: "education", label: "Education", surface: "section-darker" },
  { id: "skills", label: "Skills", surface: "section-dark" },
  { id: "projects", label: "Projects", surface: "section-darker" },
  { id: "achievements", label: "Achievements", surface: "section-dark" },
  { id: "stats", label: "Stats", surface: "section-darker" },
  { id: "contact", label: "Contact", surface: "section-dark" },
];
