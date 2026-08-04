import type { ResumeItem } from "@/types";

/**
 * Single source of truth for identity and site-wide config.
 */
export const site = {
  name: "Gokula Krishnan R G",
  firstName: "Gokula Krishnan",
  role: "Junior Project Manager & Project Coordinator",
  email: "r.g.gokulakrishnan8422@gmail.com",
  emailHref: "mailto:r.g.gokulakrishnan8422@gmail.com",
  phone: "+91 95009 24842",
  phoneHref: "tel:+919500924842",
  linkedin: "https://www.linkedin.com/in/gokula-krishnan-r-g-00a124286",
  url: "https://gokula-krishnan-r-g-portfolio.vercel.app",
  location: "Coimbatore, Tamil Nadu, India",
  tagline: "Driving Efficient, Structured Delivery across Software & Business Operations.",
  description:
    "Portfolio of Gokula Krishnan R G — Junior Project Manager & Project Coordinator with 2+ years of experience coordinating cross-functional teams, managing portfolio delivery, Agile workflows, and mobile application development.",
  keywords: [
    "Gokula Krishnan R G",
    "Project Manager",
    "Project Coordinator",
    "Operations",
    "Business Process Management",
    "Agile & Scrum",
    "Portfolio Management",
    "Jira",
    "Azure DevOps",
    "Trello",
    "Flutter & Dart",
    "Software Professional",
    "Web Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "Coimbatore",
    "Tamil Nadu",
    "India",
    "Portfolio",
  ],
  resumes: [
    {
      id: "project-coordinator",
      title: "Project Coordinator Resume",
      subtitle: "Operations & Process Management Focus",
      filename: "Gokula_Krishnan_RG_Project_Coordinator_Resume.pdf",
      path: "/resumes/Gokula_Krishnan_RG_Project_Coordinator_Resume.pdf",
      size: "173 KB",
      updated: "Aug 2026",
      description:
        "Specialized in project coordination, managing a portfolio of 7 projects (4 concurrently), alternate-day reporting cadences, cross-functional workforce scheduling, and process optimization.",
      primary: true,
    },
    {
      id: "project-manager",
      title: "Project Manager Resume",
      subtitle: "Full-Stack Project Management & Technical Focus",
      filename: "Gokula_Krishnan_RG_Project_Manager_Resume.pdf",
      path: "/resumes/Gokula_Krishnan_RG_Project_Manager_Resume.pdf",
      size: "567 KB",
      updated: "Aug 2026",
      description:
        "Comprehensive resume highlighting end-to-end software project lifecycles, Agile sprint planning, stakeholder communication, and technical Flutter/Dart & REST API capabilities.",
      primary: false,
    },
  ] as ResumeItem[],
} as const;

export type Site = typeof site;
