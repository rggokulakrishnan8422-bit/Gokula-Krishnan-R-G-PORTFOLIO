"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { DURATION, GSAP_EASE_OUT } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

/**
 * Magnetic wrapper (Master Prompt Section 10 — magnetic buttons).
 * Gently attracts its child toward the pointer within a proximity field.
 * Disabled for touch pointers and reduced-motion users (static fallback).
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const fine = useMediaQuery("(pointer: fine)");
  const enabled = !reduced && fine;

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current!;

    const reset = () =>
      gsap.to(el, { x: 0, y: 0, duration: DURATION.component, ease: GSAP_EASE_OUT });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const range = Math.max(rect.width, rect.height) * 1.6;
      if (Math.hypot(dx, dy) < range) {
        gsap.to(el, {
          x: dx * strength,
          y: dy * strength,
          duration: DURATION.component,
          ease: GSAP_EASE_OUT,
        });
      } else {
        reset();
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [enabled, strength]);

  return (
    <div ref={ref} className={cn("inline-block", className)}>
      {children}
    </div>
  );
}
