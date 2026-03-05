# Roadmap: Star Level-Up Animation Component

## Overview

Six phases build the app foundation and animation from the outside in: first a solid project scaffold, then a rough visual UI prototype to validate themes and layout, then the props API shell, then the core animation sequence driving stars through the void, then the detailed star visuals and particle effects, and finally the impact burst and landing that complete the cinematic moment. Each phase leaves a working, testable state.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Project Setup** - React + TypeScript + GSAP scaffold with self-contained component folder structure
- [ ] **Phase 2: Visual Foundation** - Rough contact grid, portrait cards, popup overlay, theme switcher — validates visual direction before animation
- [ ] **Phase 3: Component API** - Clean props interface and TypeScript types; component renders without errors
- [ ] **Phase 4: Animation Core** - Full-screen overlay, dark void, photo card visible, stars launch with squash/stretch arc at 60fps
- [ ] **Phase 5: Star Visuals + Particles** - 5-pointed star geometry, yellow/blue color variants, sparkle trail particles
- [ ] **Phase 6: Impact + Landing** - Ceiling burst, stars arc back down and embed on card, final star count displayed, onComplete fires

## Phase Details

### Phase 1: Project Setup
**Goal**: A running React + TypeScript + GSAP project with the self-contained component folder in place, importable as a single unit
**Depends on**: Nothing (first phase)
**Requirements**: INT-01, INT-02, INT-03
**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` (or equivalent) renders a blank page without errors
  2. GSAP is installed and importable within the component folder
  3. The component lives in a single self-contained folder (component + types + assets) with one index export
  4. Importing the component into a fresh React app requires no configuration beyond the single import
**Plans**: 2 plans

Plans:
- [ ] 01-01-PLAN.md — Scaffold Next.js 15 App Router, configure TypeScript strict mode, Tailwind theme tokens, install GSAP
- [ ] 01-02-PLAN.md — Create StarLevelUpAnimation component folder stubs, lib/constants.ts, /dev harness route

### Phase 2: Visual Foundation
**Goal**: A rough but visually representative contact grid and popup overlay that validates the theme, card shape, and color direction before any animation code is written
**Depends on**: Phase 1
**Requirements**: INT-01, INT-02, INT-03
**Success Criteria** (what must be TRUE):
  1. Contact grid renders with teal theme — portrait cards, rounded-2xl corners, placeholder photos
  2. Clicking a card opens a dark near-black popup overlay with theme accent colors
  3. Theme switcher on `/settings` toggles between Teal and Midnight Blue — change persists in localStorage
  4. Both themes look visually correct and intentional (not broken or unstyled)
**Plans**: TBD

Plans:
- [ ] 02-01: TBD

### Phase 3: Component API
**Goal**: The component exposes a fully-typed props interface; it mounts and unmounts cleanly without running any animation logic yet
**Depends on**: Phase 2
**Requirements**: API-01, API-02, API-03, API-04, API-05, API-06, API-07
**Success Criteria** (what must be TRUE):
  1. Component accepts `fromStars`, `toStars`, `contactPhoto`, `contactName`, `starColor`, and `onComplete` props with no TypeScript errors
  2. Passing invalid prop types (e.g., `fromStars={5}`) produces a TypeScript compile error
  3. No `any` types exist anywhere in the component's TypeScript source
  4. Component renders a visible placeholder (or blank) and does not throw at runtime when all valid props are supplied
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

### Phase 4: Animation Core
**Goal**: Stars launch from below the photo card, travel a curved arc upward across the full-screen dark void, and the sequence runs at a smooth 60fps
**Depends on**: Phase 3
**Requirements**: ANIM-01, ANIM-02, ANIM-03, ANIM-04, ANIM-05, ANIM-06, ANIM-07, ANIM-12
**Success Criteria** (what must be TRUE):
  1. Triggering the component covers the entire viewport with a dark overlay — nothing behind it is visible or interactive
  2. The contact photo card is visible and centered on the dark background from the moment the overlay appears
  3. Stars visibly launch from below the photo card, squash at launch, then stretch and grow larger as they arc upward
  4. The arc trajectory is curved (not linear) across the screen
  5. The animation runs without stutter at 60fps on a modern laptop (no dropped frames visible to the eye)
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

### Phase 5: Star Visuals + Particles
**Goal**: Each star is a classic 5-pointed shape in the correct color, with a sparkle trail following it as it travels
**Depends on**: Phase 4
**Requirements**: STAR-01, STAR-02, STAR-03, STAR-04, ANIM-08
**Success Criteria** (what must be TRUE):
  1. Each star is visibly a classic 5-pointed star shape (not a circle, dot, or rounded shape)
  2. Passing `starColor="yellow"` produces gold/yellow stars; passing `starColor="blue"` produces blue stars
  3. Sparkle or particle trail follows behind each star during its upward arc
  4. The trail disappears naturally (fades or dissipates) rather than leaving permanent marks on screen
**Plans**: TBD

Plans:
- [ ] 05-01: TBD

### Phase 6: Impact + Landing
**Goal**: Stars reach the top, explode in a burst, arc back down onto the photo card, and the animation completes cleanly with the correct final star count shown
**Depends on**: Phase 5
**Requirements**: ANIM-09, ANIM-10, ANIM-11
**Success Criteria** (what must be TRUE):
  1. When a star reaches the top of the screen, a visible burst or explosion of sparkles/fireworks fires at that position
  2. After the burst, stars arc back downward and visibly embed/land on the contact photo card
  3. After landing, the photo card displays the correct `toStars` count (e.g., 2 stars if `toStars=2`)
  4. The `onComplete` callback fires exactly once after the full animation sequence ends
**Plans**: TBD

Plans:
- [ ] 06-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Setup | 0/2 | Not started | - |
| 2. Visual Foundation | 0/? | Not started | - |
| 3. Component API | 0/? | Not started | - |
| 4. Animation Core | 0/? | Not started | - |
| 5. Star Visuals + Particles | 0/? | Not started | - |
| 6. Impact + Landing | 0/? | Not started | - |
