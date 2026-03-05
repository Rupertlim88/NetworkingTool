# Requirements: Star Level-Up Animation Component

**Defined:** 2026-03-04
**Core Value:** The level-up animation must feel game-like and exciting — a moment that rewards the user for deepening a connection.

## v1 Requirements

### Animation Component API

- [ ] **API-01**: Component accepts `fromStars` prop (number: 1 | 2)
- [ ] **API-02**: Component accepts `toStars` prop (number: 2 | 3)
- [ ] **API-03**: Component accepts `contactPhoto` prop (image URL string)
- [ ] **API-04**: Component accepts `contactName` prop (string, displayed during animation)
- [ ] **API-05**: Component accepts `starColor` prop ("yellow" | "blue")
- [ ] **API-06**: Component accepts `onComplete` callback prop (fired when animation ends)
- [ ] **API-07**: Component is fully typed in TypeScript with no `any` types

### Animation Sequence

- [ ] **ANIM-01**: Triggering the component initiates a full-screen cinematic overlay (covers entire viewport)
- [ ] **ANIM-02**: Background transitions to a black/dark void (Pokémon-style dark flash)
- [ ] **ANIM-03**: Contact's photo card is visible centered on the dark background
- [ ] **ANIM-04**: New star(s) launch from the bottom of the photo card
- [ ] **ANIM-05**: Stars squash (compress vertically) at launch, then stretch (elongate) as they accelerate
- [ ] **ANIM-06**: Stars grow larger in size as they travel upward
- [ ] **ANIM-07**: Stars travel in a curved arc upward across the screen
- [ ] **ANIM-08**: Sparkle/trail particles follow behind each star as it travels
- [ ] **ANIM-09**: Stars reach the top of the screen and trigger an impact burst (fireworks/sparkle explosion)
- [ ] **ANIM-10**: Stars arc back downward and land/embed onto the photo card
- [ ] **ANIM-11**: Final state shows the photo card with updated star count (toStars)
- [ ] **ANIM-12**: Animation is smooth at 60fps

### Star System

- [ ] **STAR-01**: Stars are 5-pointed classic star shape
- [ ] **STAR-02**: Yellow variant for "recent contact" relationship status
- [ ] **STAR-03**: Blue variant for "actionable outcome" relationship status (referral, job lead, etc.)
- [ ] **STAR-04**: Stars in the final embedded state match the correct color

### Integration

- [ ] **INT-01**: Component has zero dependencies on any networking app data layer
- [ ] **INT-02**: Component is a self-contained folder (component + assets + types)
- [ ] **INT-03**: Component can be dropped into any React app via a single import

## v2 Requirements

### Enhancements

- **ENH-01**: Sound effects (optional, can be muted)
- **ENH-02**: Haptic feedback on mobile (future React Native port)
- **ENH-03**: Reduced-motion variant (respects `prefers-reduced-motion`)
- **ENH-04**: Animation speed prop (fast / normal / slow)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Contact grid UI | Future milestone — app shell |
| Blur overlay contact modal | Future milestone — app shell |
| Data layer / API | Future milestone — app shell |
| Authentication | Future milestone — app shell |
| React Native / mobile | Future milestone |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| INT-01 | Phase 1: Project Setup | Pending |
| INT-02 | Phase 1: Project Setup | Pending |
| INT-03 | Phase 1: Project Setup | Pending |
| API-01 | Phase 2: Component API | Pending |
| API-02 | Phase 2: Component API | Pending |
| API-03 | Phase 2: Component API | Pending |
| API-04 | Phase 2: Component API | Pending |
| API-05 | Phase 2: Component API | Pending |
| API-06 | Phase 2: Component API | Pending |
| API-07 | Phase 2: Component API | Pending |
| ANIM-01 | Phase 3: Animation Core | Pending |
| ANIM-02 | Phase 3: Animation Core | Pending |
| ANIM-03 | Phase 3: Animation Core | Pending |
| ANIM-04 | Phase 3: Animation Core | Pending |
| ANIM-05 | Phase 3: Animation Core | Pending |
| ANIM-06 | Phase 3: Animation Core | Pending |
| ANIM-07 | Phase 3: Animation Core | Pending |
| ANIM-12 | Phase 3: Animation Core | Pending |
| STAR-01 | Phase 4: Star Visuals + Particles | Pending |
| STAR-02 | Phase 4: Star Visuals + Particles | Pending |
| STAR-03 | Phase 4: Star Visuals + Particles | Pending |
| STAR-04 | Phase 4: Star Visuals + Particles | Pending |
| ANIM-08 | Phase 4: Star Visuals + Particles | Pending |
| ANIM-09 | Phase 5: Impact + Landing | Pending |
| ANIM-10 | Phase 5: Impact + Landing | Pending |
| ANIM-11 | Phase 5: Impact + Landing | Pending |

**Coverage:**
- v1 requirements: 26 total
- Mapped to phases: 26
- Unmapped: 0

---
*Requirements defined: 2026-03-04*
*Last updated: 2026-03-04 after roadmap creation — individual requirement-to-phase mapping established*
