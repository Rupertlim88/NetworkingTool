# Phase 1: Project Setup - Research

**Researched:** 2026-03-04
**Domain:** Next.js 15 App Router + GSAP 3.x + TypeScript scaffold (greenfield)
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Repo destiny:** This repo becomes the full networking app. Next.js App Router (not Vite). Multi-screen routing needed: contact grid, per-person pages, auth flow, `/dev` harness. Vercel deployment target.
- **Dev harness:** Rough mock context at `/dev` route. Placeholder contact card (grey box / initials avatar) at a realistic screen position. Simple overlay div on top of it. "Level Up" button inside the overlay that triggers the animation. Hardcoded props to start (`fromStars={1}`, `toStars={2}`, `starColor="yellow"`).
- **Component folder structure:** Collocated folder — `components/StarLevelUpAnimation/` with `index.tsx`, `Star.tsx`, `types.ts`, `utils.ts`.
- **No Framer Motion:** Explicitly rejected — do not install, do not suggest.
- **TypeScript:** No `any` types anywhere.
- **Mobile portability:** Avoid web-only assumptions — component logic should be portable to React Native / Reanimated in Milestone 4.
- **Props-only API:** `StarLevelUpAnimation` owns zero data state — all data flows in via props.
- **GSAP reference:** Agents must read `.agents/skills/gsap/SKILL.md` before writing any animation or GSAP code.

### Claude's Discretion
- Styling the dev harness beyond functional is out of scope — it is a dev tool.

### Deferred Ideas (OUT OF SCOPE)
- Any actual animation code (Phase 2)
- Real contact data or photos (Milestone 2)
- Supabase, auth, backend (future milestones)
- AI agent integration (future milestone)
- Prop controls panel for dev harness
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INT-01 | Component has zero dependencies on any networking app data layer | Enforced by props-only API design + self-contained folder; no imports from app-level stores, contexts, or APIs |
| INT-02 | Component is a self-contained folder (component + assets + types) | Collocated folder structure (`components/StarLevelUpAnimation/`) with barrel export from `index.tsx` |
| INT-03 | Component can be dropped into any React app via a single import | Achieved by exporting one named export from `index.tsx`; only peer deps are `react`, `react-dom`, `gsap`, `@gsap/react` — all standard |
</phase_requirements>

---

## Summary

This phase scaffolds a greenfield Next.js 15 App Router project from a bare git repository (no `package.json` exists yet). The primary deliverables are: (1) a working `next dev` server, (2) GSAP + `@gsap/react` installed and importable, (3) the `components/StarLevelUpAnimation/` folder with stub files in place, and (4) a functional `/dev` route with a mock contact card and "Level Up" button.

The tech stack is well-settled: Next.js 15 (App Router), TypeScript with strict mode, Tailwind CSS, and GSAP 3.x with `@gsap/react`. All are industry standard and `create-next-app@latest` bootstraps most of the configuration automatically. The main research findings concern two specific areas: how GSAP integrates correctly into Next.js App Router (SSR safety, plugin registration, `'use client'` requirements), and the exact folder/file structure the planner must produce.

Because this is a greenfield repo and INT-01/INT-02/INT-03 are structural requirements (not behavioral), the bulk of Phase 1 is scaffolding — no animation logic, no real data. The hard parts are getting the TypeScript config correct (no `any`, `strict: true`) and ensuring the GSAP integration pattern is established correctly so Phase 2 agents don't hit SSR errors.

**Primary recommendation:** Use `create-next-app@latest` with recommended defaults (TypeScript, Tailwind, App Router, ESLint, `@/*` alias), then install `gsap @gsap/react` as a separate step. Place all GSAP-using files inside `'use client'` components.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 15.x (latest) | App Router framework, routing, SSR/RSC | Locked decision; Vercel-native |
| react / react-dom | 19.x (bundled with Next 15) | UI rendering | Required by Next.js |
| typescript | 5.x (bundled) | Type safety, no `any` constraint | Locked decision |
| tailwindcss | 4.x (latest) | Utility-first styling | Locked decision; included by `create-next-app` |
| gsap | 3.12.x (latest 3.x) | Animation engine | Locked decision; free since Webflow sponsorship |
| @gsap/react | 2.x (latest) | `useGSAP` hook, React-safe cleanup | Required for React integration pattern |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| eslint | included | Linting, enforces `no-explicit-any` | Always — included by `create-next-app` |
| @typescript-eslint/eslint-plugin | included | TypeScript-specific lint rules | Always — `no-explicit-any: error` is default |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| GSAP | Framer Motion | Explicitly rejected — insufficient control for squash/stretch, arc, particles |
| Next.js | Vite + React | Explicitly rejected — app needs multi-screen routing, Vercel deployment |
| Tailwind | CSS Modules | No reason to deviate — Tailwind is locked decision |

