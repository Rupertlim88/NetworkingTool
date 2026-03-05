# Networking App — Personal Contact Manager with Gamified Relationships

## What This Is

A personal networking tool that helps you track and deepen professional relationships. Contacts are displayed as a scrollable grid of rounded cards (LinkedIn-style profile photos). Each card has a 1–3 star rating showing relationship strength, color-coded by outcome type. Clicking a card opens a detail overlay. When a relationship levels up, a cinematic game-like animation plays.

**Current build focus (Milestone 1):** The star level-up animation component — built standalone so it can be integrated into the full app later.

## Core Value

The animation must feel genuinely exciting and game-like — not a UI transition, but a moment. When someone levels up a connection, it should feel earned.

## Full Product Vision (future milestones)

### Contact Grid
- 3-column scrollable grid of rounded-corner square cards
- Each card: LinkedIn profile photo + star rating at the bottom
- Stars: 1 = initial contact, 2 = ongoing correspondence, 3 = deep relationship
- Star colors: yellow = recently talked, blue = produced a real outcome (referral, job, intro)

### Contact Detail Overlay
- Clicking a card opens a centered rectangle popup (not full-screen)
- Background blurs on both sides — feels like a popup within the original screen
- Scrollable content: name, tags (what they do), full bio/resume description
- Action buttons at bottom: LinkedIn, Gmail, More Info
- "More Info" navigates to a dedicated per-person page (separate Next.js route)

### Per-Person Detail Pages
- Each contact has their own custom page (e.g., /contacts/[id])
- Custom layout and design per person — not a template, but a crafted page
- Separate from the popup overlay — this is a full navigable screen

### Level-Up Trigger
- User manually clicks a button inside the contact detail overlay to upgrade stars
- This triggers the full-screen star level-up animation

### Star Level-Up Animation (Milestone 1 — building now)
- Full-screen cinematic takeover
- Black void background (Pokémon-style dark flash)
- 5-pointed classic stars launch from the contact photo card
- Stars squash at launch → stretch as they accelerate → grow larger as they arc upward
- Sparkle trail behind each star
- Stars hit the top of screen → fireworks/sparkle burst impact
- Stars arc back down and embed onto the photo card
- Final state shows updated star count on the card

## Requirements

### Active

- [ ] `StarLevelUpAnimation` component with a clean, stable props API
- [ ] Full-screen cinematic takeover (overlays everything)
- [ ] Black void background — Pokémon-style dark flash during animation
- [ ] 5-pointed classic stars that launch from the contact's photo card position
- [ ] Squash (compress vertically) at launch, stretch (elongate) as they accelerate upward
- [ ] Stars grow larger as they rise through the void
- [ ] Sparkle/trail effect behind each star as it travels
- [ ] Stars arc to the top of screen — impact burst (fireworks/sparkles) at the ceiling
- [ ] Stars arc back down and embed onto the contact photo card
- [ ] Contact photo card visible against the dark background throughout
- [ ] Supports fromStars and toStars props (1, 2, or 3)
- [ ] Star color variants: yellow (recent contact), blue (actionable outcome e.g. referral)
- [ ] `onComplete` callback when animation finishes
- [ ] TypeScript — clean interfaces, no any types

### Out of Scope (Milestone 1)

- Contact grid UI — Milestone 2
- Contact detail blur overlay — Milestone 2
- Star color display on cards — Milestone 2
- Authentication, data layer, backend — future milestone
- Mobile / cross-platform — future milestone (see note below)

## Reference Files

- `GSAPSKILL.md` (project root) — GSAP best practices, React integration patterns (`useGSAP` hook, timeline sequencing, easing functions, squash/stretch via `scaleX`/`scaleY`). Planning and execution agents should read this before implementing animation code.

## Active Skills (auto-loaded by Claude Code)

- `performance` — 60fps animation patterns, resource optimization, avoiding layout thrashing
- `core-web-vitals` — LCP/INP/CLS optimization for Next.js + Vercel
- `accessibility` — WCAG 2.1 compliance
- `best-practices` — General web quality
- `seo` — Search optimization
- `web-quality-audit` — Comprehensive quality auditing

