# Master Prompt — Gokula Krishnan R G Portfolio
### Final v2 — Single-file specification for Arena AI Agent Mode

> This is the **only file** you need to paste into Arena AI Agent Mode.
> It is written to be executed **in phases, inside one session** — do not
> skip ahead, and do not write production code until Phase 0 is approved.

---

## 0. How To Use This Prompt

Work through the phases below **in order**, in the same conversation.
After each phase, produce a short summary of what you built/decided before
continuing — do not silently jump to the next phase.

| Phase | Name | Output |
|---|---|---|
| 0 | Plan | Architecture, design tokens, component list, folder structure — **no code** |
| 1 | Foundation | Next.js project scaffold, theme system, config, layout shell, nav |
| 2 | Sections | All content sections built with the design system from Phase 0 |
| 3 | Motion & 3D | GSAP/Framer/Lenis choreography + Three.js hero scene |
| 4 | Polish & QA | Run the QA checklist (Section 20), fix gaps, optimize |

If at any point a requirement in this document is ambiguous, make the most
premium, restrained choice — not the most decorative one.

---

## 1. Mission

You are acting as an Elite Creative Director, Staff Frontend Engineer,
Product Designer, Motion Designer, Three.js Engineer, Accessibility
Specialist, and SEO Engineer, working together.

Design an Awwwards-quality personal portfolio inspired by **Apple, Stripe,
Linear, Framer, OpenAI, Notion, Arc Browser, and Vercel** — enterprise SaaS
polish applied to a personal site, not a generic template.

Sequence: **design first → architecture second → development third →
optimization fourth.**

---

## 2. Personal / Content Data

Single source of truth — every reference to contact info elsewhere in the
codebase must read from this config, never be hardcoded twice.

- Name: **Gokula Krishnan R G**
- Role: **Junior Project Manager**
- Email: `r.g.gokulakrishnan8422@gmail.com` → `mailto:r.g.gokulakrishnan8422@gmail.com`
- Phone: `+91 95009 24842` → `tel:+919500924842`
- LinkedIn: `https://www.linkedin.com/in/gokula-krishnan-r-g-00a124286`
- Resume: `/public/resume.pdf` (swapping the PDF must update the site automatically — no rebuild of links needed)

---

## 3. Tech Stack

- Next.js 15, React 19, TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Framer Motion
- Lenis (smooth scroll)
- React Three Fiber + Drei
- Lucide Icons
- Target: **Lighthouse 95+** across Performance, Accessibility, Best Practices, SEO

---

## 4. Design Tokens

### Spacing scale (8px system, px)
```
4  8  12  16  20  24  32  40  48  64  80  96  120  160
```

### Typography scale
| Role | Size | Notes |
|---|---|---|
| Hero | 80px | Sora / General Sans, tightest tracking |
| Section Title | 56px | Sora / General Sans |
| Card Title | 28px | Sora / General Sans, medium weight |
| Body | 18px | Inter |
| Caption | 14px | Inter, muted color |

Font pairing: **Sora or General Sans** (display) + **Inter** (body/UI).

### Radius
```
radius-sm   radius-md   radius-lg   radius-xl
```
Apply consistently — no per-component one-off radii.

### Elevation / Shadow
```
shadow-sm   shadow-md   shadow-lg   shadow-xl
```

### Color tokens
```
color-primary   color-secondary   color-surface   color-glass
color-border    color-text        color-muted
color-success   color-warning     color-error
```
Both **dark and light themes** required, WCAG-AA contrast minimum.

### Motion timing
```
150ms  — micro interactions (hover, focus)
250ms  — small transitions (dropdown, tooltip)
400ms  — component transitions (card, modal)
600ms  — section/page transitions
800ms  — hero entrance choreography
```

### Grid
```
Desktop: 12 columns   Tablet: 8 columns   Mobile: 4 columns
Max content width: 1280px
```

---

## 5. Visual Identity & Image Direction

Use the uploaded portrait as the primary visual identity.

- **Never** a circular avatar
- Blend the portrait into the environment — no floating cutout on a flat background
- Produce these treatments: hero portrait, glass portrait, blue monochrome,
  holographic variant, background silhouette, gradient mask, motion
  composition, AI/tech overlay, enterprise dashboard overlay
- No stock people, no unrelated imagery
- Lighting should be cool/blue-toned to match the enterprise-tech palette;
  masking and blending should look intentional, not cut-out

---

## 6. Background Direction

Build an immersive enterprise environment across the scroll, using:
Kanban boards, agile timelines, sprint widgets, analytics cards, glass
panels, particles, subtle neural/network patterns, technology grids,
floating UI fragments. These should feel like environment, not clutter —
low opacity, low contrast against foreground content.

---

## 7. Information Architecture

Hero → About → Skills → Tools → Experience → Projects → Contact → Footer

Maintain consistent spacing, hierarchy, and animation language across every
section — a visitor should never feel like they entered a different
product mid-scroll.

---

## 8. Skills Content

**Technical:** Agile, Scrum, Jira, Trello, Notion, Excel, Word, MS Office,
Google Workspace, AI Tools

