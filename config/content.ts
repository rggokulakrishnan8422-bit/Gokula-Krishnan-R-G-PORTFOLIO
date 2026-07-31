import {
  Briefcase,
  CalendarDays,
  Clock,
  ClipboardList,
  Columns3,
  FileText,
  Files,
  FolderKanban,
  Gauge,
  Globe,
  GraduationCap,
  Kanban,
  Lightbulb,
  MessageSquare,
  NotebookPen,
  RefreshCw,
  Sheet,
  Shield,
  Sparkles,
  UserCheck,
  Users,
  Workflow,
} from "lucide-react";
import type { ExperienceItem, NavLink, Project, Skill, Tool } from "@/types";

/**
 * Editable content data (Master Prompt Sections 2, 7, 8).
 * Identity/contact fields still live in config/site.ts — this file holds
 * section content only. Edit freely; sections render from these arrays.
 */

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Tools", href: "#tools" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const typingWords = [
  "Agile Delivery",
  "Sprint Planning",
  "Project Coordination",
  "Stakeholder Communication",
  "Risk Management",
];

/** Technical skills — Section 8. */
export const technicalSkills: Skill[] = [
  { label: "Agile", icon: RefreshCw },
  { label: "Scrum", icon: Workflow },
  { label: "Jira", icon: Kanban },
  { label: "Trello", icon: Columns3 },
  { label: "Notion", icon: NotebookPen },
  { label: "Excel", icon: Sheet },
  { label: "Word", icon: FileText },
  { label: "MS Office", icon: Briefcase },
  { label: "Google Workspace", icon: Globe },
  { label: "AI Tools", icon: Sparkles },
];

/** Professional skills — Section 8. */
export const professionalSkills: Skill[] = [
  { label: "Planning", icon: ClipboardList },
  { label: "Communication", icon: MessageSquare },
  { label: "Stakeholder Management", icon: UserCheck },
  { label: "Documentation", icon: Files },
  { label: "Team Collaboration", icon: Users },
  { label: "Scheduling", icon: CalendarDays },
  { label: "Time Management", icon: Clock },
  { label: "Risk Management", icon: Shield },
  { label: "Problem Solving", icon: Lightbulb },
];

/** Tool wall (Tools section) — the software stack, distilled. */
export const toolsWall: Tool[] = [
  { label: "Jira", icon: Kanban, hint: "Boards & workflows" },
  { label: "Trello", icon: Columns3, hint: "Visual tracking" },
  { label: "Notion", icon: NotebookPen, hint: "Docs & wikis" },
  { label: "Excel", icon: Sheet, hint: "Trackers & reports" },
  { label: "Word", icon: FileText, hint: "Documentation" },
  { label: "MS Office", icon: Briefcase, hint: "Business suite" },
  { label: "Google Workspace", icon: Globe, hint: "Collaboration" },
  { label: "AI Tools", icon: Sparkles, hint: "Assisted workflows" },
];

export const experience: ExperienceItem[] = [
  {
    period: "2024 — Present",
    role: "Junior Project Manager",
    org: "Enterprise Technology Services",
    kind: "work",
    summary:
      "Coordinating cross-functional delivery for software projects, from kickoff to release.",
    points: [
      "Facilitate sprint planning, daily stand-ups, reviews and retrospectives.",
      "Own Jira boards, velocity tracking and burndown reporting for the team.",
      "Manage stakeholder communication, RAID logs and delivery documentation.",
    ],
    tags: ["Agile", "Scrum", "Jira", "Stakeholder Management"],
  },
  {
    period: "2023 — 2024",
    role: "Project Coordinator",
    org: "Digital Solutions Studio",
    kind: "work",
    summary:
      "Supported planning and reporting across concurrent client projects.",
    points: [
      "Coordinated schedules, notes and wikis in Notion and Google Workspace.",
      "Built Excel trackers for timelines, budgets and action-item follow-ups.",
      "Assisted UAT coordination and release-note preparation.",
    ],
    tags: ["Coordination", "Notion", "Excel", "Google Workspace"],
  },
  {
    period: "2023",
    role: "Bachelor's Degree",
    org: "Undergraduate Studies",
    kind: "education",
    summary:
      "Academic foundation in project management methods, agile practices and business communication.",
    points: [
      "Coursework spanning planning, documentation and team leadership.",
      "Led academic project teams using agile practices.",
    ],
    tags: ["Education", "Foundations"],
  },
];

export const projects: Project[] = [
  {
    id: "sprint-orchestration",
    title: "Agile Sprint Orchestration",
    description:
      "Designed and ran a full Scrum cadence — backlog grooming, sprint planning, reviews and retros — with Jira boards and burndown tracking wired for visibility.",
    tags: ["Scrum", "Jira", "Facilitation"],
    outcome: "Noticeably improved sprint predictability",
    icon: Workflow,
  },
  {
    id: "delivery-tracker",
    title: "Cross-Team Delivery Tracker",
    description:
      "Built a unified delivery tracker combining Jira status, Notion documentation and Excel rollups so every team reads from the same page.",
    tags: ["Jira", "Notion", "Excel"],
    outcome: "Single source of truth across three teams",
    icon: FolderKanban,
  },
  {
    id: "stakeholder-reporting",
    title: "Stakeholder Reporting System",
    description:
      "Standardized weekly executive reporting with reusable Excel and slide templates — progress, risks, decisions and next steps in one consistent format.",
    tags: ["Excel", "Communication", "Reporting"],
    outcome: "Reusable one-click weekly reporting",
    icon: Gauge,
  },
  {
    id: "ai-pm-workflow",
    title: "AI-Assisted PM Workflow",
    description:
      "Integrated AI tooling into meeting notes, documentation drafts and status summaries, with human review gates to keep quality high.",
    tags: ["AI Tools", "Documentation", "Time Management"],
    outcome: "Hours saved on weekly admin work",
    icon: Sparkles,
  },
];

export const sectionIcons = { GraduationCap };
