"use client";

import Image from "next/image";
import { Sparkles, Layers, ShieldCheck, UserCheck, Eye } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Tilt } from "@/components/ui/tilt";

const portraitStyles = [
  {
    title: "Floating Glass Card",
    image: "/images/portrait-glass.jpg",
    icon: Layers,
    badge: "Glassmorphism",
    description: "Frosted glass container with dynamic backdrop blur and subtle blue illumination.",
    containerClass: "rounded-2xl border border-primary/30 p-2 shadow-xl bg-surface/70 backdrop-blur-md",
    imageClass: "rounded-xl object-cover object-top filter brightness-105 contrast-105",
  },
  {
    title: "Monochrome Blue",
    image: "/images/portrait-blue.jpg",
    icon: ShieldCheck,
    badge: "Monochrome",
    description: "Tailored electric blue color grade with rich cyan highlights.",
    containerClass: "rounded-2xl border border-primary/40 p-2 bg-primary/10 shadow-lg shadow-primary/10",
    imageClass: "rounded-xl object-cover object-top filter hue-rotate-15 contrast-110 saturate-125",
  },
  {
    title: "Holographic Effect",
    image: "/images/portrait-holo.jpg",
    icon: Sparkles,
    badge: "Holographic",
    description: "Futuristic digital aura mesh with particle projection lighting.",
    containerClass: "relative rounded-2xl border border-secondary/40 p-2 bg-secondary/10 shadow-xl shadow-secondary/10 overflow-hidden",
    imageClass: "rounded-xl object-cover object-top filter brightness-110 saturate-150",
    extraOverlay: true,
  },
  {
    title: "Circular Avatar",
    image: "/images/portrait-dashboard.jpg",
    icon: UserCheck,
    badge: "Circular Core",
    description: "Centering circular viewport framed in an active cyan glow ring.",
    containerClass: "rounded-full border-2 border-primary/50 p-2 bg-surface/90 shadow-2xl shadow-primary/20",
    imageClass: "rounded-full object-cover object-top aspect-square",
    isCircle: true,
  },
  {
    title: "Background Silhouette",
    image: "/images/portrait-silhouette.jpg",
    icon: Eye,
    badge: "Silhouette",
    description: "High-contrast dark profile silhouette set against a space navy backdrop.",
    containerClass: "rounded-2xl border border-border/40 p-2 bg-black/60 shadow-lg",
    imageClass: "rounded-xl object-cover object-top filter contrast-125 brightness-95",
  },
];

export function PortraitShowcase() {
  return (
    <section aria-label="Visual Portrait Styles" className="section-line py-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]"
      />

      <div className="container-x relative z-10">
        <Reveal>
          <div className="mb-8 flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-2">
              <Sparkles className="size-3.5" /> Premium Visual Styles
            </span>
            <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
              Monochrome Blue & Holographic Treatments
            </h2>
            <p className="mt-2 max-w-xl text-xs sm:text-sm text-muted">
              Interactive portrait style showcases featuring frosted glass cards, monochrome blue grading, holographic grid overlays, circular avatars, and dark background silhouettes.
            </p>
          </div>
        </Reveal>

        {/* 5 Cards Row Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {portraitStyles.map((style, i) => {
            const Icon = style.icon;
            return (
              <Reveal key={style.title} delay={Math.min(i * 0.08, 0.35)} y={24}>
                <Tilt className="h-full">
                  <GlassCard
                    hover
                    className="flex h-full flex-col justify-between items-center p-4 text-center group transition-all duration-300 hover:border-primary/50"
                  >
                    {/* Image Box */}
                    <div className="relative mb-4 w-full flex justify-center">
                      <div className={`relative aspect-square w-full max-w-[170px] ${style.containerClass}`}>
                        <Image
                          src={style.image}
                          alt={style.title}
                          fill
                          sizes="170px"
                          className={style.imageClass}
                        />

                        {/* Holographic overlay scanlines */}
                        {style.extraOverlay && (
                          <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-secondary/20 via-transparent to-primary/20 opacity-60 mix-blend-overlay"
                          />
                        )}
                      </div>
                    </div>

                    {/* Content Label */}
                    <div className="flex flex-col items-center gap-1.5 w-full">
                      <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-text group-hover:text-primary transition-colors">
                        <Icon className="size-3.5 text-primary" />
                        <span>{style.title}</span>
                      </div>

                      <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-mono font-medium text-secondary">
                        {style.badge}
                      </span>

                      <p className="mt-1 text-[11px] text-muted line-clamp-2 leading-relaxed">
                        {style.description}
                      </p>
                    </div>
                  </GlassCard>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
