"use client";

import { useEffect } from "react";
import { useLenis } from "@/components/motion/lenis-provider";

/**
 * Production body scroll lock for modals/menus.
 * - Stops Lenis smooth scrolling and hides overflow
 * - Compensates the scrollbar gutter so layout never shifts
 * - Preserves the exact scroll position (never jumps to top)
 * - Restores everything on release, even across overlapping locks
 */
let lockCount = 0;

export function useScrollLock(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked) return;
    lockCount += 1;

    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    lenis?.stop();

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = prevOverflow;
        document.body.style.paddingRight = prevPadding;
        lenis?.start();
      }
    };
  }, [locked, lenis]);
}
