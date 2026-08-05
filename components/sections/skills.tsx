"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { DURATION, GSAP_EASE_OUT } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { professionalSkills, technicalSkills, toolsWall } from "@/config/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

const ORBIT_RADIUS = 136;

/** 3D Glowing Isometric Cube Matrix + Orbiting Tech Icons */
function IsometricCubeOrbit() {
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[360px] flex items-center justify-center">
      {/* Orbital Ring Lines */}
      <div className="absolute inset-0 rounded-full border border-primary/20" />
      <div className="absolute inset-10 rounded-full border border-primary/15" />
      <div className="absolute -inset-4 rounded-full border border-dashed border-primary/15" />

      {/* Central 3D Glowing Isometric Tech Cube */}
      <div className="relative z-10 flex size-28 items-center justify-center rounded-2xl border-2 border-cyan-400/50 bg-surface/90 shadow-[0_0_30px_rgba(34,211,238,0.3)] backdrop-blur-md">
        {/* Isometric Cube Grid Inner SVG */}
        <svg className="size-16 text-cyan-400 animate-pulse" viewBox="0 0 64 64" fill="none">
          <path
            d="M32 6L54 18V46L32 58L10 46V18L32 6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M32 6V58" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M10 18L32 30L54 18" stroke="currentColor" strokeWidth="2" />
          <path d="M10 46L32 34L54 46" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Orbiting Tech Icons */}
      <div className="absolute inset-0 animate-spin-slow">
        {toolsWall.map((tool, i) => {
          const angle = i * (360 / toolsWall.length);
          const Icon = tool.icon;
          return (
            <div
              key={tool.label}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${ORBIT_RADIUS}px) rotate(${-angle}deg)`,
              }}
            >
              <span className="glass-card flex size-11 items-center justify-center rounded-xl shadow-md border border-primary/30 bg-surface/80 backdrop-blur-md transition-transform hover:scale-125">
                <span className="animate-spin-slow-reverse">
                  <Icon className="size-5 text-cyan-400" />
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Skills() {
  const reduced = useReducedMotion();
  const barsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (reduced) return;
    const scope = barsRef.current!;
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
      <div className="container-x flex flex-col gap-12">
        <Reveal>
          <SectionHeading eyebrow="My Skills & Expertise" title="Expertise & Competencies" />
        </Reveal>

        <div className="grid items-stretch gap-8 lg:grid-cols-12">
          {/* Left Column: Technical Skills Percentage Level Bars */}
          <Reveal className="lg:col-span-5">
            <GlassCard className="flex h-full flex-col gap-5 p-6 md:p-7">
              <h3 className="font-display text-base font-semibold text-text uppercase tracking-wider text-primary">
                Technical Skills
              </h3>
              <ul ref={barsRef} className="flex flex-col gap-3.5">
                {technicalSkills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <li key={skill.label} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                        <span className="flex items-center gap-2 font-medium text-text">
                          <Icon className="size-4 text-cyan-400" aria-hidden />
                          {skill.label}
                        </span>
                        <span className="font-mono font-semibold text-primary">{skill.level}%</span>
                      </div>
                      <div
                        role="img"
                        aria-label={`${skill.label}: ${skill.level} out of 100`}
                        className="h-1.5 w-full overflow-hidden rounded-full bg-border/30"
                      >
                        <div
                          data-skill-bar
                          data-level={skill.level}
                          className="h-full rounded-full bg-gradient-to-r from-primary via-purple-500 to-cyan-400"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </GlassCard>
          </Reveal>

          {/* Center Column: 3D Isometric Cube Core */}
          <Reveal className="hidden items-center justify-center lg:flex lg:col-span-2" delay={0.1}>
            <IsometricCubeOrbit />
          </Reveal>

          {/* Right Column: Professional Skills 8-Dot Matrix */}
          <Reveal className="lg:col-span-5" delay={0.15}>
            <GlassCard className="flex h-full flex-col justify-between p-6 md:p-7">
              <div>
                <h3 className="mb-5 font-display text-base font-semibold text-text uppercase tracking-wider text-primary">
                  Professional Skills
                </h3>
                <ul className="flex flex-col gap-3.5">
                  {professionalSkills.map((skill) => (
                    <li key={skill.label} className="flex items-center justify-between gap-4">
                      <span className="text-xs sm:text-sm font-medium text-text">{skill.label}</span>
                      <span className="flex items-center gap-1.5">
                        <span className="sr-only">{`${skill.level} out of 100`}</span>
                        {Array.from({ length: 8 }).map((_, d) => (
                          <span
                            key={d}
                            aria-hidden
                            className={cn(
                              "size-2.5 rounded-full transition-all duration-300",
                              d < Math.round((skill.level / 100) * 8)
                                ? "bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]"
                                : "bg-border/30",
                            )}
                          />
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