**Installation:**
```bash
npx create-next-app@latest . --typescript --tailwind --app --eslint --import-alias "@/*" --no-src-dir
npm install gsap @gsap/react
```

Note: Running `create-next-app` in `.` (current directory) scaffolds into the existing git repo without creating a subdirectory. The `--no-src-dir` flag places `app/` and `components/` at the root, which is the conventional Next.js layout for this project size.

---

## Architecture Patterns

### Recommended Project Structure
```
/
├── app/
│   ├── layout.tsx           # Root layout — <html>, <body>, Tailwind base
│   ├── page.tsx             # Home route (placeholder for now)
│   └── dev/
│       └── page.tsx         # Dev harness route (/dev)
├── components/
│   └── StarLevelUpAnimation/
│       ├── index.tsx        # Barrel export: export { StarLevelUpAnimation }
│       ├── Star.tsx         # Individual star element (stub in Phase 1)
│       ├── types.ts         # StarLevelUpAnimationProps, StarColor, etc.
│       └── utils.ts         # Animation helpers (empty stub in Phase 1)
├── public/                  # Static assets
├── next.config.ts           # Next.js config
├── tailwind.config.ts       # Tailwind config
├── tsconfig.json            # TypeScript config (strict: true)
└── package.json
```

### Pattern 1: GSAP in Next.js App Router — Client Component Requirement

**What:** GSAP operates on the DOM. All GSAP-using components MUST be Client Components (`'use client'`). This includes `StarLevelUpAnimation/index.tsx`, `Star.tsx`, and the `/dev` page.

**When to use:** Any file that imports `gsap`, `useGSAP`, or manipulates DOM refs.

**Example:**
```typescript
// components/StarLevelUpAnimation/index.tsx
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { StarLevelUpAnimationProps } from './types';

gsap.registerPlugin(useGSAP); // Register once at module level

export function StarLevelUpAnimation(_props: StarLevelUpAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animation logic goes here in Phase 2+
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      {/* Stub: renders nothing in Phase 1 */}
    </div>
  );
}
```

### Pattern 2: Plugin Registration — Module Level, Once

**What:** `gsap.registerPlugin(useGSAP)` must be called once. The correct place is at module level in the file that imports the plugin, NOT inside hooks or component bodies.

**Why:** Calling registration inside a component body re-registers on every render. Module-level registration runs once when the module is first imported.

**Example:**
```typescript
// At top of any file that uses useGSAP, after imports
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP); // Module-level, not inside component
```

### Pattern 3: Dev Harness Page Structure

**What:** The `/dev` route is a pure Client Component (needs `useState` for trigger button). It renders a mock contact card at a realistic screen position and passes hardcoded props to the animation component stub.

**Example:**
```typescript
// app/dev/page.tsx
'use client';

import { useState } from 'react';
import { StarLevelUpAnimation } from '@/components/StarLevelUpAnimation';

export default function DevPage() {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      {/* Mock contact card at realistic screen position */}
      <div className="relative">
        <div className="w-32 h-32 bg-gray-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-2xl font-bold">RL</span>
        </div>
        <div className="mt-2 p-4 bg-gray-800 rounded">
          <button
            onClick={() => setIsAnimating(true)}
            className="bg-yellow-500 text-black px-4 py-2 rounded font-bold"
          >
            Level Up
          </button>
        </div>
      </div>

      {isAnimating && (
        <StarLevelUpAnimation
          fromStars={1}
          toStars={2}
          starColor="yellow"
          contactName="Rupert Lim"
          contactPhoto=""
          onComplete={() => setIsAnimating(false)}
        />
      )}
    </div>
  );
}
```

### Pattern 4: Barrel Export from Component Folder

**What:** `index.tsx` is the single public surface of the `StarLevelUpAnimation` folder. All imports from other parts of the app use `@/components/StarLevelUpAnimation` — never reaching into internal files.

