"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { ArrowRight, ChevronDown, Mail, Phone } from "lucide-react";
import { EASE_OUT, SPRING } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { site } from "@/config/site";
import { heroLead, heroTagline } from "@/config/content";
import { Magnetic } from "@/components/ui/magnetic";
import { ResumeButton } from "@/components/ui/resume-button";
import { Typing } from "@/components/ui/typing";
import { Signature } from "@/components/ui/signature";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";

const socials = [
  { label: `Connect with ${site.name} on LinkedIn`, href: site.linkedin, icon: LinkedInIcon, external: true },
  { label: `${site.name} on GitHub`, href: site.github, icon: GitHubIcon, external: true },
  { label: `Email ${site.name}`, href: site.emailHref, icon: Mail, external: false },
  { label: `Call ${site.name}`, href: site.phoneHref, icon: Phone, external: false },
];

const taglineWords = [heroTagline];

/** Cinematic entrance — staggered editorial reveal down the left column. */
const column: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

export function Hero() {
  const reduced = useReducedMotion();
  const fine = useMediaQuery("(pointer: fine)");
  const interactive = !reduced && fine;

  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll parallax — portrait drifts up slower than the page */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitDrift = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const glowDrift = useTransform(scrollYProgress, [0, 1], [0, 120]);

  /* Pointer-tracked 3D — Apple-product restraint (±3° / ±4°) */
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, SPRING.pointer);
  const sy = useSpring(py, SPRING.pointer);
  const rotateX = useTransform(sy, [0, 1], [3, -3]);
  const rotateY = useTransform(sx, [0, 1], [-4, 4]);
  const lightX = useTransform(sx, [0, 1], ["38%", "62%"]);
  const lightY = useTransform(sy, [0, 1], ["34%", "58%"]);
  const ringTilt = useTransform(sx, [0, 1], [-6, 6]);
  /* Pointer-following key light across the portrait */
  const sheen = useTransform(
    [lightX, lightY],
    ([x, y]) =>
      `radial-gradient(60% 52% at ${x} ${y}, rgb(var(--gold-200) / 0.13), transparent 68%)`,
  );

  const onStageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const onStageLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Intro"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 md:pt-32"
    >
      {/* Hero-specific warm key light behind the portrait */}
      <motion.div
        aria-hidden
        style={reduced ? undefined : { y: glowDrift }}
        className="absolute right-[2%] top-1/2 h-[540px] w-[540px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--color-primary)/0.16),transparent_70%)] blur-2xl"
      />

      <div className="container-x relative z-10 grid items-center gap-14 lg:grid-cols-12 lg:gap-6">
        {/* ================= Left Column — editorial text ================= */}
        <motion.div
          className="flex flex-col gap-6 lg:col-span-6"
          variants={column}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={item} className="overline-caps flex items-center gap-3">
            <span aria-hidden className="h-px w-10 bg-gold-500/70" />
            Project Manager
          </motion.p>

          <motion.div variants={item} className="flex flex-col">
            <p className="text-lg font-medium text-muted">Hello, I&apos;m</p>
            <h1 className="mt-2 font-display text-hero font-medium">
              <span className="block text-text">Gokula</span>
              <span className="text-gradient block">Krishnan&nbsp;R&nbsp;G</span>
            </h1>
            <p className="mt-3 font-display text-xl font-semibold tracking-[0.06em] text-gold-300 sm:text-2xl">
              <Typing words={taglineWords} loop={false} />
            </p>
          </motion.div>

          <motion.p
            variants={item}
            className="max-w-xl text-[15px] leading-relaxed text-muted sm:text-base"
          >
            {heroLead}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4 pt-1">
            <Magnetic>
              <a
                href="#projects"
                className="group relative inline-flex h-[52px] select-none items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-gold-300 via-primary to-gold-600 px-8 text-[15px] font-medium tracking-[0.01em] text-[rgb(var(--color-background))] shadow-[0_10px_30px_-10px_rgb(var(--color-primary)/0.55),inset_0_1px_0_rgb(255_255_255/0.35)] transition-all duration-small hover:-translate-y-0.5 hover:shadow-[0_16px_38px_-10px_rgb(var(--color-primary)/0.6),inset_0_1px_0_rgb(255_255_255/0.4)] active:scale-[0.97]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                />
                View My Work
                <ArrowRight
                  className="size-4 transition-transform duration-small group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </Magnetic>
            <Magnetic>
              <ResumeButton variant="secondary" size="lg" />
            </Magnetic>
          </motion.div>

          {/* Socials + scroll cue */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-3">
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    {...(social.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    aria-label={social.label}
                    className="neu-control inline-flex size-10 items-center justify-center rounded-full text-muted transition-all duration-small hover:-translate-y-0.5 hover:text-gold-300"
                  >
                    <Icon className="size-[17px]" aria-hidden />
                  </a>
                );
              })}
            </div>
            <span aria-hidden className="hidden h-4 w-px bg-border/50 sm:block" />
            <a
              href="#about"
              className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-muted transition-colors duration-small hover:text-gold-300"
            >
              Scroll Down
              <ChevronDown
                className="size-3.5 animate-bounce text-gold-500/80 [animation-duration:1.8s]"
                aria-hidden
              />
            </a>
          </motion.div>
        </motion.div>

        {/* ============ Right Column — interactive portrait stage ============ */}
        <div className="lg:col-span-6" style={{ perspective: 1200 }}>
          <motion.div
            initial={reduced ? undefined : { opacity: 0, scale: 0.96, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT, delay: 0.35 }}
            className="relative mx-auto w-full max-w-[500px]"
            onMouseMove={onStageMove}
            onMouseLeave={onStageLeave}
          >
            <motion.div
              className="relative"
              style={
                interactive
                  ? { rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }
                  : undefined
              }
            >
              {/* Slow scroll parallax layer */}
              <motion.div
                style={reduced ? undefined : { y: portraitDrift }}
                className={!interactive && !reduced ? "animate-float [animation-duration:9s]" : undefined}
              >
                {/* Gold orbit ring — draws itself in, reacts faintly to pointer */}
                <motion.div
                  aria-hidden
                  className="absolute inset-[-4%] z-0"
                  style={interactive ? { rotate: ringTilt } : undefined}
                >
                  <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
                    <defs>
                      <linearGradient id="orbitGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(var(--gold-300))" stopOpacity="0.9" />
                        <stop offset="55%" stopColor="rgb(var(--color-primary))" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="rgb(var(--color-secondary))" stopOpacity="0.25" />
                      </linearGradient>
                    </defs>
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="47"
                      fill="none"
                      stroke="url(#orbitGold)"
                      strokeWidth="0.45"
                      initial={reduced ? undefined : { pathLength: 0 }}
                      animate={reduced ? undefined : { pathLength: 1 }}
                      transition={{ duration: 1.8, ease: EASE_OUT, delay: 0.9 }}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="52"
                      fill="none"
                      stroke="rgb(var(--color-primary))"
                      strokeOpacity="0.14"
                      strokeWidth="0.3"
                      strokeDasharray="1.5 3"
                    />
                  </svg>
                  {/* Traveling jewel on the ring */}
                  {!reduced && (
                    <div className="absolute inset-[6.5%] animate-spin-slow">
                      <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-gold-300 shadow-[0_0_12px_2px_rgb(var(--color-primary)/0.65)]" />
                    </div>
                  )}
                </motion.div>

                {/* Portrait — pointer-tracked key light + frameless blend */}
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/images/portrait-hero.jpg"
                    alt={`Portrait of ${site.name}`}
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 88vw, 500px"
                    className="mask-blend-radial-wide relative z-10 object-cover object-top"
                  />
                  {/* Moving light sheen follows the cursor */}
                  <motion.div
                    aria-hidden
                    className="mask-blend-radial-wide absolute inset-0 z-10"
                    style={{ background: sheen }}
                  />
                  {/* Floor glow pedestal */}
                  <div
                    aria-hidden
                    className="absolute inset-x-10 -bottom-2 z-0 h-14 rounded-[100%] bg-[radial-gradient(closest-side,rgb(var(--color-primary)/0.3),transparent_75%)] blur-xl"
                  />
                </div>

                {/* Personal signature — handwritten champagne reveal */}
                <Signature
                  text="Gokula Krishnan RG"
                  className="absolute -bottom-10 right-1 z-20 text-[clamp(26px,3.6vw,40px)] leading-[1.5] sm:right-3"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
