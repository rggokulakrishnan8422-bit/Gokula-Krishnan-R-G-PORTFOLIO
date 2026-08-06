"use client";

import { useEffect, useState } from "react";
import { Home, User, Briefcase, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";

const railItems = [
  { label: "Home", href: "#top", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Projects", href: "#projects", icon: Briefcase },
  { label: "Contact", href: "#contact", icon: PhoneCall },
];

/**
 * Left edge quick-nav rail (Aug 5 mockup) — icons threaded onto a vertical
 * gradient line with glow dots; the current section glows in the accent
 * color. Scroll-spied via IntersectionObserver.
 */
export function NavRail() {
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    railItems.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <aside
      aria-label="Quick Nav Rail"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center xl:flex"
    >
      {/* Top terminal dot */}
      <span
        aria-hidden
        className="mb-3 size-1.5 rounded-full bg-primary shadow-[0_0_10px_rgb(var(--ring)/0.9)]"
      />

      <div className="relative flex flex-col items-center gap-5 py-1">
        {/* Vertical gradient spine */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-primary/70 via-border/60 to-primary/50"
        />
        {/* Travel glow dot positioned at the active item */}
        <span
          aria-hidden
          className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_rgb(var(--ring))] transition-all duration-component"
          style={{ top: `calc(${railItems.findIndex((i) => i.href === active) * 52 + 17}px)` }}
        />

        {railItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.href;
          return (
            <a
              key={item.label}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "group relative z-10 flex size-10 items-center justify-center rounded-xl border backdrop-blur-md transition-all duration-small",
                isActive
                  ? "border-primary bg-primary text-white shadow-lg shadow-[rgb(var(--ring)/0.4)]"
                  : "border-transparent bg-[rgb(var(--color-surface)/0.85)] text-muted hover:border-primary/40 hover:text-primary",
              )}
            >
              <Icon className="size-4 transition-transform duration-micro group-hover:scale-110" aria-hidden />
              {/* Tooltip */}
              <span className="pointer-events-none absolute left-14 whitespace-nowrap rounded-md border bg-[rgb(var(--color-surface)/0.95)] px-2.5 py-1 text-xs font-medium text-text opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-micro group-hover:opacity-100">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>

      {/* Bottom terminal dot */}
      <span
        aria-hidden
        className="mt-3 size-1.5 rounded-full bg-primary/70 shadow-[0_0_8px_rgb(var(--ring)/0.7)]"
      />
    </aside>
  );
}
