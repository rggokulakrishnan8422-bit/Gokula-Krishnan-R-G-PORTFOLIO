"use client";

import { cn } from "@/lib/utils";

interface SignatureCardProps {
  className?: string;
  light?: boolean;
}

export function SignatureCard({ className, light = false }: SignatureCardProps) {
  return (
    <div className={cn("flex flex-col items-center select-none", className)}>
      {/* Top Serif Name & Diamond Line Divider */}
      <div className="flex items-center gap-3 text-xs font-serif tracking-[0.25em] uppercase text-muted/90">
        <span className="h-px w-12 bg-gradient-to-r from-transparent via-primary/50 to-primary/80" />
        <span className="font-medium text-text">Gokula Krishnan R G</span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent via-primary/50 to-primary/80" />
      </div>

      {/* Decorative Diamond Dot */}
      <div aria-hidden className="-mt-1.5 flex items-center justify-center">
        <span className="size-1.5 rotate-45 bg-primary/70 shadow-sm shadow-primary" />
      </div>

      {/* Cursive Handwritten Script Signature */}
      <div
        aria-label="Gokula Krishnan R G Signature"
        className={cn(
          "-mt-1 font-display text-2xl sm:text-3xl font-bold italic tracking-wide drop-shadow-[0_0_12px_rgb(var(--cyan-300)/0.6)] transition-all",
          light
            ? "text-slate-900"
            : "bg-gradient-to-r from-cyan-300 via-primary to-purple-400 bg-clip-text text-transparent",
        )}
        style={{ fontFamily: "'Dancing Script', 'Montez', 'Alex Brush', cursive, sans-serif" }}
      >
        Gokula Krishnan R G
      </div>
    </div>
  );
}
