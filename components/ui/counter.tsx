"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { DURATION } from "@/lib/motion";

/**
 * Animated counter — counts up when scrolled into view.
 * Reduced motion: the final value renders immediately.
 */
export function Counter({
  to,
  suffix = "",
  pad = 0,
  className,
}: {
  to: number;
  suffix?: string;
  /** Zero-pad the rendered number (e.g. pad=2 → "08"). */
  pad?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(() =>
    `${String(0).padStart(pad, "0")}${suffix}`,
  );

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(`${String(to).padStart(pad, "0")}${suffix}`);
      return;
    }
    const controls = animate(0, to, {
      duration: DURATION.section * 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(`${String(Math.round(v)).padStart(pad, "0")}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, reduced, to, suffix, pad]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
