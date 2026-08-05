"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowUpRight, BarChart3, CheckCircle2, ChevronDown } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { DURATION, GSAP_EASE_OUT } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { site } from "@/config/site";
import { heroSummary } from "@/config/content";
import { Magnetic } from "@/components/ui/magnetic";
import { ResumeButton } from "@/components/ui/resume-button";
import { buttonVariants } from "@/components/ui/button";

/** Three.js scene code-split */
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), { ssr: false });

const timelineRows = [
  { label: "Planning", done: true },
  { label: "Execution", done: true },
  { label: "Monitoring", done: true },
  { label: "Delivery", done: false },
];

/** SVG Progress Ring for Task Progress 78% widget */
function TaskProgressRing({ value }: { value: number }) {
  const r = 28;
  const c = 2 * Math.PI * r;
  const strokeDashoffset = c - (value / 100) * c;
  return (
    <svg className="size-16 -rotate-90" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r={r} className="stroke-border/30 fill-none stroke-[5]" />
      <circle
        cx="32"
        cy="32"
        r={r}
        className="stroke-primary fill-none stroke-[5] transition-all duration-1000"
        strokeDasharray={c}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
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
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-12 pt-24 md:pt-28"
    >
      {/* 3D WebGL Background Scene */}
      <div aria-hidden className="absolute inset-0">
        <HeroScene />
      </div>

      {/* Surface Gradient Fade */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent"
      />

      <div className="container-x relative z-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Left Column Text Content */}
        <div className="flex flex-col gap-6 lg:col-span-6 lg:pl-6 xl:pl-10">
          {/* Available for Work Status Badge */}
          <div data-hero>
            <div className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3.5 py-1 text-xs font-semibold text-success shadow-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              Available for Work
            </div>
          </div>

          {/* Headline */}
          <div data-hero className="flex flex-col">
            <p className="text-body font-medium text-primary">Hi, I&apos;m</p>
            <h1 className="mt-1 text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-text">Gokula</span>
              <span className="bg-gradient-to-r from-purple-400 via-primary to-cyan-400 bg-clip-text text-transparent block">
                Krishnan R G
              </span>
            </h1>
            <p className="mt-2 text-base font-semibold text-secondary sm:text-lg">
              I plan. I organize. <span className="text-primary underline decoration-primary/40 underline-offset-4">I deliver.</span>
            </p>
          </div>

          {/* Bio Summary */}
          <p data-hero className="max-w-xl text-xs leading-relaxed text-muted sm:text-sm">
            {heroSummary}
          </p>

          {/* Action Buttons */}
          <div data-hero className="flex flex-wrap items-center gap-4 pt-1">
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

          {/* Scroll Down */}
          <div data-hero className="pt-3">
            <a
              href="#about"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-primary"
            >
              <span className="flex size-7 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary animate-bounce">
                <ChevronDown className="size-4" />
              </span>
              Scroll Down
            </a>
          </div>
        </div>

        {/* Right Column: 3D Stage Pedestal + Portrait + 3 Floating Widgets */}
        <div className="lg:col-span-6" data-hero>
          <div className="relative mx-auto w-full max-w-[500px]">
            {/* Ambient Background Glow */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[130px]"
            />

            {/* Glowing 3D Stage Pedestal */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-primary/25 bg-surface/40 backdrop-blur-md shadow-2xl">
              <Image
                src="/images/hero-globe.jpg"
                alt={`Portrait of ${site.name}`}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 92vw, 500px"
                className="mask-fade-b object-cover object-top"
              />

              {/* Glowing 3D Pedestal Ring Base */}
              <div
                aria-hidden
                className="absolute inset-x-8 bottom-4 h-14 rounded-full border-2 border-primary/40 bg-primary/10 shadow-lg shadow-primary/30 backdrop-blur-md"
              />

              {/* 3D Neon Signature Overlay */}
              <div
                aria-hidden
                className="absolute bottom-10 right-6 font-display text-lg font-bold italic tracking-wider text-cyan-300 opacity-90 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]"
              >
                Gokula Krishnan
              </div>
            </div>

            {/* Floating Widget 1: Project Timeline (Top-Left) */}
            <div className="absolute -left-6 top-8 hidden rounded-xl border border-primary/20 bg-surface/85 p-3.5 shadow-xl backdrop-blur-md sm:block">
              <p className="mb-2 text-[10px] font-mono font-semibold uppercase text-muted">
                Project Timeline
              </p>
              <div className="flex flex-col gap-1.5">
                {timelineRows.map((row) => (
                  <div key={row.label} className="flex items-center gap-2 text-xs">
                    <span
                      className={`size-2 rounded-full ${
                        row.done ? "bg-primary shadow-sm shadow-primary" : "bg-border/40"
                      }`}
                    />
                    <span className={row.done ? "font-medium text-text" : "text-muted"}>
                      {row.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Widget 2: Task Progress 78% (Top-Right) */}
            <div className="absolute -right-6 top-12 hidden flex-col items-center gap-1 rounded-xl border border-primary/20 bg-surface/85 p-3.5 shadow-xl backdrop-blur-md sm:flex">
              <p className="text-[10px] font-mono font-semibold uppercase text-muted">
                Task Progress
              </p>
              <div className="relative flex items-center justify-center my-1">
                <TaskProgressRing value={78} />
                <span className="absolute font-display text-xs font-bold text-text">78%</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-success">
                <span className="size-1.5 rounded-full bg-success animate-pulse" /> On Track
              </span>
            </div>

            {/* Floating Widget 3: Task Analytics Bar Chart (Bottom-Left) */}
            <div className="absolute -left-4 bottom-16 hidden items-center gap-3 rounded-xl border border-primary/20 bg-surface/85 p-3 shadow-xl backdrop-blur-md sm:flex">
              <div className="flex size-9 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                <BarChart3 className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-muted">Task Velocity</span>
                <span className="text-xs font-bold text-text">High Performance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
