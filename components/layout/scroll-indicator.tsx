"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Scroll progress — a hairline gold filament across the top edge, driven
 * directly by scroll position (spring bypassed under reduced motion).
 */
export function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: reduced ? scrollYProgress : spring }}
      className="fixed inset-x-0 top-0 z-[80] h-px origin-left bg-gradient-to-r from-gold-600 via-gold-400 to-gold-200 shadow-[0_0_8px_rgb(var(--color-primary)/0.5)]"
    />
  );
}
