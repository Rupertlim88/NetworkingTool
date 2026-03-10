# Roadmap: Networking Tool

## Overview

Eleven phases build the app from foundation through polished UI to cinematic animation. Phase 1 scaffolds the project. Phases 2-7 build the visual UI layer: design tokens, contact grid, popup overlay, grid header, filter system, and settings drawer. Phases 8-11 build the star level-up animation component: props API, core animation sequence, star visuals with particles, and the impact burst with landing. Each phase leaves a working, testable state.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Project Setup** - React + TypeScript + GSAP scaffold with self-contained component folder structure (completed 2026-03-05)
- [x] **Phase 2: Design Tokens + Theme System** - Three-tier CSS custom property architecture, ThemeProvider, localStorage persistence, flash prevention (completed 2026-03-10)
- [ ] **Phase 3: Contact Grid + Cards** - 5-column responsive grid, portrait cards with circular photos, layered shadows, hover glow, Z-axis entrance animation
- [ ] **Phase 4: Popup Overlay** - Card-expand animation via GSAP Flip, near-black surface, blur backdrop, content layout with bio/resume, Level Up button, action icons
- [ ] **Phase 5: Grid Header** - Dual-mode header (static floating widget / fixed shelf), GSAP scroll morphing, Zone A/B logic, per-letter gradient title, theme swatches with tooltips, gear icon
- [ ] **Phase 6: Filter System + Contact Count** - Filter strip, funnel icon, dropdown panel with sticky behavior, aurora gradient capsule, gold shimmer number, number roll transitions
- [ ] **Phase 7: Settings Drawer** - Full-screen left-slide drawer, near-black surface, theme toggle with sliding cover mechanic, standalone SettingsPanel component
- [ ] **Phase 8: Component API** - Clean props interface and TypeScript types; component renders without errors
- [ ] **Phase 9: Animation Core** - Full-screen overlay, dark void, photo card visible, stars launch with squash/stretch arc at 60fps
- [ ] **Phase 10: Star Visuals + Particles** - 5-pointed star geometry, yellow/blue color variants, sparkle trail particles
- [ ] **Phase 11: Impact + Landing** - Ceiling burst, stars arc back down and embed on card, final star count displayed, onComplete fires

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
- [x] 01-01-PLAN.md — Scaffold Next.js 15 App Router, configure TypeScript strict mode, Tailwind theme tokens, install GSAP
- [x] 01-02-PLAN.md — Create StarLevelUpAnimation component folder stubs, lib/constants.ts, /dev harness route

### Phase 2: Design Tokens + Theme System
**Goal**: A comprehensive CSS custom property token architecture supporting three themes (Teal, Midnight, Aurora), with a ThemeProvider that persists user preference and prevents flash on page load
**Depends on**: Phase 1
**Requirements**: INT-01, INT-02, INT-03
**Success Criteria** (what must be TRUE):
  1. All visual properties are CSS custom properties organized in three tiers (primitives, semantic, component)
  2. Three theme blocks exist: `[data-theme="teal"]`, `[data-theme="midnight"]`, `[data-theme="aurora"]`
  3. ThemeProvider wraps the app, reads localStorage on mount, and sets `data-theme` attribute
  4. Theme preference persists across page refresh with no visible flash of wrong theme
  5. `npm run build` passes with zero TypeScript errors
**Plans**: 1 plan

Plans:
- [x] 02-01-PLAN.md — Three-tier token architecture, ThemeProvider, flash prevention, theme types

### Phase 3: Contact Grid + Cards
**Goal**: A responsive 5-column contact grid with 30 placeholder portrait cards that have circular photos, layered shadows, hover scale+glow, and Z-axis entrance animation with GSAP ScrollTrigger stagger
**Depends on**: Phase 2
**Requirements**: INT-01, INT-02, INT-03
**Success Criteria** (what must be TRUE):
  1. Grid renders 30 cards in 5 columns (desktop), 3 (tablet), 2 (mobile) with 20px gaps
  2. Cards are portrait 3:4 ratio with rounded-2xl corners, circular user photo, name, and star rating
  3. Cards have layered box-shadow depth and hover scale(1.02) + accent-colored glow
  4. Cards entrance-animate with Z-axis pop and stagger on scroll using GSAP ScrollTrigger
  5. Fixed viewport gradient bleed at top (~20% height, accent colors at 10-15% opacity) does not scroll with content
  6. Grid uses `app/page.tsx` as the home page with mock data from `lib/mock-data.ts`
