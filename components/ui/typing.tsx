"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Typing effect (Master Prompt Sections 10 — hero).
 * Screen readers receive the full word list via sr-only text; the animated
 * span is aria-hidden. Reduced motion: the first word renders statically.
 */
export function Typing({ words, className }: { words: string[]; className?: string }) {
  const reduced = useReducedMotion();
  const [text, setText] = useState("");

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
  }, [reduced, words]);

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className={className}>
        {text}
        <span
          className={cn(
            "ml-1 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-primary",
            !reduced && "animate-pulse-soft",
          )}
        />
      </span>
    </>
  );
}
