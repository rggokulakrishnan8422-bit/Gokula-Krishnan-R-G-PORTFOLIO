import type { Config } from "tailwindcss";

/**
 * Design tokens — Master Prompt Section 4.
 * Colors resolve to CSS custom properties (see styles/globals.css) so both
 * dark and light themes consume the same token names.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
        // Accent palette shades are var-mapped so the Theme Variations
        // switcher (lib/themes.ts) re-colors every accent usage at once.
        cyan: {
          300: "rgb(var(--cyan-300) / <alpha-value>)",
          400: "rgb(var(--cyan-400) / <alpha-value>)",
          500: "rgb(var(--cyan-500) / <alpha-value>)",
        },
        purple: {
          400: "rgb(var(--purple-400) / <alpha-value>)",
          500: "rgb(var(--purple-500) / <alpha-value>)",
          600: "rgb(var(--purple-600) / <alpha-value>)",
        },
        indigo: {
          500: "rgb(var(--indigo-500) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Typography scale (Section 4) — fluid at the low end, exact at max.
        hero: ["clamp(44px, 7vw, 80px)", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
        section: ["clamp(32px, 4.5vw, 56px)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        card: ["clamp(22px, 2.6vw, 28px)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        body: ["18px", { lineHeight: "1.65" }],
        caption: ["14px", { lineHeight: "1.5" }],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        sm: "0 1px 2px hsl(var(--shadow-color) / 0.08)",
        md: "0 4px 12px -2px hsl(var(--shadow-color) / 0.12)",
        lg: "0 12px 32px -8px hsl(var(--shadow-color) / 0.18)",
        xl: "0 24px 64px -16px hsl(var(--shadow-color) / 0.28)",
      },
      transitionDuration: {
        micro: "150ms",
        small: "250ms",
        component: "400ms",
        section: "600ms",
        hero: "800ms",
      },
      maxWidth: {
        content: "1800px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "spin-slow-reverse": {
          to: { transform: "rotate(-360deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "spin-slow": "spin-slow 40s linear infinite",
        "spin-slow-reverse": "spin-slow-reverse 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
