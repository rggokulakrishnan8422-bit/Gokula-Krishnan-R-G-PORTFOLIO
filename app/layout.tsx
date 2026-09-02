import type { Viewport } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { defaultMetadata, personJsonLd } from "@/lib/seo";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { ToastProvider } from "@/components/ui/toast";
import { BackgroundLayer } from "@/components/layout/background-layer";
import { ScrollIndicator } from "@/components/layout/scroll-indicator";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/layout/back-to-top";
import { Cursor } from "@/components/ui/cursor";

/**
 * Fonts are self-hosted via @fontsource-variable packages (npm) instead of
 * next/font/google, so builds never depend on network access to Google Fonts
 * (CI, sandboxes, offline) — same faces, same CSS variables.
 */
const sora = localFont({
  src: "../node_modules/@fontsource-variable/sora/files/sora-latin-wght-normal.woff2",
  weight: "100 800",
  variable: "--font-sora",
  display: "swap",
});

const inter = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

/** Handwriting font for the gold personal signature */
const script = localFont({
  src: "../node_modules/@fontsource-variable/dancing-script/files/dancing-script-latin-wght-normal.woff2",
  weight: "400 700",
  variable: "--font-script",
  display: "swap",
});

/** Editorial serif — reserved for quotes and testimonial prose (used sparingly) */
const fraunces = localFont({
  src: "../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-standard-normal.woff2",
  weight: "300 900",
  variable: "--font-fraunces",
  display: "swap",
  style: "normal",
});

export const metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060608",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${sora.variable} ${inter.variable} ${script.variable} ${fraunces.variable} font-sans antialiased bg-background text-text`}
      >
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <LenisProvider>
          <ToastProvider>
            <BackgroundLayer />
            <ScrollIndicator />
            <Navbar />
            <main id="content">{children}</main>
            <Footer />
            <BackToTop />
            <Cursor />
          </ToastProvider>
        </LenisProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
