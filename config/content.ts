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
  StatItem,
  TechnicalSkill,
  Tool,
} from "@/types";

/** Navigation items - exact smooth scroll anchors */
export const navLinks: NavLink[] = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Tools", href: "#tools" },
  { label: "Contact", href: "#contact" },
];

/** Hero roles & summary */
export const heroRoles = [
  "Project Coordinator",
  "Junior Project Manager",
  "Operations Specialist",
  "Flutter Developer",
];

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
  { value: 7, suffix: "", label: "Projects Managed", icon: FolderKanban },
  { value: 3, suffix: "", label: "Projects Delivered", icon: CheckCircle2 },
  { value: 16, suffix: "+", label: "Team Size Handled", icon: Users },
  { value: 2, suffix: "+", label: "Years Experience", icon: Briefcase },
];

export const aboutQuote =
  "Effective project coordination hinges on crisp reporting, proactive blocker escalation, and structured stakeholder alignment.";

/** Technical skills with levels */
export const technicalSkills: TechnicalSkill[] = [
  { label: "Jira & Agile Workflows", icon: Kanban, level: 85 },
  { label: "Trello & Task Boards", icon: Columns3, level: 80 },
  { label: "Google Workspace & Sheets", icon: Globe, level: 85 },
  { label: "MS Office (Excel/Word/PPT)", icon: FileText, level: 85 },
  { label: "Flutter & Dart App Dev", icon: Smartphone, level: 75 },
  { label: "REST API Integration", icon: Share2, level: 80 },
  { label: "State Mgmt (Provider/GetX)", icon: Layers, level: 75 },
  { label: "Azure DevOps", icon: Cpu, level: 70 },
  { label: "Firebase & Data", icon: Database, level: 70 },
];

/** Professional skills matrix */
export const professionalSkills: ProfessionalSkill[] = [
  { label: "Stakeholder Management", level: 90 },
  { label: "Communication & Escalation", level: 90 },
  { label: "Planning & Scheduling", level: 88 },
  { label: "Requirement Gathering", level: 85 },
  { label: "Risk & Blocker Tracking", level: 85 },
  { label: "Sprint Planning", level: 82 },
  { label: "Status Reporting Cadence", level: 90 },
  { label: "Resource Allocation", level: 80 },
  { label: "Process Improvement", level: 85 },
  { label: "Vendor & Client Coordination", level: 82 },
];

/** Tool pills wall */
export const toolsWall: Tool[] = [
  { label: "Jira", icon: Kanban, hint: "Sprint boards & backlog" },
  { label: "Azure DevOps", icon: Cpu, hint: "Task & issue tracking" },
  { label: "Trello", icon: Columns3, hint: "Kanban & milestone views" },
  { label: "Google Workspace", icon: Globe, hint: "Docs & cloud collaboration" },
  { label: "MS Excel & Sheets", icon: Sheet, hint: "Formulas & status reports" },
  { label: "Flutter & Dart", icon: Smartphone, hint: "Mobile app codebase" },
  { label: "VS Code & Android Studio", icon: AppWindow, hint: "Dev IDEs" },
  { label: "AI Tools & Extensions", icon: Sparkles, hint: "Workflow acceleration" },
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

export const miscIcons = { CalendarDays, Clock, Files, Gauge, MessageSquare, Shield, UserCheck };
