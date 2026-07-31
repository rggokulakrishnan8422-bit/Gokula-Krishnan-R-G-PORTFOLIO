import {
  Activity,
  BookOpen,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock,
  Columns3,
  FileText,
  Files,
  FolderKanban,
  Gauge,
  Globe,
  Kanban,
  Lightbulb,
  MessageSquare,
  NotebookPen,
  RefreshCw,
  Rocket,
  Sheet,
  Shield,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Workflow,
} from "lucide-react";
import type {
  Chip,
  ExperienceItem,
  NavLink,
  ProfessionalSkill,
  Project,
  StatItem,
  TechnicalSkill,
  Tool,
} from "@/types";

/**
 * Editable content data — redesign matches the approved mockup.
 * Identity/contact fields still live in config/site.ts.
 */

export const navLinks: NavLink[] = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Tools", href: "#tools" },
  { label: "Contact", href: "#contact" },
];

/** Hero — roles strip under the role pill, and summary copy. */
export const heroRoles = ["Agile Enthusiast", "Project Coordinator", "Team Collaborator"];

export const heroSummary =
  "Motivated Junior Project Manager passionate about Agile methodologies, stakeholder communication, project planning, and digital transformation. Dedicated to delivering efficient, organized, and high-quality project outcomes through collaboration, structured execution, and continuous learning.";

/** About section. */
export const aboutParagraph =
  "I am a motivated Junior Project Manager with hands-on experience in Agile methodologies, stakeholder communication, and team collaboration. I enjoy turning ideas into reality through planning, execution, and continuous improvement.";

export const aboutChips: Chip[] = [
  { label: "Agile Mindset", icon: RefreshCw },
  { label: "Team Player", icon: Users },
  { label: "Problem Solver", icon: Lightbulb },
  { label: "Continuous Learner", icon: BookOpen },
];

export const aboutStats: StatItem[] = [
  { value: 8, suffix: "+", label: "Projects Handled", icon: FolderKanban },
  { value: 25, suffix: "+", label: "Team Collaborations", icon: Users },
  { value: 120, suffix: "+", label: "Tasks Completed", icon: CheckCircle2 },
  { value: 60, suffix: "+", label: "Client Meetings", icon: Briefcase },
];

export const aboutQuote =
  "Good project management isn't about tools, it's about people, purpose and the drive to deliver value.";

/** Technical skills with levels — Section 8 list, mockup presentation. */
export const technicalSkills: TechnicalSkill[] = [
  { label: "Agile", icon: RefreshCw, level: 90 },
  { label: "Scrum", icon: Workflow, level: 85 },
  { label: "Jira", icon: Kanban, level: 88 },
  { label: "Trello", icon: Columns3, level: 82 },
  { label: "Notion", icon: NotebookPen, level: 80 },
  { label: "Excel", icon: Sheet, level: 85 },
  { label: "Word", icon: FileText, level: 85 },
  { label: "MS Office", icon: Briefcase, level: 90 },
  { label: "Google Workspace", icon: Globe, level: 88 },
  { label: "AI Tools", icon: Sparkles, level: 75 },
];

/** Professional skills — dot-matrix presentation (spec list + mockup extras). */
export const professionalSkills: ProfessionalSkill[] = [
  { label: "Stakeholder Management", level: 90 },
  { label: "Communication", level: 92 },
  { label: "Planning & Scheduling", level: 88 },
  { label: "Risk Management", level: 80 },
  { label: "Documentation", level: 85 },
  { label: "Problem Solving", level: 86 },
  { label: "Leadership", level: 78 },
  { label: "Time Management", level: 88 },
  { label: "Decision Making", level: 82 },
  { label: "Team Collaboration", level: 90 },
  { label: "Meeting Coordination", level: 84 },
];

/** Tool pills strip. */
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
    period: "2023 — Present",
    role: "Junior Project Manager",
    org: "Technology / IT Services",
    kind: "work",
    summary: "Owning delivery end-to-end for software projects — from kickoff to release.",
    points: [
      "Planned and tracked project schedules and milestones.",
      "Coordinated with developers, designers and stakeholders.",
      "Conducted sprint planning, stand-ups and review meetings.",
      "Managed risks, issues and change requests.",
      "Prepared reports and project presentations.",
      "Ensured delivery within scope, time and budget.",
    ],
    tags: ["Agile", "Scrum", "Jira", "Stakeholder Management"],
  },
  {
    period: "2022 — 2023",
    role: "Project Coordinator",
    org: "Digital Solutions Studio",
    kind: "work",
    summary: "Supported planning and reporting across concurrent client projects.",
    points: [
      "Coordinated schedules, notes and wikis in Notion and Google Workspace.",
      "Built Excel trackers for timelines, budgets and action-item follow-ups.",
      "Assisted UAT coordination and release-note preparation.",
    ],
    tags: ["Coordination", "Notion", "Excel", "Google Workspace"],
  },
  {
    period: "2022",
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

/** Delivery phases for the experience arc visual. */
export const deliveryPhases: Chip[] = [
  { label: "Planning", icon: ClipboardList },
  { label: "Execution", icon: Rocket },
  { label: "Monitoring", icon: Activity },
  { label: "Closing", icon: CheckCircle2 },
];

export const projects: Project[] = [
  {
    id: "website-development",
    title: "Website Development Project",
    description:
      "Managed project planning, team coordination, requirement gathering and successful delivery of a responsive website.",
    tags: ["Planning", "Team Coordination", "Delivery"],
    image: "/images/project-web.jpg",
    icon: Globe,
  },
  {
    id: "process-improvement",
    title: "Business Process Improvement",
    description:
      "Identified process gaps and implemented improvements to enhance workflow efficiency by 30%.",
    tags: ["Analysis", "Optimization", "Efficiency"],
    image: "/images/project-process.jpg",
    icon: TrendingUp,
  },
  {
    id: "task-management",
    title: "Task Management System",
    description:
      "Coordinated the implementation of a task management system using Agile methodology and sprint planning.",
    tags: ["Agile", "Jira", "Sprint Planning"],
    image: "/images/project-tasks.jpg",
    icon: Kanban,
  },
];

/** Kept for icon usage in auxiliary UI. */
export const miscIcons = { CalendarDays, Clock, Files, Gauge, MessageSquare, Shield, UserCheck };