**Example:**
```typescript
// components/StarLevelUpAnimation/index.tsx
export { StarLevelUpAnimation } from './StarLevelUpAnimation'; // named export, not default

// Consumer:
import { StarLevelUpAnimation } from '@/components/StarLevelUpAnimation';
```

Using a named export (not default) makes refactoring and barrel re-exports explicit.

### Pattern 5: TypeScript Types File

**What:** All prop interfaces and type aliases live in `types.ts`, imported by `index.tsx` and `Star.tsx`. Keeps types co-located and avoids circular imports.

**Example:**
```typescript
// components/StarLevelUpAnimation/types.ts
export type StarColor = 'yellow' | 'blue';

export interface StarLevelUpAnimationProps {
  fromStars: 1 | 2;
  toStars: 2 | 3;
  contactPhoto: string;
  contactName: string;
  starColor: StarColor;
  onComplete: () => void;
}
```

Note: Types are defined in Phase 1 as stubs even though they are fully implemented in Phase 2. Having them in place means `index.tsx` can type-check without `any`.

### Anti-Patterns to Avoid
- **Default export from index.tsx:** Named exports make the public API explicit; `export default` can cause naming ambiguity in re-exports.
- **`any` in TypeScript stubs:** Even a stub must have typed signatures. Use `unknown` or proper interfaces — never `any`.
- **GSAP import without `'use client'`:** Will cause SSR hydration errors or build failures because GSAP accesses `window`/`document`.
- **Placing `StarLevelUpAnimation` inside `app/`:** Components do not belong in `app/`. They belong in `components/` at the project root.
- **`gsap.registerPlugin` inside `useGSAP` or component body:** Causes repeated registration warnings and unpredictable behavior.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| GSAP cleanup on unmount | Custom `useEffect` cleanup | `useGSAP` from `@gsap/react` | `useGSAP` wraps `gsap.context()` and auto-reverts all tweens, timelines, and plugin instances — manual cleanup misses edge cases |
| TypeScript strict config | Manual tsconfig tuning | `create-next-app` defaults + verify `strict: true` | Next.js scaffold generates a correct tsconfig; only verify `strict` is enabled |
| Tailwind setup | Manual PostCSS config | `create-next-app --tailwind` | Handles PostCSS, Tailwind config, and globals.css automatically |
| Import aliases (`@/`) | Relative path hell | `create-next-app --import-alias "@/*"` | tsconfig `paths` and Next.js config aligned automatically |

**Key insight:** `create-next-app` eliminates most Phase 1 complexity. The only non-trivial work is GSAP integration and the component folder structure.

---

## Common Pitfalls

### Pitfall 1: GSAP on the Server (Missing `'use client'`)
**What goes wrong:** `next build` or `next dev` throws a "window is not defined" error or React hydration mismatch because GSAP tries to access browser globals during SSR.
**Why it happens:** Next.js App Router renders all components on the server by default. GSAP is a browser library.
**How to avoid:** Every file that imports `gsap` or `@gsap/react` MUST have `'use client'` as its first line. This includes `index.tsx`, `Star.tsx`, and `app/dev/page.tsx`.
**Warning signs:** Build error mentioning `window`, `document`, or "attempted to use a browser API in a server component."

### Pitfall 2: Using `any` in Stubs
**What goes wrong:** TypeScript passes locally but ESLint fails at build time (`no-explicit-any: error` is enabled by default in Next.js).
**Why it happens:** Stubs are tempting to type lazily.
**How to avoid:** Define `StarLevelUpAnimationProps` in `types.ts` before writing any stubs. All props must be typed even in Phase 1 placeholders.
**Warning signs:** `Unexpected any. Specify a different type.` ESLint error during `npm run build`.

### Pitfall 3: `create-next-app` in Wrong Directory
**What goes wrong:** Running `npx create-next-app@latest networking-tool` creates a subdirectory; the git repo structure is wrong.
**Why it happens:** Default behavior creates a new folder.
**How to avoid:** Run `npx create-next-app@latest .` (dot = current directory) from inside the git repo. Confirm the prompt "Initialize a new git repository? No" since the repo already exists.
**Warning signs:** New `networking-tool/` subdirectory appears inside the project root.

