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
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [started, setStarted] = useState(false);

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
      el.textContent = `${to}${suffix}`;
      return;
    }
    const state = { value: 0 };
    const tween = gsap.to(state, {
      value: to,
      duration: DURATION.section,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = `${Math.round(state.value)}${suffix}`;
      },
    });
    return () => {
      tween.kill();
    };
  }, [started, reduced, to, suffix]);

  return (
    <span ref={ref} className={className}>
      {`0${suffix}`}
    </span>
  );
}
