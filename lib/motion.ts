/**
 * Motion system — Luxury editorial motion language (motion / framer-motion).
 * One animation framework across the site; every family below is a motion
 * "identity" consumed by components. Honors MotionConfig reducedMotion="user"
 * (LenisProvider) plus the global CSS reduced-motion guard.
 *
 * Timing tokens are in seconds.
 */
import type { Transition, Variants } from "motion/react";

export const DURATION = {
  micro: 0.15, // hover, focus
  small: 0.25, // dropdown, tooltip
  component: 0.4, // card, modal
  section: 0.6, // section transitions
  hero: 0.8, // hero entrance choreography
} as const;

/** Smooth expo-out for reveals */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

/* ------------------------------------------------------------------ */
/* Spring presets — Apple-like physicality, restrained                 */
/* ------------------------------------------------------------------ */
export const SPRING = {
  /** snappy UI response — buttons, toggles */
  snappy: { type: "spring", stiffness: 380, damping: 34, mass: 0.6 },
  /** gentle settle — cards, menus */
  gentle: { type: "spring", stiffness: 170, damping: 26, mass: 0.9 },
  /** soft cinematic — modals, hero pieces */
  soft: { type: "spring", stiffness: 110, damping: 22, mass: 1 },
  /** pointer-follow (tilt/magnetic) — critically damped feel */
  pointer: { type: "spring", stiffness: 220, damping: 24, mass: 0.5 },
} satisfies Record<string, Transition>;

/* ------------------------------------------------------------------ */
/* Reusable variants                                                   */
/* ------------------------------------------------------------------ */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.section, ease: EASE_OUT, delay },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: DURATION.section, ease: EASE_OUT, delay },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { ...SPRING.soft, delay },
  }),
};

/** Parent — staggers children that use fadeUp/fadeIn/… */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

/** Masked line reveal for headings (wrap each line's text in an overflow-hidden box) */
export const textReveal: Variants = {
  hidden: { y: "110%" },
  visible: (delay: number = 0) => ({
    y: "0%",
    transition: { duration: DURATION.hero, ease: EASE_OUT, delay },
  }),
};

/** Modal — scale + opacity + blur feel */
export const modalPanel: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: SPRING.soft,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 12,
    transition: { duration: DURATION.small, ease: EASE_IN_OUT },
  },
};

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.small } },
  exit: { opacity: 0, transition: { duration: DURATION.small } },
};

/** Signature — handwriting sweep (clip-path left → right) */
export const signatureReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0.4 },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: 1.6, ease: EASE_IN_OUT, delay: 1.05 },
  },
};

/** Directional testimonial slide */
export const testimonialSlide: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 44 }),
  center: { opacity: 1, x: 0, transition: SPRING.gentle },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -44,
    transition: { duration: DURATION.small, ease: EASE_IN_OUT },
  }),
};

/** Shared viewport config — reveal once, slightly early */
export const VIEWPORT = { once: true, margin: "-12% 0px -12% 0px" } as const;
