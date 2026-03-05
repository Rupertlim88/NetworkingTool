# Phase 2: Visual Foundation - Research

**Researched:** 2026-03-05
**Domain:** CSS Design Tokens, Multi-Theme Architecture, GSAP Scroll Animations, Next.js Client Components, Complex UI Composition
**Confidence:** HIGH

## Summary

Phase 2's scope has expanded far beyond the original roadmap's "rough contact grid and popup overlay." The context discussion produced 16 distinct UI subsystems spanning design tokens, three themes, a dual-mode morphing header, settings drawer, filter system with dropdown, contact count capsule with aurora gradient effects, per-letter gradient text, and number roll animations. This research covers the technical foundation for ALL of these subsystems so the planner can split this into appropriately-sized phases.

The core architectural decision is CSS custom properties with `[data-theme]` attribute selectors -- already partially implemented in Phase 1. The project uses Next.js 16 App Router with React 19, Tailwind v4, and GSAP 3.14 (with ScrollTrigger, Flip, and useGSAP already installed). No new dependencies are needed for any Phase 2 work -- everything can be built with the existing stack.

**Primary recommendation:** Extend the existing CSS custom property system into a comprehensive three-tier token architecture (primitives -> semantic -> component), build all interactive components as `'use client'` client components, and use GSAP for all scroll-driven and complex animations while keeping simple hover/transition effects in CSS.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- All visual properties defined as CSS custom properties (variables) -- single source of truth
- Components only reference tokens, never raw values
- Theme blocks: `[data-theme="teal"]`, `[data-theme="midnight"]`, `[data-theme="aurora"]`
- Three themes: Teal (default, `#071a2e` bg, amber/cyan accents), Midnight (`#0a0f1e` bg, coral/electric blue accents), Aurora (full warm gradient bg, multi-color gradient system)
- Contact card: portrait rectangle ~3:4, `rounded-2xl`, circular photo, layered box-shadow, hover `scale(1.02)` + accent glow, Z-axis entrance animation with GSAP ScrollTrigger stagger
- Popup overlay: card-expand animation via GSAP Flip, near-black `#0d0d0d` surface, `backdrop-filter: blur(12px)`, max-width 550px, max-height 80vh
- Grid: 5 columns desktop, 3 tablet, 2 mobile, ~1400px max-width, 20px gaps, 30 placeholder contacts
- Grid background: fixed viewport gradient bleed at top (~20% viewport height, accent colors at 10-15% opacity)
- Settings drawer: slides from LEFT, full-screen, ~400-500ms, near-black `#0d0d0d`, standalone `<SettingsPanel />` component
- Grid header dual-mode: static floating widget at top -> fixed full-width shelf on scroll-up -> morphing transition between modes via GSAP
- Header scroll behavior: Zone A/B logic, intent threshold (scroll-up by ~header height distance)
- "NETWORKING TOOL" title: all caps, bold, per-letter CSS gradient, theme-influenced spectrum
- Theme swatches in header: landscape rectangles, gradient top, inset active state, custom pill tooltips with delay
- Gear icon: white 60-70%, accent hover, LEFT side of header
- Filter strip: separate from header, scrolls away statically, does NOT reappear on scroll-up
- Contact count capsule: luminous aurora gradient orb (multiple radial-gradient + mix-blend-mode), gold shimmering number, scroll/roll number transition
- Filter system: funnel icon, dropdown with lighter surface, fade+scale open, icon+name+count interior, sticky behavior, internal scrollbar
- All code must be written for easy future settings extensibility
- User's own headshot photo for all 30 placeholder contacts

