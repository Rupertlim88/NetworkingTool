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

**Sequence (fully locked):**

1. User clicks Level Up → fast smooth fade to black (~300ms)
2. Pure black void. Stars appear **side by side, centered** in the middle of the screen.
   - Count = `toStars` value (1→2 shows 2 stars, 2→3 shows 3 stars — no level skipping)
   - Stars are 5-pointed classic star shapes
3. Stars launch straight upward with slight stagger (~50-100ms between each)
   - On launch: **squash** (compress vertically, spread wide)
   - As they accelerate: **stretch** (elongate vertically, get taller)
   - Speed streaks (vertical lines) appear on the sides of each star — sensation of flying upward through static black void
   - Stars grow progressively larger as they rise
4. ~4 seconds of upward travel
5. Stars hit the top of the screen → **firework burst** explodes at impact point
6. Simultaneously: contact card + popup begin fading back in (everywhere — general fade-in, not directional)
7. Stars fall back down toward the card at bottom center
8. By landing time: void is fully gone, popup is fully visible
9. Stars embed on card → **card shakes** (quick) → updated star count displayed
10. `onComplete` fires — user is back in the popup

**Star colors (fixed semantic — never change with theme):**
- `yellow` (`#f59e0b`) = recently talked to this person
- `blue` (`#22d3ee`) = produced a real outcome (referral, job, intro)

## Requirements

### Active

- [ ] `StarLevelUpAnimation` component with a clean, stable props API
- [ ] Fast smooth fade to black (~300ms) — not an instant cut
- [ ] Pure black void takeover (full-screen, overlays everything)
- [ ] `toStars` count of 5-pointed stars appear side by side, centered in void
- [ ] Stars launch straight upward with slight stagger (~50-100ms between each)
- [ ] Squash on launch (compress vertically), stretch as they accelerate (elongate vertically)
- [ ] Speed streaks (vertical lines) on sides of each star during upward travel
- [ ] Stars grow progressively larger as they rise
- [ ] Stars hit top of screen → firework burst at impact point
- [ ] Contact card + popup fade back in at bottom simultaneously with burst
- [ ] Stars fall back down to bottom center of screen
- [ ] Stars embed on card → card shakes quickly → updated star count displayed
- [ ] Void fully gone by the time stars land
- [ ] Supports `fromStars` and `toStars` props (1, 2, or 3) — no level skipping
- [ ] Star color variants: yellow `#f59e0b` (recent contact), blue `#22d3ee` (actionable outcome)
- [ ] `onComplete` callback fires after landing and shake
- [ ] TypeScript — clean interfaces, no any types

### Out of Scope (Milestone 1)

- Contact grid UI — Milestone 2
- Contact detail blur overlay — Milestone 2
- Star color display on cards — Milestone 2
- Authentication, data layer, backend — future milestone
- Mobile / cross-platform — future milestone (see note below)

## Reference Files

- `.agents/skills/gsap/SKILL.md` — GSAP best practices, React integration patterns (`useGSAP` hook, timeline sequencing, easing functions, squash/stretch via `scaleX`/`scaleY`). Planning and execution agents should read this before implementing animation code.

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

## Visual Design

### Three Distinct Visual Zones

| Zone | Background | Feel |
|------|-----------|------|
| Contact Grid | Deep teal (`#071a2e`) or Midnight Blue (`#0a0f1e`) — theme-dependent | Modern, cool, premium |
| Popup + Full detail page | Near-black (`#0d0d0d`) — always dark | Cinematic, minimal — like reference images |
| Star animation overlay | Pure black void (`#000000`) — always | Game-like, Pokémon-style |

### Themes

Two themes, user-selectable. Default: **Teal**.

**Theme A — Midnight Blue + Warm Coral** (secondary)
- Grid background: `#0a0f1e`
- Card surface: `#111827`
- Accent: coral `#ff6b6b` (primary), electric blue `#4fc3f7` (secondary)

**Theme C — Rich Teal + Soft White** (default)
- Grid background: `#071a2e`
- Card surface: frosted glass — semi-transparent white overlay on teal
- Accent: amber `#f59e0b` (primary), cyan `#22d3ee` (secondary)

Popup and detail pages are always near-black (`#0d0d0d`) but inherit the active theme's accent colors for buttons and interactive elements.

### Contact Cards

- Shape: portrait rectangle (slightly taller than square — approx 3:4 ratio)
- Corners: `rounded-2xl` (16px) — smooth iOS app icon feel, not bubbly
- Photo: cropped to fill card
- Stars displayed at bottom of card
- **3D / widget feel** — cards should have depth/dimension (e.g. subtle shadow, layering, or a raised look) — like a physical widget, not a flat tile

### Star Semantic Colors (fixed — do not change with theme)

```typescript
export const STAR_COLORS = {
  yellow: '#f59e0b',  // recently talked to this person
  blue:   '#22d3ee',  // produced a real outcome (referral, job, intro)
} as const
```

These are semantic — the color carries meaning. They do not adapt to the active theme.

### Settings UI

- Gear icon (⚙) in top-right of grid screen
- Navigates to `/settings` page
- **Appearance section**: two visual swatches (Theme C and Theme A) — click to activate
- Theme preference saved to localStorage now, Supabase per-user in Milestone 3
- More settings sections added as app grows

## Context

This animation is the first piece of a larger networking tool. The full app will have:
- A grid of contact cards (portrait, rounded-2xl, iOS icon feel) in teal/midnight theme
- 1-3 star rating system per contact (yellow = recent talk, blue = actionable outcome — fixed semantic colors)
- Click-to-expand modal (dark near-black, inherits theme accents) with blur overlay
- Manual level-up trigger (user clicks button in detail view) OR voice command to AI agent
- `/settings` page with theme switcher

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

| Milestone | Scope | Phases | Status |
|-----------|-------|--------|--------|
| 1 — Full UI + Animation | Complete visual app: design tokens, contact grid, popup, header, filters, settings drawer, star level-up animation | 1-11 (11 phases) | In Progress |
| 2 — Real Data Layer | Supabase database, contact CRUD, real profile data replacing mocks | TBD | Future |
| 3 — Auth + Deployment | Supabase Auth, AWS EC2 backend, Vercel deployment, custom domain | TBD | Future |
| 4 — n8n Automation Layer | n8n (self-hosted or cloud) as automation backbone: LinkedIn profile sync, relationship decay alerts, email follow-up automation, webhook triggers from app events (e.g., level-up → n8n workflow) | TBD | Future |
| 5 — Mobile / Cross-platform | Extend app to mobile and other devices | TBD | Future |

**Milestone 1 phases (11):**
- Phases 1-7: Visual UI — project setup, design tokens, contact grid, popup overlay, grid header, filter system, settings drawer
- Phases 8-11: Star level-up animation — component API, animation core, star visuals, impact + landing

**Note on n8n (Milestone 4):** n8n sits on top of the data layer (Milestone 2) and auth (Milestone 3). It automates workflows that require a working database and service credentials. Scope includes: LinkedIn data sync, relationship decay detection, email reminders, and custom webhook-driven workflows triggered by in-app events.

**Note on mobile:** All code should be written with future mobile adaptation in mind. Avoid web-only assumptions where possible. The animation component in particular should be designed so its logic can be ported to React Native / Reanimated later. When making architectural decisions, flag anything that would be hard to adapt to mobile.

---
*Last updated: 2026-03-10 — milestone structure updated: 11 phases in M1, n8n added as M4, mobile moved to M5*
