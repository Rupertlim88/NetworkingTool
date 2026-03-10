# Phase 3: Contact Grid + Cards - Research

**Researched:** 2026-03-10
**Domain:** CSS Grid layout, GSAP ScrollTrigger animations, React component architecture
**Confidence:** HIGH

## Summary

Phase 3 builds the core visual element of the app: a responsive 5-column contact grid with 30 portrait cards featuring circular photos, layered shadows, hover effects, and GSAP ScrollTrigger entrance animations. The existing design token system (Phase 2) provides all color and shadow tokens needed -- components just reference CSS custom properties.

The implementation requires three distinct technical domains: (1) responsive CSS Grid with fixed breakpoints for 5/3/2 columns, (2) card component with layered box-shadow depth and hover scale+glow via CSS transitions, and (3) GSAP ScrollTrigger.batch() for staggered Z-axis entrance animations. All three are well-supported by the existing stack (Tailwind v4, GSAP 3.14, React 19).

**Primary recommendation:** Use CSS Grid with explicit breakpoints (not auto-fill) for the 5/3/2 column layout, a single `ContactCard` component referencing design tokens, and `ScrollTrigger.batch()` with the GSAP `z` property for the Z-axis pop entrance animation.

<user_constraints>
## User Constraints (from CONTEXT.md - Phase 02 covers Phases 2-7)

### Locked Decisions
- Card shape: portrait rectangle (~3:4 ratio), `rounded-2xl` (16px corners)
- Circular profile photo centered in upper area of card
- Name overlaid below photo on card surface
- Stars centered at bottom of card in their own strip
- Depth: layered box-shadow (2-3 shadow layers) for floating 3D widget feel
- Hover: `scale(1.02)` uniform scale-up + accent-colored glow around card border
- Card surface color: `--color-card-surface` (frosted glass for Teal, `#111827` for Midnight)
- Placeholder photos: user's own headshot image (same circular photo for all 30 contacts)
- Card entrance animation: Z-axis pop with stagger using GSAP ScrollTrigger
- Theme switch: cards instantly update via CSS variables
- Grid: 5 columns desktop (1024px+), 3 tablet (~768px), 2 mobile
- Max-width container: ~1400px, centered
- Card dimensions: ~254px wide x ~339px tall (3:4 ratio)
- Gap: 20px between cards
- Grid is the home page (`/`)
- 30 placeholder contacts
- Fixed viewport gradient bleed at top (~20% height, accent colors at 10-15% opacity)
- No visible scrollbar on grid page

