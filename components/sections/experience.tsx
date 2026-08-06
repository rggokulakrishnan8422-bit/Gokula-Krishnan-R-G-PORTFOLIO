import Image from "next/image";
import { Briefcase, GraduationCap, Calendar, CheckCircle2, Sliders, Activity, Play, ClipboardList } from "lucide-react";
import { site } from "@/config/site";
import { experience } from "@/config/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
          <SectionHeading eyebrow="EXPERIENCE" title="My Professional Journey" />
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

          {/* Right Column: Delivery Lifecycle arc + frameless portrait */}
          <div className="flex flex-col gap-10 lg:col-span-6">
            {/* 5-phase delivery lifecycle (mockup arc) */}
            <Reveal delay={0.15}>
              <div
                role="img"
                aria-label="Delivery lifecycle: Planning, Execution, Monitoring, Controlling, Closing"
                className="relative flex items-start justify-between px-1 pt-1"
              >
                {/* Connector line */}
                <div
                  aria-hidden
                  className="absolute inset-x-8 top-[26px] h-0.5 bg-gradient-to-r from-primary/70 via-cyan-400/70 to-primary/50"
                />
                {pipelineSteps.map((step, i) => {
                  const Icon = step.icon;
                  const isFinal = i === pipelineSteps.length - 1;
                  return (
                    <div key={step.label} className="group relative z-10 flex flex-col items-center gap-3">
                      <span className="text-[10px] font-medium text-muted transition-colors duration-small group-hover:text-text sm:text-xs">
                        {step.label}
                      </span>
                      <span
                        className={cn(
                          "flex size-11 items-center justify-center rounded-full border-2 backdrop-blur-md transition-transform duration-small group-hover:scale-110 sm:size-12",
                          isFinal
                            ? "border-transparent bg-gradient-to-br from-primary to-cyan-400 text-white shadow-lg shadow-[rgb(var(--ring)/0.45)]"
                            : "border-cyan-400/70 bg-[rgb(var(--color-surface)/0.95)] text-cyan-400 shadow-lg shadow-cyan-400/15",
                        )}
                      >
                        <Icon className="size-4 sm:size-5" aria-hidden />
                      </span>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* Frameless portrait — melts into the section ambience */}
            <Reveal delay={0.2} className="relative aspect-[16/9] w-full">
              <div
                aria-hidden
                className="absolute right-4 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-primary/20 blur-[110px]"
              />
              <Image
                src="/images/portrait-blue.jpg"
                alt={`${site.name} — delivery lifecycle visual`}
                fill
                sizes="(max-width: 1024px) 90vw, 560px"
                className="mask-blend-radial-wide object-cover object-top contrast-110"
              />
              {/* Floating delivery chips (mockup ambience) */}
              <span className="absolute left-6 top-8 hidden size-11 animate-float items-center justify-center rounded-xl border border-primary/30 bg-[rgb(var(--color-surface)/0.85)] shadow-xl backdrop-blur-md md:flex">
                <ClipboardList className="size-5 text-cyan-400" aria-hidden />
              </span>
              <span
                className="absolute right-10 top-14 hidden size-11 animate-float items-center justify-center rounded-xl border border-primary/30 bg-[rgb(var(--color-surface)/0.85)] shadow-xl backdrop-blur-md md:flex"
                style={{ animationDelay: "1.2s" }}
              >
                <Activity className="size-5 text-purple-400" aria-hidden />
              </span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
