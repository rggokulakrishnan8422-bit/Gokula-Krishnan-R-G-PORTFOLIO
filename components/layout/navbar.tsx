"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/config/content";
import { site } from "@/config/site";
import { ThemeToggle } from "./theme-toggle";
import { ResumeButton } from "@/components/ui/resume-button";
import { LinkedInIcon } from "@/components/ui/icons";
import { useLenis, scrollToTop } from "@/components/motion/lenis-provider";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Navbar (Master Prompt Section 9 — Layout/Nav).
 * - Glass surface appears after 8px of scroll (250ms)
 * - Active section tracked via IntersectionObserver
 * - Mobile menu: 250ms open, Esc closes, focus returns to the trigger
 * - Native anchor links (Lenis upgrades them with `anchors: true`)
 */
export function Navbar() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
        lenis?.start();
      };
    }
    if (wasOpen.current) menuButtonRef.current?.focus();
    wasOpen.current = open;
  }, [open, lenis]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-small",
        scrolled
          ? "border-b bg-[rgb(var(--color-surface)/0.72)] backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between md:h-20">
        <a
          href="/"
          aria-label={`${site.name} — back to top`}
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            scrollToTop(lenis);
          }}
          className="group flex items-center gap-2.5"
        >
          <span className="flex size-9 items-center justify-center rounded-md bg-gradient-to-br from-primary to-secondary font-display text-sm font-bold text-white shadow-md transition-transform duration-small group-hover:scale-105">
            GK
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-sm font-semibold">{site.name}</span>
            <span className="text-xs text-muted">{site.role}</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors duration-micro hover:text-[rgb(var(--color-text))]",
                active === link.href && "bg-primary/10 text-primary",
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} on LinkedIn`}
            className="hidden size-10 items-center justify-center rounded-md text-muted transition-colors duration-micro hover:text-primary sm:inline-flex"
          >
            <LinkedInIcon className="size-5" />
          </a>
          <div className="hidden sm:block">
            <ResumeButton variant="primary" size="sm" />
          </div>
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-md border bg-[rgb(var(--color-glass)/var(--glass-alpha))] backdrop-blur-md transition-colors duration-micro hover:border-primary/60 lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: DURATION.small, ease: EASE_OUT }}
            className="border-b bg-[rgb(var(--color-surface)/0.92)] backdrop-blur-xl lg:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-4">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  autoFocus={i === 0}
                  className={cn(
                    "rounded-md px-3 py-3 text-base font-medium text-muted transition-colors duration-micro hover:text-[rgb(var(--color-text))]",
                    active === link.href && "bg-primary/10 text-primary",
                  )}
                >
                  {link.label}
                </a>
              ))}
              <ResumeButton variant="primary" className="mt-3 w-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
