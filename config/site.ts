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
  github: "https://github.com/rggokulakrishnan8422-bit",
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
      id: "project-manager-ats",
      title: "Gokula Krishnan - Project Manager (ATS Resume)",
      subtitle: "ATS-Optimized & Structured Format",
      filename: "Gokula_Krishnan_Project_Manager_ATS_Resume.pdf",
      path: "/resumes/Gokula_Krishnan_Project_Manager_ATS_Resume.pdf",
      size: "567 KB",
      updated: "Aug 2026",
      description:
        "ATS-compliant Project Manager resume focusing on core competencies, portfolio coordination, Agile methodology, and structured reporting.",
      primary: true,
    },
    {
      id: "project-manager-modern",
      title: "Gokula Krishnan - Project Manager (Modern Design)",
      subtitle: "Visual Glassmorphic & Modern Layout",
      filename: "Gokula_Krishnan_Project_Manager_Modern_Design_Resume.pdf",
      path: "/resumes/Gokula_Krishnan_Project_Manager_Modern_Design_Resume.pdf",
      size: "173 KB",
      updated: "Aug 2026",
      description:
        "Modern visual resume highlighting end-to-end software project lifecycles, cross-functional leadership, technical Flutter capabilities, and achievements.",
      primary: false,
    },
  ] as ResumeItem[],
} as const;

export type Site = typeof site;
