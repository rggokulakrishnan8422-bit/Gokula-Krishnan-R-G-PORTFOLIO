"use client";

import dynamic from "next/dynamic";
import { deliveryPhases } from "@/config/content";

/** Client boundary so the scene can be code-split with ssr:false. */
const ExperienceOrbitScene = dynamic(() => import("@/components/three/experience-orbit"), {
  ssr: false,
});

export function ExperienceOrbit() {
  return (
    <div className="glass-card relative flex h-full flex-col justify-between overflow-hidden p-6 sm:p-7 shadow-xl border border-primary/20">
      {/* Decorative ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -left-12 size-48 rounded-full bg-secondary/10 blur-3xl"
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-primary/15 pb-4">
        <div className="flex items-center gap-2">
          <span aria-hidden className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-secondary" />
          </span>
          <span className="font-display text-caption font-semibold uppercase tracking-[0.18em] text-text">
            Delivery Lifecycle
          </span>
        </div>
        <span className="text-xs font-mono font-medium text-muted">4 Phases</span>
      </div>

      {/* 3D Interactive WebGL Orbit Core */}
      <div className="relative z-10 my-2 flex items-center justify-center">
        <ExperienceOrbitScene />
      </div>

      {/* Phase Steps Grid (2x2 Glass Badges) */}
      <div className="relative z-10 grid grid-cols-2 gap-2.5 pt-2">
        {deliveryPhases.map((phase, i) => {
          const Icon = phase.icon;
          return (
            <div
              key={phase.label}
              className="group flex items-center gap-2.5 rounded-xl border border-primary/15 bg-surface/60 p-2.5 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-surface/80 hover:shadow-md"
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-colors duration-300 group-hover:border-secondary group-hover:bg-secondary/20 group-hover:text-secondary">
                <Icon className="size-3.5" aria-hidden />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-mono font-semibold text-secondary tracking-wider">
                  0{i + 1}
                </span>
                <span className="truncate text-xs font-medium text-text group-hover:text-primary transition-colors">
                  {phase.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