### Claude's Discretion
- Empty state design (when grid has zero contacts)
- Exact mock contact names and data (use user's headshot photo for all)
- Star level distribution across 30 mock contacts (mix of 1, 2, 3 stars; mix of yellow and blue)
- Exact animation easing curves and timing fine-tuning
- Education inclusion in bio/resume section

### Deferred Ideas (OUT OF SCOPE)
- Search/filter contacts by name -- future phase (Milestone 2 with real data)
- Email template system -- future phase
- LinkedIn data integration via MCP -- future milestone
- Sidebar with settings -- future phase
- Per-person custom page design (`/contacts/[id]`) -- Milestone 2
- Custom filter creation with user-defined rules -- future phase
- Additional themes beyond Teal, Midnight, Aurora -- future
- Always-on capsule aurora animation -- future (one-line toggle)
- Settings sections: Account, Notifications, etc. -- future phases

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INT-01 | Component has zero dependencies on any networking app data layer | Design token architecture + mock data patterns ensure UI is decoupled from data layer |
| INT-02 | Component is a self-contained folder (component + assets + types) | Component folder structure patterns documented; each UI subsystem as self-contained module |
| INT-03 | Component can be dropped into any React app via a single import | Client component patterns with `'use client'` directive; theme provider pattern enables portability |

**Note:** INT-01/02/03 were originally scoped for the StarLevelUpAnimation component in Phase 1. For Phase 2's expanded scope, these requirements apply broadly: all new UI components should remain self-contained, data-independent (using mock data), and cleanly importable.

</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | App Router framework | Already installed; provides routing, layouts, SSR |
| React | 19.2.3 | UI framework | Already installed; latest with `use` API |
| GSAP | 3.14.2 | Complex animations | Already installed; ScrollTrigger, Flip, useGSAP included |
| @gsap/react | 2.1.2 | React GSAP integration | Already installed; `useGSAP` hook for cleanup |
| Tailwind CSS | 4.x | Utility-first CSS | Already installed; CSS-first config with `@config` directive |

### Supporting (No New Installs Needed)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| GSAP ScrollTrigger | (bundled) | Scroll-driven animations | Header morphing, card entrance stagger, capsule re-entry |
| GSAP Flip | (bundled) | Layout transition animations | Card-to-popup expand animation, More Info -> full page |
| CSS Custom Properties | (native) | Design token system | All theming, all component styling |
| CSS `backdrop-filter` | (native) | Blur overlay | Popup background blur effect |
| CSS `background-clip: text` | (native) | Per-letter gradient text | "NETWORKING TOOL" title |
| CSS `mix-blend-mode` | (native) | Aurora orb effect | Contact count capsule gradient blobs |
| `localStorage` | (native) | Theme persistence | Save user's theme preference |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| GSAP ScrollTrigger | Intersection Observer | IO is lighter but lacks scroll-direction detection, scrub, and morphing capabilities needed for header Zone A/B logic |
| GSAP Flip | Framer Motion layoutId | FM's layoutId is simpler but GSAP Flip gives precise control over absolute positioning during animation, needed for card-expand |
| Custom CSS tooltips | Radix UI Tooltip | Radix adds a dependency; custom tooltips are simple enough (pill shape, delay, themed colors) and avoid bundle bloat |
| Manual number animation | number-flip library | Library adds dependency for a single use case; GSAP can animate translateY on digit columns trivially |

**Installation:** No new packages needed. All functionality is covered by the existing stack.

## Architecture Patterns

### Recommended Project Structure
```
app/
  layout.tsx              # Root layout - add data-theme, ThemeProvider
  page.tsx                # Home page - contact grid (client component)
  contacts/
    [id]/
      page.tsx            # Placeholder contact detail page
  globals.css             # Design tokens (CSS custom properties)

components/
  ThemeProvider.tsx        # 'use client' - manages data-theme + localStorage
  GridHeader/
    GridHeader.tsx         # 'use client' - dual-mode header with scroll logic
    HeaderTitle.tsx        # Per-letter gradient "NETWORKING TOOL"
    ThemeSwatches.tsx      # Theme toggle swatches with tooltips
    GearIcon.tsx           # Settings drawer trigger
  FilterStrip/
    FilterStrip.tsx        # Filter icon + contact count capsule
    ContactCountCapsule.tsx # Aurora orb with gold number
    FilterDropdown.tsx     # Dropdown panel with filter list
  ContactGrid/
    ContactGrid.tsx        # 'use client' - grid layout + card rendering
    ContactCard.tsx        # Individual card with hover/entrance animation
  ContactPopup/
    ContactPopup.tsx       # 'use client' - overlay + popup content
    PopupContent.tsx       # Photo, name, tags, stars, bio, actions
  SettingsDrawer/
    SettingsDrawer.tsx     # 'use client' - left slide drawer
    SettingsPanel.tsx      # Standalone settings content (reusable container)
    ThemeToggle.tsx        # Theme selection squares with sliding cover
  Tooltip/
    Tooltip.tsx            # Reusable custom tooltip component

lib/
  constants.ts             # Existing: STAR_COLORS. Add: THEMES, MOCK_CONTACTS
  theme.ts                 # Theme types, token names, helper functions
  mock-data.ts             # 30 placeholder contacts with varied star levels

public/
  headshot.jpg             # User's headshot for placeholder contacts
```

### Pattern 1: Three-Tier Design Token Architecture
**What:** CSS custom properties organized in three layers: primitives, semantic tokens, and component tokens
**When to use:** Always -- every visual property must flow through this system
**Example:**
```css
/* Source: CSS custom properties best practices + project CONTEXT.md decisions */

/* === TIER 1: Primitives (raw values, never referenced by components) === */
@layer base {
  :root {
    /* Teal palette */
    --primitive-teal-bg: #071a2e;
    --primitive-amber: #f59e0b;
    --primitive-cyan: #22d3ee;
    /* Midnight palette */
    --primitive-midnight-bg: #0a0f1e;
    --primitive-coral: #ff6b6b;
    --primitive-electric-blue: #4fc3f7;
    /* Shared */
    --primitive-surface-dark: #0d0d0d;
    --primitive-surface-card-dark: #1a1a1a;
  }

  /* === TIER 2: Semantic tokens (theme-switched) === */
  :root,
  [data-theme="teal"] {
    --color-grid-bg: var(--primitive-teal-bg);
    --color-card-surface: rgba(255, 255, 255, 0.08);
    --color-accent-primary: var(--primitive-amber);
    --color-accent-secondary: var(--primitive-cyan);
    --color-accent-primary-15: rgba(245, 158, 11, 0.15);
    --gradient-header-title: linear-gradient(
      90deg, #f59e0b, #fbbf24, #f5f5f5, #22d3ee, #0d9488
    );
    --shadow-card: 0 4px 6px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.2);
    --shadow-card-hover-glow: 0 0 20px rgba(245,158,11,0.3);
  }

  [data-theme="midnight"] {
    --color-grid-bg: var(--primitive-midnight-bg);
    --color-card-surface: #111827;
    --color-accent-primary: var(--primitive-coral);
    --color-accent-secondary: var(--primitive-electric-blue);
    --color-accent-primary-15: rgba(255, 107, 107, 0.15);
    --gradient-header-title: linear-gradient(
      90deg, #ff6b6b, #f472b6, #e2e2f0, #4fc3f7, #1e3a5f
    );
    --shadow-card: 0 4px 6px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3);
    --shadow-card-hover-glow: 0 0 20px rgba(255,107,107,0.3);
  }

  [data-theme="aurora"] {
    /* Aurora uses gradient background, different token structure */
    --color-grid-bg: #1a0a2e; /* fallback solid */
    --gradient-grid-bg: linear-gradient(
      135deg, #f59e0b, #ef4444, #ec4899, #d946ef, #8b5cf6
    );
    /* Aurora-specific tokens deferred to respective element phases */
  }
}
```

### Pattern 2: Theme Provider with localStorage Persistence
**What:** Client component that manages `data-theme` attribute on `<html>` and syncs to localStorage
**When to use:** Root layout wraps children in ThemeProvider
**Example:**
```typescript
// Source: Next.js App Router client component patterns + project decisions
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'teal' | 'midnight' | 'aurora';

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: 'teal', setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('teal');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved && ['teal', 'midnight', 'aurora'].includes(saved)) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  const handleSetTheme = (t: Theme) => {
    setTheme(t);
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

### Pattern 3: GSAP ScrollTrigger for Header Dual-Mode
**What:** Scroll direction detection with Zone A/B logic for header morphing
**When to use:** Grid header component needs to transition between static and fixed modes
**Example:**
```typescript
// Source: GSAP ScrollTrigger docs + GSAP community forums
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function GridHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const fixedHeaderRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const headerHeight = headerRef.current?.offsetHeight ?? 56;
    const zoneThreshold = headerHeight * 1.5;
    let lastDirection = 1; // 1 = down, -1 = up

    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        const scrollY = self.scroll();
        const direction = self.direction; // -1 = up, 1 = down

        // Zone B: near top of page
        if (scrollY < zoneThreshold) {
          // Hide fixed header, let static header be visible
          gsap.to(fixedHeaderRef.current, {
            y: -headerHeight,
            duration: 0.2,
            ease: 'power2.out',
          });
          return;
        }

        // Zone A: deep in page
        if (direction === -1 && lastDirection === 1) {
          // Started scrolling up: show fixed header
          gsap.to(fixedHeaderRef.current, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        } else if (direction === 1 && lastDirection === -1) {
          // Started scrolling down: hide fixed header
          gsap.to(fixedHeaderRef.current, {
            y: -headerHeight,
            duration: 0.3,
            ease: 'power2.out',
          });
        }

        lastDirection = direction;
      },
    });
  }, { scope: headerRef });

  return (/* header JSX */);
}
```

### Pattern 4: GSAP Flip for Card-to-Popup Expand
**What:** Animate a card from its grid position to a centered popup overlay
**When to use:** Contact card click opens popup with FIRST/LAST/INVERT/PLAY transition
**Example:**
```typescript
// Source: GSAP Flip plugin docs + React integration guidance
'use client';

