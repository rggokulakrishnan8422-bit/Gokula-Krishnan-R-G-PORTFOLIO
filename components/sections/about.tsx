import Image from "next/image";
import { CheckCircle2, Quote, FolderKanban, Users, CheckSquare, MessageSquare } from "lucide-react";
import { site } from "@/config/site";
import { aboutParagraph, aboutQuote } from "@/config/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Counter } from "@/components/ui/counter";
import { Tilt } from "@/components/ui/tilt";

/** Stat cards — Aug 5 mockup copy */
const aboutStats = [
  { value: 8, suffix: "+", label: "Projects Handled", icon: FolderKanban },
  { value: 25, suffix: "+", label: "Team Collaborated", icon: Users },
  { value: 120, suffix: "+", label: "Tasks Completed", icon: CheckSquare },
  { value: 60, suffix: "+", label: "Client Meetings", icon: MessageSquare },
];

/** Trait badges — mockup checkmarks */
const traitItems = ["Agile Mindset", "Detail-Oriented", "Team Player", "Problem Solver"];

export function About() {
  return (
    <section id="about" aria-label="About" className="section-line section-pad scroll-mt-24">
      <div className="container-x flex flex-col gap-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* ─── Zone 1: Frameless dual portrait ─── */}
          <Reveal className="lg:col-span-3" delay={0.05}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px]">
              {/* Glow */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]"
              />
              {/* Ghost echo behind-left (mockup double exposure) */}
              <div className="absolute inset-0 -translate-x-10 translate-y-3 scale-[1.02] opacity-30 blur-[2px]">
                <Image
                  src="/images/portrait-glass.jpg"
                  alt=""
                  fill
                  sizes="300px"
                  className="mask-blend-radial-wide object-cover object-top grayscale contrast-125"
                />
              </div>
              {/* Primary portrait — frameless blend */}
              <div className="relative h-full w-full">
                <Image
                  src="/images/portrait-glass.jpg"
                  alt={`${site.name} — About portrait`}
                  fill
                  priority
                  sizes="300px"
                  className="mask-blend-radial object-cover object-top"
                />
              </div>
            </div>
          </Reveal>

          {/* ─── Zone 2: Heading + bio + trait checks ─── */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="ABOUT ME"
                title={
                  <>
                    <span>Turning Plans Into </span>
                    <span className="bg-gradient-to-r from-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      Successful Outcomes.
                    </span>
                  </>
                }
              />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm leading-relaxed text-muted">{aboutParagraph}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="flex flex-col gap-3 pt-1">
                {traitItems.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-xs font-semibold text-text sm:text-sm">
                    <span className="flex size-5 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                      <CheckCircle2 className="size-3.5" aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ─── Zone 3: Stat cards grid + quote banner ─── */}
          <div className="flex flex-col gap-5 lg:col-span-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {aboutStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <Reveal key={stat.label} delay={Math.min(0.1 + i * 0.05, 0.3)} y={18}>
                    <Tilt className="h-full">
                      <GlassCard hover className="flex h-full flex-col items-center gap-1 border-primary/20 p-3 text-center">
                        <span className="mb-1 flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                          <Icon className="size-4" aria-hidden />
                        </span>
                        <p className="font-display text-xl font-bold text-text sm:text-2xl">
                          <Counter to={stat.value} suffix={stat.suffix} pad={2} />
                        </p>
                        <p className="text-[10px] font-medium leading-tight text-muted">{stat.label}</p>
                      </GlassCard>
                    </Tilt>
                  </Reveal>
                );
              })}
            </div>

            {/* Quote banner — photo backdrop like the mockup */}
            <Reveal delay={0.25}>
              <div className="relative overflow-hidden rounded-2xl border border-primary/25 shadow-2xl">
                <Image
                  src="/images/portrait-dashboard.jpg"
                  alt=""
                  width={640}
                  height={240}
                  sizes="(max-width: 1024px) 92vw, 480px"
                  className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--color-surface)/0.95)] via-[rgb(var(--color-surface)/0.75)] to-[rgb(var(--color-surface)/0.45)]"
                />
                <figure className="relative flex gap-3.5 p-5 sm:p-6">
                  <Quote className="size-7 shrink-0 text-primary/90" aria-hidden />
                  <blockquote className="text-sm font-medium italic leading-relaxed text-text sm:text-base">
                    {aboutQuote}
                  </blockquote>
                </figure>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
