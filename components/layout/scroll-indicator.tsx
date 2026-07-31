"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Scroll Indicator (Master Prompt Section 9 — Layout/Nav).
 * Top progress bar driven directly by scroll position; the spring is
 * bypassed under reduced motion (bar still tracks scroll, no added
 * animation on top).
 */
export function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: reduced ? scrollYProgress : spring }}
      className="fixed inset-x-0 top-0 z-[80] h-0.5 origin-left bg-gradient-to-r from-primary to-secondary"
    />
  );
}
