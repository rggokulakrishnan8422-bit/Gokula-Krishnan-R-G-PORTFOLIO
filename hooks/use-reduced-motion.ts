"use client";

import { useEffect, useState } from "react";

/**
 * Track prefers-reduced-motion (Master Prompt Sections 10, 15).
 * Every animated component consults this and renders a static
 * fallback — not merely a faster animation — when true.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
