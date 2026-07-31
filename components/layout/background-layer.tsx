"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * Background Layer (Master Prompt Sections 6, 9 — Background Layer +
 * Particle System via the hero scene).
 * An enterprise environment across the whole scroll — kanban fragments,
 * gantt bars, sparklines and stat chips — kept at low opacity so it reads
 * as environment, not clutter. Fragments parallax gently (disabled for
 * reduced-motion and mobile).
 */
export function BackgroundLayer() {
  const reduced = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)");
  const ref = useRef<HTMLDivElement>(null);
  const parallax = !reduced && desktop;

  useEffect(() => {
    if (!parallax) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-env]").forEach((el, i) => {
        gsap.to(el, {
          yPercent: i % 2 === 0 ? -14 : 14,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 1.2 },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [parallax]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Technology grid + noise */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-noise opacity-[0.05]" />

      {/* Cool blue light fields */}
      <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px] dark:bg-primary/25" />
      <div className="absolute right-[-15%] top-[45%] h-[480px] w-[480px] rounded-full bg-secondary/10 blur-[140px] dark:bg-secondary/15" />
      <div className="absolute bottom-[-10%] left-[-12%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-[140px]" />

      {/* Floating enterprise UI fragments */}
      {/* Kanban board */}
      <div
        data-env
        className="glass-card absolute left-[4%] top-[16%] hidden w-44 rotate-[-6deg] gap-2 p-3 opacity-60 md:flex"
      >
        <div className="grid grid-cols-3 gap-2">
          {[2, 3, 1].map((n, col) => (
            <div key={col} className="flex flex-col gap-1.5">
              <div className="h-1 w-full rounded-full bg-primary/40" />
              {Array.from({ length: n }).map((_, i) => (
                <div
                  key={i}
                  className="h-6 rounded-sm border border-[rgb(var(--color-border)/var(--border-alpha))] bg-[rgb(var(--color-glass)/0.08)]"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Gantt / agile timeline */}
      <div
        data-env
        className="glass-card absolute right-[5%] top-[30%] hidden w-52 rotate-[4deg] flex-col gap-2 p-4 opacity-60 md:flex"
      >
        {[0.9, 0.65, 0.8].map((w, i) => (
          <div
            key={i}
            className="h-2 rounded-full bg-gradient-to-r from-primary/50 to-secondary/40"
            style={{ width: `${w * 100}%`, marginLeft: i === 1 ? "18%" : "0%" }}
          />
        ))}
      </div>

      {/* Analytics sparkline */}
      <div
        data-env
        className="glass-card absolute bottom-[24%] left-[6%] hidden w-48 rotate-[3deg] flex-col gap-2 p-4 opacity-60 md:flex"
      >
        <div className="h-1.5 w-16 rounded-full bg-primary/40" />
        <svg viewBox="0 0 120 36" className="h-9 w-full" fill="none">
          <polyline
            points="0,28 20,22 40,25 60,14 80,18 100,8 120,12"
            className="stroke-secondary"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Velocity bar chart */}
      <div
        data-env
        className="glass-card absolute bottom-[38%] right-[7%] hidden rotate-[-4deg] items-end gap-1.5 p-4 opacity-60 md:flex"
      >
        {[10, 18, 14, 24, 20, 30].map((h, i) => (
          <div
            key={i}
            className="w-2.5 rounded-sm bg-primary/45"
            style={{ height: `${h * 2}px` }}
          />
        ))}
      </div>

      {/* Sprint stat chip */}
      <div
        data-env
        className="glass-card absolute left-[38%] top-[10%] hidden rotate-[5deg] flex-col gap-1 px-4 py-3 opacity-50 lg:flex"
      >
        <div className="h-1.5 w-14 rounded-full bg-secondary/50" />
        <div className="h-1.5 w-20 rounded-full bg-primary/40" />
      </div>
    </div>
  );
}
