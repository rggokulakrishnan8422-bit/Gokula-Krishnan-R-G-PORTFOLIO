"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { DURATION, GSAP_EASE_OUT } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { site } from "@/config/site";
import { heroRoles, heroSummary } from "@/config/content";
import { Magnetic } from "@/components/ui/magnetic";
import { ResumeButton } from "@/components/ui/resume-button";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Three.js scene is code-split and never rendered on the server (Section 16). */
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), { ssr: false });

const timelineRows = [
  { label: "Planning", w: "100%" },
  { label: "Execution", w: "72%" },
  { label: "Monitoring", w: "48%" },
  { label: "Closing", w: "22%" },
];

/** SVG progress ring for the Sprint Progress widget. */
function ProgressRing({ value }: { value: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" className="size-16 shrink-0" aria-hidden>
      <defs>
        <linearGradient id="sprint-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgb(82 126 255)" />
          <stop offset="1" stopColor="rgb(34 211 238)" />
        </linearGradient>
      </defs>
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="rgb(var(--color-border) / var(--border-alpha))"
        strokeWidth="6"
      />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="url(#sprint-ring)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value / 100)}
        transform="rotate(-90 32 32)"
      />
    </svg>
  );
}

/**
 * Hero — mockup layout: two-tone name, role pill, roles strip, summary,
 * CTAs, blended globe portrait with floating sprint widgets, side rail.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduced) return; // static fallback: everything simply visible
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero]",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: DURATION.hero,
          ease: GSAP_EASE_OUT,
          stagger: 0.12,
          delay: 0.1,
        },
      );
    }, scope);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={scope}
      id="top"
      aria-label="Intro"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-24 md:pt-28"
    >
      {/* WebGL environment (or its static fallback) */}
      <div aria-hidden className="absolute inset-0">
        <HeroScene />
      </div>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[rgb(var(--color-surface))] to-transparent"
      />

      {/* Left decorative rail */}
      <div
        aria-hidden
        className="absolute bottom-28 left-6 top-32 hidden w-5 flex-col items-center gap-4 lg:flex"
      >
        <span className="text-caption font-medium text-muted">01</span>
        <span className="w-px flex-1 bg-gradient-to-b from-primary/70 via-primary/25 to-transparent" />
        <span className="flex flex-col gap-2.5">
          <span className="size-1.5 rounded-full bg-primary" />
          <span className="size-1.5 rounded-full bg-primary/50" />
          <span className="size-1.5 rounded-full bg-primary/25" />
        </span>
      </div>

      <div className="container-x relative z-10 grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <div data-hero>
            <p className="text-body font-medium text-primary">Hi, I&apos;m</p>
            <h1 className="mt-1 text-balance font-display text-hero font-bold">
              <span className="block">Gokula</span>
              <span className="text-gradient block">Krishnan R G</span>
            </h1>
          </div>

          <div data-hero>
            <Badge className="gap-2 px-4 py-1.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              {site.role}
            </Badge>
          </div>

          <p data-hero className="text-caption font-medium tracking-wide text-muted">
            {heroRoles.map((role, i) => (
              <span key={role}>
                {role}
                {i < heroRoles.length - 1 && <span className="mx-2.5 text-primary">•</span>}
              </span>
            ))}
          </p>

          <p data-hero className="max-w-xl text-body text-muted">
            {heroSummary}
          </p>

          <div data-hero className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <ResumeButton variant="primary" size="lg" />
            </Magnetic>
            <Magnetic>
              <a href="#contact" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                Let&apos;s Connect
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Blended globe portrait + floating sprint widgets */}
        <div className="lg:col-span-6" data-hero>
          <div className="relative mx-auto w-full max-w-[520px]">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[130px]"
            />
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/hero-globe.jpg"
                alt={`Portrait of ${site.name}`}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 92vw, 520px"
                className="mask-fade-b object-cover object-top"
              />
            </div>

            {/* Holographic identity chip */}
            <div className="absolute -bottom-4 left-0 hidden sm:block md:-left-6">
              <div className="glass-card flex animate-float items-center gap-3 p-3 shadow-lg [animation-delay:1.8s]">
                <div className="relative size-11 overflow-hidden rounded-md">
                  <Image
                    src="/images/portrait-holo.jpg"
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col pr-1 leading-tight">
                  <span className="text-sm font-semibold">{site.firstName}</span>
                  <span className="text-xs text-muted">{site.role}</span>
                </div>
              </div>
            </div>

            {/* Project Timeline widget */}
            <div className="absolute -right-2 top-2 hidden w-48 sm:block md:-right-6">
              <div aria-hidden className="glass-card animate-float flex-col gap-2.5 p-4 shadow-lg [animation-delay:0.3s]">
                <p className="text-caption font-semibold">Project Timeline</p>
                {timelineRows.map((row) => (
                  <div key={row.label} className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 shrink-0 text-success" />
                    <span className="flex-1 text-xs text-muted">{row.label}</span>
                    <span className="h-1 w-8 overflow-hidden rounded-full bg-[rgb(var(--color-glass)/0.15)]">
                      <span
                        className="block h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        style={{ width: row.w }}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Status widget */}
            <div className="absolute -left-2 top-[32%] hidden w-52 sm:block md:-left-10">
              <div aria-hidden className="glass-card animate-float flex-col gap-2.5 p-4 shadow-lg [animation-delay:0.9s]">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-caption font-semibold">Project Status</p>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-success">
                    <span className="size-1.5 rounded-full bg-success" />
                    On Track
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted">Team Collaboration</span>
                  <span className="flex items-center -space-x-1.5">
                    {["from-primary to-secondary", "from-secondary to-primary", "from-success to-secondary", "from-warning to-primary"].map(
                      (g, i) => (
                        <span
                          key={i}
                          className={cn("size-4 rounded-full border border-[rgb(var(--color-surface))] bg-gradient-to-br", g)}
                        />
                      ),
                    )}
                    <span className="ml-2 text-xs font-medium text-muted">+4</span>
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted">Tasks Completed</span>
                  <span className="text-xs font-bold text-primary">87%</span>
                </div>
                <span className="h-1.5 w-full overflow-hidden rounded-full bg-[rgb(var(--color-glass)/0.15)]">
                  <span className="block h-full w-[87%] rounded-full bg-gradient-to-r from-primary to-secondary" />
                </span>
              </div>
            </div>

            {/* Sprint Progress widget */}
            <div className="absolute -right-2 top-[52%] hidden sm:block md:-right-8">
              <div aria-hidden className="glass-card animate-float items-center gap-3 p-4 shadow-lg [animation-delay:1.4s]">
                <ProgressRing value={72} />
                <div className="flex flex-col">
                  <span className="text-xs text-muted">Sprint Progress</span>
                  <span className="font-display text-lg font-bold">72%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        data-hero
        aria-label="Scroll down to About section"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors duration-micro hover:text-primary md:flex"
      >
        <span className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-current p-1.5">
          <span className="size-1 animate-float rounded-full bg-current [animation-duration:1.6s]" />
        </span>
        <span className="text-xs uppercase tracking-[0.2em]">Scroll Down</span>
      </a>
    </section>
  );
}
