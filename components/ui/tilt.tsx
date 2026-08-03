"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { DURATION } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * Pointer-tracked 3D tilt — gives cards physical depth (rotateX/rotateY in
 * perspective, slight scale). Springs back on leave (250ms small timing).
 * Disabled for touch pointers and reduced-motion users (static fallback).
 */
export function Tilt({
  children,
  max = 7,
  className,
}: {
  children: React.ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const fine = useMediaQuery("(pointer: fine)");
  const enabled = !reduced && fine;

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current!;
    gsap.set(el, { transformPerspective: 900 });

    const rotateX = gsap.quickTo(el, "rotationX", {
      duration: DURATION.small,
      ease: "power2.out",
    });
    const rotateY = gsap.quickTo(el, "rotationY", {
      duration: DURATION.small,
      ease: "power2.out",
    });
    const scale = gsap.quickTo(el, "scale", { duration: DURATION.small, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY(px * max);
      rotateX(-py * max);
      scale(1.015);
    };
    const onLeave = () => {
      rotateX(0);
      rotateY(0);
      scale(1);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { rotationX: 0, rotationY: 0, scale: 1 });
    };
  }, [enabled, max]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: enabled ? "transform" : undefined }}
    >
      {children}
    </div>
  );
}