### Pitfall 4: `gsap.registerPlugin` Inside Component
**What goes wrong:** React strict mode double-invokes effects; registration runs twice per mount, producing GSAP console warnings and potentially stale plugin state.
**Why it happens:** Plugin registration is idempotent but produces warnings and the pattern is fragile.
**How to avoid:** Call `gsap.registerPlugin(useGSAP)` at module scope (top level of the file, after imports).
**Warning signs:** GSAP warning in console: "Plugin already registered."

### Pitfall 5: `components/` Inside `app/`
**What goes wrong:** Placing `components/StarLevelUpAnimation/` inside `app/components/` works locally but conflates App Router conventions with component organization. INT-03 ("drop into any React app via single import") is harder to communicate if the component is inside a framework-specific folder.
**Why it happens:** Next.js allows colocating non-route files in `app/`, so there's no error — but it's an anti-pattern for reusable components.
**How to avoid:** Place `components/` at the project root, parallel to `app/`. This matches the standard Next.js community convention for shared components.
**Warning signs:** Component import path reads `@/app/components/...` instead of `@/components/...`.

### Pitfall 6: `src/` Directory Debate
**What goes wrong:** `create-next-app` asks "Would you like to use src/ directory?" If yes, all paths change (`src/app/`, `src/components/`). This doesn't break anything but must be consistent.
**Why it happens:** The question is asked during scaffolding; the answer affects all future import paths.
**How to avoid:** Use `--no-src-dir` flag. The project is small; a `src/` wrapper adds indirection without benefit.
**Warning signs:** Paths like `src/app/layout.tsx` appearing when component is expected at `components/`.

---

## Code Examples

### GSAP + useGSAP in a Client Component
```typescript
// Source: .agents/skills/gsap/SKILL.md + gsap.com/resources/React/
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

function AnimatedComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to('.target', {
      x: 100,
      duration: 1,
      ease: 'power2.out',
    });
  }, { scope: containerRef }); // Scope scoped selector queries to container

  return (
    <div ref={containerRef}>
      <div className="target">Animated</div>
    </div>
  );
}
```

### Root Layout (App Router)
```typescript
// Source: .agents/skills/nextjs-app-router-fundamentals/SKILL.md
// app/layout.tsx — Server Component (no 'use client')
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Networking Tool',
  description: 'Personal contact manager with gamified relationships',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### TypeScript Prop Types (No `any`)
```typescript
// Source: .agents/skills/nextjs-app-router-fundamentals/SKILL.md
// components/StarLevelUpAnimation/types.ts
export type StarColor = 'yellow' | 'blue';