### Claude's Discretion
- Empty state design (when grid has zero contacts)
- Exact mock contact names and data (use user's headshot photo for all)
- Star level distribution across 30 mock contacts (mix of 1, 2, 3 stars; mix of yellow and blue)
- Exact animation easing curves and timing fine-tuning
- Education inclusion in bio/resume section

### Deferred Ideas (OUT OF SCOPE)
- Header system, filter strip, settings drawer, contact count capsule (separate phases)
- Popup overlay (separate phase)
- Search/filter contacts by name
- Email template system
- LinkedIn data integration
- Per-person custom page design
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INT-01 | Component has zero dependencies on any networking app data layer | Mock data in `lib/mock-data.ts` with typed interfaces; ContactCard is a pure presentational component receiving props |
| INT-02 | Component is a self-contained folder (component + assets + types) | Card component in `components/ContactCard/` with index.tsx, types.ts; grid in `app/page.tsx` |
| INT-03 | Component can be dropped into any React app via a single import | ContactCard exports from barrel index, accepts typed props, references only CSS variables for theming |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.2.3 | Component framework | Already installed, project standard |
| Next.js | 16.1.6 | App Router, page routing | Already installed, `app/page.tsx` is grid home |
| Tailwind CSS | v4 | Utility-first styling, responsive breakpoints | Already configured with CSS-first `@config` directive |
| GSAP | 3.14.2 | ScrollTrigger entrance animations | Already installed, used for Z-axis pop + stagger |
| @gsap/react | 2.1.2 | useGSAP hook for React lifecycle integration | Already installed, handles cleanup |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| TypeScript | 5.x | Type safety for mock data and component props | All files |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS Grid with breakpoints | auto-fill/minmax | auto-fill stretches cards when few items remain; explicit breakpoints match the spec exactly (5/3/2) |
| ScrollTrigger.batch() | Individual ScrollTriggers per card | batch() is purpose-built for this use case -- groups elements entering viewport together for coordinated stagger |
| CSS aspect-ratio | Padding hack | aspect-ratio has full browser support now; cleaner code |

**Installation:**
```bash
# No new packages needed -- everything is already installed
```

## Architecture Patterns

### Recommended Project Structure
```
app/
  page.tsx                    # Grid home page (replace current placeholder)
components/
  ContactCard/
    index.tsx                 # ContactCard component
    types.ts                  # ContactCardProps interface
lib/
  mock-data.ts                # 30 mock contacts with typed interface
  constants.ts                # STAR_COLORS (existing)
public/
  headshot.jpg                # User's headshot for placeholder photos
```

### Pattern 1: Mock Data Module
**What:** Typed mock data array in `lib/mock-data.ts` with a `Contact` interface
**When to use:** Phase 3 uses mock data; real data layer comes later
**Example:**
```typescript
// lib/mock-data.ts
export interface Contact {
  id: string;
  name: string;
  photo: string;         // path to headshot image
  starLevel: 1 | 2 | 3;
  starColor: 'yellow' | 'blue';
}

export const MOCK_CONTACTS: Contact[] = [
  { id: '1', name: 'Alex Johnson', photo: '/headshot.jpg', starLevel: 3, starColor: 'yellow' },
  // ... 30 total
];
```

### Pattern 2: CSS Grid with Explicit Breakpoints
**What:** Use CSS Grid with media queries at 1024px and 768px for exact column counts
**When to use:** When you need precise column counts at specific breakpoints (not fluid)
**Example:**
```typescript
// In page.tsx -- Tailwind classes for responsive grid
<div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5 mx-auto max-w-[1400px] px-5">
  {contacts.map(contact => (
    <ContactCard key={contact.id} {...contact} />
  ))}
</div>
```

Note: Tailwind v4 default breakpoints: `md` = 768px, `lg` = 1024px. These match the spec exactly.

### Pattern 3: ContactCard as Pure Presentational Component
**What:** Card component receives all data via props, references only CSS variables for colors
**When to use:** Satisfies INT-01 (zero data layer deps) and INT-03 (single import portability)
**Example:**
```typescript
// components/ContactCard/index.tsx
'use client';

import { type ContactCardProps } from './types';
import { STAR_COLORS } from '@/lib/constants';

export function ContactCard({ name, photo, starLevel, starColor }: ContactCardProps) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-transform duration-200 hover:scale-[1.02]"
      style={{
        aspectRatio: '3 / 4',
        background: 'var(--color-card-surface)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Circular photo */}
      <div className="flex justify-center pt-6">
        <img
          src={photo}
          alt={name}
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>
      {/* Name */}
      <p className="text-center mt-3 font-medium" style={{ color: 'var(--color-text-primary)' }}>
        {name}
      </p>
      {/* Stars */}
      <div className="flex justify-center gap-1 mt-auto pb-4">
        {Array.from({ length: starLevel }, (_, i) => (
          <span key={i} style={{ color: STAR_COLORS[starColor] }}>&#9733;</span>
        ))}
      </div>
    </div>
  );
}
```

### Pattern 4: GSAP ScrollTrigger.batch() with Z-axis Pop
**What:** Use ScrollTrigger.batch() to animate cards entering viewport with staggered Z-axis translateZ
**When to use:** For the card entrance animation requirement
**Example:**
```typescript
// In page.tsx or a custom hook
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function ContactGrid({ contacts }: { contacts: Contact[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Set initial state: cards start pushed back in Z-space, invisible
    gsap.set('.contact-card', {
      opacity: 0,
      z: -100,         // pushed back in Z-space
      scale: 0.9,
    });

    ScrollTrigger.batch('.contact-card', {
      interval: 0.1,   // time window for batching
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          z: 0,          // pop to normal position
          scale: 1,
          duration: 0.6,
          stagger: { each: 0.08, grid: 'auto', from: 'start' },
          ease: 'back.out(1.2)',
          overwrite: true,
        });
      },
      once: true,       // only animate entrance once
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ perspective: '1000px' }}>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5 mx-auto max-w-[1400px] px-5">
        {contacts.map(contact => (
          <div key={contact.id} className="contact-card">
            <ContactCard {...contact} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Pattern 5: Fixed Viewport Gradient Bleed
**What:** A fixed-position gradient overlay at the top of the viewport that does not scroll with content
**When to use:** For the accent gradient bleed at top (~20% viewport height)
**Example:**
```typescript
// Fixed gradient overlay -- sits behind cards but in front of base background
<div
  className="fixed inset-x-0 top-0 pointer-events-none"
  style={{
    height: '20vh',
    background: 'var(--gradient-grid-bleed)',
    zIndex: 0,
  }}
/>
```

### Anti-Patterns to Avoid
- **auto-fill/minmax for this grid:** Would allow 1, 4, 6+ columns at various widths -- the spec demands exactly 5/3/2
- **Individual ScrollTrigger per card:** Creates 30 separate ScrollTrigger instances; batch() is optimized for this
- **Animating with CSS transitions on scroll:** No way to coordinate stagger timing; GSAP batch() handles this
- **Using `translateZ` string in GSAP:** GSAP uses the shorthand `z` property, not `translateZ`
- **Forgetting `perspective` on parent:** Without `perspective` on a parent element, `translateZ` has no visible effect
- **`'use client'` omission:** GSAP animations require client-side DOM access; mark components accordingly

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-based entrance detection | IntersectionObserver + manual batching | `ScrollTrigger.batch()` | Handles batching, cleanup, timing, and edge cases |
| Grid stagger calculation | Manual delay computation per card position | GSAP `stagger: { grid: 'auto' }` | Auto-calculates grid positions using getBoundingClientRect |
| 3D transform animations | CSS keyframes with translateZ | GSAP `z` property + `ease` | Consistent timing, can coordinate with batch, handles will-change |
| Responsive grid detection | resize observer + column counting | Tailwind responsive classes (`md:`, `lg:`) | Declarative, matches spec breakpoints exactly |
| Theme-reactive shadows | JS-based shadow switching | CSS `var(--shadow-card)` + `var(--shadow-card-hover-glow)` | Already defined in token system, instant theme switching |

**Key insight:** The Phase 2 token system already defines `--shadow-card`, `--shadow-card-hover-glow`, `--color-card-surface`, and `--gradient-grid-bleed` per theme. Cards just reference these tokens -- zero theme logic needed in component code.

## Common Pitfalls

### Pitfall 1: Missing `perspective` on Grid Container
**What goes wrong:** Cards animate `z` values but nothing visually changes
**Why it happens:** CSS 3D transforms require `perspective` on a parent element to create depth
**How to avoid:** Add `style={{ perspective: '1000px' }}` on the grid wrapper element
**Warning signs:** Cards appear/disappear but with no depth effect

### Pitfall 2: GSAP Plugin Registration in Next.js
**What goes wrong:** `ScrollTrigger is not defined` error or SSR crash
**Why it happens:** GSAP plugins must be registered once at module level, and only on the client
**How to avoid:** Register in the component file (not layout): `gsap.registerPlugin(ScrollTrigger)` at module scope in a `'use client'` file. The useGSAP hook from `@gsap/react` handles cleanup.
**Warning signs:** Hydration errors, undefined plugin errors

### Pitfall 3: ScrollTrigger Cleanup on Route Change
**What goes wrong:** Stale ScrollTrigger instances cause ghost animations or memory leaks
**Why it happens:** Next.js App Router preserves layout across navigations; ScrollTriggers survive
**How to avoid:** `useGSAP()` with `scope` parameter automatically handles cleanup via its return
**Warning signs:** Animations replay incorrectly on back-navigation

### Pitfall 4: Hover Glow Bleeding Through Rounded Corners
**What goes wrong:** Box-shadow glow visible outside rounded-2xl corners
**Why it happens:** `box-shadow` naturally extends beyond border-radius
**How to avoid:** This is actually desirable for a "glow" effect. If it looks wrong, use `outline` + `outline-offset` instead of box-shadow for the glow, or use `filter: drop-shadow()` which respects clipping
**Warning signs:** Harsh rectangular glow edges

### Pitfall 5: aspect-ratio Not Working with Content Overflow
**What goes wrong:** Cards stretch taller than 3:4 when name text is long
**Why it happens:** `aspect-ratio` is a suggestion that yields to content overflow
**How to avoid:** Add `overflow: hidden` on the card, and ensure text truncates with `text-overflow: ellipsis`
**Warning signs:** Cards of varying heights in the grid

### Pitfall 6: Initial Flash of Unanimated Cards
**What goes wrong:** Cards appear at full opacity briefly before GSAP sets initial state
**Why it happens:** React renders the DOM before useGSAP runs
**How to avoid:** Set initial card opacity to 0 via CSS (not GSAP), then let GSAP animate to 1. Or use `gsap.set()` in the `useGSAP` callback which runs synchronously after render.
**Warning signs:** Brief visible flash of cards before animation starts

## Code Examples

### Layered Box-Shadow for Depth (from existing tokens)
```css
/* Already in globals.css */
--shadow-card: 0 4px 6px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.2);
--shadow-card-hover-glow: 0 0 20px rgba(245, 158, 11, 0.3); /* teal theme */
```

```typescript
// Card hover effect via CSS transition
<div
  className="rounded-2xl transition-all duration-200 hover:scale-[1.02]"
  style={{
    boxShadow: 'var(--shadow-card)',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow = `var(--shadow-card), var(--shadow-card-hover-glow)`;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow = 'var(--shadow-card)';
  }}
