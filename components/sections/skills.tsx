"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { DURATION, GSAP_EASE_OUT } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { professionalSkills, technicalSkills } from "@/config/content";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

/**
 * Skills (Aug 5 mockup) — three-part layout inside one bordered rail:
 * left "Technical Skills" bars · center holographic voxel cube ·
 * right "Professional Skills" dot matrix. Section label lives top-left.
 */
export function Skills() {
  const reduced = useReducedMotion();
  const barsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (reduced) return;
    const scope = barsRef.current;
    if (!scope) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-skill-bar]").forEach((bar, i) => {
        const level = bar.dataset.level ?? "0";
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${level}%`,
            duration: DURATION.section,
            ease: GSAP_EASE_OUT,
            delay: Math.min(i * 0.05, 0.45),
            scrollTrigger: { trigger: scope, start: "top 82%", once: true },
          },
        );
      });
    }, scope);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="skills" aria-label="Skills" className="section-line section-pad scroll-mt-24">
      <div className="container-x flex flex-col gap-8">
        {/* Overline (mockup: "MY SKILLS & EXPERTISE" small caps) */}
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted">
            My Skills & Expertise
          </p>
        </Reveal>

        <div className="grid items-stretch gap-6 rounded-2xl border border-primary/15 p-5 sm:p-6 lg:grid-cols-12">
          {/* Left: Technical skills bars */}
          <Reveal className="lg:col-span-4">
            <GlassCard className="flex h-full flex-col gap-4 border-primary/20 p-6 md:p-7">
              <h3 className="mb-1 font-display text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">
                Technical Skills
              </h3>
              <ul ref={barsRef} className="flex flex-col gap-3.5">
                {technicalSkills.map((skill) => (
                  <li key={skill.label} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                      <span className="font-medium text-text">{skill.label}</span>
                      <span className="font-mono text-xs font-semibold text-text/80">
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      role="img"
                      aria-label={`${skill.label}: ${skill.level} out of 100`}
                      className="h-1.5 w-full overflow-hidden rounded-full bg-border/30"
                    >
                      <div
                        data-skill-bar
                        data-level={skill.level}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-primary to-purple-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          {/* Center: holographic voxel cube */}
          <Reveal className="hidden items-center justify-center lg:flex lg:col-span-4" delay={0.1}>
            <HologramCore />
          </Reveal>

          {/* Right: Professional skills dot matrix */}
          <Reveal className="lg:col-span-4" delay={0.15}>
            <GlassCard className="flex h-full flex-col border-primary/20 p-6 md:p-7">
              <h3 className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">
                Professional Skills
              </h3>
              <ul className="flex flex-col justify-between gap-[9px]">
                {professionalSkills.map((skill) => (
                  <li key={skill.label} className="flex items-center justify-between gap-4">
                    <span className="text-xs font-medium text-text">{skill.label}</span>
                    <span className="flex items-center gap-1.5">
                      <span className="sr-only">{`${skill.level} out of 100`}</span>
                      {Array.from({ length: 8 }).map((_, d) => (
                        <span
                          key={d}
                          aria-hidden
                          className={cn(
                            "size-2 rounded-full transition-all duration-300",
                            d < Math.round((skill.level / 100) * 8)
                              ? "bg-gradient-to-br from-primary to-cyan-400 shadow-[0_0_6px_rgb(var(--cyan-400)/0.8)]"
                              : "bg-border/40",
                          )}
                        />
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const ORBIT_RADIUS = 126;

/** Isometric voxel cube (Aug 5 mockup center hologram). Theme-aware fills. */
function VoxelCube() {
  const cells = useMemo(() => {
    const w = 26;
    const h = 13;
    const project = (X: number, Y: number, Z: number): [number, number] => [
      (X - Y) * w,
      (X + Y) * h - Z * 2 * h,
    ];
    const poly = (pts: [number, number][]) =>
      pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

    const top: { points: string; alpha: number }[] = [];
    const left: { points: string; alpha: number }[] = [];
    const right: { points: string; alpha: number }[] = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        top.push({
          points: poly([
            project(i, j, 3),
            project(i + 1, j, 3),
            project(i + 1, j + 1, 3),
            project(i, j + 1, 3),
          ]),
          alpha: 0.55 + ((i + j) % 3) * 0.18,
        });
        left.push({
          points: poly([
            project(i, 3, 2 - j),
            project(i + 1, 3, 2 - j),
            project(i + 1, 3, 3 - j),
            project(i, 3, 3 - j),
          ]),
          alpha: 0.45 + ((i * 2 + j) % 3) * 0.16,
        });
        right.push({
          points: poly([
            project(3, i, 2 - j),
            project(3, i + 1, 2 - j),
            project(3, i + 1, 3 - j),
            project(3, i, 3 - j),
          ]),
          alpha: 0.35 + ((i + j * 2) % 3) * 0.14,
        });
      }
    }
    return { top, left, right };
  }, []);

  return (
    <svg
      viewBox="-100 -96 200 200"
      className="size-32 sm:size-40 drop-shadow-[0_0_26px_rgb(var(--color-primary)/0.55)]"
      role="img"
      aria-label="Holographic voxel cube"
    >
      {cells.right.map((c, i) => (
        <polygon
          key={`r${i}`}
          points={c.points}
          fill={`rgb(var(--purple-500) / ${c.alpha})`}
          stroke="rgb(var(--color-surface) / 0.85)"
          strokeWidth="1.2"
        />
      ))}
      {cells.left.map((c, i) => (
        <polygon
          key={`l${i}`}
          points={c.points}
          fill={`rgb(var(--color-primary) / ${c.alpha})`}
          stroke="rgb(var(--color-surface) / 0.85)"
          strokeWidth="1.2"
        />
      ))}
      {cells.top.map((c, i) => (
        <polygon
          key={`t${i}`}
          points={c.points}
          fill={`rgb(var(--cyan-400) / ${c.alpha})`}
          stroke="rgb(var(--color-surface) / 0.85)"
          strokeWidth="1.2"
        />
      ))}
    </svg>
  );
}

/** Center hologram: voxel cube + rings + 8 orbiting brand glyphs. */
function HologramCore() {
  return (
    <div
      aria-hidden
      className="relative mx-auto flex aspect-square w-full max-w-[340px] items-center justify-center"
    >
      <div className="absolute bottom-[10%] h-20 w-4/5 rounded-[100%] bg-primary/25 blur-2xl" />
      <div className="absolute inset-2 rounded-full border border-primary/25" />
      <div className="absolute inset-9 rounded-full border border-dashed border-cyan-400/25" />
      <div className="absolute -inset-3 rounded-full border border-primary/15" />

      <div className="relative z-10 -translate-y-3">
        <VoxelCube />
      </div>

      <OrbitIcons />
    </div>
  );
}

/** Orbit icons — brand glyphs fixed at 8 points of the ring (mockup layout). */
function OrbitIcons() {
  const glyphs: { char: string; color: string; label: string }[] = [
    { char: "N", color: "#FFFFFF", label: "Notion" },
    { char: "◆", color: "#2684FF", label: "Jira" },
    { char: "✕", color: "#107C41", label: "Excel" },
    { char: "◐", color: "#FFC107", label: "Drive" },
    { char: "W", color: "#185ABD", label: "Word" },
    { char: "T", color: "#0079BF", label: "Trello" },
    { char: "✦", color: "#9AA7FF", label: "AI Tools" },
    { char: "●", color: "#EA3E23", label: "MS Office" },
  ];

  return (
    <div className="absolute inset-0 animate-spin-slow">
      {glyphs.map((g, i) => {
        const angle = i * 45;
        return (
          <div
            key={g.label}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${ORBIT_RADIUS}px) rotate(${-angle}deg)`,
            }}
          >
            <span
              title={g.label}
              className="flex size-9 items-center justify-center rounded-xl border border-primary/30 bg-[rgb(var(--color-surface)/0.9)] text-sm font-bold shadow-lg backdrop-blur-md"
            >
              <span className="animate-spin-slow-reverse" style={{ color: g.color }}>
                {g.char}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
