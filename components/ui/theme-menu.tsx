"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Palette } from "lucide-react";
import { ACCENT_THEMES, applyAccentTheme, useAccentTheme } from "@/lib/themes";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Accent-theme switcher for the navbar — sits where the mockup shows the
 * theme icons (between nav links and Download Resume). Dark surface is
 * constant; this swaps the accent palette site-wide and persists it.
 */
export function ThemeMenu({ className }: { className?: string }) {
  const theme = useAccentTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) buttonRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Change accent theme — current: ${theme.name}`}
        title={`Theme: ${theme.name}`}
        className="inline-flex size-10 items-center justify-center rounded-md text-muted transition-colors duration-micro hover:text-primary"
      >
        <Palette className="size-5" aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Accent themes"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: DURATION.micro, ease: EASE_OUT }}
            className="absolute right-0 top-12 z-50 w-60 rounded-xl border bg-[rgb(var(--color-surface)/0.95)] p-2 shadow-xl backdrop-blur-xl"
          >
            <p className="px-2 pb-1.5 pt-1 text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-muted">
              Accent Theme
            </p>
            {ACCENT_THEMES.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="menuitemradio"
                aria-checked={t.id === theme.id}
                autoFocus={i === 0}
                onClick={() => {
                  applyAccentTheme(t.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors duration-micro",
                  t.id === theme.id
                    ? "bg-primary/10 text-text"
                    : "text-muted hover:bg-primary/10 hover:text-text",
                )}
              >
                <span
                  aria-hidden
                  className="size-4 shrink-0 rounded-full shadow-inner"
                  style={{
                    background: `linear-gradient(135deg, rgb(${t.rgb.primary}), rgb(${t.rgb.secondary}))`,
                  }}
                />
                <span className="flex-1 text-left">{t.name}</span>
                {t.id === theme.id && <Check className="size-4 text-primary" aria-hidden />}
              </button>
            ))}
            <a
              href="#themes"
              onClick={() => setOpen(false)}
              className="mt-1 block border-t px-2 pb-1 pt-2.5 text-xs font-medium text-muted transition-colors duration-micro hover:text-primary"
            >
              Preview all variations →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
