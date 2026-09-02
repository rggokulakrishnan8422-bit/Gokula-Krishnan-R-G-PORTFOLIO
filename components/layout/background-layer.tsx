"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * Atmospheric environment — deep warm black, extremely subtle champagne
 * light fields, a barely-visible hairline grid and film grain.
 * Glows drift on scroll (desktop only, motion-safe). Nothing noisy,
 * nothing neon — the background must read as quiet luxury.
 */
export function BackgroundLayer() {
  const reduced = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)");
  const parallax = !reduced && desktop;
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const driftUp = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const driftDown = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Hairline gold grid + grain */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-noise opacity-[0.035]" />

      {/* Warm ambient light fields */}
      <motion.div
        style={parallax ? { y: driftUp } : undefined}
        className="absolute -top-44 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--color-primary)/0.13),transparent_70%)] blur-2xl"
      />
      <motion.div
        style={parallax ? { y: driftDown } : undefined}
        className="absolute right-[-18%] top-[42%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(var(--color-secondary)/0.11),transparent_70%)] blur-2xl"
      />
      <motion.div
        style={parallax ? { y: driftUp } : undefined}
        className="absolute bottom-[-14%] left-[-12%] h-[460px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgb(var(--color-primary)/0.08),transparent_70%)] blur-2xl"
      />

      {/* Vignette — keeps edges cinematic and text zones quiet */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,transparent_55%,rgb(var(--color-background)/0.55))]" />
    </div>
  );
}
