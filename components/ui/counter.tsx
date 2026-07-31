"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { DURATION } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Animated counter (Master Prompt Section 10).
 * Counts up when scrolled into view (600ms section timing).
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
  const [started, setStarted] = useState(false);

  const format = (v: number) => `${String(Math.round(v)).padStart(pad, "0")}${suffix}`;

  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const el = ref.current!;
    if (reduced) {
      el.textContent = format(to);
      return;
    }
    const state = { value: 0 };
    const tween = gsap.to(state, {
      value: to,
      duration: DURATION.section,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = format(state.value);
      },
    });
    return () => {
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, reduced, to, suffix, pad]);

  return (
    <span ref={ref} className={className}>
      {format(0)}
    </span>
  );
}
