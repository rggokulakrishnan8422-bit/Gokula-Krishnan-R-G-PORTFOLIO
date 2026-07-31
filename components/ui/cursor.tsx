"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * Custom cursor (Master Prompt Section 9 — Motion/Visual).
 * A small primary dot + trailing ring that scales over interactive
 * elements. Rendered only for fine pointers with motion allowed —
 * touch devices and reduced-motion users keep the native cursor.
 */
export function Cursor() {
  const reduced = useReducedMotion();
  const fine = useMediaQuery("(pointer: fine)");
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const enabled = !reduced && fine;

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onOver = (e: MouseEvent) => {
      hovering = Boolean((e.target as HTMLElement).closest("a, button, [data-cursor]"));
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${
        hovering ? 1.6 : 1
      })`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] size-1.5 rounded-full bg-primary"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[94] size-8 rounded-full border border-primary/50"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
    </>
  );
}
