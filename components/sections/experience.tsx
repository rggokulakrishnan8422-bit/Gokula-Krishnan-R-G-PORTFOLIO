import { Briefcase, GraduationCap } from "lucide-react";
import { experience } from "@/config/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { ExperienceOrbit } from "./experience-orbit";

/** Experience — mockup layout: journey timeline + phase arc visual. */
export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="section-line section-pad relative scroll-mt-24 overflow-hidden"
    >
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-10 lg:col-span-7">
          <Reveal>
            <SectionHeading eyebrow="Experience" title="My Professional Journey" />
          </Reveal>

          <ol className="relative ml-3 flex flex-col gap-6 border-l pl-10">
            {experience.map((entry, i) => {
              const KindIcon = entry.kind === "education" ? GraduationCap : Briefcase;
              return (
                <li key={`${entry.role}-${entry.period}`} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[21.5px] top-1 flex size-10 -translate-x-0 items-center justify-center rounded-full border bg-surface shadow-sm"
                  >
                    <KindIcon className="size-4 text-primary" />
                  </span>
                  <Reveal delay={Math.min(i * 0.08, 0.3)}>
                    <GlassCard hover className="flex flex-col gap-4 p-6">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-card font-semibold">{entry.role}</h3>
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

        {/* Delivery lifecycle — 3D orbit scene */}
        <div className="flex flex-col justify-center lg:col-span-5">
          <Reveal delay={0.15} className="h-full">
            <ExperienceOrbit />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
