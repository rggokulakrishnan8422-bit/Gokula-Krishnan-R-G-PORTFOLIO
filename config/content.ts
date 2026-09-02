import {
  Activity,
  AppWindow,
  BookOpen,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock,
  Columns3,
  Cpu,
  Database,
  FileText,
  Files,
  FolderKanban,
  Gauge,
  Globe,
  GraduationCap,
  Kanban,
  Layers,
  Layout,
  Lightbulb,
  MapPin,
  MessageSquare,
  NotebookPen,
  PhoneCall,
  RefreshCw,
  Rocket,
  Share2,
  Sheet,
  Shield,
  Smartphone,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";
import type {
  Chip,
  ExperienceItem,
  NavLink,
  ProfessionalSkill,
  Project,
  SkillCategory,
  StatItem,
  TechnicalSkill,
  Testimonial,
  Tool,
} from "@/types";

/** Navigation items — reference order, exact smooth scroll anchors */
export const navLinks: NavLink[] = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/** Hero tagline (typed once, reference mockup) */
export const heroTagline = "Plan. Organize. Deliver.";

/** Hero lead paragraph — concise positioning grounded in heroSummary. */
export const heroLead =
  "I turn ideas into impact — managing cross-functional teams, building robust systems and delivering results with clarity, strategy and passion.";

export const heroSummary =
  "Project Management professional with 2+ years of experience coordinating cross-functional teams and end-to-end delivery across software, operations, and process-improvement initiatives. Managing a portfolio of 7 projects (4 concurrently) with teams ranging from 1 to 16 resources, delivering 3 projects to completion with structured reporting cadences.";

/** About Section */
export const aboutParagraph =
  "I specialize in bridging the gap between business objectives, cross-functional teams, and technical execution. Experienced in Agile-aligned coordination using Jira, Azure DevOps, Trello, and Google Workspace, combined with hands-on technical grounding in Flutter and Dart mobile development.";

export const aboutChips: Chip[] = [
  { label: "Portfolio Management", icon: FolderKanban },
  { label: "Agile & Scrum Cadence", icon: RefreshCw },
  { label: "Cross-Functional Leadership", icon: Users },
  { label: "Process & Risk Optimization", icon: TrendingUp },
];

export const aboutStats: StatItem[] = [
  { value: 8, suffix: "+", label: "Projects Handled", icon: FolderKanban },
  { value: 25, suffix: "+", label: "Team Collaborated", icon: Users },
  { value: 120, suffix: "+", label: "Tasks Completed", icon: CheckCircle2 },
  { value: 60, suffix: "+", label: "Client Meetings", icon: Briefcase },
];

export const aboutQuote =
  "Good project management isn't about tools, it's about people, purpose and the drive to deliver value.";

/** Technical skills with levels matching 04_33_03 PM mockup */
export const technicalSkills: TechnicalSkill[] = [
  { label: "Agile", icon: Kanban, level: 95 },
  { label: "Scrum", icon: RefreshCw, level: 90 },
  { label: "Jira", icon: Kanban, level: 85 },
  { label: "Asana", icon: Layout, level: 90 },
  { label: "Trello", icon: Columns3, level: 88 },
  { label: "Excel", icon: Sheet, level: 92 },
  { label: "MS Office", icon: FileText, level: 92 },
  { label: "Google Workspace", icon: Globe, level: 90 },
  { label: "AI Tools", icon: Sparkles, level: 75 },
];

/** Professional skills matrix */
export const professionalSkills: ProfessionalSkill[] = [
  { label: "Stakeholder Management", level: 90 },
  { label: "Communication", level: 90 },
  { label: "Planning & Scheduling", level: 88 },
  { label: "Risk Management", level: 85 },
  { label: "Documentation", level: 85 },
  { label: "Problem Solving", level: 88 },
  { label: "Leadership", level: 85 },
  { label: "Time Management", level: 82 },
  { label: "Decision Making", level: 85 },
  { label: "Team Collaboration", level: 90 },
  { label: "Meeting Coordination", level: 88 },
];

/** Tool pills wall */
export const toolsWall: Tool[] = [
  { label: "Jira", icon: Kanban, hint: "Sprint boards & backlog" },
  { label: "Notion", icon: FileText, hint: "Docs & wikis" },
  { label: "Trello", icon: Columns3, hint: "Kanban & milestone views" },
  { label: "Google Workspace", icon: Globe, hint: "Docs & cloud collaboration" },
  { label: "Excel", icon: Sheet, hint: "Formulas & status reports" },
  { label: "Word", icon: FileText, hint: "Documentation" },
  { label: "MS Office", icon: FileText, hint: "Suite" },
  { label: "AI Tools", icon: Sparkles, hint: "Workflow acceleration" },
];

/** Career Experience Timeline */
export const experience: ExperienceItem[] = [
  {
    period: "Oct 2025 — Present",
    role: "Junior Project Manager (Project Coordinator)",
    org: "Dreams Technologies | Coimbatore, India",
    kind: "work",
    summary:
      "Managing a portfolio of 7 projects (4 concurrently) with cross-functional teams ranging from 1 to 16 resources.",
    points: [
      "Coordinated projects including Tony (Aseda), Global Connect Kannaku, Best & Service (B&S), Trulyselly, UCC (Urgent Care Colombia), Doccure, PaguiShop, and FinancaPlus.",
      "Successfully delivered 3 projects to completion, owning requirement gathering, sprint planning, and stakeholder communication.",
      "Designed and implemented a structured reporting cadence — alternate-day status updates, weekly summaries, and monthly reviews — elevating senior leadership visibility.",
      "Tracked project risks, blockers, and escalations using Jira, Azure DevOps, Trello, and Google Workspace.",
      "Supported senior project management with sprint planning, task breakdown, and cross-team coordination.",
    ],
    tags: [
      "Portfolio Management",
      "Agile/Scrum",
      "Jira",
      "Azure DevOps",
      "Stakeholder Communication",
      "Sprint Planning",
    ],
  },
  {
    period: "Mar 2025 — Oct 2025",
    role: "Branch Operations Manager",
    org: "VFurnish | Coimbatore, India",
    kind: "work",
    summary:
      "Directed daily task allocation and branch operations for a combined workforce of 14–21 personnel.",
    points: [
      "Allocated and scheduled daily tasks for 8–11 on-site (field visit) personnel and 6–10 off-site staff.",
      "Maintained regular progress and risk reporting to senior leadership, keeping delivery timelines on track.",
      "Monitored task completion across concurrent workstreams and directed day-to-day branch administration and recordkeeping.",
    ],
    tags: [
      "Operations Management",
      "Resource Allocation",
      "Workforce Scheduling",
      "Timeline Control",
    ],
  },
  {
    period: "Dec 2022 — May 2024",
    role: "Process Associate",
    org: "I-Cons Technologies | Coimbatore, India",
    kind: "work",
    summary:
      "Processed high-volume documentation and data workflows within a 55+ person team.",
    points: [
      "Extracted and reformatted 20–60 documents weekly across PDF, Excel, Word, and PowerPoint with strict accuracy.",
      "Conducted web research and image annotation projects, leveraging AI tools and Google extensions for enhanced turnaround speed.",
      "Built and maintained Excel formulas and Google Sheets workflows to power reporting and data analysis.",
      "Coordinated internal team communication and supported the Project Manager with client-facing interactions.",
    ],
    tags: [
      "Process Optimization",
      "Documentation",
      "Excel/Google Sheets",
      "AI Workflows",
      "Client Support",
    ],
  },
  {
    period: "Jun 2024 — Sep 2024",
    role: "Certification: Flutter Developer Course",
    org: "Nschool Academy | Coimbatore, India",
    kind: "education",
    summary:
      "Intensive training in cross-platform mobile app development, state management, and REST APIs.",
    points: [
      "Developed mobile application architectures in Flutter & Dart.",
      "Integrated REST APIs, Google Maps API, Firebase, and State Management (Provider, GetX, Riverpod).",
    ],
    tags: ["Flutter", "Dart", "REST API", "Firebase", "State Management"],
  },
  {
    period: "2019 — 2022",
    role: "Bachelor of Science in Computer Science",
    org: "Kathir College of Arts and Science | Coimbatore, India",
    kind: "education",
    summary:
      "Core computer science foundation covering algorithms, software engineering principles, and databases.",
    points: [
      "Graduated with strong analytical and problem-solving grounding.",
      "Active team lead in academic projects and technical presentations.",
    ],
    tags: ["Computer Science", "B.Sc Degree", "Software Engineering"],
  },
];

/** Delivery lifecycle phases */
export const deliveryPhases: Chip[] = [
  { label: "Requirements & Planning", icon: ClipboardList },
  { label: "Sprint Execution", icon: Rocket },
  { label: "Monitoring & Reporting", icon: Activity },
  { label: "Delivery & Closing", icon: CheckCircle2 },
];

/** Featured Portfolio Projects */
export const projects: Project[] = [
  {
    id: "software-portfolio-delivery",
    title: "Software Portfolio Delivery & Agile Coordination",
    description:
      "Coordinated a portfolio of 7 projects (4 concurrently) at Dreams Technologies including Tony (Aseda), FinancaPlus, and UCC. Delivered 3 projects on schedule through alternate-day reporting and structured sprint planning.",
    tags: ["Jira", "Agile/Scrum", "Portfolio Mgmt", "Sprint Planning"],
    image: "/images/project-tasks.jpg",
    icon: Kanban,
  },
  {
    id: "branch-operations-workforce",
    title: "Branch Operations & Workforce Scheduling",
    description:
      "Directed daily operations and task scheduling for 14-21 personnel (field & off-site) at VFurnish, implementing risk reporting cadences that ensured 100% on-time milestone delivery.",
    tags: ["Operations", "Workforce Scheduling", "Resource Allocation"],
    image: "/images/project-process.jpg",
    icon: TrendingUp,
  },
  {
    id: "flutter-mobile-app",
    title: "Cross-Platform Flutter Application Suite",
    description:
      "Architected and developed modular Flutter/Dart mobile applications with REST API integrations, state management (Provider/GetX/Riverpod), and Firebase backends.",
    tags: ["Flutter", "Dart", "REST API", "Firebase", "State Mgmt"],
    image: "/images/project-web.jpg",
    icon: Smartphone,
  },
];

/** Languages supported */
export const languages = [
  { language: "English", proficiency: "Read, Write, Speak" },
  { language: "Tamil", proficiency: "Read, Write, Speak" },
  { language: "Telugu", proficiency: "Speak" },
];

/**
 * Skill category cards (reference "MY SKILLS & EXPERTISE" quadrant).
 * Every bullet is drawn from existing content above — no invented tooling.
 */
export const skillCategories: SkillCategory[] = [
  {
    title: "Planning & Execution",
    icon: ClipboardList,
    bullets: deliveryPhases.map((p) => p.label),
  },
  {
    title: "Team Leadership",
    icon: Users,
    bullets: [
      "Cross-Functional Leadership",
      "Agile & Scrum Cadence",
      "Meeting Coordination",
      "Team Collaboration",
    ],
  },
  {
    title: "Tools & Methodologies",
    icon: Wrench,
    bullets: [
      "Jira & Azure DevOps",
      "Trello & Asana",
      "Google Workspace",
      "Excel & MS Office",
    ],
  },
  {
    title: "Communication",
    icon: MessageSquare,
    bullets: [
      "Stakeholder Management",
      "Documentation & Reporting",
      "Meeting Coordination",
      "Client Communication",
    ],
  },
];

/**
 * Testimonials — seeded from the owner's design mockup (Sep 2026).
 * Replace with verified references when available.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Gokula is a highly motivated project manager who ensures projects are delivered on time with quality. His leadership and communication skills make him an asset to any team.",
    name: "Rohit Sharma",
    role: "Senior Delivery Manager",
  },
];

export const miscIcons = { CalendarDays, Clock, Files, Gauge, MessageSquare, Shield, UserCheck };
