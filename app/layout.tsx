import type { Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "@/styles/globals.css";
import { defaultMetadata, personJsonLd } from "@/lib/seo";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { ToastProvider } from "@/components/ui/toast";
import { BackgroundLayer } from "@/components/layout/background-layer";
import { ScrollIndicator } from "@/components/layout/scroll-indicator";
import { Navbar } from "@/components/layout/navbar";
import { NavRail } from "@/components/layout/nav-rail";
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
  themeColor: "#050816",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={`${sora.variable} ${inter.variable} font-sans antialiased bg-surface text-text`}>
        {/* Applies the saved accent theme pre-paint (no flash). Mirrors lib/themes.ts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("gk-accent-theme");if(["neon-blue","cyber-purple","ocean-teal","sunset-amber","forest-green"].indexOf(t)>-1){document.documentElement.dataset.theme=t;}}catch(e){}})();`,
          }}
        />
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <LenisProvider>
          <ToastProvider>
            <BackgroundLayer />
            <ScrollIndicator />
            <Navbar />
            <NavRail />
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
