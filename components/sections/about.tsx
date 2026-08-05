import Image from "next/image";
import { CheckCircle2, Quote, FolderKanban, Users, CheckSquare, MessageSquare } from "lucide-react";
import { site } from "@/config/site";
import { aboutParagraph, aboutQuote } from "@/config/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Counter } from "@/components/ui/counter";
import { Tilt } from "@/components/ui/tilt";

const aboutStats = [
  { value: 8, suffix: "+", label: "Projects Handled", icon: FolderKanban },
  { value: 25, suffix: "+", label: "Team Collaborations", icon: Users },
  { value: 120, suffix: "+", label: "Tasks Completed", icon: CheckSquare },
  { value: 60, suffix: "+", label: "Client Meetings", icon: MessageSquare },
];

const checklistItems = [
  "Agile Mindset",
  "Detail-Oriented",
  "Team Player",
  "Problem Solver",
];

export function About() {
  return (
    <section id="about" aria-label="About" className="section-line section-pad scroll-mt-24">
      <div className="container-x flex flex-col gap-12">
        {/* Heading */}
        <Reveal>
          <SectionHeading
            eyebrow="About Me"
            title={
              <>
                <span>Turning Plans Into </span>
                <span className="bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent">
                  Successful Outcomes.
                </span>
              </>
            }
          />
        </Reveal>

        <div className="grid items-start gap-8 lg:grid-cols-12">
          {/* Left Column: Dual Portrait Cutout Overlay */}
          <Reveal className="lg:col-span-4" delay={0.1}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px]">
              {/* Background Aura Glow */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[110px]"
              />

              {/* Shadow Overlay Image behind */}
              <div className="absolute inset-0 translate-x-4 -translate-y-3 opacity-40 blur-[1px]">
                <Image
                  src="/images/portrait-glass.jpg"
                  alt=""
                  fill
                  sizes="340px"
                  className="rounded-2xl object-cover object-top filter grayscale contrast-125"
                />
              </div>

              {/* Main Front Glass Portrait */}
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-primary/30 bg-surface/60 p-2 shadow-2xl backdrop-blur-md">
                <Image
                  src="/images/portrait-glass.jpg"
                  alt={`${site.name} — About portrait`}
                  fill
                  priority
                  sizes="340px"
                  className="rounded-xl object-cover object-top mask-fade-b"
                />

                {/* Gokula Signature Overlay */}
                <div
                  aria-hidden
                  className="absolute bottom-4 left-4 font-display text-lg font-bold italic tracking-wider text-primary drop-shadow-[0_0_10px_rgba(82,126,255,0.8)]"
                >
                  Gokula
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Bio + 4 Stat Cards + Checklist & Quote */}
          <div className="flex flex-col gap-6 lg:col-span-8">
            {/* Bio Paragraph */}
            <Reveal delay={0.15}>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                {aboutParagraph}
              </p>
            </Reveal>

            {/* 4 Stat Cards Row */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {aboutStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <Reveal key={stat.label} delay={Math.min(i * 0.06, 0.25)} y={20}>
                    <Tilt className="h-full">
                      <GlassCard hover className="flex h-full flex-col justify-between p-4 text-center">
                        <span className="mx-auto flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary mb-2">
                          <Icon className="size-4.5" aria-hidden />
                        </span>
                        <p className="font-display text-2xl font-bold text-text">
                          <Counter to={stat.value} suffix={stat.suffix} pad={2} />
                        </p>
                        <p className="text-[11px] font-medium text-muted mt-1">{stat.label}</p>
                      </GlassCard>
                    </Tilt>
                  </Reveal>
                );
              })}
            </div>

            {/* Checklist Items + Quote Block */}
            <div className="grid gap-6 sm:grid-cols-12 pt-2">
              {/* Checklist Badges */}
              <Reveal className="sm:col-span-5 flex flex-col justify-center gap-3">
                {checklistItems.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs font-semibold text-text">
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <CheckCircle2 className="size-3.5" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </Reveal>

              {/* Quote Card */}
              <Reveal className="sm:col-span-7" delay={0.2}>
                <GlassCard hover className="flex h-full gap-3.5 p-5 border-l-4 border-l-primary">
                  <Quote className="size-6 shrink-0 text-primary opacity-80" aria-hidden />
                  <p className="text-xs sm:text-sm font-medium leading-relaxed text-muted italic">
                    {aboutQuote}
                  </p>
                </GlassCard>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