import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

function openPopup(cardElement: HTMLElement, popupElement: HTMLElement) {
  // 1. Capture card's current position
  const state = Flip.getState(cardElement);

  // 2. Move card content into popup container (or clone)
  // ... DOM manipulation ...

  // 3. Animate from old position to new centered position
  Flip.from(state, {
    duration: 0.35,
    ease: 'power2.out',
    absolute: true, // Prevents layout reflow during animation
    scale: true,     // Uses scaleX/Y instead of width/height
    onComplete: () => {
      // Popup is now fully open
    },
  });
}
```

**React-specific note:** In React, use `requestAnimationFrame` or `useLayoutEffect` to ensure DOM has updated before calling `Flip.from()`. Use `data-flip-id` attributes to correlate elements across re-renders.

### Pattern 5: Per-Letter Gradient Text
**What:** Apply CSS gradient across individual letters of "NETWORKING TOOL"
**When to use:** Header title with theme-influenced color spectrum
**Example:**
```typescript
// Source: CSS background-clip: text technique
function HeaderTitle() {
  return (
    <h1
      className="text-xl font-bold uppercase tracking-wider"
      style={{
        backgroundImage: 'var(--gradient-header-title)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 0 2px rgba(0,0,0,0.35)',
      }}
    >
      NETWORKING TOOL
    </h1>
  );
}
```

**Important:** `text-shadow` does NOT work with `-webkit-text-fill-color: transparent` in all browsers. Use a pseudo-element or `filter: drop-shadow()` as an alternative for the dark text shadow effect. Test thoroughly.

### Pattern 6: Aurora Gradient Orb (Contact Count Capsule)
**What:** Multiple overlapping radial gradients with blend modes for a luminous Siri-like orb
**When to use:** Contact count capsule background
**Example:**
```css
/* Source: CSS radial-gradient + mix-blend-mode techniques */
.aurora-orb {
  position: relative;
  overflow: hidden;
  border-radius: 9999px;
}

