import type { LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export type Skill = {
  label: string;
  icon: LucideIcon;
};

export type Tool = Skill & {
  hint: string;
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
  outcome: string;
  icon: LucideIcon;
};

export type ToastType = "success" | "error" | "info";

export type ToastItem = {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
};

/** Component state machine shared by form/async UI (Section 9). */
export type AsyncState = "idle" | "loading" | "success" | "error";
