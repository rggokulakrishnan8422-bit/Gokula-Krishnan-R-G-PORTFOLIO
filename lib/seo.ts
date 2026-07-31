import type { Metadata } from "next";
import { site } from "@/config/site";
import { professionalSkills, technicalSkills } from "@/config/content";

const title = `${site.name} — ${site.role}`;

/** Full metadata set (Master Prompt Section 14). */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
    images: [
      {
        url: "/images/og.jpg",
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
    images: ["/images/og.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

/** JSON-LD Person structured data (Section 14). */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: site.emailHref,
  telephone: site.phone,
  url: site.url,
  image: `${site.url}/images/portrait-hero.jpg`,
  sameAs: [site.linkedin],
  address: {
    "@type": "PostalAddress",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  knowsAbout: [
    ...technicalSkills.map((s) => s.label),
    ...professionalSkills.map((s) => s.label),
  ],
};
