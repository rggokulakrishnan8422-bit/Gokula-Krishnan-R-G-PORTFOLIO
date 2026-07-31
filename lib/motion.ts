/**
 * Motion timing tokens (Master Prompt Section 4) in seconds,
 * plus shared easing curves used by GSAP and Framer Motion.
 */
export const DURATION = {
  micro: 0.15, // hover, focus
  small: 0.25, // dropdown, tooltip
  component: 0.4, // card, modal
  section: 0.6, // section transitions
  hero: 0.8, // hero entrance choreography
} as const;

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

/** GSAP equivalents. */
export const GSAP_EASE_OUT = "power3.out";
export const GSAP_EASE_IN_OUT = "power2.inOut";
