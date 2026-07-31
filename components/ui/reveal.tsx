"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { DURATION, GSAP_EASE_OUT } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Scroll-linked reveal (Master Prompt Section 10 — fade/slide per section).
 * The "from" state is applied by GSAP on mount, so content is never hidden
 * if JS fails; with reduced motion the effect is skipped entirely and the
 * content simply renders in its final state.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current!;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: DURATION.section,
          delay,
          ease: GSAP_EASE_OUT,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reduced, delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
