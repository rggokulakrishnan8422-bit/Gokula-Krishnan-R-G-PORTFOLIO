"use client";

import { useMemo } from "react";
import { motion, type Variants } from "motion/react";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

/**
 * Scroll-linked reveal — fades/slides in once when entering the viewport.
 * The hidden state is applied by Motion on mount, so without JS the content
 * still renders. Reduced-motion users get the final state directly
 * (MotionConfig reducedMotion="user").
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const variants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE_OUT, delay },
      },
    }),
    [delay, y],
  );

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}