**Professional:** Planning, Communication, Stakeholder Management,
Documentation, Team Collaboration, Scheduling, Time Management, Risk
Management, Problem Solving

---

## 9. Component Library

Build these as reusable, typed components. Each needs: purpose, spacing,
states (default/hover/focus/active/loading/empty/error), responsive
behavior, and accessibility notes.

**Layout/Nav:** Navbar, Footer, Theme Toggle, Scroll Indicator, Back-to-Top
**Content:** Hero, Glass Card, Project Card, Skill Card, Experience
Timeline, Contact Card, Badge/Pill, Button (primary/secondary/ghost)
**Forms:** Contact Form, Input, Textarea
**Feedback:** Toast, Loading State, Empty State, Error State
**Motion/Visual:** Cursor, Particle System, Background Layer, Three.js Scene, Resume Download Button

Keep this list disciplined — do not invent components the sections in
Section 7 don't need.

---

## 10. Motion System

- GSAP ScrollTrigger for scroll-linked choreography
- Lenis for smooth scroll
- Framer Motion for component-level transitions
- Hero: floating portrait, typing effect, entrance choreography at 800ms
- Scroll: fade/slide-in per section, animated counters, magnetic buttons,
  cursor parallax, glass reflections
- Page transitions between routes (if multi-page)
- **Must respect `prefers-reduced-motion`** — provide a static fallback for every animation, not just a shorter duration

---

## 11. Three.js Hero Scene

- Subtle, premium — not a game demo
- Camera: gentle parallax tied to mouse position, no aggressive movement
- Lighting: cool, soft, consistent with the blue enterprise-tech palette
- Objects/particles: abstract, low-poly or particle-based, tied thematically to Kanban/data/network motifs from Section 6
- **Performance budget:** must degrade gracefully — reduced particle count and static fallback image on mobile/low-end GPU
- Provide a non-WebGL fallback (static gradient/image) if context creation fails

---

## 12. Resume / Config System

Create `config/site.ts` as the single source for: name, role, resume path,
email, phone, LinkedIn. Every component pulls from this file — no
duplicated contact strings anywhere else in the codebase.

---

## 13. Responsive Rules

Desktop, laptop, tablet, mobile, foldables, ultrawide.
No horizontal overflow. No layout shift (CLS). Heavy 3D/particle effects
must reduce or disable on mobile without breaking layout.

---

## 14. SEO

robots.txt, sitemap.xml, OpenGraph tags, Twitter card tags, JSON-LD
structured data (Person schema), canonical URLs, full metadata per page.

---

## 15. Accessibility

Full keyboard navigation, visible focus indicators, ARIA labels on
interactive/non-semantic elements, semantic HTML throughout, WCAG-AA
contrast minimum, reduced-motion fallback (see Section 10).

---

## 16. Performance Budget

- Lighthouse 95+ on Performance, Accessibility, Best Practices, SEO
- Code splitting and dynamic imports for heavy sections (esp. Three.js)
- Lazy-load below-the-fold images and 3D assets
- Optimize/compress all images (next/image, modern formats)
- Three.js: dispose of unused geometries/materials, cap particle count on mobile

---

## 17. Architecture / Folder Structure

```
app/
components/
components/ui/
components/layout/
components/sections/
hooks/
lib/
config/
public/
styles/
types/
```

---

## 18. Definition of Done (Acceptance Criteria)

The portfolio should read as a premium enterprise product, not a personal
template — it should land within 10 seconds and feel handcrafted. Every
animation, spacing value, and layout decision should be traceable back to
a rule in this document, not improvised.

Done means:
- [ ] Every section in Section 7 is implemented and matches the token system in Section 4
- [ ] Every component in Section 9 has all required states and is responsive
- [ ] Lighthouse 95+ on all four categories, verified not assumed
- [ ] Reduced-motion fallback verified on every animation
- [ ] Resume/contact links all resolve through `config/site.ts`
- [ ] No horizontal overflow or layout shift at any breakpoint
- [ ] Three.js scene has a working fallback and a mobile-reduced mode

---

## 19. QA Checklist

**Spacing/Layout** — 8px grid respected · consistent section padding · no orphaned whitespace · 12/8/4 column grid honored at each breakpoint

**Typography** — scale from Section 4 used exactly · no ad-hoc font sizes · line-height/rhythm consistent

**Motion** — timings match Section 4 · reduced-motion fallback works · no jank on scroll (test on mid-tier mobile)

**Three.js** — fallback renders when WebGL unavailable · particle count reduced on mobile · no memory leak on route change

**Accessibility** — full keyboard pass · screen reader labels present · contrast checked in both themes

**SEO** — metadata present on every route · sitemap/robots valid · JSON-LD validates

**Performance** — Lighthouse run and scores recorded · images optimized · bundle analyzed for unnecessary weight

**Cross-browser/device** — Chrome, Safari, Firefox · iOS/Android · desktop, laptop, tablet, mobile widths

---

## 20. Execution Reminder For The Agent

Read this entire document before writing any code. Plan the architecture
and confirm it matches Section 17 before scaffolding. Do not simplify
components from Section 9, do not skip QA items in Section 19, and do not
consider the project complete until every box in Section 18 is checked.
