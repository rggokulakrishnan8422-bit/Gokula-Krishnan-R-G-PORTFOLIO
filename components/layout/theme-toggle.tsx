"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

/**
 * Theme Toggle (Master Prompt Sections 4, 9).
 * Cross-fades sun/moon over 250ms; persists to localStorage.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      aria-pressed={mounted ? isDark : undefined}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-md border bg-[rgb(var(--color-glass)/var(--glass-alpha))] backdrop-blur-md transition-all duration-micro hover:border-primary/60 hover:text-primary",
        className,
      )}
    >
      <span className="relative block size-5">
        <Sun
          aria-hidden
          className={cn(
            "absolute inset-0 size-5 transition-all duration-small",
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0",
          )}
        />
        <Moon
          aria-hidden
          className={cn(
            "absolute inset-0 size-5 transition-all duration-small",
            isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
          )}
        />
      </span>
    </button>
  );
}
