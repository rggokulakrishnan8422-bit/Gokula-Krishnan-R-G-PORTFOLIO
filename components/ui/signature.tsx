"use client";

import { motion } from "motion/react";
import { signatureReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The personal signature — champagne-gold handwriting (Dancing Script)
 * revealed with a left→right "being written" clip sweep, a soft glow, and
 * a final flourish underline. Reduced motion renders it statically.
 */
export function Signature({
  className,
  text = "Gokula Krishnan RG",
}: {
  className?: string;
  text?: string;
}) {
  return (
    <motion.span
      aria-label={`Signature of ${text}`}
      role="img"
      className={cn("inline-block select-none", className)}
      variants={signatureReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      <span
        aria-hidden
        className="block bg-gradient-to-b from-gold-200 via-gold-400 to-gold-600 bg-clip-text font-script text-transparent drop-shadow-[0_2px_18px_rgb(var(--color-primary)/0.35)]"
        style={{ transform: "rotate(-4deg)" }}
      >
        {text}
      </span>
      <span
        aria-hidden
        className="mt-1 block h-px w-[72%] bg-gradient-to-r from-gold-500/70 to-transparent"
        style={{ transform: "rotate(-4deg) translateX(6%)" }}
      />
    </motion.span>
  );
}
