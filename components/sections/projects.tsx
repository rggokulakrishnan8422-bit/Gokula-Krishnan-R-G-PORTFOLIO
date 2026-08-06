"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { site } from "@/config/site";
import { projects } from "@/config/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Tilt } from "@/components/ui/tilt";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Featured Projects — Aug 5 mockup: horizontal snap carousel with side
 * chevrons, imaged cards with an icon chip pinned to the photo top-left,
 * title/description/tags below.
 */
export function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-project-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="section-line section-pad relative scroll-mt-24 overflow-hidden"
    >
      {/* Enterprise dashboard overlay — faint ambience */}
      <div
        aria-hidden
        className="absolute left-0 top-1/2 hidden h-[460px] w-[380px] -translate-y-1/2 opacity-[0.1] [mask-image:linear-gradient(to_right,black,transparent)] lg:block"
      >
        <Image
          src="/images/portrait-dashboard.jpg"
          alt=""
          fill
          sizes="380px"
          className="object-cover"
        />
      </div>

      <div className="container-x relative flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading eyebrow="FEATURED PROJECTS" title="Some Projects I'm Proud Of" />
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              View All Projects
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </Reveal>
        </div>

        {/* Carousel */}
        <div className="group/carousel relative">
          {/* Prev chevron */}
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            aria-label="Previous project"
            className={cn(
              "absolute -left-3 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border bg-[rgb(var(--color-surface)/0.9)] text-muted shadow-xl backdrop-blur-md transition-all duration-small hover:border-primary/60 hover:text-primary sm:flex",
              !canPrev && "pointer-events-none opacity-0",
            )}
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>

          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((project, i) => {
              const Icon = project.icon;
              return (
                <Reveal
                  key={project.id}
                  delay={Math.min(i * 0.08, 0.24)}
                  y={24}
                  className="w-[86%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <div data-project-card className="h-full">
                    <Tilt className="h-full">
                      <GlassCard hover className="group relative flex h-full flex-col overflow-hidden p-0">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={project.image}
                            alt={`${project.title} preview`}
                            fill
                            sizes="(max-width: 640px) 86vw, (max-width: 1024px) 45vw, 420px"
                            className="object-cover transition-transform duration-component group-hover:scale-105"
                          />
                          <div
                            aria-hidden
                            className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-surface)/0.5)] to-transparent"
                          />
                          {/* Icon chip pinned top-left (mockup) */}
                          <span className="absolute left-4 top-4 flex size-11 items-center justify-center rounded-xl border border-primary/40 bg-gradient-to-br from-primary to-purple-600 text-white shadow-lg shadow-[rgb(var(--ring)/0.35)]">
                            <Icon className="size-5" aria-hidden />
                          </span>
                        </div>

                        <div className="flex flex-1 flex-col gap-3 p-6">
                          <h3 className="font-display text-lg font-semibold text-text">
                            {project.title}
                          </h3>
                          <p className="flex-1 text-caption text-muted">{project.description}</p>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {project.tags.map((tag) => (
                              <Badge key={tag} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </GlassCard>
                    </Tilt>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Next chevron */}
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            aria-label="Next project"
            className={cn(
              "absolute -right-3 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border bg-[rgb(var(--color-surface)/0.9)] text-muted shadow-xl backdrop-blur-md transition-all duration-small hover:border-primary/60 hover:text-primary sm:flex",
              !canNext && "pointer-events-none opacity-0",
            )}
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
