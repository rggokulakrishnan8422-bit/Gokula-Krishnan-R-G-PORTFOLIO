"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { navLinks } from "@/config/content";
import { site } from "@/config/site";
import { useLenis, scrollToTop } from "@/components/motion/lenis-provider";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { EASE_OUT, SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Navbar — Luxury reference navigation.
 * - transparent at top → glass + hairline gold border once scrolled
 * - active section: shared gold underline (layoutId) that glides link→link
 * - mobile: full-screen glass menu rendered OUTSIDE the header (backdrop
 *   filters make headers a containing block for fixed children), with
 *   staggered spring items, Escape/backdrop close, locked body scroll and
 *   focus restored to the trigger
 */
export function Navbar() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#top");
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    navLinks.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  /* Viewport crosses the desktop breakpoint while open → close the menu */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* Escape closes + focus returns to the trigger */
  useEffect(() => {
    if (open) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
    if (wasOpen.current) menuButtonRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-component",
          scrolled
            ? "border-b border-gold-500/10 bg-background/75 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="container-x flex h-[68px] items-center justify-between md:h-20"
        >
          {/* Personal mark */}
          <a
            href="/"
            aria-label={`${site.name} — back to top`}
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              scrollToTop(lenis);
            }}
            className="group flex items-center"
          >
            <span className="font-display text-[22px] font-semibold tracking-tight transition-transform duration-small group-hover:scale-[1.04]">
              <span className="text-text">GK</span>
              <span className="text-gold-500">.</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-current={active === link.href ? "true" : undefined}
                className={cn(
                  "relative py-2 text-[13.5px] font-medium tracking-[0.02em] transition-colors duration-micro",
                  active === link.href ? "text-text" : "text-muted hover:text-text/90",
                )}
              >
                {link.label}
                {active === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={SPRING.snappy}
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent"
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right — CTA + mobile trigger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="group hidden h-10 select-none items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/[0.07] px-5 text-[13px] font-medium text-gold-300 backdrop-blur-md transition-all duration-small hover:-translate-y-0.5 hover:border-gold-400/70 hover:bg-gold-500/[0.14] hover:text-gold-200 sm:inline-flex"
            >
              Let&apos;s Connect
              <ArrowRight
                className="size-3.5 transition-transform duration-small group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="neu-control inline-flex size-11 items-center justify-center rounded-full text-text transition-colors duration-micro hover:text-gold-300 lg:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — full-screen glass, staggered spring items */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            className="fixed inset-0 z-[60] bg-background/85 backdrop-blur-2xl lg:hidden"
            onClick={() => setOpen(false)}
          >
            {/* Close control mirrors the trigger position (overlay covers it) */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="neu-control absolute right-4 top-[13px] inline-flex size-11 items-center justify-center rounded-full text-text transition-colors duration-micro hover:text-gold-300 sm:right-6 md:top-[19px] xl:right-8"
            >
              <X className="size-5" aria-hidden />
            </button>

            <motion.nav
              aria-label="Mobile"
              className="container-x flex h-full flex-col justify-center gap-1"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  autoFocus={i === 0}
                  variants={{
                    hidden: { opacity: 0, y: 26 },
                    visible: { opacity: 1, y: 0, transition: SPRING.gentle },
                  }}
                  className={cn(
                    "group flex items-baseline gap-4 border-b border-gold-500/10 py-5",
                    active === link.href && "text-gold-300",
                  )}
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] text-gold-500/70">
                    0{i + 1}
                  </span>
                  <span className="font-display text-3xl font-medium text-text transition-colors duration-micro group-hover:text-gold-200">
                    {link.label}
                  </span>
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                variants={{
                  hidden: { opacity: 0, y: 26 },
                  visible: { opacity: 1, y: 0, transition: SPRING.gentle },
                }}
                className="mt-8 inline-flex h-12 w-fit items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-7 text-sm font-medium text-gold-200"
              >
                Let&apos;s Connect
                <ArrowRight className="size-4" aria-hidden />
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
