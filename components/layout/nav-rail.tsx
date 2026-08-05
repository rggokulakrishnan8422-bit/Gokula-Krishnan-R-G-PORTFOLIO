"use client";

import { Home, User, Briefcase, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";

const railItems = [
  { label: "Home", href: "#top", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Projects", href: "#projects", icon: Briefcase },
  { label: "Contact", href: "#contact", icon: PhoneCall },
];

export function NavRail() {
  return (
    <aside
      aria-label="Quick Nav Rail"
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-6 xl:flex"
    >
      {/* 01 Indicator Line Top */}
      <div className="flex flex-col items-center gap-2 text-muted">
        <span className="font-mono text-xs font-semibold">01</span>
        <span className="h-10 w-px bg-gradient-to-b from-primary/80 via-primary/30 to-transparent" />
      </div>

      {/* Floating Glass Icon Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-primary/20 bg-surface/80 p-2 shadow-2xl backdrop-blur-xl">
        {railItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              title={item.label}
              className={cn(
                "group relative flex size-10 items-center justify-center rounded-xl transition-all duration-300",
                "text-muted hover:border hover:border-primary/40 hover:bg-primary/15 hover:text-primary hover:shadow-md",
              )}
            >
              <Icon className="size-4 transition-transform duration-200 group-hover:scale-110" />
              {/* Tooltip on hover */}
              <span className="pointer-events-none absolute left-14 rounded-md border border-primary/20 bg-surface/95 px-2.5 py-1 text-xs font-medium text-text opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>

      {/* Indicator Line Bottom */}
      <div className="flex flex-col items-center gap-2">
        <span className="h-10 w-px bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
        <span className="size-1.5 rounded-full bg-primary/60" />
      </div>
    </aside>
  );
}
