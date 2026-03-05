# Phase 2: Visual Foundation - Context

**Gathered:** 2026-03-05
**Status:** In Progress (theme switcher UX remaining)

<domain>
## Phase Boundary

A rough but visually representative contact grid and popup overlay that validates the theme, card shape, color direction, and interaction patterns before any animation code is written. Includes a `/settings` page with theme switching.

</domain>

<decisions>
## Implementation Decisions

### Contact Card Design
- Card shape: portrait rectangle (~3:4 ratio), `rounded-2xl` (16px corners)
- Circular profile photo centered in upper area of card, card surface visible around it
- Name overlaid below photo on card surface (no gradient needed since photo is circular, not full-bleed)
- Stars centered at bottom of card in their own strip, below the photo/name area
- Depth: layered box-shadow (2-3 shadow layers) for floating 3D widget feel
- Hover: `scale(1.02)` uniform scale-up + accent-colored glow around card border
- Card surface color: `--color-card-surface` (frosted glass for Teal, `#111827` for Midnight)
- Placeholder photos: user's own headshot image (same circular photo for all 30 contacts)
- Card entrance animation: Z-axis pop with stagger — cards jump toward user in 3D (`translateZ`) with enhanced shadow, then settle back. Staggered wave across grid. Uses GSAP ScrollTrigger (already included in installed `gsap` package, no new install needed).

### Popup Overlay
- Opens via card-expand animation: card animates from grid position to center of screen (~300-400ms, ease-out), background blurs simultaneously
- Popup surface: near-black `#0d0d0d` (always, both themes)
- Accent gradient glow at top of popup (~10-15% opacity, theme-dependent): amber for Teal, coral for Midnight — fading into `#0d0d0d` surface
- Dimensions: max-width 550px, max-height 80vh. Responsive: ~70-80% width on tablet, ~95% on mobile
- Close methods: click blurred background, X button (top-right of popup), Escape key. Popup reverses expand animation back to card.
- Scrollbar: auto-hiding thin scrollbar (accent colored, appears on scroll, fades after ~1-2s idle) + bottom gradient shadow hint for discoverability
- Background overlay: semi-transparent black (`rgba(0,0,0,0.6)`) + `backdrop-filter: blur(12px)`

### Popup Content Layout
- Top: circular photo (same as card)
- Name (white text, centered)
- Professional domain tags as pills: "AI", "Finance", "Product Design", etc. — accent-colored text on semi-transparent accent background (e.g. `rgba(245,158,11,0.15)` for Teal, `rgba(255,107,107,0.15)` for Midnight)
- Stars (read-only, 20-24px, semantic colors from `lib/constants.ts`)
- Bio/resume section (collapsible):
  - Default (collapsed): summary/about paragraph + first experience entry
  - Expanded: all experiences + education + skills
  - "Show more" / expand toggle within scrollable area
  - Resume format matches user's reference image: bold title, italic company, dates, location, bullet points
  - Text: light gray (`#a0a0a0`) for body, white for section headers
- Level Up button: own row, full-width, solid accent fill (amber Teal / coral Midnight), dark text. Prominent — the primary CTA. Hover: brighter glow + slight scale.
- Action buttons row below Level Up: small ~40px rounded square icon buttons (`rounded-xl`), dark surface (`#1a1a1a`), accent-colored icons, layered shadow. LinkedIn, Gmail, More Info.
  - LinkedIn: opens contact's LinkedIn profile in new tab
  - Gmail: opens Gmail compose in new tab with contact's email pre-filled (template/draft body is deferred — future phase)
  - More Info: popup expands to full page, navigating to `/contacts/[id]`. Per-person page is placeholder for Phase 2. Reverse animation refined later. Uses GSAP Flip plugin (included in `gsap` package).

### Popup Element Colors (both themes)

| Element | Teal Theme | Midnight Theme |
|---------|-----------|----------------|
| Tag pill text | amber `#f59e0b` | coral `#ff6b6b` |
| Tag pill bg | `rgba(245,158,11,0.15)` | `rgba(255,107,107,0.15)` |
| Action button icon | amber `#f59e0b` | coral `#ff6b6b` |
| Action button surface | `#1a1a1a` | `#1a1a1a` |
| Level Up fill | amber `#f59e0b` | coral `#ff6b6b` |
| Level Up text | dark/black | dark/black |
| Top gradient glow | amber at ~10-15% opacity | coral at ~10-15% opacity |

