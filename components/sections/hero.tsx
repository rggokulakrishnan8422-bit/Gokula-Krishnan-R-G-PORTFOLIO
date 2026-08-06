"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  ChevronDown,
  Layers,
} from "lucide-react";
import { gsap } from "@/lib/gsap";
import { DURATION, GSAP_EASE_OUT } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { site } from "@/config/site";
import { Magnetic } from "@/components/ui/magnetic";
import { ResumeButton } from "@/components/ui/resume-button";
import { buttonVariants } from "@/components/ui/button";
import { Typing } from "@/components/ui/typing";
import { useAccentTheme } from "@/lib/themes";

/** Three.js scene code-split */
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), { ssr: false });

/** Task Progress ring — 78% (Aug 5 mockup top-right widget) */
function ProgressRing78() {
  const r = 30;
  const c = 2 * Math.PI * r;
  const strokeDashoffset = c - (78 / 100) * c;
  return (
    <svg className="size-20 -rotate-90" viewBox="0 0 72 72" role="img" aria-label="Task progress: 78 percent, on track">
      <defs>
        <linearGradient id="taskRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "rgb(var(--purple-500))" }} />
          <stop offset="100%" style={{ stopColor: "rgb(var(--color-secondary))" }} />
        </linearGradient>
      </defs>
      <circle cx="36" cy="36" r={r} className="fill-none stroke-border/30 stroke-[6]" />
      <circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        stroke="url(#taskRing)"
        strokeWidth="6"
        strokeDasharray={c}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        className="transition-all duration-1000"
      />
    </svg>
  );
}

/** Project Timeline checklist widget (mockup top-left floating panel) */
const timelineSteps = [
  { label: "Planning", dot: "bg-purple-500" },
  { label: "Execution", dot: "bg-cyan-400" },
  { label: "Monitoring", dot: "bg-primary" },
  { label: "Delivery", dot: "bg-purple-400" },
];

