import type { Viewport } from "next";
import { Inter, Sora } from "next/font/google";
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

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F8FC" },
    { media: "(prefers-color-scheme: dark)", color: "#090D1C" },
  ],
};

/** Applies the persisted/system theme before first paint (no FOUC). */
const themeScript = `(() => {
  try {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${sora.variable} ${inter.variable} font-sans antialiased`}>
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
