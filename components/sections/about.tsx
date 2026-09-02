"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { aboutParagraph, aboutQuote, aboutStats, heroSummary } from "@/config/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { SPRING } from "@/lib/motion";

/**
 * 01 — ABOUT ME (reference): editorial heading + bio left, animated stat
 * panel center, serif pull-quote right. Stats come from config/content.ts.
 */
export function About() {
  return (
    <section id="about" aria-label="About" className="section-line section-pad scroll-mt-20">
      <div className="container-x grid items-start gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Heading + bio */}
        <div className="flex flex-col gap-6 lg:col-span-4">
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="About Me"
              title={
                <>
                  Turning Ideas <br />
                  Into <span className="text-gradient">Real Impact</span>
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-4">
              <p className="text-[15px] leading-relaxed text-muted">{aboutParagraph}</p>
              <p className="text-[15px] leading-relaxed text-muted/85">{heroSummary}</p>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <a
              href="#experience"
              className="group mt-1 inline-flex h-11 w-fit select-none items-center gap-2 rounded-full border border-gold-500/40 bg-transparent px-6 text-sm font-medium text-gold-300 transition-all duration-small hover:-translate-y-0.5 hover:border-gold-400/70 hover:bg-gold-500/10 active:scale-[0.97]"
            >
              More About Me
              <ArrowRight
                className="size-4 transition-transform duration-small group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          </Reveal>
        </div>

        {/* Stat panel — glass grid, counters animate on view */}
        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-4">
            {aboutStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Reveal key={stat.label} delay={Math.min(0.08 + i * 0.06, 0.3)} y={18}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={SPRING.gentle}
                    className="glass-card group flex h-full flex-col items-center gap-1.5 p-5 text-center"
                  >
                    <span className="neu-control mb-1 flex size-10 items-center justify-center rounded-full text-gold-400 transition-colors duration-small group-hover:text-gold-300">
                      <Icon className="size-[18px]" aria-hidden />
                    </span>
                    <p className="font-display text-3xl font-semibold text-text">
                      <Counter to={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-[12px] font-medium leading-tight text-muted">
                      {stat.label}
                    </p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Serif pull-quote */}
        <div className="lg:col-span-3">
          <Reveal delay={0.2} className="h-full">
            <motion.figure
              whileHover={{ y: -4 }}
              transition={SPRING.gentle}
              className="glass-card relative flex h-full flex-col justify-between gap-6 p-6"
            >
              <span
                aria-hidden
                className="font-serif text-6xl leading-[0.6] text-gold-500/80"
              >
                &ldquo;
              </span>
              <blockquote className="font-serif text-[17px] font-light leading-relaxed text-text/90">
                {aboutQuote}
              </blockquote>
              <span
                aria-hidden
                className="h-px w-12 bg-gradient-to-r from-gold-500 to-transparent"
              />
            </motion.figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
