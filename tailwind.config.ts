import type { Config } from "tailwindcss";

/**
 * Design tokens — Luxury Dark Editorial.
 * Colors resolve to CSS custom properties (styles/globals.css).
 */
const config: Config = {
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
        primary: "rgb(var(--color-primary))",
        secondary: "rgb(var(--color-secondary))",
        background: "rgb(var(--color-background))",
        surface: "rgb(var(--color-surface))",
        elevated: "rgb(var(--color-surface-2))",
        text: "rgb(var(--color-text))",
        border: "rgb(var(--color-border))",
        muted: "rgb(var(--color-muted))",
        glass: "rgb(var(--color-glass))",
        success: "rgb(var(--color-success))",
        warning: "rgb(var(--color-warning))",
        error: "rgb(var(--color-error))",
        gold: {
          100: "rgb(var(--gold-100))",
          200: "rgb(var(--gold-200))",
          300: "rgb(var(--gold-300))",
          400: "rgb(var(--gold-400))",
          500: "rgb(var(--gold-500))",
          600: "rgb(var(--gold-600))",
          700: "rgb(var(--gold-700))",
          800: "rgb(var(--gold-800))",
        },
        // Legacy accent shades — aliased to gold tints in globals.css.
        cyan: {
          300: "rgb(var(--cyan-300))",
          400: "rgb(var(--cyan-400))",
          500: "rgb(var(--cyan-500))",
        },
        purple: {
          400: "rgb(var(--purple-400))",
          500: "rgb(var(--purple-500))",
          600: "rgb(var(--purple-600))",
        },
        indigo: {
          500: "rgb(var(--indigo-500))",
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        script: ["var(--font-script)", "cursive"],
      },
      fontSize: {
        hero: ["clamp(44px, 6.5vw, 72px)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        section: ["clamp(30px, 4.2vw, 46px)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        card: ["clamp(20px, 2.4vw, 24px)", { lineHeight: "1.25", letterSpacing: "-0.015em" }],
        body: ["18px", { lineHeight: "1.7" }],
        caption: ["14px", { lineHeight: "1.6" }],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
      },
      boxShadow: {
        sm: "0 1px 2px hsl(var(--shadow-color) / 0.3)",
        md: "0 6px 20px -6px hsl(var(--shadow-color) / 0.5)",
        lg: "0 16px 40px -12px hsl(var(--shadow-color) / 0.6)",
        xl: "0 28px 72px -20px hsl(var(--shadow-color) / 0.7)",
        "gold-glow": "0 0 0 1px rgb(var(--color-primary) / 0.35), 0 10px 34px -10px rgb(var(--color-primary) / 0.35)",
      },
      transitionDuration: {
        micro: "150ms",
        small: "250ms",
        component: "400ms",
        section: "600ms",
        hero: "800ms",
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "spin-slow": "spin-slow 46s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