**Plans**: 1 plan

Plans:
- [ ] 03-01-PLAN.md — Mock data, ContactCard component, responsive grid layout, GSAP ScrollTrigger Z-axis entrance animation, fixed gradient bleed

### Phase 4: Popup Overlay
**Goal**: Clicking a contact card opens a card-expand animation to a centered popup overlay with near-black surface, blur backdrop, full content layout (photo, name, tags, stars, bio/resume, Level Up button, action icons), and multiple close methods
**Depends on**: Phase 3
**Requirements**: INT-01, INT-02, INT-03
**Success Criteria** (what must be TRUE):
  1. Clicking a card animates it from grid position to centered popup via GSAP Flip (~300-400ms)
  2. Background blurs with `backdrop-filter: blur(12px)` and semi-transparent black overlay
  3. Popup surface is near-black `#0d0d0d` with accent gradient glow at top, max-width 550px, max-height 80vh
  4. Content includes circular photo, name, domain tags as pills, stars, collapsible bio/resume, Level Up button, action icon buttons
  5. Close via background click, X button, or Escape key reverses the expand animation
  6. Auto-hiding accent-colored thin scrollbar appears on scroll
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

### Phase 5: Grid Header
**Goal**: A dual-mode grid header that starts as a floating widget at page top, scrolls away naturally, then reappears as a fixed full-width shelf on scroll-up with GSAP morphing transition between modes, plus per-letter gradient title, theme swatches with tooltips, and gear icon
**Depends on**: Phase 3
**Requirements**: INT-01, INT-02, INT-03
**Success Criteria** (what must be TRUE):
  1. Static mode: floating widget with rounded corners, nearly full-width with small side gaps
  2. Fixed mode: full-width flush top, rounded bottom corners only, slides down on scroll-up in Zone A
  3. Zone B (near top): fixed header does not appear; scrolling reaches static header naturally
  4. Zone A to Zone B transition: edges contract, corners round, shadow fades (morphing via GSAP)
  5. "NETWORKING TOOL" title renders with per-letter CSS gradient, theme-influenced spectrum
  6. Theme swatches toggle themes with inset active state, custom pill tooltips with hover delay
  7. Gear icon on left side, white 60-70% opacity, accent color on hover
**Plans**: TBD

Plans:
- [ ] 05-01: TBD

### Phase 6: Filter System + Contact Count
**Goal**: A filter strip below the header with a luminous aurora gradient contact count capsule (gold shimmering number, number roll transitions) and a filter dropdown with sticky behavior, visual indicator rows, and internal scrolling
**Depends on**: Phase 5
**Requirements**: INT-01, INT-02, INT-03
**Success Criteria** (what must be TRUE):
  1. Filter strip sits on grid background below header, scrolls away statically, does NOT reappear on scroll-up
  2. Contact count capsule has luminous aurora gradient orb background with gold number and description text
  3. Gold number has soft text-shadow glow and slow color temperature shimmer at rest
  4. Filter change triggers directional number roll animation (~400-500ms) with glow dim/brighten
  5. Filter dropdown opens with fade+scale, has lighter surface, icon+name+count rows, accent left-border active indicator
  6. Dropdown becomes sticky when scrolled to viewport top, internal scrollbar for long lists
  7. Funnel icon turns accent color when non-All filter is active
**Plans**: TBD

Plans:
- [ ] 06-01: TBD

### Phase 7: Settings Drawer
**Goal**: A full-screen settings drawer that slides from the left with theme toggle using sliding cover mechanic, standalone SettingsPanel component for easy container swapping, and full grid state preservation
**Depends on**: Phase 2
**Requirements**: INT-01, INT-02, INT-03
**Success Criteria** (what must be TRUE):
  1. Drawer slides from left, full-screen, ~400-500ms ease-out, near-black `#0d0d0d` background
  2. Close via X button, gear icon toggle, or Escape key
  3. Theme toggle shows two preview squares with base color, accent gradient, and mock card silhouette
  4. Sliding cover mechanic: lighter dark cover slides between squares (~200-300ms), uncovering active theme
  5. Grid state fully preserved while drawer is open (scroll position, filter state, card states)
  6. SettingsPanel is a standalone component that can be moved to different containers
