# Networking App — Star Level-Up Animation Component

## What This Is

A standalone, reusable React component that plays a cinematic level-up animation when a contact's relationship strength increases (e.g., 1 star → 2 stars). Built as the animation backbone of a future networking app. This component is completely decoupled from any data layer — it takes props and plays the sequence.

## Core Value

The animation must feel genuinely exciting and game-like — not a UI transition, but a moment. When someone levels up a connection, it should feel earned.

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

### Out of Scope

- Networking app UI (contact grid, cards, modals) — future milestone
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

---
*Last updated: 2026-03-04 after initialization*