.aurora-orb::before,
.aurora-orb::after {
  content: '';
  position: absolute;
  inset: -20%;
  border-radius: 50%;
  filter: blur(8px);
  mix-blend-mode: screen;
}

.aurora-orb::before {
  background: radial-gradient(
    circle at 30% 40%,
    rgba(34, 211, 238, 0.6) 0%,
    transparent 60%
  );
}

.aurora-orb::after {
  background: radial-gradient(
    circle at 70% 60%,
    rgba(168, 85, 247, 0.5) 0%,
    transparent 60%
  );
}

/* Additional blobs via extra child elements */
```

### Pattern 7: Number Roll/Scroll Animation
**What:** Vertical scroll transition for contact count digits
**When to use:** When filter changes update the displayed count
**Example:**
```typescript
// Source: GSAP animation + overflow clipping technique
function animateNumberRoll(
  container: HTMLElement,
  oldValue: number,
  newValue: number,
  duration = 0.45
) {
  const goingUp = newValue > oldValue;
  const enterFrom = goingUp ? '100%' : '-100%'; // Enter from bottom or top
  const exitTo = goingUp ? '-100%' : '100%';     // Exit upward or downward

  // Old number exits
  gsap.to(container.querySelector('.current'), {
    yPercent: parseInt(exitTo),
    opacity: 0,
    duration,
    ease: 'power2.out',
  });

  // New number enters
  gsap.fromTo(
    container.querySelector('.incoming'),
    { yPercent: parseInt(enterFrom), opacity: 0 },
    { yPercent: 0, opacity: 1, duration, ease: 'power2.out' }
  );
}
```

### Anti-Patterns to Avoid
- **Marking everything as `'use client'`:** Only components that need interactivity, hooks, or browser APIs should be client components. The root layout should remain a server component with ThemeProvider as a client wrapper.
- **Importing server components into client components:** Pass server components as `children` props instead.
- **Using raw color values in components:** Always reference CSS custom property tokens. Never hardcode `#f59e0b` in a component -- use `var(--color-accent-primary)`.
- **Using GSAP for simple hover effects:** CSS transitions handle `scale(1.02)` and glow effects more efficiently. Reserve GSAP for complex multi-step animations (card entrance, header morph, number roll).
- **Creating separate scroll listeners alongside ScrollTrigger:** Use a single ScrollTrigger instance for the header. Multiple scroll listeners cause performance issues and race conditions.
- **Forgetting `useGSAP` cleanup:** Always use `useGSAP` hook with `scope` parameter or `gsap.context()` with cleanup. Orphaned GSAP tweens cause memory leaks on route changes.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll direction detection | Custom scroll event listener with debouncing | GSAP ScrollTrigger `onUpdate` with `self.direction` | Handles edge cases (momentum scrolling, rubber-banding, mobile), already included |
| Card layout animation | Manual position calculation + CSS transitions | GSAP Flip plugin | Handles absolute positioning, scale vs width/height, parent offset compensation |
| Animation cleanup in React | Manual useEffect with GSAP.kill() | `useGSAP` hook from `@gsap/react` | Automatic context cleanup, proper scope management |
| Theme switching mechanism | Custom event system or Redux | CSS custom properties + `data-theme` attribute | Zero JS runtime cost for style changes, instant cascade update |
| Tooltip positioning | Manual DOM measurement + absolute positioning | CSS-only tooltip with pseudo-elements or a simple positioned div | Simple enough for pill tooltips above swatches, no complex edge detection needed |
| Filter dropdown overlay | z-index management + manual backdrop | `position: fixed` + CSS stacking context | Keep the dropdown simple, avoid portal complexity for a non-modal dropdown |

