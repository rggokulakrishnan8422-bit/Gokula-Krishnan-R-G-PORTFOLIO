import Image from "next/image";
import { Quote } from "lucide-react";
import { site } from "@/config/site";
import { aboutChips, aboutParagraph, aboutQuote, aboutStats } from "@/config/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Counter } from "@/components/ui/counter";
import { Tilt } from "@/components/ui/tilt";
import { Badge } from "@/components/ui/badge";

/** About — mockup layout: two-tone heading, chips, blended portrait, stat cards + quote. */
export function About() {
  return (
    <section id="about" aria-label="About" className="section-line section-pad scroll-mt-24">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-7 lg:col-span-5">
          <Reveal>
            <SectionHeading
              eyebrow="About Me"
              title={
                <>
                  <span className="block">Driving Projects.</span>
                  <span className="text-gradient block">Delivering Results.</span>
                </>
              }
            />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-body text-muted">{aboutParagraph}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-3">
              {aboutChips.map((chip) => {
                const Icon = chip.icon;
                return (
                  <Badge key={chip.label} className="gap-2 px-3.5 py-2">
                    <Icon className="size-4 text-primary" aria-hidden />
                    {chip.label}
                  </Badge>
                );
              })}
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-3" delay={0.1}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px]">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]"
            />
            <Image
              src="/images/portrait-glass.jpg"
              alt={`${site.name} — portrait through frosted glass`}
              fill
              sizes="(max-width: 1024px) 70vw, 300px"
              className="mask-fade-b object-cover object-top"
            />
          </div>
        </Reveal>

        <div className="flex flex-col gap-4 lg:col-span-4">
          <div className="grid grid-cols-2 gap-4">
            {aboutStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Reveal key={stat.label} delay={Math.min(i * 0.06, 0.25)} y={20}>
                  <Tilt className="h-full">
                    <GlassCard hover className="flex h-full flex-col gap-3 p-5">
                      <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <p className="font-display text-2xl font-bold">
                        <Counter to={stat.value} suffix={stat.suffix} pad={2} />
                      </p>
                      <p className="text-caption text-muted">{stat.label}</p>
                    </GlassCard>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2}>
            <GlassCard hover className="flex gap-3 p-5">
              <Quote className="size-5 shrink-0 text-primary" aria-hidden />
              <p className="text-body text-muted">{aboutQuote}</p>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
