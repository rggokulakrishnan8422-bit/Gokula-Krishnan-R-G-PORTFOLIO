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

const ORBIT_RADIUS = 132;

/** Tools orbiting the monogram */
function ToolOrbit() {
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[340px]">
      <div className="absolute inset-0 rounded-full border border-primary/15" />
      <div className="absolute inset-10 rounded-full border border-primary/10" />
      <div className="absolute -inset-4 rounded-full border border-dashed border-primary/10" />
      <div className="glass-card absolute left-1/2 top-1/2 z-10 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl shadow-lg border border-primary/20 bg-surface/80 backdrop-blur-md">
        <span className="text-gradient font-display text-2xl font-bold">GK</span>
      </div>
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
              <span className="glass-card flex size-12 items-center justify-center rounded-xl shadow-md border border-primary/20 bg-surface/60 backdrop-blur-md">
                <span className="animate-spin-slow-reverse">
                  <Icon className="size-5 text-primary" />
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Skills section */
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
          <SectionHeading eyebrow="My Skills & Expertise" title="Core Capabilities & Tech Stack" />
        </Reveal>

        <div className="grid items-stretch gap-8 lg:grid-cols-12">
          {/* Technical — animated level bars */}
          <Reveal className="lg:col-span-5">
            <GlassCard className="flex h-full flex-col gap-6 p-6 md:p-7">
              <h3 className="font-display text-lg font-semibold text-text">Technical Proficiency</h3>
              <ul ref={barsRef} className="flex flex-col gap-4">
                {technicalSkills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <li key={skill.label} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2.5 text-sm font-medium">
                          <Icon className="size-4 text-primary" aria-hidden />
                          {skill.label}
                        </span>
                        <span className="text-sm font-semibold text-primary">{skill.level}%</span>
                      </div>
                      <div
                        role="img"
                        aria-label={`${skill.label}: ${skill.level} out of 100`}
                        className="h-1.5 w-full overflow-hidden rounded-full bg-border/20"
                      >
                        <div
                          data-skill-bar
                          data-level={skill.level}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </GlassCard>
          </Reveal>

          {/* Center — orbiting tool icons */}
          <Reveal className="hidden items-center justify-center lg:flex lg:col-span-2" delay={0.1}>
            <ToolOrbit />
          </Reveal>

          {/* Right — professional dot matrix */}
          <Reveal className="lg:col-span-5" delay={0.15}>
            <GlassCard className="flex h-full flex-col justify-between p-6 md:p-7">
              <div>
                <h3 className="mb-6 font-display text-lg font-semibold text-text">
                  Professional & Management Competencies
                </h3>
                <ul className="flex flex-col gap-4">
                  {professionalSkills.map((skill) => (
                    <li key={skill.label} className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-text">{skill.label}</span>
                      <span className="flex items-center gap-1.5">
                        <span className="sr-only">{`${skill.level} out of 100`}</span>
                        {Array.from({ length: 10 }).map((_, d) => (
                          <span
                            key={d}
                            aria-hidden
                            className={cn(
                              "size-2 rounded-full transition-colors",
                              d < Math.round(skill.level / 10)
                                ? "bg-primary shadow-sm shadow-primary/50"
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
