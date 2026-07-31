# Gokula Krishnan R G — Portfolio

Awwwards-grade personal portfolio for **Gokula Krishnan R G, Junior Project Manager** —
enterprise-SaaS polish (Apple / Stripe / Linear / Vercel sensibility) applied to a personal site.
Built to the `Master_Prompt_Portfolio_Arena_AI.md` specification.

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS · GSAP + ScrollTrigger · Framer Motion ·
Lenis (smooth scroll) · React Three Fiber + Drei (Three.js hero) · Lucide icons

## Quick start

```bash
npm install        # restore dependencies (node_modules is not kept in workspace snapshots)
npm run dev        # develop at http://localhost:3000
npm run build      # production build (verified green)
npm run start      # serve the production build
```

## Editing the site — read this first

| What | Where | Notes |
|---|---|---|
| Name, role, email, phone, LinkedIn, resume path, domain | `config/site.ts` | **Single source of truth.** Nothing is hardcoded elsewhere. |
| Nav, skills, tools, experience, projects, typing words | `config/content.ts` | Sections render from these arrays — edit freely. |
| Resume PDF | `public/resume.pdf` | Currently a **placeholder** — drop the real PDF over it. Every download link updates automatically, no rebuild of links needed. |
| Design tokens (colors, radius, shadow, timing) | `styles/globals.css` + `tailwind.config.ts` | Dark & light themes share one token set. |
| Portrait treatments & OG banner | `public/images/` | AI-generated from the uploaded photo, cool-blue enterprise look. |
| Production domain | `config/site.ts → url` | Feeds canonical, sitemap, robots, OG and JSON-LD. |

> **Personalization note:** the Experience org names, project case studies and summary
> copy are realistic, editable placeholders (the master prompt didn't include them) —
> replace with real history in `config/content.ts`.

## What was built (phase summary)

- **Phase 0 — Plan:** mockup-aligned page order `Hero → Treatments → About → Skills → Tools → Projects → Experience → Contact → Footer`;
  token system (8px spacing · Sora+Inter · 80/56/28/18/14 type scale · 4 radii · 4 shadows ·
  150/250/400/600/800 ms motion · 12/8/4-col grid @1280 px max); component & folder map per Section 17.
- **Phase 1 — Foundation:** Next.js 15 scaffold, token-driven Tailwind setup, dual-theme system
  (class-based, no-FOUC inline script, persisted + system-aware), `config/site.ts`, layout shell,
  Lenis + Framer `MotionConfig`, toast system, nav/footer.
- **Phase 2 — Sections:** all 7 sections + footer built from the component library (Section 9):
  buttons, badges, glass & project & skill & contact cards, experience timeline, inputs/textarea,
  toast/loading/empty/error states, cursor, magnetic wrapper, counter, typing effect, reveal,
  background layer, resume button, scroll indicator, back-to-top, theme toggle.
  Portrait treatments used: hero, glass, blue monochrome, holographic, silhouette, dashboard overlay.
- **Phase 3 — Motion & 3D:** GSAP ScrollTrigger reveals (600 ms, once), Lenis smooth scroll with
  anchor upgrading, 800 ms hero entrance choreography, magnetic CTAs, animated counters, typing
  loop, custom cursor, scroll progress bar, parallax enterprise-fragment background.
  Three.js hero: 2-layer additive particles + floating wireframe "kanban" panels + damped pointer
  parallax camera; **dynamically imported (`ssr: false`)**, unlit materials, geometry disposed on
  unmount, particles cut 2000→420 and DPR capped on mobile, static gradient fallback for
  no-WebGL / reduced-motion / pre-hydration.
- **Phase 4 — Polish & QA:** see below.

## QA results (Master Prompt Sections 18–19)

| Check | Result |
|---|---|
| Production build (`next build`) | ✅ compiled, type-checked, 8/8 static routes |
| Routes verified over HTTP | ✅ `/`, robots.txt, sitemap.xml, manifest, icon, resume.pdf, images → 200; unknown → 404 |
| First Load JS | 211 kB (Three.js excluded — separate lazy chunk) |
| SEO | ✅ title/template, full OpenGraph + Twitter card, canonical, robots, sitemap, JSON-LD Person |
| Redesign | ✅ matches approved mockup (globe hero + widgets, treatments strip, stat about, skill bars + orbit + config panel, tool pills, image projects, phase-arc experience, tri-column contact) |
| Config single-sourcing | ✅ email/phone/LinkedIn/resume render only from `config/site.ts` (DOM greps verified) |
| Reduced motion | ✅ global CSS guard + `useReducedMotion` static fallbacks + `MotionConfig reducedMotion="user"`; Lenis/cursor/3D never mount |
| Accessibility | ✅ skip link, landmarks, aria labels, labelled form fields, `aria-invalid` errors, focus-visible ring, AA-contrast token pairs, keyboard-operable menu (Esc + focus return) |
| Responsive | ✅ `overflow-x: clip`, fluid type clamps, mobile-capped effects, 100svh hero |
| Cross-browser / Lighthouse | ⚠️ Needs a real browser + deployed URL — run Lighthouse after deploy; engineering budget (lazy 3D, next/image AVIF/WebP, font swap, static render) targets 95+ |

> Lighthouse can't run in this build sandbox, so 95+ is engineered, not yet *verified* —
> the remaining honest item on the Section 18 list.

## Structure

```
app/                 layout, page, robots, sitemap, manifest, icon, 404
components/ui/       design-system primitives (states + a11y built in)
components/layout/   navbar, footer, theme toggle, scroll indicator, back-to-top, background
components/sections/ hero, about, skills, tools, experience, projects, contact
components/three/    client-only hero scene (fallback included)
components/motion/   Lenis provider + MotionConfig
config/              site.ts (identity) · content.ts (section data)
hooks/  lib/  styles/  types/  public/images/  public/resume.pdf
```