**Key insight:** The project already has GSAP with all needed plugins installed. Every animation problem in Phase 2 has a GSAP-native solution. Adding Framer Motion or other animation libraries would create redundancy and increase bundle size unnecessarily.

## Common Pitfalls

### Pitfall 1: GSAP Flip with React Re-renders
**What goes wrong:** React re-renders create new DOM elements, breaking the reference between `Flip.getState()` and the current elements.
**Why it happens:** React's reconciliation replaces DOM nodes, so the captured state no longer matches.
**How to avoid:** Use `data-flip-id` attributes on elements. Call `Flip.from()` inside `requestAnimationFrame` or `useLayoutEffect` after state update. Specify `targets` explicitly in Flip options.
**Warning signs:** Animation snaps to final position instead of smoothly transitioning.

### Pitfall 2: backdrop-filter Performance on Large Blur Values
**What goes wrong:** `backdrop-filter: blur(12px)` on a full-viewport overlay causes frame drops, especially on lower-end devices.
**Why it happens:** Browser must composite the entire scene behind the element, then apply the blur filter.
**How to avoid:** Use `blur(0px)` as default state, only apply full blur when overlay is visible. Keep the overlay element unmounted or `display: none` when not needed. Consider `will-change: backdrop-filter` for the transition.
**Warning signs:** Popup open/close animation stutters below 60fps.