export function Hero() {
  const reduced = useReducedMotion();
  const theme = useAccentTheme();
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduced) return;
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
      {/* 3D WebGL Background Scene — re-keyed per accent theme */}
      <div aria-hidden className="absolute inset-0">
        <HeroScene key={theme.id} palette={theme.three} />
      </div>

      {/* Surface Gradient Fade */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent"
      />

      <div className="container-x relative z-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* ================= Left Column — Text ================= */}
        <div className="flex flex-col gap-6 lg:col-span-6 lg:pl-14 xl:pl-24">
          {/* Available for Work badge (mockup — dot trails the label) */}
          <div data-hero>
            <div className="inline-flex items-center gap-2 rounded-full border border-success/25 bg-[rgb(var(--color-surface)/0.6)] px-3.5 py-1 text-[11px] font-medium text-success/90 backdrop-blur-sm">
              Available for Work
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-success" />
              </span>
            </div>
          </div>

          {/* Headline */}
          <div data-hero className="flex flex-col">
            <p className="text-body font-medium text-text/90">Hi, I&apos;m</p>
            <h1 className="mt-1 text-balance font-display text-hero font-bold">
              <span className="block text-text">Gokula</span>
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent block">
                Krishnan
              </span>
            </h1>
            {/* Typed tagline with caret (mockup "I plan. I organize. I deliver. |") */}
            <p className="mt-2 text-base font-semibold text-text sm:text-lg">
              <Typing
                words={["I plan. I organize. I deliver."]}
                className="text-text"
                loop={false}
              />
            </p>
          </div>

          {/* Bio Summary (mockup copy) */}
          <p data-hero className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Motivated and results-driven Project Manager with over 6+ years of
            experience in agile project management, cross-functional
            coordination, stakeholder communication, and delivering effective
            solutions on time, within scope, and on business value.
          </p>

          {/* Action Buttons */}
          <div data-hero className="flex flex-wrap items-center gap-4 pt-1">
            <Magnetic>
              <ResumeButton
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-900/30"
              />
            </Magnetic>
            <Magnetic>
              <a href="#contact" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                Let&apos;s Connect
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </Magnetic>
          </div>

          {/* Scroll Down — CSS mouse + wheel (mockup) */}
          <div data-hero className="pt-4">
            <a
              href="#about"
              className="group inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted transition-colors duration-small hover:text-primary"
            >
              <span
                aria-hidden
                className="flex h-8 w-[20px] items-start justify-center rounded-full border-2 border-muted/50 pt-1.5 transition-colors duration-small group-hover:border-primary/70"
              >
                <span className="size-1 animate-bounce rounded-full bg-current" />
              </span>
              Scroll Down
              <ChevronDown className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>

        {/* ============ Right Column — Frameless portrait stage ============ */}
        <div className="lg:col-span-6" data-hero>
          <div className="relative mx-auto w-full max-w-[520px]">
            {/* Ambient Background Glow */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[130px]"
            />

            {/* Portrait — no frame; edges melt into the dark stage */}
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/hero-globe.jpg"
                alt={`Portrait of ${site.name}`}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 92vw, 520px"
                className="mask-blend-radial-wide object-cover object-top"
              />

              {/* Neon double-ring pedestal (mockup) */}
              <div aria-hidden className="absolute inset-x-8 bottom-1 h-16">
                <div className="absolute inset-0 rounded-[100%] border-2 border-cyan-400/60 bg-cyan-500/10 shadow-[0_0_38px_rgb(var(--cyan-400)/0.35)] backdrop-blur-[2px]" />
                <div className="absolute -inset-x-4 -bottom-2 h-16 rounded-[100%] border border-primary/40" />
              </div>

              {/* Signature — cursive script bottom-right (Aug 5 mockup) */}
              <div
                aria-hidden
                className="absolute -bottom-16 right-4 z-20 select-none text-right leading-[1.4]"
                style={{ fontFamily: "var(--font-script), cursive" }}
              >
                <span className="block bg-gradient-to-br from-purple-400 via-primary to-cyan-300 bg-clip-text text-4xl italic text-transparent drop-shadow-[0_0_14px_rgb(var(--color-primary)/0.5)] sm:text-[44px]">
                  Gokula
                </span>
                <span className="block bg-gradient-to-br from-purple-400 via-primary to-cyan-300 bg-clip-text pr-2 text-4xl italic text-transparent drop-shadow-[0_0_14px_rgb(var(--color-primary)/0.5)] sm:text-[44px]">
                  Krishnan
                </span>
              </div>
            </div>

            {/* Floating widget 1: Project Timeline (top-left) */}
            <div className="absolute -left-6 top-6 hidden w-[172px] rounded-xl border border-primary/30 bg-[rgb(var(--color-surface)/0.9)] p-3.5 shadow-2xl backdrop-blur-md sm:block lg:-left-10">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="font-display text-[11px] font-semibold text-text">
                  Project Timeline
                </span>
                <Layers className="size-3.5 text-primary/70" aria-hidden />
              </div>
              <ul className="flex flex-col gap-2">
                {timelineSteps.map((step) => (
                  <li key={step.label} className="flex items-center gap-2.5 text-[11px] font-medium text-muted">
                    <span aria-hidden className={`size-2 rounded-[3px] ring-2 ring-white/5 ${step.dot}`} />
                    {step.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Floating widget 2: Task Progress 78% (top-right) */}
            <div className="absolute -right-4 top-8 hidden flex-col items-center gap-1.5 rounded-xl border border-cyan-400/30 bg-[rgb(var(--color-surface)/0.9)] p-4 shadow-2xl backdrop-blur-md sm:flex lg:-right-8">
              <span className="text-[10px] font-mono font-semibold uppercase text-muted">
                Task Progress
              </span>
              <div className="relative my-1 flex items-center justify-center">
                <ProgressRing78 />
                <span className="absolute font-display text-sm font-bold text-text">78%</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/15 px-2.5 py-0.5 text-[10px] font-semibold text-success">
                <span className="size-1.5 animate-pulse rounded-full bg-success" /> On Track
              </span>
            </div>

            {/* Floating tile 3: Calendar (mid-right) */}
            <div
              aria-hidden
              className="absolute -right-2 top-[46%] hidden size-12 animate-float items-center justify-center rounded-xl border border-primary/30 bg-[rgb(var(--color-surface)/0.9)] shadow-xl backdrop-blur-md sm:flex lg:-right-4"
              style={{ animationDelay: "0.8s" }}
            >
              <CalendarDays className="size-5 text-purple-400" />
            </div>

            {/* Floating tile 4: Bar chart (lower-right) */}
            <div
              aria-hidden
              className="absolute -right-1 bottom-36 hidden size-12 animate-float items-center justify-center rounded-xl border border-primary/30 bg-[rgb(var(--color-surface)/0.9)] shadow-xl backdrop-blur-md sm:flex lg:-right-3"
              style={{ animationDelay: "1.6s" }}
            >
              <BarChart3 className="size-5 text-cyan-400" />
            </div>

            {/* Floating widget 5: Sprint gantt glass card (bottom-left) */}
            <div
              aria-hidden
              className="absolute -left-4 bottom-28 hidden w-44 animate-float rounded-xl border border-primary/30 bg-[rgb(var(--color-surface)/0.85)] p-3 shadow-2xl backdrop-blur-md sm:block lg:-left-8"
              style={{ animationDelay: "0.4s" }}
            >
              <p className="mb-2 text-[9px] font-mono font-semibold uppercase tracking-widest text-muted">
                Sprint Timeline
              </p>
              <div className="flex flex-col gap-1.5">
                <span className="h-1.5 w-[92%] rounded-full bg-gradient-to-r from-primary to-secondary" />
                <span className="ml-3 h-1.5 w-[70%] rounded-full bg-purple-500/90" />
                <span className="ml-6 h-1.5 w-[55%] rounded-full bg-cyan-400/90" />
                <span className="ml-2 h-1.5 w-[78%] rounded-full bg-primary/70" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
