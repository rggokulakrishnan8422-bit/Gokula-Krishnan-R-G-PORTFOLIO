import type { Metadata } from "next";
import { site } from "@/config/site";
import { professionalSkills, technicalSkills } from "@/config/content";

const title = `${site.name} | ${site.role} Portfolio`;

/** Complete metadata set for production Vercel deployment */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
    images: [
      {
        url: "/images/hero-globe.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/images/hero-globe.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: { icon: "/icon.svg" },
};

/** JSON-LD Person structured data */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      jobTitle: site.role,
      email: site.email,
      telephone: site.phone,
      url: site.url,
      image: `${site.url}/images/hero-globe.jpg`,
      sameAs: [site.linkedin],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Coimbatore",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      worksFor: {
        "@type": "Organization",
        name: "Dreams Technologies",
      },
      knowsAbout: [
        "Project Management",
        "Project Coordination",
        "Operations & Process Management",
        "Agile & Scrum",
        "Sprint Planning",
        "Jira",
        "Azure DevOps",
        "Flutter & Dart",
        "REST APIs",
        ...technicalSkills.map((s) => s.label),
        ...professionalSkills.map((s) => s.label),
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: `${site.name} Portfolio`,
      description: site.description,
      publisher: {
        "@id": `${site.url}/#person`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${site.url}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: site.url,
        },
      ],
    },
  ],
};
