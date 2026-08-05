"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowUpRight, CheckCircle2, ChevronDown, Layers, Activity } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { DURATION, GSAP_EASE_OUT } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { site } from "@/config/site";
import { heroSummary } from "@/config/content";
import { Magnetic } from "@/components/ui/magnetic";
import { ResumeButton } from "@/components/ui/resume-button";
import { buttonVariants } from "@/components/ui/button";
import { SignatureCard } from "@/components/ui/signature-card";

/** Three.js scene code-split */
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), { ssr: false });

/** SVG Progress Ring for 82% On Track Widget */
function ProgressRing82() {
  const r = 30;
  const c = 2 * Math.PI * r;
  const strokeDashoffset = c - (82 / 100) * c;
  return (
    <svg className="size-20 -rotate-90" viewBox="0 0 72 72">
      <circle cx="36" cy="36" r={r} className="stroke-border/30 fill-none stroke-[6]" />
      <circle
        cx="36"
        cy="36"
        r={r}
        className="stroke-cyan-400 fill-none stroke-[6] transition-all duration-1000"
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
          {/* Junior Project Manager Pill Badge */}
          <div data-hero>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary shadow-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-cyan-400" />
              </span>
              Junior Project Manager
            </div>
          </div>

          {/* Headline */}
          <div data-hero className="flex flex-col">
            <p className="text-body font-medium text-primary">Hi, I&apos;m</p>
            <h1 className="mt-1 text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-text">Gokula</span>
              <span className="bg-gradient-to-r from-cyan-300 via-primary to-purple-400 bg-clip-text text-transparent block">
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

          {/* Scroll Down Link */}
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

        {/* Right Column: 3D Pedestal Stage + Portrait + Signature Card + 3 Glass Widgets */}
        <div className="lg:col-span-6" data-hero>
          <div className="relative mx-auto w-full max-w-[500px]">
            {/* Ambient Background Glow */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[130px]"
            />

            {/* Stage Container */}
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

              {/* Pedestal Stage Ring Base */}
              <div
                aria-hidden
                className="absolute inset-x-6 bottom-3 h-16 rounded-full border-2 border-cyan-400/50 bg-cyan-500/15 shadow-xl shadow-cyan-400/30 backdrop-blur-md"
              />

              {/* Signature Overlay */}
              <div className="absolute bottom-6 right-4 z-20 scale-90 sm:scale-100">
                <SignatureCard />
              </div>
            </div>

            {/* Widget 1: Project Roadmap Board (Top-Left) */}
            <div className="absolute -left-8 top-6 hidden rounded-xl border border-primary/30 bg-surface/90 p-4 shadow-2xl backdrop-blur-md sm:block max-w-[200px]">
              <div className="flex items-center justify-between border-b border-border/40 pb-2 mb-2">
                <span className="text-[10px] font-mono font-semibold uppercase text-cyan-400">
                  Project Roadmap
                </span>
                <Layers className="size-3 text-cyan-400" />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="size-2 rounded-full bg-primary" />
                  <span className="font-semibold text-text">Planning</span>
                </div>
                <div className="pl-3.5 flex flex-col gap-1 text-[10px] text-muted">
                  <span className="rounded bg-primary/10 px-1.5 py-0.5">Requirements Analysis</span>
                  <span className="rounded bg-primary/10 px-1.5 py-0.5">Sprint Planning</span>
                  <span className="rounded bg-primary/10 px-1.5 py-0.5">Resource Allocation</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs pt-1">
                  <span className="size-2 rounded-full bg-cyan-400" />
                  <span className="font-semibold text-text">Execution</span>
                </div>
                <div className="pl-3.5 flex flex-col gap-1 text-[10px] text-muted">
                  <span className="rounded bg-cyan-400/10 px-1.5 py-0.5">Development</span>
                  <span className="rounded bg-cyan-400/10 px-1.5 py-0.5">Test & Review</span>
                </div>
              </div>
            </div>

            {/* Widget 2: ON TRACK 82% Progress Ring (Top-Right) */}
            <div className="absolute -right-6 top-8 hidden flex-col items-center gap-1.5 rounded-xl border border-cyan-400/30 bg-surface/90 p-4 shadow-2xl backdrop-blur-md sm:flex">
              <span className="text-[10px] font-mono font-semibold uppercase text-muted">
                Project Progress
              </span>
              <div className="relative flex items-center justify-center my-1">
                <ProgressRing82 />
                <span className="absolute font-display text-sm font-bold text-text">82%</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/15 px-2.5 py-0.5 text-[10px] font-semibold text-success">
                <span className="size-1.5 rounded-full bg-success animate-pulse" /> On Track
              </span>
            </div>

            {/* Widget 3: 3D Crystal Core (Bottom-Right) */}
            <div className="absolute -right-4 bottom-14 hidden items-center justify-center rounded-2xl border border-primary/30 bg-surface/90 p-3 shadow-2xl backdrop-blur-md sm:flex">
              <div className="flex size-14 items-center justify-center rounded-xl bg-primary/15 text-cyan-400 shadow-inner">
                <svg className="size-9 animate-pulse" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4L42 14V34L24 44L6 34V14L24 4Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M24 4V44" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                  <path d="M6 14L24 24L42 14" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