**Plans**: TBD

Plans:
- [ ] 07-01: TBD

### Phase 8: Component API
**Goal**: The StarLevelUpAnimation component exposes a fully-typed props interface; it mounts and unmounts cleanly without running any animation logic yet
**Depends on**: Phase 1
**Requirements**: API-01, API-02, API-03, API-04, API-05, API-06, API-07
**Success Criteria** (what must be TRUE):
  1. Component accepts `fromStars`, `toStars`, `contactPhoto`, `contactName`, `starColor`, and `onComplete` props with no TypeScript errors
  2. Passing invalid prop types (e.g., `fromStars={5}`) produces a TypeScript compile error
  3. No `any` types exist anywhere in the component's TypeScript source
  4. Component renders a visible placeholder (or blank) and does not throw at runtime when all valid props are supplied
**Plans**: TBD

Plans:
- [ ] 08-01: TBD

### Phase 9: Animation Core
**Goal**: Stars launch from below the photo card, travel a curved arc upward across the full-screen dark void, and the sequence runs at a smooth 60fps
**Depends on**: Phase 8
**Requirements**: ANIM-01, ANIM-02, ANIM-03, ANIM-04, ANIM-05, ANIM-06, ANIM-07, ANIM-12
**Success Criteria** (what must be TRUE):
  1. Triggering the component covers the entire viewport with a dark overlay — nothing behind it is visible or interactive
  2. The contact photo card is visible and centered on the dark background from the moment the overlay appears
  3. Stars visibly launch from below the photo card, squash at launch, then stretch and grow larger as they arc upward
  4. The arc trajectory is curved (not linear) across the screen
  5. The animation runs without stutter at 60fps on a modern laptop (no dropped frames visible to the eye)
**Plans**: TBD

Plans:
- [ ] 09-01: TBD

### Phase 10: Star Visuals + Particles
**Goal**: Each star is a classic 5-pointed shape in the correct color, with a sparkle trail following it as it travels
**Depends on**: Phase 9
**Requirements**: STAR-01, STAR-02, STAR-03, STAR-04, ANIM-08
**Success Criteria** (what must be TRUE):
  1. Each star is visibly a classic 5-pointed star shape (not a circle, dot, or rounded shape)
  2. Passing `starColor="yellow"` produces gold/yellow stars; passing `starColor="blue"` produces blue stars
  3. Sparkle or particle trail follows behind each star during its upward arc
  4. The trail disappears naturally (fades or dissipates) rather than leaving permanent marks on screen
**Plans**: TBD

Plans:
- [ ] 10-01: TBD

### Phase 11: Impact + Landing
**Goal**: Stars reach the top, explode in a burst, arc back down onto the photo card, and the animation completes cleanly with the correct final star count shown
**Depends on**: Phase 10
**Requirements**: ANIM-09, ANIM-10, ANIM-11
**Success Criteria** (what must be TRUE):
  1. When a star reaches the top of the screen, a visible burst or explosion of sparkles/fireworks fires at that position
  2. After the burst, stars arc back downward and visibly embed/land on the contact photo card
  3. After landing, the photo card displays the correct `toStars` count (e.g., 2 stars if `toStars=2`)
  4. The `onComplete` callback fires exactly once after the full animation sequence ends
**Plans**: TBD

Plans:
- [ ] 11-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> 11
Note: Phase 7 (Settings Drawer) depends only on Phase 2, not on Phases 3-6. Phase 8 (Component API) depends only on Phase 1.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Setup | 2/2 | Complete | 2026-03-05 |
| 2. Design Tokens + Theme System | 1/1 | Complete | 2026-03-10 |
| 3. Contact Grid + Cards | 0/1 | Not started | - |
| 4. Popup Overlay | 0/? | Not started | - |
| 5. Grid Header | 0/? | Not started | - |
| 6. Filter System + Contact Count | 0/? | Not started | - |
| 7. Settings Drawer | 0/? | Not started | - |
| 8. Component API | 0/? | Not started | - |
| 9. Animation Core | 0/? | Not started | - |
| 10. Star Visuals + Particles | 0/? | Not started | - |
| 11. Impact + Landing | 0/? | Not started | - |
