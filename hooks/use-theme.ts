"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

/**
 * Theme controller. The initial class is applied by an inline script in
 * app/layout.tsx (before paint, to avoid FOUC); this hook owns toggling,
 * persistence and reacting to system changes.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setThemeState(isDark ? "dark" : "light");
    setMounted(true);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return; // explicit choice wins
      applyTheme(event.matches ? "dark" : "light", false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const applyTheme = useCallback((next: Theme, persist: boolean) => {
    document.documentElement.classList.toggle("dark", next === "dark");
    setThemeState(next);
    if (persist) localStorage.setItem("theme", next);
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme =
      (document.documentElement.classList.contains("dark") ? "dark" : "light") === "dark"
        ? "light"
        : "dark";
    applyTheme(next, true);
  }, [applyTheme]);

  return { theme, toggleTheme, mounted };
}
