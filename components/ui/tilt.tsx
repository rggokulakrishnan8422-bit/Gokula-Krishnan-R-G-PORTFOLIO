"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { SPRING } from "@/lib/motion";

/**
 * Pointer-tracked 3D tilt — Apple-product-style restraint (±2–3° by
 * default), spring-driven. Children can parallax independently via
 * TiltLayer. Disabled for touch pointers and reduced-motion users.
 */
export function Tilt({
  children,
  max = 3,
  scale = 1.01,
  className,
}: {
  children: React.ReactNode;
  /** max rotation in degrees (keep ≤ 4 for premium restraint) */
  max?: number;
  scale?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const fine = useMediaQuery("(pointer: fine)");
  const enabled = !reduced && fine;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, SPRING.pointer);
  const sy = useSpring(py, SPRING.pointer);

  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const s = useSpring(1, SPRING.pointer);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
    s.set(scale);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    s.set(1);
  };

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        scale: s,
        transformPerspective: 900,
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}
