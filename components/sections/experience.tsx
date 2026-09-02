"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Briefcase, Calendar, ChevronLeft, ChevronRight, GraduationCap, Quote } from "lucide-react";
import { experience, testimonials } from "@/config/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { SPRING, testimonialSlide } from "@/lib/motion";

/**
 * 04 — MY EXPERIENCE JOURNEY (reference).
 * Left: a gold timeline whose spine draws itself as you scroll; nodes and
 * entries reveal with a restrained stagger.
 * Right: serif-glass testimonial with directional, spring-based carousel
 * controls (rendered only when multiple references exist).
 */
export function Experience() {
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);

  /* Spine draw — follows scroll through the list */
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 82%", "end 65%"],
  });
  const spine = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const total = testimonials.length;
  const go = (dir: number) =>
    setIndex(([i]) => [(i + dir + total) % total, dir]);
  const current = testimonials[index];

  return (
    <section
      id="experience"
      aria-label="Experience"
      className="section-line section-pad scroll-mt-20"
    >
      <div className="container-x flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="My Experience Journey"
            title={
              <>
                The Road <span className="text-gradient">So Far</span>
              </>
            }
          />
        </Reveal>

        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ── Timeline ── */}
          <ol
            ref={listRef}
            className="relative flex flex-col gap-10 lg:col-span-7"
            aria-label="Career timeline"
          >
            {/* Spine: base hairline + gold draw */}
            <span
              aria-hidden
              className="absolute bottom-2 left-[7px] top-2 w-px bg-glass/10"
            />
            <motion.span
              aria-hidden
              style={reduced ? undefined : { scaleY: spine }}
              className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-gold-400 via-gold-500/70 to-gold-700/40 shadow-[0_0_10px_rgb(var(--color-primary)/0.35)]"
            />

            {experience.map((entry, i) => {
              const KindIcon = entry.kind === "education" ? GraduationCap : Briefcase;
              return (
                <li key={`${entry.role}-${entry.period}`} className="relative pl-10">
                  {/* Node */}
                  <motion.span
                    aria-hidden
                    initial={reduced ? undefined : { scale: 0, opacity: 0 }}
                    whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-18% 0px" }}
                    transition={{ ...SPRING.snappy, delay: 0.1 }}
                    className="absolute left-0 top-1.5 flex size-4 items-center justify-center rounded-full border border-gold-500/60 bg-background shadow-[0_0_12px_rgb(var(--color-primary)/0.35)]"
                  >
                    <span className="size-1.5 rounded-full bg-gold-400" />
                  </motion.span>

                  <Reveal delay={Math.min(i * 0.06, 0.24)} y={20}>
                    <motion.article
                      whileHover={{ x: 4 }}
                      transition={SPRING.gentle}
                      className="flex flex-col gap-3 border-b border-gold-500/10 pb-8"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                        <div>
                          <h3 className="font-display text-lg font-semibold leading-snug text-text">
                            {entry.role}
                          </h3>
                          <p className="mt-0.5 text-[13px] font-medium text-gold-400/90">
                            {entry.org}
                          </p>
                        </div>
                        <span className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 text-[12.5px] font-medium tracking-[0.02em] text-muted">
                          <Calendar className="size-3.5 text-gold-500/80" aria-hidden />
                          {entry.period}
                        </span>
                      </div>

                      <p className="text-[13.5px] leading-relaxed text-muted">{entry.summary}</p>

                      <ul className="flex flex-col gap-1.5">
                        {entry.points.slice(0, 2).map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2.5 text-[13px] leading-relaxed text-muted/90"
                          >
                            <span
                              aria-hidden
                              className="mt-[7px] size-1 shrink-0 rounded-full bg-gold-500/80"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        <span className="sr-only">
                          {entry.kind === "education" ? "Education" : "Work"} — key areas:
                        </span>
                        <KindIcon className="sr-only" aria-hidden />
                        {entry.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="outline" className="px-2.5 py-0.5 text-[11px]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </motion.article>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          {/* ── Testimonial ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal delay={0.15}>
              <figure className="glass-card relative flex flex-col gap-6 overflow-hidden p-7 sm:p-8">
                <Quote
                  aria-hidden
                  className="absolute right-6 top-6 size-10 text-gold-500/15"
                />
                <span
                  aria-hidden
                  className="font-serif text-6xl leading-[0.6] text-gold-500/80"
                >
                  &ldquo;
                </span>

                <div className="min-h-[132px]">
                  <AnimatePresence mode="wait" custom={direction} initial={false}>
                    <motion.blockquote
                      key={index}
                      custom={direction}
                      variants={testimonialSlide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="font-serif text-[17.5px] font-light leading-relaxed text-text/90"
                    >
                      {current.quote}
                    </motion.blockquote>
                  </AnimatePresence>
                </div>

                <figcaption className="flex items-center gap-4 border-t border-gold-500/10 pt-5">
                  {/* Initials medallion — no fabricated photo */}
                  <span
                    aria-hidden
                    className="neu-control flex size-12 items-center justify-center rounded-full font-display text-sm font-semibold tracking-wide text-gold-300"
                  >
                    {current.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-text">{current.name}</p>
                    <p className="text-[12px] text-muted">{current.role}</p>
                  </div>

                  {total > 1 && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label="Previous testimonial"
                        className="neu-control inline-flex size-9 items-center justify-center rounded-full text-muted transition-all duration-micro hover:text-gold-300"
                      >
                        <ChevronLeft className="size-4" aria-hidden />
                      </button>
                      <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label="Next testimonial"
                        className="neu-control inline-flex size-9 items-center justify-center rounded-full text-muted transition-all duration-micro hover:text-gold-300"
                      >
                        <ChevronRight className="size-4" aria-hidden />
                      </button>
                    </div>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
