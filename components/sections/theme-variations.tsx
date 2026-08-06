"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { Briefcase, Check, Home, User } from "lucide-react";
import {
  ACCENT_THEMES,
  applyAccentTheme,
  useAccentTheme,
  type AccentTheme,
} from "@/lib/themes";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/** Scoped CSS vars so each card previews its own palette, whatever the site theme */
function scopedVars(t: AccentTheme): CSSProperties {
  return {
    "--color-primary": t.rgb.primary,
    "--color-secondary": t.rgb.secondary,
    "--cyan-400": t.rgb.cyan400,
    "--purple-400": t.rgb.purple400,
    "--purple-500": t.rgb.purple500,
    "--ring": t.rgb.primary,
  } as CSSProperties;
}

/** Miniature hero preview — echoes the mockup's theme cards. */
function ThemePreview({ t }: { t: AccentTheme }) {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden bg-[#05081a]"
      style={scopedVars(t)}
    >
      {/* Accent glow */}
      <div
        aria-hidden
        className="absolute right-0 top-1/3 h-28 w-28 rounded-full blur-2xl"
        style={{ background: `rgb(${t.rgb.primary} / 0.35)` }}
      />

      {/* Mini left rail */}
      <div className="absolute left-2.5 top-1/2 flex -translate-y-1/2 flex-col items-center gap-1.5">
        <span
          aria-hidden
          className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 opacity-40"
          style={{ background: `rgb(${t.rgb.primary})` }}
        />
        {[Home, User, Briefcase].map((Icon, i) => (
          <span
            key={i}
            aria-hidden
            className={cn(
              "relative z-10 flex size-[18px] items-center justify-center rounded-md border",
              i === 0 ? "border-transparent text-white" : "border-white/10 bg-white/5 text-white/60",
            )}
            style={i === 0 ? { background: `rgb(${t.rgb.primary})` } : undefined}
          >
            <Icon className="size-2.5" />
          </span>
        ))}
      </div>

      {/* Mini floating widget (Task Progress ring echo) */}
      <div
        aria-hidden
        className="absolute right-2.5 top-3 flex h-10 w-9 flex-col items-center justify-center gap-1 rounded-lg border border-white/10 backdrop-blur-sm"
        style={{ background: "rgb(5 8 26 / 0.85)" }}
      >
        <span
          className="size-3.5 rounded-full border-2 border-white/15"
          style={{ borderTopColor: `rgb(${t.rgb.cyan400})` }}
        />
        <span className="h-0.5 w-4 rounded-full" style={{ background: `rgb(${t.rgb.primary})` }} />
      </div>

      {/* Portrait — frameless blend */}
      <div className="absolute bottom-0 left-1/2 h-[92%] w-[70%] -translate-x-1/2">
        <Image
          src="/images/portrait-hero.jpg"
          alt=""
          fill
          sizes="180px"
          className="mask-blend-radial object-cover object-top"
        />
        {/* Mini neon pedestal ring */}
        <span
          aria-hidden
          className="absolute inset-x-3 bottom-1 h-4 rounded-[100%] border"
          style={{
            borderColor: `rgb(${t.rgb.cyan400} / 0.7)`,
            boxShadow: `0 0 14px rgb(${t.rgb.cyan400} / 0.45)`,
            background: `rgb(${t.rgb.cyan400} / 0.12)`,
          }}
        />
      </div>
    </div>
  );
}

export function ThemeVariations() {
  const active = useAccentTheme();

  return (
    <section
      id="themes"
      aria-label="Theme variations"
      className="section-line section-pad scroll-mt-24"
    >
      <div className="container-x flex flex-col gap-8">
        <Reveal>
          <h2 className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted">
            Theme Variations
          </h2>
        </Reveal>

        <div
          role="radiogroup"
          aria-label="Accent theme"
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5"
        >
          {ACCENT_THEMES.map((t, i) => {
            const isActive = active.id === t.id;
            return (
              <Reveal key={t.id} delay={Math.min(i * 0.06, 0.25)} y={20}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => applyAccentTheme(t.id)}
                  className={cn(
                    "group flex w-full flex-col overflow-hidden rounded-2xl border text-left transition-all duration-small hover:-translate-y-1",
                    isActive
                      ? "border-transparent"
                      : "hover:border-primary/40 hover:shadow-xl",
                  )}
                  style={
                    isActive
                      ? {
                          boxShadow: `0 0 0 2px rgb(${t.rgb.primary}), 0 18px 42px -16px rgb(${t.rgb.primary} / 0.55)`,
                        }
                      : undefined
                  }
                >
                  <span className="relative block">
                    <ThemePreview t={t} />
                    {/* Name pill floats on the preview (Aug 5 mockup) */}
                    <span className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-[rgb(5_8_22/0.88)] px-3 py-2 backdrop-blur-md">
                      <span className="text-xs font-semibold text-text sm:text-[13px]">
                        {t.name}
                      </span>
                      {isActive ? (
                        <span
                          aria-hidden
                          className="flex size-5 items-center justify-center rounded-full text-white"
                          style={{ background: `rgb(${t.rgb.primary})` }}
                        >
                          <Check className="size-3" />
                        </span>
                      ) : (
                        <span
                          aria-hidden
                          className="size-5 rounded-full border border-dashed border-border transition-colors duration-small group-hover:border-muted"
                        />
                      )}
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Dots indicator (mockup) */}
        <div className="flex items-center justify-center gap-2.5">
          {ACCENT_THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => applyAccentTheme(t.id)}
              aria-label={`${t.name} theme`}
              aria-pressed={active.id === t.id}
              className={cn(
                "size-2.5 rounded-full transition-all duration-small",
                active.id === t.id ? "scale-110" : "bg-border/50 hover:bg-muted",
              )}
              style={
                active.id === t.id
                  ? {
                      background: `rgb(${t.rgb.primary})`,
                      boxShadow: `0 0 8px rgb(${t.rgb.primary} / 0.9)`,
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
