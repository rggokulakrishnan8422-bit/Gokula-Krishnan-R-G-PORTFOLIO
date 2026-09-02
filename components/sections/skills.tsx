"use client";

import { motion } from "motion/react";
import { professionalSkills, skillCategories } from "@/config/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { EASE_OUT, SPRING, VIEWPORT } from "@/lib/motion";

/** First six professional skills become the reference bar column (real data). */
const barSkills = professionalSkills.slice(0, 6);

/** Each category card gets its own subtle hover identity — not one shared animation. */
const cardHovers = [
  { y: -6, rotate: -0.4 },
  { y: -5, scale: 1.015 },
  { y: -7, rotate: 0.4 },
  { y: -5, scale: 1.01 },
];

export function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="section-line section-pad scroll-mt-20">
      <div className="container-x flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="My Skills & Expertise"
            title={
              <>
                Skills That <span className="text-gradient">Deliver Results</span>
              </>
            }
          />
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left — proficiency bars draw on scroll */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            {barSkills.map((skill, i) => (
              <Reveal key={skill.label} delay={Math.min(i * 0.05, 0.25)} y={14}>
                <div className="group flex flex-col gap-2">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium text-text/90 transition-colors duration-micro group-hover:text-text">
                      {skill.label}
                    </span>
                    <span className="font-display text-sm font-semibold text-gold-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div
                    role="img"
                    aria-label={`${skill.label}: ${skill.level} out of 100`}
                    className="relative h-[5px] w-full overflow-hidden rounded-full bg-glass/[0.06] shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]"
                  >
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={VIEWPORT}
                      transition={{
                        duration: 1.1,
                        ease: EASE_OUT,
                        delay: 0.15 + Math.min(i * 0.08, 0.4),
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-300 shadow-[0_0_12px_rgb(var(--color-primary)/0.4)]"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Right — 2×2 category cards, each with a distinct hover identity */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {skillCategories.map((category, i) => {
              const Icon = category.icon;
              return (
                <Reveal key={category.title} delay={Math.min(0.08 + i * 0.06, 0.3)} y={20}>
                  <motion.div
                    whileHover={cardHovers[i % cardHovers.length]}
                    transition={SPRING.gentle}
                    className="glass-card group flex h-full flex-col gap-4 p-6"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="neu-control flex size-11 shrink-0 items-center justify-center rounded-xl text-gold-400 transition-all duration-small group-hover:text-gold-300">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <h3 className="font-display text-[15px] font-semibold leading-snug text-text">
                        {category.title}
                      </h3>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {category.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-center gap-2.5 text-[13px] text-muted transition-colors duration-micro hover:text-text/90"
                        >
                          <span
                            aria-hidden
                            className="size-1 shrink-0 rounded-full bg-gold-500/80"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