### Pitfall 3: CSS Gradient Text Shadow Conflict
**What goes wrong:** `text-shadow` property has no visible effect when `-webkit-text-fill-color: transparent` is set.
**Why it happens:** The text shadow is drawn behind the text, but since the text fill is transparent, the shadow color shows through, creating unexpected results.
**How to avoid:** Use `filter: drop-shadow(0 0 2px rgba(0,0,0,0.35))` on the text element instead, or create a pseudo-element behind the text with the shadow.
**Warning signs:** Dark text shadow is invisible or shows gradient colors in the shadow.

### Pitfall 4: ScrollTrigger + Fixed Elements
**What goes wrong:** ScrollTrigger calculations become incorrect when animating between `position: static` and `position: fixed`.
**Why it happens:** Fixed elements are removed from document flow, causing scroll height changes.
**How to avoid:** Use two separate header elements (static and fixed) rather than toggling position on one element. The static header is part of document flow; the fixed header is always `position: fixed` but hidden off-screen with `transform: translateY(-100%)`.
**Warning signs:** Page jumps or jitters when header transitions between modes.

### Pitfall 5: Theme Flash on Initial Load
**What goes wrong:** Page renders with default theme (teal) before JavaScript reads localStorage and applies the saved theme, causing a visible flash.
**Why it happens:** CSS renders before JavaScript hydration in Next.js.
**How to avoid:** Add a blocking `<script>` tag in the `<head>` (via Next.js `beforeInteractive` Script component) that reads localStorage and sets `data-theme` before paint. Or use a cookie-based approach that can be read server-side.
**Warning signs:** Users who selected Midnight theme briefly see Teal on every page load.

### Pitfall 6: Fixed Background Gradient Not Working on Mobile
**What goes wrong:** `background-attachment: fixed` does not work on iOS Safari and some mobile browsers.
**Why it happens:** Mobile browsers optimize scrolling by not re-compositing fixed backgrounds.
**How to avoid:** Use a `position: fixed` pseudo-element or a separate fixed `<div>` behind the scrollable content for the gradient. This is more reliable cross-browser.
**Warning signs:** Gradient scrolls with content on mobile devices.

### Pitfall 7: Tailwind v4 CSS-First Config Gotchas
**What goes wrong:** Custom CSS properties defined in `@layer base` may conflict with Tailwind v4's layer ordering.
**Why it happens:** Tailwind v4 uses CSS layers internally; custom `@layer base` blocks must integrate with Tailwind's layer system.
**How to avoid:** Define theme tokens in `@layer base` as already established. Use `@theme inline` for values that need to be available as Tailwind utilities. Keep Tailwind's `@config` directive at the top.
**Warning signs:** Tailwind utility classes don't pick up custom property values, or custom properties are overridden by Tailwind's reset.

## Code Examples

### Full-Screen Settings Drawer with GSAP
```typescript
// Source: GSAP animation patterns + project decisions
'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function SettingsDrawer({ isOpen, onClose, children }: SettingsDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drawerRef.current) return;

    if (isOpen) {
      gsap.to(drawerRef.current, {
        x: 0,
        duration: 0.45,
        ease: 'power2.out',
      });
    } else {
      gsap.to(drawerRef.current, {
        x: '-100%',
        duration: 0.45,
        ease: 'power2.out',
      });
    }
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <div
      ref={drawerRef}
      className="fixed inset-0 z-50 bg-[#0d0d0d]"
      style={{ transform: 'translateX(-100%)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Settings"
    >
      {children}
    </div>
  );
}
```

### Popup Overlay with Backdrop Blur
```typescript
// Source: CSS backdrop-filter + project popup decisions
'use client';

export function PopupOverlay({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      />
      {/* Popup content */}
      <div
        className="relative z-10 w-full max-w-[550px] max-h-[80vh] overflow-y-auto rounded-2xl bg-[#0d0d0d]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
```

