# Gokula Krishnan R G — Portfolio

A **luxury dark editorial** personal portfolio for **Gokula Krishnan R G, Junior Project Manager** —
champagne-gold on warm near-black, glassmorphism, subtle neumorphic controls, and a
cinematic Motion-driven interaction system. Redesigned against the Sep 2026 visual
reference while preserving all real content and working features.

## Stack

Next.js 15 · React 19 · TypeScript · **Tailwind CSS v4.3** · **Motion (`motion/react`)** ·
Lenis (smooth scroll) · Lucide icons · self-hosted fonts (Sora / Inter / Fraunces / Dancing Script)

## Quick start

```bash
npm install        # restore dependencies (node_modules is not kept in workspace snapshots)
npm run dev        # develop at http://localhost:3000
npm run build      # production build (verified green)
npm run start      # serve the production build
```

## Design system

| Token | Value |
|---|---|
| `--color-background` | `#060608` — deep warm black |
| `--color-surface(-2)` | `#0B0B0E` / `#101014` |
| `--color-text` | `#F2EDE3` — warm white |
| `--color-primary` | `#C9A96A` — champagne gold |
| `--color-secondary` | `#8F6F3F` — antique bronze |
| `--gold-100 → 800` | full champagne ramp |

Legacy accent classes (cyan/purple/indigo) are aliased to gold tints in `globals.css`.

- **Type:** Sora (display) · Inter (body) · Fraunces (quotes, sparingly) · Dancing Script (signature)
- **Surfaces:** `.glass-card` (translucent glass + hairline gold border), `.neu-control` (small controls only)
- **Motion:** one framework (Motion). Spring presets and variants live in `lib/motion.ts` —
  hero entrance, masked reveals, 3D tilt (`ui/tilt.tsx`), magnetic buttons, counters,
  timeline draw, directional testimonial slide, shared-layout project expansion.

## Editing the site — read this first

| What | Where | Notes |
|---|---|---|
| Name, role, contact, resume paths, domain | `config/site.ts` | **Single source of truth.** |
| Nav, skills, skill categories, experience, projects, stats, quote, testimonial | `config/content.ts` | Sections render from these arrays. |
| Signature text | `components/ui/signature.tsx` usages + hero/footer props | Gold handwriting reveal. |
| Design tokens | `styles/globals.css` + `tailwind.config.ts` | One token set, one theme. |
| Portrait & project images | `public/images/` | `portrait-hero.jpg` is the hero portrait. |
| Resume PDFs | `public/resumes/` + `config/site.ts` | Download/preview modal is data-driven. |

> **Testimonial note:** the single testimonial in `config/content.ts` was seeded from the
> owner's Sep 2026 design mockup — replace with verified references when available.
> Carousel controls appear automatically once more than one testimonial exists.

## Production details

- **Modals:** shared-layout project expansion + resume modal — Escape/backdrop/close,
  focus trap + return, body scroll locked (scroll position preserved, gutter-compensated).
- **Scroll:** Lenis smooth scroll (disabled for reduced motion), `data-lenis-prevent`
  on internal modal scroll regions so only modal content scrolls.
- **Performance:** no WebGL/Three.js, no GSAP — GPU-friendly transform/opacity motion only;
  code-split fonts; static prerender of all routes.
- **Accessibility:** semantic landmarks, keyboard-complete modals, visible gold focus ring,
  `prefers-reduced-motion` honor system-wide (Motion `reducedMotion="user"` + CSS guard).
