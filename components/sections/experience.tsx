import { Briefcase, GraduationCap } from "lucide-react";
import { deliveryPhases, experience } from "@/config/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";

/** Node positions along the delivery-lifecycle arc (percent of canvas). */
const nodePositions = [
  { left: "6%", top: "74%" },
  { left: "32%", top: "46%" },
  { left: "60%", top: "28%" },
  { left: "84%", top: "2%" },
];

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

        {/* Delivery lifecycle arc */}
        <div className="flex flex-col justify-center lg:col-span-5">
          <Reveal delay={0.15} className="h-full">
            <div className="flex h-full min-h-[380px] flex-col justify-center gap-8">
              <p className="text-center text-caption font-medium uppercase tracking-[0.18em] text-muted">
                Delivery Lifecycle
              </p>
              <div className="relative mx-auto h-[340px] w-full max-w-[460px]">
                <svg
                  viewBox="0 0 400 300"
                  className="absolute inset-0 h-full w-full"
                  fill="none"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="phase-arc" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0" stopColor="rgb(82 126 255)" />
                      <stop offset="1" stopColor="rgb(34 211 238)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M24 268 C 110 150, 250 150, 376 44"
                    stroke="url(#phase-arc)"
                    strokeWidth="2"
                    strokeDasharray="5 9"
                    opacity="0.55"
                  />
                </svg>
                {deliveryPhases.map((phase, i) => {
                  const Icon = phase.icon;
                  const pos = nodePositions[i];
                  return (
                    <div key={phase.label} className="absolute" style={pos}>
                      <div className="-translate-x-1/2">
                        <div
                          className="glass-card flex animate-float flex-col items-center gap-1 px-4 py-3 shadow-md"
                          style={{ animationDelay: `${i * 0.7}s` }}
                        >
                          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                            <Icon className="size-4" aria-hidden />
                          </span>
                          <span className="text-caption font-medium">{phase.label}</span>
                          <span className="text-xs text-muted">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
