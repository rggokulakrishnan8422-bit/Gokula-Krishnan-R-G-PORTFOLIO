"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowRight, MapPin, TrendingUp } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { DURATION, GSAP_EASE_OUT } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { site } from "@/config/site";
import { projects, technicalSkills, professionalSkills, toolsWall, typingWords } from "@/config/content";
import { Typing } from "@/components/ui/typing";
import { Magnetic } from "@/components/ui/magnetic";
import { ResumeButton } from "@/components/ui/resume-button";
import { Badge } from "@/components/ui/badge";
import { Counter } from "@/components/ui/counter";
import { LinkedInIcon } from "@/components/ui/icons";
import { buttonVariants } from "@/components/ui/button";

/** Three.js scene is code-split and never rendered on the server (Section 16). */
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), { ssr: false });

/**
 * Hero (Master Prompt Sections 7, 10).
 * 800ms entrance choreography (staggered data-hero blocks), floating
 * portrait composition, typing effect, magnetic CTAs — all with
 * reduced-motion static fallbacks.
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

  const stats = [
    { value: toolsWall.length, suffix: "+", label: "PM tools & platforms" },
    { value: technicalSkills.length + professionalSkills.length, suffix: "", label: "Core skills" },
    { value: projects.length, suffix: "+", label: "Projects delivered" },
  ];

  return (
    <section
      ref={scope}
      id="top"
      aria-label="Intro"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16 md:pt-20"
    >
      {/* WebGL environment (or its static fallback) */}
      <div aria-hidden className="absolute inset-0">
        <HeroScene />
      </div>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[rgb(var(--color-surface))] to-transparent"
      />

      <div className="container-x relative z-10 grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <div data-hero>
            <Badge className="gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              Open to opportunities
            </Badge>
          </div>

          <h1 data-hero className="text-balance font-display text-hero font-bold">
            {site.name}
            <span className="mt-2 block text-gradient">{site.role}</span>
          </h1>

          <p data-hero className="font-display text-card font-medium">
            I specialize in <Typing words={typingWords} className="text-primary" />
          </p>

          <p data-hero className="max-w-xl text-body text-muted">
            I help teams plan clearly, communicate early and ship on time —
            bringing Agile structure and calm execution to every sprint.
          </p>

          <div data-hero className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#projects" className={buttonVariants({ variant: "primary", size: "lg" })}>
                View Projects
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </Magnetic>
            <Magnetic>
              <ResumeButton variant="secondary" size="lg" />
            </Magnetic>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.name} on LinkedIn`}
              className={buttonVariants({ variant: "ghost", size: "lg" })}
            >
              <LinkedInIcon className="size-4" />
              LinkedIn
            </a>
          </div>

          <div data-hero className="mt-4 flex flex-wrap gap-8 border-t pt-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display text-2xl font-bold">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-caption text-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait composition — blended, never a floating cutout (Section 5) */}
        <div className="lg:col-span-5" data-hero>
          <div className="relative mx-auto w-full max-w-[420px]">
            <div
              aria-hidden
              className="absolute -inset-8 rounded-full bg-gradient-to-br from-primary/30 via-transparent to-secondary/30 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4 rotate-2 rounded-xl border bg-[rgb(var(--color-glass)/0.04)] backdrop-blur-sm"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-xl">
              <Image
                src="/images/portrait-hero.jpg"
                alt={`Portrait of ${site.name}`}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-surface)/0.35)] via-transparent to-transparent"
              />
            </div>

            <div className="glass-card absolute -bottom-6 -left-4 flex animate-float items-center gap-3 p-3 shadow-lg [animation-delay:0.8s] sm:-left-8">
              <div className="relative size-12 overflow-hidden rounded-md">
                <Image
                  src="/images/portrait-holo.jpg"
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col pr-1 leading-tight">
                <span className="text-sm font-semibold">{site.firstName}</span>
                <span className="text-xs text-muted">{site.role}</span>
              </div>
            </div>

            <div
              aria-hidden
              className="glass-card absolute -right-3 top-6 hidden animate-float items-center gap-2 px-3 py-2 text-xs font-medium shadow-md [animation-delay:0.4s] sm:flex sm:-right-6"
            >
              <TrendingUp className="size-4 text-success" />
              Velocity trending up
            </div>

            <div
              aria-hidden
              className="glass-card absolute -right-2 bottom-16 hidden animate-float items-center gap-2 px-3 py-2 text-xs [animation-delay:1.3s] sm:flex"
            >
              <MapPin className="size-3.5 text-primary" />
              {site.location}
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        data-hero
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors duration-micro hover:text-primary md:flex"
      >
        <span className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-current p-1.5">
          <span className="size-1 animate-float rounded-full bg-current [animation-duration:1.6s]" />
        </span>
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
      </a>
    </section>
  );
}