### Contact Card with Hover Effects (CSS-Only)
```typescript
// Source: Project card decisions + Tailwind utility patterns
export function ContactCard({ contact }: { contact: MockContact }) {
  return (
    <div
      className="
        relative aspect-[3/4] rounded-2xl
        bg-[var(--color-card-surface)]
        transition-transform duration-200 ease-out
        hover:scale-[1.02]
        cursor-pointer
      "
      style={{
        boxShadow: 'var(--shadow-card)',
      }}
      // Hover glow added via CSS :hover pseudo-class in globals.css
    >
      {/* Circular photo */}
      <div className="flex justify-center pt-6">
        <img
          src="/headshot.jpg"
          alt={contact.name}
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>
      {/* Name */}
      <p className="text-center text-white font-medium mt-3">{contact.name}</p>
      {/* Stars */}
      <div className="flex justify-center gap-1 mt-auto pb-4">
        {/* Star rendering using STAR_COLORS from constants */}
      </div>
    </div>
  );
}
```

### Custom Pill Tooltip
```css
/* Source: Project tooltip decisions */
.tooltip-trigger {
  position: relative;
}

.tooltip-trigger .tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 150ms ease-out;
  /* Theme-specific colors via CSS variables */
  background: var(--tooltip-bg);
  color: var(--tooltip-text);
  border: 1px solid var(--color-accent-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.tooltip-trigger:hover .tooltip {
  opacity: 1;
  transition-delay: 250ms;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@apply` directives in Tailwind | Tailwind v4 CSS-first with `@theme inline` | 2024-2025 | Project already uses v4 pattern; tokens integrate via `@theme inline` |
| `prefers-color-scheme` only | `data-theme` attribute + media query fallback | 2023+ | `data-theme` gives user control; already implemented |
| Framer Motion for all animations | GSAP for complex, CSS for simple | Ongoing | Project locked into GSAP; appropriate given ScrollTrigger/Flip needs |
| React portals for overlays | Direct fixed-position client components | 2024+ | Portals add complexity; fixed positioning with z-index sufficient for drawers/popups |
| JavaScript scroll listeners | ScrollTrigger + IntersectionObserver | 2023+ | GSAP handles all scroll detection; eliminates manual listener management |

**Deprecated/outdated:**
- `background-attachment: fixed` for mobile gradient: Does not work on iOS. Use `position: fixed` element instead.
- `counter-set` CSS property for animated numbers: Poor browser support (no Safari). Use GSAP translateY animation on digit columns.
- Tailwind `darkMode: 'class'` config: Not needed in Tailwind v4; `data-theme` attribute approach supersedes.

## Open Questions

1. **Aurora Theme Token Structure**
   - What we know: Aurora uses a warm gradient background fundamentally different from solid-color themes. Multi-color gradient tokens needed.
   - What's unclear: How each UI element (cards, header, popup, capsule) adapts to the warm gradient. All Aurora element-specific decisions deferred to respective phase discussions per CONTEXT.md.
   - Recommendation: Build the token architecture with an Aurora placeholder block (`[data-theme="aurora"]`). Define `--gradient-grid-bg` but defer element-specific Aurora tokens until each element's phase.

2. **Header Morphing Transition Smoothness**
   - What we know: Zone A to Zone B transition requires edges contracting, corners rounding, shadow fading -- tied to scroll position over ~200-300ms.
   - What's unclear: Whether GSAP can smoothly interpolate `border-radius` changes while simultaneously changing width during scroll. CSS `transition` on the fixed header may compete with GSAP scroll-driven updates.
   - Recommendation: Use two separate header elements (static in document flow, fixed off-screen). Cross-fade between them at the Zone A/B boundary. This avoids complex position/width interpolation.

3. **text-shadow with Gradient Text**
   - What we know: `text-shadow` does not render visually with `-webkit-text-fill-color: transparent`. User wants "subtle dark text shadow (~2px blur, black at 30-40% opacity)."
   - What's unclear: Whether `filter: drop-shadow()` produces acceptable results on gradient text, or if a pseudo-element approach is needed.
   - Recommendation: Prototype both approaches. `filter: drop-shadow()` is simpler; fallback to duplicated pseudo-element if quality is insufficient.

