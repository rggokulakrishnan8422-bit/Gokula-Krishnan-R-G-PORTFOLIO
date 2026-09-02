"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import { projects } from "@/config/content";
import type { Project } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Tilt } from "@/components/ui/tilt";
import { Badge } from "@/components/ui/badge";
import { ProjectModal } from "@/components/ui/project-modal";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { SPRING } from "@/lib/motion";

/**
 * 03 — FEATURED PROJECTS (reference).
 * Desktop cards carry a restrained 3D tilt (±2°) with the image drifting
 * independently; tapping a card expands it into a premium project view via
 * a shared layout transition (Apple-app style) — scroll position, focus,
 * and body scroll are all preserved/restored.
 */
export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  useScrollLock(!!selected);

  const open = (project: Project, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelected(project);
  };
  const close = () => {
    setSelected(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="section-line section-pad scroll-mt-20"
    >
      <div className="container-x flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading
              index="03"
              eyebrow="Featured Projects"
              title={
                <>
                  Work I&apos;m <span className="text-gradient">Proud Of</span>
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.04em] text-gold-300 transition-colors duration-micro hover:text-gold-200"
            >
              View All Projects
              <ArrowRight
                className="size-4 transition-transform duration-small group-hover:translate-x-1"
                aria-hidden
              />
            </a>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const Icon = project.icon;
            const isSelected = selected?.id === project.id;
            return (
              <Reveal
                key={project.id}
                delay={Math.min(i * 0.08, 0.24)}
                y={24}
                className="h-full"
              >
                <Tilt max={2} scale={1.012} className="h-full">
                  {/* layoutId swaps to the modal when selected (shared expansion) */}
                  {isSelected ? (
                    <div className="h-full min-h-[420px]" aria-hidden />
                  ) : (
                    <motion.button
                      type="button"
                      layoutId={`project-card-${project.id}`}
                      onClick={(e) => open(project, e.currentTarget)}
                      aria-haspopup="dialog"
                      aria-label={`Open details: ${project.title}`}
                      transition={SPRING.soft}
                      className="glass-card group relative flex h-full w-full cursor-pointer flex-col overflow-hidden p-0 text-left"
                    >
                      {/* Image — drifts independently from the card tilt */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={project.image}
                          alt={`${project.title} preview`}
                          fill
                          sizes="(max-width: 768px) 92vw, (max-width: 1200px) 45vw, 380px"
                          className="object-cover transition-transform duration-700 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.05]"
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent"
                        />
                        <span className="neu-control absolute left-4 top-4 flex size-10 items-center justify-center rounded-xl text-gold-300">
                          <Icon className="size-[18px]" aria-hidden />
                        </span>
                        <span
                          aria-hidden
                          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-gold-500/40 bg-background/60 text-gold-300 opacity-0 backdrop-blur-md transition-all duration-small group-hover:opacity-100"
                        >
                          <ArrowUpRight className="size-4" />
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col gap-3 p-6">
                        <h3 className="font-display text-lg font-semibold leading-snug text-text">
                          {project.title}
                        </h3>
                        <p className="flex-1 text-[13.5px] leading-relaxed text-muted">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.button>
                  )}
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
