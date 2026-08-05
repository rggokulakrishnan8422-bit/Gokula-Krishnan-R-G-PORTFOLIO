import Image from "next/image";
import { Briefcase, GraduationCap, Calendar, CheckCircle2, Sliders, Activity, Play, ClipboardList } from "lucide-react";
import { experience } from "@/config/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";

const pipelineSteps = [
  { label: "Planning", icon: ClipboardList, active: true },
  { label: "Execution", icon: Play, active: true },
  { label: "Monitoring", icon: Activity, active: true },
  { label: "Controlling", icon: Sliders, active: true },
  { label: "Closing", icon: CheckCircle2, active: true },
];

export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="section-line section-pad relative scroll-mt-24 overflow-hidden"
    >
      <div className="container-x flex flex-col gap-12">
        <Reveal>
          <SectionHeading eyebrow="Experience" title="My Professional Journey" />
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-12">
          {/* Left Column: Experience Timeline Cards */}
          <div className="flex flex-col gap-8 lg:col-span-6">
            <ol className="relative ml-6 flex flex-col gap-8 border-l border-primary/25 pl-7 sm:ml-10 sm:pl-10 lg:ml-8 lg:pl-10">
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
                          <Badge variant="primary" className="gap-1.5">
                            <Calendar className="size-3" />
                            {entry.period}
                          </Badge>
                        </div>

                        <ul className="flex flex-col gap-2">
                          {entry.points.map((point) => (
                            <li key={point} className="flex items-start gap-2.5 text-caption text-muted">
                              <span
                                aria-hidden
                                className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary"
                              />
                              {point}
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 pt-1">
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

          {/* Right Column: Connected 5-Step Pipeline + Standing Portrait Visual */}
          <div className="flex flex-col gap-8 lg:col-span-6">
            {/* Connected 5-Step Process Pipeline */}
            <Reveal delay={0.15}>
              <GlassCard className="flex flex-col gap-6 p-6 sm:p-7 border-primary/20">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted">
                  End-to-End Delivery Lifecycle
                </h4>

                <div className="relative flex items-center justify-between py-2">
                  {/* Connecting Line behind */}
                  <div className="absolute inset-x-6 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-primary via-cyan-400 to-success" />

                  {/* 5 Step Nodes */}
                  {pipelineSteps.map((step) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.label} className="relative z-10 flex flex-col items-center gap-2 group">
                        <div className="flex size-10 sm:size-12 items-center justify-center rounded-full border-2 border-cyan-400 bg-surface/95 text-cyan-400 shadow-lg shadow-cyan-400/20 backdrop-blur-md transition-transform group-hover:scale-110">
                          <Icon className="size-4 sm:size-5" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-semibold text-text group-hover:text-primary transition-colors">
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </Reveal>

            {/* Standing Portrait Visual Overlay */}
            <Reveal delay={0.2} className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-primary/25 bg-surface/60 shadow-2xl backdrop-blur-md">
              <Image
                src="/images/portrait-holo.jpg"
                alt="Gokula Krishnan — Experience Delivery Visual"
                fill
                sizes="(max-width: 1024px) 90vw, 500px"
                className="object-cover object-top mask-fade-b filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-primary/10" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