export interface StarLevelUpAnimationProps {
  fromStars: 1 | 2;
  toStars: 2 | 3;
  contactPhoto: string;
  contactName: string;
  starColor: StarColor;
  onComplete: () => void;
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| GSAP paid license for plugins | All plugins free (Webflow sponsorship) | GSAP 3.12, 2024 | No license keys needed; install `gsap` from npm, all plugins included |
| `gsap.context()` manual cleanup | `useGSAP()` hook from `@gsap/react` | 2023 | Automatic cleanup; preferred pattern for all new React/Next.js projects |
| `useLayoutEffect` for GSAP | `useGSAP` (internally uses isomorphic layout effect) | 2023 | SSR-safe; no need to manually guard with `typeof window !== 'undefined'` |
| Next.js 14 params/searchParams sync | Next.js 15 async params/searchParams | Next.js 15, 2024 | `params` must be awaited in page components — not relevant to Phase 1 but important for future phases |

**Deprecated/outdated:**
- `gsap.context()` with manual `return () => ctx.revert()`: Still works, but `useGSAP()` is the modern replacement.
- GSAP Club membership for premium plugins: No longer required.

---

## Open Questions

1. **`create-next-app` `src/` prompt**
   - What we know: The `--no-src-dir` flag suppresses the prompt and places `app/` at root.
   - What's unclear: Whether the executing agent will be prompted interactively during scaffolding.
   - Recommendation: Use non-interactive flags (`--no-src-dir`, `--typescript`, `--tailwind`, `--app`, `--eslint`, `--import-alias "@/*"`) to avoid any interactive prompts.

2. **`tsconfig.json` strict mode verification**
   - What we know: `create-next-app` generates a tsconfig. The `strict: true` flag enables `noImplicitAny` and `strictNullChecks`.
   - What's unclear: Whether the generated tsconfig in Next.js 15 has `strict: true` by default (it has in past versions).
   - Recommendation: After scaffold, verify `tsconfig.json` contains `"strict": true`. If absent, add it. Also verify ESLint config has `"@typescript-eslint/no-explicit-any": "error"`.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected (greenfield project) — Wave 0 must install |
| Config file | None — Wave 0 creates `jest.config.ts` or uses `next/jest` |
| Quick run command | `npm run test -- --passWithNoTests` (after Wave 0) |
| Full suite command | `npm run test` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| INT-01 | Component imports nothing from app-level data layer | Static analysis / build | `npx tsc --noEmit` (TypeScript will error if cross-layer imports exist) | ❌ Wave 0 |
| INT-02 | Component folder is self-contained (all files within `components/StarLevelUpAnimation/`) | File structure check | `ls components/StarLevelUpAnimation/` — manual verification | ❌ Wave 0 |
| INT-03 | Component importable via single import path | Smoke test / build | `npx tsc --noEmit` + `npm run build` — build fails if export is broken | ❌ Wave 0 |

**Note on INT-01/INT-02/INT-03:** These are structural requirements, not behavioral unit tests. The primary verification mechanism is:
1. `npx tsc --noEmit` — verifies TypeScript compiles without errors (catches cross-layer imports, missing exports, `any` types)
2. `npm run build` — verifies Next.js can build the project (smoke test for the component import path)
3. Manual file structure check — verifies the folder layout matches the spec

A formal unit test file for INT-01 through INT-03 is not the right tool; TypeScript compilation and build success are the correct automated signals.

### Sampling Rate
- **Per task commit:** `npx tsc --noEmit`
- **Per wave merge:** `npx tsc --noEmit && npm run build`
- **Phase gate:** `npm run build` green, no TypeScript errors, `/dev` route renders in browser

### Wave 0 Gaps
- [ ] `package.json` — does not exist yet; `create-next-app` creates it
- [ ] TypeScript config — does not exist yet; verify `strict: true` after scaffold
- [ ] ESLint config — does not exist yet; verify `no-explicit-any: error` after scaffold
- [ ] No test framework needed for Phase 1 — INT requirements verified by `tsc` + build

---

## Sources

### Primary (HIGH confidence)
- `.agents/skills/gsap/SKILL.md` — `useGSAP` hook API, cleanup patterns, easing, plugin registration
- `.agents/skills/nextjs-app-router-fundamentals/SKILL.md` — App Router structure, layout, routing, TypeScript patterns
- `.agents/skills/nextjs-anti-patterns/SKILL.md` — `'use client'` placement, server/client component rules
- `.agents/skills/nextjs-server-client-components/SKILL.md` — When to use `'use client'`, SSR safety rules

### Secondary (MEDIUM confidence)
- [gsap.com/resources/React/](https://gsap.com/resources/React/) — Official GSAP React integration guide confirming `useGSAP` as the preferred pattern and `'use client'` requirement in App Router
- [nextjs.org/docs/app/getting-started/installation](https://nextjs.org/docs/app/getting-started/installation) — Confirmed `create-next-app@latest` defaults (TypeScript, Tailwind, App Router, ESLint)
- [GSAP all plugins free since Webflow sponsorship](https://gsap.com) — Confirmed via WebSearch: `gsap` npm package includes all plugins; no license key needed

### Tertiary (LOW confidence)
- WebSearch results re: Next.js 16 — not yet verified against official changelog; using "Next.js 15" as the confirmed current major version
- WebSearch re: `@gsap/react` version 2.1.2 — version number is approximate; actual installed version will be whatever npm resolves as latest at install time

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries confirmed via official skills and npm
- Architecture: HIGH — patterns derived from project skill files and locked decisions in CONTEXT.md
- Pitfalls: HIGH — derived from skill files (nextjs-anti-patterns, nextjs-server-client-components) and confirmed GSAP SSR behavior
- Test strategy: MEDIUM — structural requirements (INT-01/02/03) don't map naturally to unit tests; TypeScript + build is the correct verification mechanism

**Research date:** 2026-03-04
**Valid until:** 2026-09-04 (stable stack; GSAP and Next.js minor versions may change but patterns are stable)
