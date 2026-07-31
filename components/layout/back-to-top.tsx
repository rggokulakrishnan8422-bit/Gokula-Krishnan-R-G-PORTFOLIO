"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLenis, scrollToTop } from "@/components/motion/lenis-provider";
import { DURATION, EASE_OUT } from "@/lib/motion";

/** Back-to-Top (Master Prompt Section 9 — Layout/Nav). Appears after 600px. */
export function BackToTop() {
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: DURATION.small, ease: EASE_OUT }}
          onClick={() => scrollToTop(lenis)}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-[70] flex size-11 items-center justify-center rounded-full border bg-[rgb(var(--color-surface)/0.8)] shadow-lg backdrop-blur-md transition-colors duration-micro hover:border-primary/60 hover:text-primary"
        >
          <ArrowUp className="size-5" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