Source: `addyosmani/web-quality-skills` — installed at `.agents/skills/`

**Core Engineering (dralgorhythm/claude-agentic-framework):**
- `test-driven-development` — Red-Green-Refactor TDD for animation component
- `debugging` — Systematic troubleshooting for timing/sequencing bugs
- `refactoring-code` — Safe restructuring patterns
- `implementing-code` — Clean implementation methodology
- `testing` — Test writing best practices
- `application-security`, `identity-access` — Relevant for auth milestone
- `designing-apis` — Relevant for component props API and future backend

Note: `tailwind-css` (generic) and `framer-motion` removed — replaced by stack-specific Tailwind skill; project uses GSAP not Framer Motion.

Source: `dralgorhythm/claude-agentic-framework` — installed at `.agents/skills/`

**Next.js Skills (claude-nextjs-skills-main.zip):**
- `nextjs-app-router-fundamentals` — App Router patterns (layouts, routing, metadata)
- `nextjs-anti-patterns` — Common mistakes to avoid
- `nextjs-server-client-components` — When to use server vs client components
- `nextjs-dynamic-routes-params` — For `/contacts/[id]` per-person pages
- `nextjs-advanced-routing` — Multi-screen app routing
- `nextjs-client-cookie-pattern` — Auth session handling
- `nextjs-server-navigation` — Navigation between screens
- `nextjs-pathname-id-fetch` — Fetching contact data by ID

**Tailwind CSS (timelessco/recollect — Next.js + Supabase context):**
- `tailwindcss` — Utility-first styling, responsive design, dark mode, component patterns

Source: `npx skillfish add timelessco/recollect tailwindcss` — installed globally at `~/.claude/skills/`

## Context

This animation is the first piece of a larger networking tool. The full app will have:
- A grid of contact cards (LinkedIn-style photo tiles with rounded corners)
- 1-3 star rating system per contact (yellow = recent talk, blue = actionable outcome)
- Click-to-expand modal with blur overlay (name, tags, bio, LinkedIn/Gmail links)
- Manual level-up trigger (user clicks a button in the detail view)

The animation component must be designed so the full app can import and call it with minimal wiring. The component owns the entire visual experience of the level-up sequence.

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend framework | Next.js (App Router) | Hosted on Vercel, file-based routing for multi-screen app |
| Styling | Tailwind CSS | Standard for Next.js + Vercel projects |
| Language | TypeScript | No `any` types |
| Animation | GSAP + @gsap/react | Level-up animation component |
| Database | Supabase | Contact data, user accounts |
| Auth | Supabase Auth | Email + verification flow (rupertlim88@gmail.com sender) |
| Backend | AWS EC2 | Custom backend logic (future milestone) |
| Hosting | Vercel (frontend) + AWS EC2 (backend) | Custom domain |

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| GSAP (GreenSock) for animation | Industry standard for complex sequenced, physics-feeling web animations — far more control than Framer Motion for squash/stretch, arc trajectories, particle effects | — Pending |
| Next.js App Router | Multi-screen app (grid, detail pages, auth flow) needs routing. Vercel-native. | — Pending |
| Supabase for DB + Auth | Handles contact data storage and email auth in one service | — Pending |
| Animation-first build order | Animation is the backbone and hardest piece. Build it standalone, then build the app around it. | — Pending |
| Standalone component (zero app dependencies) | Props-only API means this drops into any future app without refactoring | — Pending |

## Milestone Structure

| Milestone | Scope | Status |
|-----------|-------|--------|
| 1 — Animation Component | `StarLevelUpAnimation` standalone React+GSAP component | In Progress |
| 2 — Contact Grid UI | Card grid, star display, blur overlay modal, detail view | Future |
| 3 — Full Integration | Auth, Supabase data layer, AWS EC2 backend, live deployment | Future |
| 4 — Mobile / Cross-platform | Extend app to mobile and other devices | Future |

**Note on mobile:** All code should be written with future mobile adaptation in mind. Avoid web-only assumptions where possible. The animation component in particular should be designed so its logic can be ported to React Native / Reanimated later. When making architectural decisions, flag anything that would be hard to adapt to mobile.

---
*Last updated: 2026-03-04 after full vision capture*
