import { Briefcase, ChevronRight, GraduationCap } from "lucide-react";
import { experience } from "@/config/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";

/** Experience (Master Prompt Sections 7, 9) — timeline component. */
export function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="section-pad relative scroll-mt-24">
      <div className="container-x flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="04 · Experience"
            title="The road so far."
            description="Roles where I learned to plan honestly, communicate early and keep delivery predictable."
          />
        </Reveal>

        <ol className="relative flex flex-col gap-8 border-l pl-10">
          {experience.map((item, i) => {
            const KindIcon = item.kind === "education" ? GraduationCap : Briefcase;
            return (
              <li key={`${item.role}-${item.period}`} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[61px] top-1 flex size-10 items-center justify-center rounded-full border bg-surface shadow-sm"
                >
                  <KindIcon className="size-4 text-primary" />
                </span>
                <Reveal delay={Math.min(i * 0.08, 0.3)}>
                  <GlassCard hover className="flex flex-col gap-4 p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-card font-semibold">{item.role}</h3>
                        <p className="text-caption text-muted">{item.org}</p>
                      </div>
                      <Badge variant="primary">{item.period}</Badge>
                    </div>

                    <p className="text-body text-muted">{item.summary}</p>

                    <ul className="flex flex-col gap-2">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-2 text-body text-muted">
                          <ChevronRight className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
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
    </section>
  );
}
