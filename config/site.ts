/**
 * Single source of truth (Master Prompt Sections 2 & 12).
 * Every component must read contact/identity data from here —
 * never hardcode these strings anywhere else.
 */
export const site = {
  name: "Gokula Krishnan R G",
  firstName: "Gokula Krishnan",
  role: "Junior Project Manager",
  email: "r.g.gokulakrishnan8422@gmail.com",
  emailHref: "mailto:r.g.gokulakrishnan8422@gmail.com",
  phone: "+91 95009 24842",
  phoneHref: "tel:+919500924842",
  linkedin: "https://www.linkedin.com/in/gokula-krishnan-r-g-00a124286",
  /** Swap the file at public/resume.pdf — every download link updates automatically. */
  resumePath: "/resume.pdf",
  url: "https://gokulakrishnan.dev",
  location: "Tamil Nadu, India",
  tagline: "Turning plans into reliable delivery.",
  description:
    "Portfolio of Gokula Krishnan R G, a Junior Project Manager specializing in Agile delivery, sprint planning, stakeholder communication, and risk management.",
  keywords: [
    "Gokula Krishnan R G",
    "Junior Project Manager",
    "Agile",
    "Scrum",
    "Jira",
    "Project Management",
    "Portfolio",
  ],
} as const;

export type Site = typeof site;
