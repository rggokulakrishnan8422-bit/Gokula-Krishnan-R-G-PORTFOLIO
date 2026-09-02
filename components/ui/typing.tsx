"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Typing effect — reference tagline types once and holds.
 * Screen readers receive the full word list via sr-only text; the animated
 * span is aria-hidden. Reduced motion: the first word renders statically.
 */
export function Typing({
  words,
  className,
  loop = true,
}: {
  words: string[];
  className?: string;
  loop?: boolean;
}) {
  const reduced = useReducedMotion();
  const [text, setText] = useState("");
  /* Stable key so an inline-array prop doesn't restart the effect */
  const wordKey = useMemo(() => words.join(""), [words]);

  useEffect(() => {
    if (reduced) {
      setText(words[0] ?? "");
      return;
    }
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeout = 0;

    const tick = () => {
      const current = words[wordIndex];
      charIndex += deleting ? -1 : 1;
      setText(current.slice(0, charIndex));

      let delay = deleting ? 40 : 75;
      if (!deleting && charIndex === current.length) {
        if (!loop && wordIndex === words.length - 1) return; // type once, hold
        delay = 1800;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 350;
      }
      timeout = window.setTimeout(tick, delay);
    };

    timeout = window.setTimeout(tick, 600);
    return () => window.clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, wordKey, loop]);

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className={className}>
        {text}
        <span
          className={cn(
            "ml-1 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-gold-400",
            !reduced && "animate-pulse",
          )}
        />
      </span>
    </>
  );
}
