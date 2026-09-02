"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { site } from "@/config/site";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { EASE_OUT, SPRING } from "@/lib/motion";

/**
 * Project detail modal — expands from the tapped card via a shared layoutId
 * (macOS-style spatial transition), then content settles with a staggered
 * spring. Contract: only the modal content scrolls; the page behind keeps
 * its exact scroll position; Escape / backdrop / close all restore focus.
 */
export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const Icon = project.icon;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: EASE_OUT }}
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
      />

      {/* Panel — shares layoutId with the card, expands in place */}
      <motion.div
        ref={panelRef}
        layoutId={`project-card-${project.id}`}
        transition={SPRING.soft}
        className="glass-card relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden"
        style={{ borderRadius: 20 }}
      >
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Close project details"
          className="neu-control absolute right-4 top-4 z-20 inline-flex size-10 items-center justify-center rounded-full bg-background/60 text-muted backdrop-blur-md transition-all duration-micro hover:rotate-90 hover:text-gold-300"
        >
          <X className="size-[18px]" aria-hidden />
        </button>

        {/* Scrollable content — ONLY this region scrolls */}
        <div
          data-lenis-prevent
          className="flex flex-col overflow-y-auto overscroll-contain"
        >
          <div className="relative aspect-[16/8] w-full shrink-0 overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent"
            />
            <div className="absolute bottom-5 left-6 flex items-center gap-3 sm:left-8">
              <span className="neu-control flex size-11 items-center justify-center rounded-xl text-gold-300">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="rounded-full border border-gold-500/30 bg-background/60 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-gold-300 backdrop-blur-md">
                Case Study
              </span>
            </div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } } }}
            className="flex flex-col gap-5 p-6 sm:p-8"
          >
            <motion.h3
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: SPRING.gentle } }}
              className="font-display text-2xl font-semibold text-text sm:text-[28px]"
            >
              {project.title}
            </motion.h3>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: SPRING.gentle } }}
              className="flex flex-wrap gap-2"
            >
              {project.tags.map((tag) => (
                <Badge key={tag} variant="primary">
                  {tag}
                </Badge>
              ))}
            </motion.div>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: SPRING.gentle } }}
              className="text-[15px] leading-relaxed text-muted"
            >
              {project.description}
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { ...SPRING.gentle } } }}
              className="mt-1 flex flex-wrap items-center gap-3 border-t border-gold-500/10 pt-5"
            >
              <a
                href={site.emailHref}
                className="group inline-flex h-11 select-none items-center gap-2 rounded-full bg-gradient-to-b from-gold-300 via-primary to-gold-600 px-6 text-sm font-medium text-[rgb(var(--color-background))] shadow-[0_10px_30px_-10px_rgb(var(--color-primary)/0.55),inset_0_1px_0_rgb(255_255_255/0.35)] transition-all duration-small hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Discuss a Similar Project
                <ArrowRight
                  className="size-4 transition-transform duration-small group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 select-none items-center rounded-full border border-gold-500/35 px-6 text-sm font-medium text-gold-300 transition-all duration-small hover:bg-gold-500/10"
              >
                Back to Projects
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