### Grid Layout
- 5 columns on desktop (1024px+), 3 on tablet (~768px), 2 on mobile
- Max-width container: ~1400px, centered
- Card dimensions: ~254px wide x ~339px tall (3:4 ratio)
- Gap: 20px between cards
- Buffer on M1 Max (1728px effective): ~164px each side
- No visible scrollbar on grid page
- Page scrolls naturally (whole page scrolls)
- Grid is the home page (`/`)
- 30 placeholder contacts for testing scroll, animations, and filter

### Grid Background
- Base: theme color (teal `#071a2e` or midnight `#0a0f1e`)
- Accent-color gradient bleed at top: theme accent colors at 10-15% opacity, strongest at top of screen, fading to pure base theme color in middle-bottom
  - Teal: amber + cyan bleed on deep teal
  - Midnight: coral + electric blue bleed on near-black blue
- Cards sit in the calmer bottom area with good contrast against card surface

### Header Bar
- Slim bar (~48-56px)
- Left: app logo/name ("Networking Tool") in theme accent color
- Center: filter toggle `[All | Blue Stars]` — segmented control
  - "All" (default): all contacts, sorted by star level (3 -> 2 -> 1)
  - "Blue Stars": filtered to blue-star contacts only, sorted by star level within filter
- Right: settings gear icon, navigates to `/settings`
- Auto-hides on scroll-down, reappears on scroll-up

### Theme Switcher (partial — discussion incomplete)
- Lives on `/settings` page (separate route)
- Neutral dark background (`#0d0d0d`) — not themed, so swatches show true colors
- Two visual swatch cards side by side with vertical divider
- Each swatch filled with that theme's actual colors (background, accents) — no hex codes, just visual
- Simple labels: "Teal" and "Midnight"
- Active theme gets highlight (border or checkmark)
- Theme change: instant switch, no animation
- Persistence: localStorage (decided in Phase 1)
- **Remaining questions:** Navigation to/from settings page, settings page layout, back button behavior, future theme extensibility

### Claude's Discretion
- Empty state design (when grid has zero contacts)
- Exact mock contact names and data (use user's headshot photo for all)
- Star level distribution across 30 mock contacts (mix of 1, 2, 3 stars; mix of yellow and blue)
- Header bar background treatment (transparent, darker shade, or border-bottom)
- Exact animation easing curves and timing fine-tuning
- Education inclusion in bio/resume section

</decisions>

<specifics>
## Specific Ideas

- User referenced Acorn event page (dark bg + warm red/coral accents at top) as inspiration for popup theme and grid gradient
- Cards should feel like game cards / trading cards — physical, tactile, interactive
- "Popping out to say hi" — Z-axis entrance animation, not just scale
- Level Up button is the "ultimate ability" — visually elevated from utility buttons
- User's own LinkedIn headshot (circular) used for all 30 placeholder contacts — wants to see how real photo works with colors
- Bio/resume section modeled after user's actual resume format (Summary, Experience with bullet points, Education)
- User interested in future theme extensibility — adding more themes should be straightforward (noted for architecture)

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/constants.ts`: STAR_COLORS (yellow `#f59e0b`, blue `#22d3ee`) — use for star rendering
- `components/StarLevelUpAnimation/`: stub folder (index.tsx, Star.tsx, types.ts, utils.ts) — animation component shell
- `app/dev/page.tsx`: dev harness with mock card and Level Up button — reference for integration pattern

### Established Patterns
- Tailwind v4 CSS-first config: `@config` directive in `globals.css` imports `tailwind.config.ts`
- Theme switching via `data-theme` attribute on `<html>` element
- Theme tokens defined as CSS custom properties in `globals.css` (`--color-grid-bg`, `--color-card-surface`, `--color-accent-primary`, `--color-accent-secondary`)
- `gsap.registerPlugin(useGSAP)` at module level — single registration per bundle
- GSAP ScrollTrigger and Flip plugins available in installed `gsap` package (need import + register)

### Integration Points
- `app/page.tsx`: currently default Next.js page — will become the contact grid home page
- `app/layout.tsx`: root layout with Geist fonts — needs `data-theme` attribute integration
- New routes needed: `/settings`, `/contacts/[id]`
- User's headshot image needs to be stored in `public/` for placeholder use

</code_context>

<deferred>
## Deferred Ideas

- Search/filter contacts by name — future phase (Milestone 2 with real data)
- Email template system (pre-filled draft body when clicking Gmail button) — future phase
- LinkedIn data integration via MCP (pull profile/resume data from LinkedIn) — future milestone (data layer)
- Sidebar with settings — future phase (changes layout architecture)
- Per-person custom page design (`/contacts/[id]`) — Milestone 2
- Adding more themes beyond Teal and Midnight — future (architecture should support it)

</deferred>

---

*Phase: 02-visual-foundation*
*Context gathered: 2026-03-05 (in progress — theme switcher UX incomplete)*
