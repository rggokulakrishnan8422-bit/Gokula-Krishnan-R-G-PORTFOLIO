import { Briefcase, GraduationCap } from "lucide-react";
import { experience } from "@/config/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { ExperienceOrbit } from "./experience-orbit";

/** Experience section — journey timeline + phase arc visual */
export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="section-line section-pad relative scroll-mt-24 overflow-hidden"
    >
      <div className="container-x grid items-start gap-12 lg:grid-cols-12">
        {/* Left/Center — Section heading left-aligned; experience cards shifted right */}
        <div className="flex flex-col gap-10 lg:col-span-8">
          <Reveal>
            <SectionHeading eyebrow="Experience" title="My Professional Journey" />
          </Reveal>

          <ol className="relative ml-6 flex flex-col gap-8 border-l border-primary/25 pl-7 sm:ml-10 sm:pl-10 lg:ml-10 xl:ml-12 lg:pl-12">
            {experience.map((entry, i) => {
              const KindIcon = entry.kind === "education" ? GraduationCap : Briefcase;
              return (
                <li key={`${entry.role}-${entry.period}`} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[19px] sm:-left-[21px] top-6 z-10 flex size-9 sm:size-10 items-center justify-center rounded-full border border-primary/40 bg-surface/95 text-primary shadow-lg ring-4 ring-surface backdrop-blur-md transition-transform duration-300 hover:scale-110"
                  >
                    <KindIcon className="size-4 text-primary" />
                  </span>
                  <Reveal delay={Math.min(i * 0.08, 0.3)}>
                    <GlassCard hover className="flex flex-col gap-4 p-6 sm:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-card font-semibold text-text">{entry.role}</h3>
                          <p className="text-caption font-medium text-primary">{entry.org}</p>
                        </div>
                        <Badge variant="primary">{entry.period}</Badge>
                      </div>

                      <ul className="flex flex-col gap-2">
                        {entry.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2.5 text-caption text-muted"
                          >
                            <span
                              aria-hidden
                              className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </GlassCard>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Right — Delivery lifecycle 3D orbit visual */}
        <div className="flex flex-col justify-center lg:col-span-4 lg:pt-16">
          <Reveal delay={0.15} className="h-full">
            <ExperienceOrbit />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