4. **Exact Gap Dimensions**
   - What we know: Several gaps are tentative in CONTEXT.md (header floating margins ~4-6px, gap between header and filter strip, filter strip margins).
   - What's unclear: Final pixel values.
   - Recommendation: Use CSS custom properties for all spacing values so they can be tuned visually during implementation without code refactoring.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | No test framework currently installed |
| Config file | none -- see Wave 0 |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| INT-01 | Components have no data layer dependencies | manual-only | Visual inspection of imports | N/A |
| INT-02 | Components are self-contained folders | manual-only | Check folder structure | N/A |
| INT-03 | Components importable via single import | manual-only | Verify index exports | N/A |

**Note:** Phase 2 is primarily visual/UI work. The requirements (INT-01/02/03) are structural constraints best verified by code review and build success rather than automated tests. Visual correctness requires manual inspection in the browser.

### Sampling Rate
- **Per task commit:** `npm run build` (catches TypeScript errors, import issues)
- **Per wave merge:** `npm run build` + manual visual review in browser
- **Phase gate:** Build succeeds + all visual elements render correctly in both Teal and Midnight themes

### Wave 0 Gaps
- [ ] No test framework installed (consider adding Vitest if automated tests become necessary in later phases)
- [ ] No visual regression testing (acceptable for prototyping phase; consider Playwright screenshots for future phases)

## Sources

### Primary (HIGH confidence)
- Project `globals.css` -- existing CSS custom property pattern with `[data-theme]` selectors
- Project `package.json` -- confirmed GSAP 3.14.2, Next.js 16.1.6, React 19.2.3, Tailwind v4
- Project `tailwind.config.ts` -- confirmed Tailwind color extension pattern with CSS variables
- Project `lib/constants.ts` -- confirmed STAR_COLORS constants
- GSAP Skill file (`.agents/skills/gsap/SKILL.md`) -- ScrollTrigger, Flip, stagger, timeline patterns
- Next.js Server/Client Components Skill (`.agents/skills/nextjs-server-client-components/SKILL.md`) -- `'use client'` patterns, composition
- [GSAP Flip Plugin Docs](https://gsap.com/docs/v3/Plugins/Flip/) -- getState, from, React integration warnings
- [GSAP ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) -- onUpdate, direction property

### Secondary (MEDIUM confidence)
- [MDN backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter) -- Baseline 2024, 95%+ support
- [CSS-Tricks: Gradient Text](https://css-tricks.com/snippets/css/gradient-text/) -- background-clip: text technique
- [GSAP Community: Header show/hide on scroll](https://gsap.com/community/forums/topic/39789-pin-header-nav-and-hidereveal-based-on-scroll-direction/) -- ScrollTrigger direction detection pattern
- [DEV.to: CSS Dynamic Orb](https://dev.to/alishata128/creating-a-dynamic-css-orb-with-custom-properties-and-gradients-one-element-43en) -- radial-gradient + mix-blend-mode orb technique
- [CSS Variables Guide: Design Tokens & Theming](https://www.frontendtools.tech/blog/css-variables-guide-design-tokens-theming-2025) -- three-tier token architecture
- [W3C WAI-ARIA Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) -- filter dropdown accessibility

### Tertiary (LOW confidence)
- [CSS-Tricks: Animating Number Counters](https://css-tricks.com/animating-number-counters/) -- @property technique has limited browser support; GSAP approach is safer
- Text shadow + gradient text interaction -- needs practical prototyping to confirm behavior

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries already installed and verified in package.json
- Architecture (token system): HIGH -- extends existing pattern from Phase 1, well-documented CSS best practices
- Architecture (GSAP animations): HIGH -- GSAP skill file + official docs provide clear patterns
- Architecture (header morph): MEDIUM -- Zone A/B logic is novel; two-element approach is a recommendation, not a proven pattern for this specific UX
- Architecture (aurora orb): MEDIUM -- CSS technique is well-documented but this specific visual effect requires iterative tuning
- Pitfalls: HIGH -- documented from official sources and known browser behavior
- Number animation: MEDIUM -- GSAP approach is straightforward but directional roll with glow dim/brighten needs implementation tuning

**Research date:** 2026-03-05
**Valid until:** 2026-04-05 (stable stack, no fast-moving dependencies)
