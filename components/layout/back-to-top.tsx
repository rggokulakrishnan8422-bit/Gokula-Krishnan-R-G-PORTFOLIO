"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useLenis, scrollToTop } from "@/components/motion/lenis-provider";
import { EASE_OUT } from "@/lib/motion";

/** Back-to-Top — quiet gold pill, appears after 600px. */
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
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 10 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          onClick={() => scrollToTop(lenis)}
          aria-label="Back to top"
          className="neu-control fixed bottom-6 right-6 z-[70] flex size-11 items-center justify-center rounded-full text-muted transition-colors duration-micro hover:text-gold-300"
        >
          <ArrowUp className="size-5" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
