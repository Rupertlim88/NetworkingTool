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
- Clicking a card expands it into a centered modal
- Background blurs (the grid blurs behind the overlay — not a new screen, a popup feel)
- Modal content: name, tags (what they do), full bio/resume description
- Action buttons at bottom: LinkedIn, Gmail, More Info
- "More Info" opens a custom-built detail screen

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
- Mobile / React Native — future milestone

## Reference Files

- `GSAPSKILL.md` (project root) — GSAP best practices, React integration patterns (`useGSAP` hook, timeline sequencing, easing functions, squash/stretch via `scaleX`/`scaleY`). Planning and execution agents should read this before implementing animation code.

## Context

This animation is the first piece of a larger networking tool. The full app will have:
- A grid of contact cards (LinkedIn-style photo tiles with rounded corners)
- 1-3 star rating system per contact (yellow = recent talk, blue = actionable outcome)
- Click-to-expand modal with blur overlay (name, tags, bio, LinkedIn/Gmail links)
- Manual level-up trigger (user clicks a button in the detail view)

The animation component must be designed so the full app can import and call it with minimal wiring. The component owns the entire visual experience of the level-up sequence.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| GSAP (GreenSock) for animation | Industry standard for complex sequenced, physics-feeling web animations — far more control than Framer Motion for squash/stretch, arc trajectories, particle effects | — Pending |
| React + TypeScript | Web-first, type-safe, generalizable | — Pending |
| Animation-first build order | Animation is the backbone and hardest piece. Build it standalone, then build the app around it. | — Pending |
| Standalone component (zero app dependencies) | Props-only API means this drops into any future app without refactoring | — Pending |

## Milestone Structure

| Milestone | Scope | Status |
|-----------|-------|--------|
| 1 — Animation Component | `StarLevelUpAnimation` standalone React+GSAP component | In Progress |
| 2 — Contact Grid UI | Card grid, star display, blur overlay modal, detail view | Future |
| 3 — Full Integration | Connect animation to contact upgrade flow, data layer | Future |

---
*Last updated: 2026-03-04 after full vision capture*
