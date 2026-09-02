import type { LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

/** Technical skill with proficiency level (renders as animated bar). */
export type TechnicalSkill = {
  label: string;
  icon: LucideIcon;
  level: number; // 0–100
};

/** Professional skill with level (renders as dot matrix). */
export type ProfessionalSkill = {
  label: string;
  level: number; // 0–100
};

export type Tool = {
  label: string;
  icon: LucideIcon;
  hint: string;
};

export type StatItem = {
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
};

export type Chip = {
  label: string;
  icon: LucideIcon;
};

export type ExperienceItem = {
  period: string;
  role: string;
  org: string;
  kind: "work" | "education";
  summary: string;
  points: string[];
  tags: string[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  icon: LucideIcon;
};

/** Reference-style skill category card (icon + title + grounded bullets). */
export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  bullets: string[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type ToastType = "success" | "error" | "info";

export type ToastItem = {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
};

/** Resume metadata definition for download/preview modal system */
export type ResumeItem = {
  id: string;
  title: string;
  subtitle: string;
  filename: string;
  path: string;
  size: string;
  updated: string;
  description: string;
  primary?: boolean;
};

/** Component state machine shared by form/async UI (Section 9). */
export type AsyncState = "idle" | "loading" | "success" | "error";