>
```

Alternative (CSS-only, recommended):
```css
.contact-card {
  box-shadow: var(--shadow-card);
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.contact-card:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-card), var(--shadow-card-hover-glow);
}
```

### Star Rating Display
```typescript
import { STAR_COLORS } from '@/lib/constants';

function StarRating({ level, color }: { level: 1 | 2 | 3; color: 'yellow' | 'blue' }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: level }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="w-4 h-4" fill={STAR_COLORS[color]}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}
```

### Hidden Scrollbar
```css
/* Hide scrollbar while maintaining scroll functionality */
body {
  scrollbar-width: none;        /* Firefox */
  -ms-overflow-style: none;     /* IE/Edge */
}
body::-webkit-scrollbar {
  display: none;                /* Chrome/Safari */
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Padding hack for aspect ratio | `aspect-ratio: 3/4` CSS property | Baseline 2022 | Simpler code, no wrapper needed |
| IntersectionObserver manual batching | `ScrollTrigger.batch()` | GSAP 3.5+ | Built-in batching, stagger, cleanup |
| `forwardRef` for ref passing | Ref as regular prop | React 19 | Simpler component signatures |
| GSAP paid license | Free for all uses | 2024 (Webflow acquisition) | No licensing concerns |

**Deprecated/outdated:**
- `forwardRef`: Not needed in React 19, use ref as a regular prop
- GSAP `CSSPlugin` separate import: Bundled automatically since GSAP 3.x

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected -- needs setup in Wave 0 |
| Config file | none -- see Wave 0 |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| INT-01 | ContactCard has zero data layer dependencies | unit | Check imports contain no data fetching | No -- Wave 0 |
| INT-02 | ContactCard is self-contained folder | smoke | Verify file structure exists | No -- Wave 0 |
| INT-03 | ContactCard can be imported standalone | unit | Import and render with mock props | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** Manual visual verification (dev server)
- **Per wave merge:** Visual check of all breakpoints (desktop/tablet/mobile)
- **Phase gate:** Grid renders 30 cards at all breakpoints, animations fire on scroll

### Wave 0 Gaps
- [ ] No test framework installed -- project has no jest/vitest config
- [ ] No test files exist for any component
- [ ] Framework install: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom` (if testing is desired)
- [ ] Given this is a highly visual/animation-heavy phase, manual visual verification via `npm run dev` is the primary validation method

*(Note: Given the visual nature of this phase -- CSS grid layout, box shadows, hover effects, scroll animations -- automated unit tests provide limited value. The primary validation is visual inspection at each breakpoint. The planner should prioritize build-and-verify tasks over test-first approaches.)*

## Open Questions

1. **User headshot image**
   - What we know: User wants their own headshot for all 30 placeholder contacts
   - What's unclear: Whether the image file already exists or needs to be provided/placed
   - Recommendation: Plan a task to add a placeholder headshot to `public/headshot.jpg`; use a generic avatar SVG as fallback

2. **Star rendering -- SVG vs Unicode**
   - What we know: Stars need to be 5-pointed, colored yellow or blue
   - What's unclear: Exact size and style (filled vs outlined, inner/outer radius ratio)
   - Recommendation: Use inline SVG for crisp rendering at any size; Claude's discretion per CONTEXT.md

3. **Scrollbar hiding scope**
   - What we know: "No visible scrollbar on grid page" is specified
   - What's unclear: Whether this is page-level only or should be a global style
   - Recommendation: Apply to body/html level since this is the home page and the app aesthetic demands it

## Sources

### Primary (HIGH confidence)
- GSAP ScrollTrigger.batch() official docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.batch/
- GSAP Staggers documentation: https://gsap.com/resources/getting-started/Staggers/
- GSAP community forum on translateZ: https://gsap.com/community/forums/topic/27269-how-to-styletransform-translatez85px/
- Existing project files: `globals.css`, `ThemeProvider.tsx`, `lib/theme.ts`, `lib/constants.ts`

### Secondary (MEDIUM confidence)
- CSS Grid auto-fill vs auto-fit: https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/
- CSS Grid minmax() deep dive: https://ishadeed.com/article/css-grid-minmax/
- GSAP + Next.js 2025 guide: https://javascript.plainenglish.io/setting-up-gsap-with-next-js-2025-edition-bcb86e48eab6

### Tertiary (LOW confidence)
- None -- all findings verified with primary sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all libraries already installed and configured in project
- Architecture: HIGH - CSS Grid + GSAP ScrollTrigger.batch() are well-documented, standard approaches
- Pitfalls: HIGH - sourced from official GSAP docs and community forums, verified with project code
- Mock data structure: HIGH - straightforward TypeScript interface matching CONTEXT.md specifications

**Research date:** 2026-03-10
**Valid until:** 2026-04-10 (stable technologies, no fast-moving concerns)
