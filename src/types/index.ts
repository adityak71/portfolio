/* TypeScript type definitions for all data structures */

import type { IconType } from "react-icons";

// ——— Personal ———
export interface SocialProfile {
  id: number;
  name: string;
  link: string;
  icon: string;
}

export interface PersonalData {
  name: string;
  title: string;
  role: string;
  location: string;
  timezone: string;
  intro: string;
  role_label: string;
  headline: string;
  availability: string;
  contact: {
    github: string;
    email: string;
    phone: string;
  };
  about: {
    greeting: string;
    current_role: string;
    specialization: string;
    education: string;
  };
  languages: { name: string; level: string }[];
  social_profiles: SocialProfile[];
  site: {
    tech_stack: string[];
  };
}

// ——— Skills ———
export interface SkillsData {
  languages?: string[];
  frontend?: string[];
  backend?: string[];
  databases?: string[];
  apis?: string[];
  dev_tools?: string[];
  cs_fundamentals?: string[];
  development_practices?: string[];
  soft_skills?: string[];
  areas_of_interest?: string[];
  currently_practicing?: string[];
  hero_stack?: string[];
}

// ——— Projects ———
export interface Project {
  id: number;
  title: string;
  description: string;
  date: string;
  tools_tech: string[];
  features: string[];
  github: string;
  live: string;
  team?: string;
  organization?: string;
  contributors?: string[];
  imageUrl?: string;
}

export interface OpenSourceContribution {
  repo: string;
  stars: number;
  title: string;
  url: string;
  status: "merged" | "open" | "closed";
  merged_at?: string;
  note?: string;
}

export interface CommunityDiscussion {
  repo: string;
  title: string;
  url: string;
  status: "accepted" | "helpful";
}

export interface ProjectsData {
  spotlight_project_id?: number;
  featured_projects: Project[];
  collaborative_projects?: Project[];
  community_projects?: Project[];
  other_projects: Project[];
  open_source_contributions?: OpenSourceContribution[];
  community_discussions?: CommunityDiscussion[];
}

// ——— Education ———
export interface Education {
  id: number;
  date: string;
  title: string;
  institution: string;
  department?: string;
  board?: string;
  field?: string;
  achievements?: string[];
  projects?: any[];
  internal_contributions?: any[];
  location: string;
  cgpa?: string;
  percentage?: string;
  expected?: string;
  skills: string[];
}

// ——— Experience / Training ———
export interface Training {
  id: number;
  date: string;
  title: string;
  position: string;
  company: string;
  location: string;
  summary: string;
  description: Record<string, string>;
  skills: string[];
}

export interface ExperienceData {
  training: Training[];
  positions_of_responsibility: unknown[];
}

// ——— Achievements ———
export interface Certification {
  id: number;
  name: string;
  type: string;
  issuer: string;
  issueDate: string;
  badgeUrl?: string;
  imageUrl: string;
  url?: string;
}

export interface LearningBadge {
  id: number;
  name: string;
  type: string;
  issuer: string;
  topics?: string[];
  url?: string;
  badgeUrl: string;
  imageUrl: string;
}

export interface AchievementsData {
  certifications: Certification[];
  learning_training?: LearningBadge[];
  achievements: unknown[];
  coding_platform_stats: Record<string, unknown>;
}

// ——— Services ———
export interface ServicesData {
  enabled: boolean;
  TODO_REPLACE?: boolean;
}

// ——— Contact ———
export interface ContactOption {
  id: number;
  type: string;
  label: string;
  value: string;
  link: string;
  icon: string;
}

export interface EmailConfig {
  service_id: string;
  template_id: string;
  public_key: string;
  TODO_REPLACE?: boolean;
}

export interface ContactData {
  contact_options: ContactOption[];
  email_config: EmailConfig;
}

// ——— Icon map ———
export type IconMap = Record<string, IconType>;

// ——— Section ———
export interface NavSection {
  id: string;
  label: string;
  surface: string;
}
