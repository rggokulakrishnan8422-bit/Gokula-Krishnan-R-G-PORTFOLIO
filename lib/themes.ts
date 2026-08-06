"use client";

import { useSyncExternalStore } from "react";

/**
 * Accent theme engine — the "Theme Variations" strip from the Aug 5 mockup.
 * Every theme is dark-surface-only; only the accent palette swaps. Themes are
 * applied by setting `data-theme` on <html>, which overrides the CSS
 * custom properties defined in styles/globals.css. Tailwind's cyan/purple/
 * indigo accent shades are also var-mapped (tailwind.config.ts), so every
 * component — including gradients, rings and glows — follows the selection.
 *
 * Persistence: localStorage("gk-accent-theme"), applied pre-paint by an
 * inline script in app/layout.tsx to avoid flashes.
 */

export type AccentThemeId =
  | "neon-blue"
  | "cyber-purple"
  | "ocean-teal"
  | "sunset-amber"
  | "forest-green";

export interface AccentTheme {
  id: AccentThemeId;
  name: string;
  /** RGB triplets ("r g b") applied to CSS custom properties */
  rgb: {
    primary: string;
    secondary: string;
    cyan300: string;
    cyan400: string;
    cyan500: string;
    purple400: string;
    purple500: string;
    purple600: string;
    indigo500: string;
  };
  /** Hex colors for the Three.js scenes (WebGL has no CSS vars) */
  three: { primary: string; secondary: string; planes: string };
}

export const ACCENT_THEMES: AccentTheme[] = [
  {
    id: "neon-blue",
    name: "Neon Blue",
    rgb: {
      primary: "82 126 255",
      secondary: "34 211 238",
      cyan300: "103 232 249",
      cyan400: "34 211 238",
      cyan500: "6 182 212",
      purple400: "192 132 252",
      purple500: "168 85 247",
      purple600: "147 51 234",
      indigo500: "99 102 241",
    },
    three: { primary: "#5B8CFF", secondary: "#22D3EE", planes: "#5B8CFF" },
  },
  {
    id: "cyber-purple",
    name: "Cyber Purple",
    rgb: {
      primary: "168 85 247",
      secondary: "232 121 249",
      cyan300: "240 171 252",
      cyan400: "232 121 249",
      cyan500: "217 70 239",
      purple400: "216 180 254",
      purple500: "192 132 252",
      purple600: "168 85 247",
      indigo500: "139 92 246",
    },
    three: { primary: "#A855F7", secondary: "#E879F9", planes: "#A855F7" },
  },
  {
    id: "ocean-teal",
    name: "Ocean Teal",
    rgb: {
      primary: "20 184 166",
      secondary: "45 212 191",
      cyan300: "94 234 212",
      cyan400: "45 212 191",
      cyan500: "20 184 166",
      purple400: "103 232 249",
      purple500: "56 189 248",
      purple600: "14 165 233",
      indigo500: "56 189 248",
    },
    three: { primary: "#14B8A6", secondary: "#2DD4BF", planes: "#14B8A6" },
  },
  {
    id: "sunset-amber",
    name: "Sunset Amber",
    rgb: {
      primary: "245 158 11",
      secondary: "251 146 60",
      cyan300: "252 211 77",
      cyan400: "251 191 36",
      cyan500: "245 158 11",
      purple400: "253 186 116",
      purple500: "251 146 60",
      purple600: "249 115 22",
      indigo500: "249 115 22",
    },
    three: { primary: "#F59E0B", secondary: "#FB923C", planes: "#F59E0B" },
  },
  {
    id: "forest-green",
    name: "Forest Green",
    rgb: {
      primary: "34 197 94",
      secondary: "52 211 153",
      cyan300: "110 231 183",
      cyan400: "52 211 153",
      cyan500: "16 185 129",
      purple400: "134 239 172",
      purple500: "74 222 128",
      purple600: "34 197 94",
      indigo500: "16 185 129",
    },
    three: { primary: "#22C55E", secondary: "#34D399", planes: "#22C55E" },
  },
];

export const DEFAULT_THEME: AccentThemeId = "neon-blue";
export const THEME_STORAGE_KEY = "gk-accent-theme";
export const THEME_IDS: AccentThemeId[] = ACCENT_THEMES.map((t) => t.id);

export function getAccentThemeById(id: AccentThemeId): AccentTheme {
  return ACCENT_THEMES.find((t) => t.id === id) ?? ACCENT_THEMES[0];
}

/* ------------------------------------------------------------------ */
/* Micro external store — keeps nav menu, variation strip and 3D      */
/* scenes in sync without a provider.                                  */
/* ------------------------------------------------------------------ */

const listeners = new Set<() => void>();

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): AccentThemeId {
  if (typeof document === "undefined") return DEFAULT_THEME;
  const current = document.documentElement.dataset.theme;
  return (THEME_IDS as string[]).includes(current ?? "")
    ? (current as AccentThemeId)
    : DEFAULT_THEME;
}

function getServerSnapshot(): AccentThemeId {
  return DEFAULT_THEME;
}

export function applyAccentTheme(id: AccentThemeId): void {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.theme = id;
  }
  try {
    localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    /* private mode — non-fatal */
  }
  listeners.forEach((listener) => listener());
}

export function useAccentTheme(): AccentTheme {
  const id = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return getAccentThemeById(id);
}
