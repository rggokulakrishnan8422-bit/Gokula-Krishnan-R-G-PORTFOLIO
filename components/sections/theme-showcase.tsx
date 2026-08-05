"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Palette } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

export type ThemeId = "neon-blue" | "cyber-purple" | "ocean-teal" | "sunset-amber" | "forest-green";

interface ThemeOption {
  id: ThemeId;
  name: string;
  image: string;
  glowClass: string;
  dots: string[];
  gradient: string;
}

const themes: ThemeOption[] = [
  {
    id: "neon-blue",
    name: "Neon Blue",
    image: "/images/portrait-blue.jpg",
    glowClass: "from-blue-500/20 via-cyan-500/10 to-transparent border-blue-500/40",
    dots: ["#3b82f6", "#06b6d4", "#60a5fa", "#38bdf8", "#1d4ed8"],
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    id: "cyber-purple",
    name: "Cyber Purple",
    image: "/images/portrait-holo.jpg",
    glowClass: "from-purple-500/20 via-pink-500/10 to-transparent border-purple-500/40",
    dots: ["#8b5cf6", "#ec4899", "#a855f7", "#d946ef", "#6b21a8"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "ocean-teal",
    name: "Ocean Teal",
    image: "/images/portrait-glass.jpg",
    glowClass: "from-teal-500/20 via-emerald-500/10 to-transparent border-teal-500/40",
    dots: ["#14b8a6", "#10b981", "#2dd4bf", "#34d399", "#0f766e"],
    gradient: "from-teal-400 to-emerald-500",
  },
  {
    id: "sunset-amber",
    name: "Sunset Amber",
    image: "/images/portrait-hero.jpg",
    glowClass: "from-amber-500/20 via-orange-500/10 to-transparent border-amber-500/40",
    dots: ["#f59e0b", "#f97316", "#fbbf24", "#fb923c", "#b45309"],
    gradient: "from-amber-400 to-orange-500",
  },
  {
    id: "forest-green",
    name: "Forest Green",
    image: "/images/portrait-silhouette.jpg",
    glowClass: "from-emerald-600/20 via-green-500/10 to-transparent border-emerald-500/40",
    dots: ["#059669", "#22c55e", "#34d399", "#4ade80", "#047857"],
    gradient: "from-emerald-500 to-green-400",
  },
];

export function ThemeShowcase() {
  const [activeTheme, setActiveTheme] = useState<ThemeId>("neon-blue");

  return (
    <section aria-label="Theme Variations" className="section-line py-16 relative overflow-hidden">
      {/* Ambient background lighting glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]"
      />

      <div className="container-x relative z-10">
        <Reveal>
          <div className="mb-10 flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-2">
              <Palette className="size-3.5" /> Theme Variations
            </span>
            <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
              Choose Your Visual Mood
            </h2>
            <p className="mt-2 max-w-xl text-xs sm:text-sm text-muted">
              Select any of the 5 custom portrait theme variations to preview distinct color palettes across the portfolio.
            </p>
          </div>
        </Reveal>

        {/* 5 Theme Cards Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {themes.map((theme, i) => {
            const isSelected = activeTheme === theme.id;
            return (
              <Reveal key={theme.id} delay={Math.min(i * 0.08, 0.35)} y={20}>
                <button
                  type="button"
                  onClick={() => setActiveTheme(theme.id)}
                  className="w-full text-left focus:outline-none"
                >
                  <GlassCard
                    hover
                    className={cn(
                      "relative flex flex-col items-center p-4 text-center transition-all duration-300 rounded-2xl border",
                      isSelected
                        ? `border-primary bg-primary/10 shadow-xl shadow-primary/20 scale-[1.02]`
                        : "border-border/40 bg-surface/60 hover:border-primary/40 hover:bg-surface/80",
                    )}
                  >
                    {/* Portrait Preview Frame */}
                    <div className="relative mb-4 w-full flex justify-center">
                      <div className="relative aspect-[4/5] w-full max-w-[170px] overflow-hidden rounded-xl border border-primary/20 bg-surface shadow-md">
                        <Image
                          src={theme.image}
                          alt={theme.name}
                          fill
                          sizes="170px"
                          className={cn(
                            "object-cover object-top transition-transform duration-500 group-hover:scale-105",
                            theme.id === "neon-blue" && "hue-rotate-0",
                            theme.id === "cyber-purple" && "hue-rotate-[240deg] saturate-150",
                            theme.id === "ocean-teal" && "hue-rotate-[140deg]",
                            theme.id === "sunset-amber" && "hue-rotate-[40deg] contrast-110",
                            theme.id === "forest-green" && "hue-rotate-[90deg] saturate-125",
                          )}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent" />
                      </div>

                      {/* Selection Checkmark */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-primary text-white shadow-lg animate-in zoom-in-50">
                          <Check className="size-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Theme Label */}
                    <h3 className="font-display text-sm font-semibold text-text mb-2">
                      {theme.name}
                    </h3>

                    {/* Color Palette Dots */}
                    <div className="flex items-center justify-center gap-1.5 pt-1">
                      {theme.dots.map((color, dotIdx) => (
                        <span
                          key={dotIdx}
                          aria-hidden
                          className="size-2.5 rounded-full transition-transform hover:scale-125"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </GlassCard>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
