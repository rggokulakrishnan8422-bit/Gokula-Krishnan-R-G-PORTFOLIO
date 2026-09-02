"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const LenisContext = createContext<Lenis | null>(null);

/** Access the active Lenis instance (null when reduced-motion / before mount). */
export const useLenis = () => useContext(LenisContext);

/**
 * Smooth scroll + global Motion reduced-motion config.
 * When the user prefers reduced motion no Lenis instance is created at
 * all — the site falls back to plain native scrolling.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;

    const instance = new Lenis({
      duration: 1.1,
      anchors: true, // native <a href="#id"> links get smooth scrolling
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    setLenis(instance);

    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
      setLenis(null);
    };
  }, [reduced]);

  return (
    <LenisContext.Provider value={lenis}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LenisContext.Provider>
  );
}

/** Scroll to the very top, using Lenis when available. */
export function scrollToTop(lenis: Lenis | null) {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1 });
  } else {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }
}
