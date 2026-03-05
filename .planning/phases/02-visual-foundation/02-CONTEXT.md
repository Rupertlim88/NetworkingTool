# Phase 2: Visual Foundation - Context

**Gathered:** 2026-03-05
**Status:** Complete (to be split into multiple phases during planning)

<domain>
## Phase Boundary

A rough but visually representative contact grid and popup overlay that validates the theme, card shape, color direction, and interaction patterns before any animation code is written. Includes a settings drawer with theme switching, grid header with dual-mode scroll behavior, filter system with dropdown, and a premium contact count capsule.

**Note:** The scope of this phase has expanded significantly during discussion. The planning phase should re-evaluate the roadmap and split this into multiple phases covering: header system, theme switcher, filter system, contact count capsule, settings drawer, card grid, popup overlay, and design token architecture.

</domain>

<decisions>
## Implementation Decisions

### Design Token Architecture
- All visual properties defined as CSS custom properties (variables) — single source of truth
- Components only reference tokens, never raw values
- Tokens cover: backgrounds, surfaces, accents, gradients, shadows, typography, borders
- Any visual change = one-line token edit
- Theme blocks: `[data-theme="teal"]`, `[data-theme="midnight"]`, `[data-theme="aurora"]`
- Architecture must support multi-color gradient themes (Aurora) beyond simple two-accent themes
- All design decisions should be coded for easy settings extensibility — anything decided here may become a user-configurable setting in the future

### Three Themes

**Theme A — Rich Teal + Soft White (default)**
- Grid background: `#071a2e`
- Card surface: frosted glass (semi-transparent white overlay on teal)
- Primary accent: amber `#f59e0b`
- Secondary accent: cyan `#22d3ee`

**Theme B — Midnight Blue + Warm Coral**
- Grid background: `#0a0f1e`
- Card surface: `#111827`
- Primary accent: coral `#ff6b6b`
- Secondary accent: electric blue `#4fc3f7`

**Theme C — Aurora (Apple Intelligence-inspired)**
- Grid background: full warm gradient (amber -> coral -> pink -> magenta -> purple)
- Multi-color gradient system — not limited to two accents
- Fundamentally different from Teal/Midnight — requires gradient-specific tokens
- All element-specific Aurora decisions deferred to respective phase discussions
- Reference image: Apple Intelligence warm gradient color scheme

**Default theme:** Teal
**Switcher names:** "Teal", "Midnight", "Aurora"

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
- Theme switch: cards instantly update surface color, shadow color, hover glow color via CSS variables

### Popup Overlay
- Opens via card-expand animation: card animates from grid position to center of screen (~300-400ms, ease-out), background blurs simultaneously
- Popup surface: near-black `#0d0d0d` (always, all themes)
- Accent gradient glow at top of popup (~10-15% opacity, theme-dependent): amber for Teal, coral for Midnight — fading into `#0d0d0d` surface
- Dimensions: max-width 550px, max-height 80vh. Responsive: ~70-80% width on tablet, ~95% on mobile
- Close methods: click blurred background, X button (top-right of popup), Escape key. Popup reverses expand animation back to card.
- Scrollbar: auto-hiding thin scrollbar (accent colored, appears on scroll, fades after ~1-2s idle) + bottom gradient shadow hint for discoverability
- Background overlay: semi-transparent black (`rgba(0,0,0,0.6)`) + `backdrop-filter: blur(12px)`
- Header is visible but blurred behind the popup overlay — maintains spatial context, blurred header colors add visual richness to blur zone
- Popup blocks all header interactions — tapping outside popup closes it first, then subsequent taps register on header elements

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
- Side margins: same as card gaps (~20px)
- Buffer on M1 Max (1728px effective): ~164px each side
- No visible scrollbar on grid page
- Page scrolls naturally (whole page scrolls)
- Grid is the home page (`/`)
- 30 placeholder contacts for testing scroll, animations, and filter

### Grid Background
- Base: theme color (teal `#071a2e` or midnight `#0a0f1e`)
- Accent-color gradient bleed at top: ~20% of viewport height, theme accent colors at 10-15% opacity, strongest at top, fading to pure base in middle-bottom
  - Teal: amber + cyan bleed on deep teal
  - Midnight: coral + electric blue bleed on near-black blue
- Gradient is **fixed to the viewport** — does not scroll with content. Top of screen always has warm accent glow regardless of scroll position. Cards scroll through the gradient zone.
- Cards sit in the calmer bottom area with good contrast against card surface

### Grid Header Bar — Two Modes

**General:**
- Height: ~48-56px
- Semi-transparent lighter overlay (theme color + ~10-15% white overlay) — grid gradient visible through it
- Subtle single-layer soft shadow (less intense than contact cards)
- Slightly rounded corners (~8px)

**Static Mode (at page top — Option B):**
- Floating widget style — rounded all four corners
- Nearly full viewport width with very small gap on sides (~4-6px) to reveal rounded corners
- Part of page document flow — scrolls away naturally on first scroll-down

**Fixed/Floating Mode (reappears on scroll-up — Option A):**
- Full viewport width, flush top and sides
- Rounded bottom corners only (bottom-left, bottom-right)
- Subtle bottom shadow to indicate floating above content
- Slides down from viewport top (~300ms fixed animation, ease-out)
- Triggers after user scrolls up by ~header height distance (intent threshold)

**Scroll Behavior:**
- First scroll down: header scrolls away statically (part of page content)
- Scroll up from deep in page (Zone A — beyond header height x 1.5 from top): fixed header slides down after scroll-up threshold met
- Scroll up near top (Zone B — within header height x 1.5 from top): fixed header does NOT appear; instead, keep scrolling to natural static header position
- Transition Zone A -> Zone B: fixed header fades out / slides up, morphs back to static mode:
  - Full-width edges contract inward (revealing side margins)
  - Top corners round out from 0px to ~8px
  - Bottom shadow fades out
  - Morphing tied to scroll position (~200-300ms), feels like magnetic docking
- Only the header slides back on scroll-up (Option A) — filter strip and capsule remain static content, only visible at page top

**Header Layout — Row 1:**
```
[Gear icon]    [NETWORKING TOOL]    [Theme swatches]
   Left              Center               Right
```

### "NETWORKING TOOL" Title
- All caps, bold, single weight
- Per-letter CSS gradient (not per-word)
- Theme-influenced spectrum:
  - Teal: warm amber -> gold -> soft white -> cyan -> teal
  - Midnight: warm coral -> pink -> soft lavender -> electric blue -> deep blue
- Subtle dark text shadow (~2px blur, black at 30-40% opacity) for readability
- Centered in header

### Theme Swatches (Grid Header)
- Two landscape rectangles (~40-44px wide by 26-30px tall)
- Rounded corners
- Fill: bottom 70% solid theme background color, top 30% primary accent gradient
  - Teal swatch: teal base + amber gradient top
  - Midnight swatch: midnight base + coral gradient top
- 1px accent-colored border (amber for Teal, coral for Midnight) — always visible on both swatches
- Active swatch: inset/pressed look (inset box-shadow, slightly darker) — depressed style
- Inactive swatch: flush or slightly raised
- Switch animation: quick transition (~150-200ms) transferring inset effect
- Theme change: instant CSS variable swap for all elements; contact count capsule gets ~300ms crossfade
- Vertical divider between swatches: 1px, white at ~20% opacity, same height as swatches, 4-5px gap each side

**Swatch Tooltips:**
- Custom styled, pill/capsule shape, no arrow
- Background: respective theme's base color (teal `#071a2e` for Teal, midnight `#0a0f1e` for Midnight)
- Text: respective theme's primary accent color (amber for Teal, coral for Midnight)
- Full theme names: "Teal" and "Midnight"
- 1px accent border + drop shadow
- Appears above swatch, centered
- Timing: ~250ms hover delay + ~150ms fade-in, ~100ms fade-out
- Position: above the swatch

### Gear Icon
- White at ~60-70% opacity
- Very faint single-layer drop shadow
- Hover: opacity increase to 100% + transitions to active theme's accent color (~200ms)
- ~6px spacing from swatches (consistent with divider gaps)
- Opens settings drawer (slides from the left)
- Sits on the LEFT side of the header

### Filter Strip (Row 2 — separate from header)
- NOT part of the header — sits on grid background in the gradient zone
- No visual separator between header and filter strip — just spacing/gap
- Strip height: ~48-52px (driven by capsule height)
- Side margins: follows grid side margins (~20px each side)
- Scrolls away statically with the page (same as header on first scroll-down)
- Does NOT reappear on scroll-up — only visible at page top

**Layout:**
```
[Contact count capsule]              [Filter icon]
   Left (fills full strip height)     Right (bottom-aligned, occupying bottom 32-36px)
```

### Contact Count Capsule
- Shape: rounded capsule/pill
- Size: ~48-52px tall, width flexes with digit count (~16-20px horizontal padding). 5:2 size ratio between number and description text.
- Background: luminous aurora gradient orb effect (multiple overlapping radial gradients with mix-blend-mode and blur)
  - Cool-toned base: blues, purples, pinks (Siri-like)
  - Theme-adaptive: Teal theme mixes more cyan/teal/blue; Midnight mixes more purple/pink/coral
  - Technique: multiple `radial-gradient` layers + `mix-blend-mode: screen/soft-light` + blur

**Gold Number:**
- Color: gold/amber (`#f59e0b` or brighter `#fbbf24`)
- Text glow: soft amber/gold text-shadow radiating ~4-6px outward (medium intensity)
- Number represents contact count based on active filter
- Significantly larger than description (~22-28px bold)

**Shimmer (resting state):**
- Very slow color temperature oscillation: base amber -> slightly brighter gold -> back (~2-3 second cycle)
- Number stays perfectly readable at all times — gentle warmth pulse, not flickering
- Aurora background is static at rest

**Hover state:**
- Aurora comes alive — color blobs start shifting and rotating
- Number shimmer intensifies slightly

**Description text:**
- Below the number, inside the capsule
- White at ~50-60% opacity, regular weight, ~10-11px
- Content changes with filter:
  - All: "in your network"
  - Blue Stars: "high-impact connections"
  - Custom filters (future): user-defined text

**Number transition on filter change (vertical scroll/roll):**
- Directional: count goes down -> number scrolls downward out, new enters from top. Count goes up -> number scrolls upward out, new enters from bottom.
- Speed: medium (~400-500ms) with ease-out (fast initial movement, decelerates on arrival)
- Description text: crossfades independently (~200ms)
- Gold glow: dims during scroll (~40% intensity), brightens back on landing (Option B)
- Clipped by capsule overflow

**Capsule entrance animation (scrolling back to top):**
- Aurora briefly flares (~300ms color intensify then settle) + one gold glow pulse when settled
- Triggers when capsule is scrolling back into view below the header

**Theme switch:**
- Capsule aurora: ~300ms crossfade (smooth transition, not instant) to prevent jarring multi-gradient snap
- Gold number stays gold (doesn't change with theme)

### Filter System

**Filter Icon:**
- Classic funnel icon
- Default: white at ~70-80% opacity (slightly brighter than gear icon due to gradient background)
- When filter is active (not "All"): icon turns theme's primary accent color (amber/coral)
- Bottom-aligned in the filter strip (occupying bottom 32-36px of strip)

**Filter Dropdown Panel:**
- Lighter surface: theme color mixed ~80% white — clearly pops against dark grid
- Opens: fade in + slight scale up (~150-200ms)
- Rounded corners: ~10-12px
- No visible border — layered shadow instead (tight dark shadow + softer spread shadow) for 3D floating effect
- Close methods: tap a filter (auto-close), tap outside (close). No Escape key close.
- When theme switches while dropdown open: dropdown stays open, background color updates to new theme mix

**Dropdown scroll behavior:**
- Dropdown + filter icon scroll up together as a unit
- When dropdown's top edge hits viewport top: becomes sticky/fixed
- Internal scrollbar for long filter lists: thin, accent-colored, auto-hiding (matches popup scrollbar style)
- Max-height: ~60-70% of viewport height
- When sticky: subtle shadow appears beneath dropdown to indicate floating state

**Dropdown interior — Option D (text rows with visual indicators):**
```
| [icon]  Filter name          [count] |
```
- Visual indicator icon on left (circle outline for All, colored star for star filters, clock for recent, tag icon for tags, diamond for custom)
- Filter name in center
- Contact count on right: always visible, ~60-70% opacity, brightens to 100% on hover

**Active filter indicator:** Left border stripe (3-4px, accent color) + subtle background highlight (accent at ~8-10% opacity)

**Hover state:** Background lightens slightly (~5-8%) + count brightens to 100%. ~150ms ease-out transition.

**Preset filters:**
- All (circle outline icon) — shows total contact count
- Blue Stars (blue star icon in `#22d3ee`) — shows blue-star contact count

**Future filter support:**
- Custom user-created filters with: filter rules, custom description text for capsule, icon selection
- Filter categories with section headers (architecture ready, not displayed until multiple categories exist)

### Settings Drawer
- Slides in from the LEFT, slides out to the LEFT
- Full-screen coverage — no background blur, covers everything including header
- Animation: ~400-500ms smooth ease-out (same speed open and close)
- Background: near-black `#0d0d0d`
- Settings content built as standalone `<SettingsPanel />` component for easy container swapping (drawer -> modal -> page)
- Grid state fully preserved while drawer is open (scroll position, filter dropdown state, card states, everything). Restored exactly on close.

**Drawer Header:**
- "Settings" title: left side, white, bold, straightforward (not gradient treatment)
- X button: top-right, white at ~60-70% opacity, accent color on hover (matches gear icon styling)
- Gear icon: left side, same position as grid header gear icon (seamless toggle feel)

**Close methods:** X button, gear icon toggle, Escape key

**Drawer Content — Appearance Section:**
- "APPEARANCE" section header: all caps, white, bold, smaller than Settings title
- Single row: "Set the mood for your grid: Choose your vibe" label on the left (normal white text)
- Toggle on the right: two medium squares (~100x70px)

**Theme Toggle Squares:**
- Richer preview: base color filling most of square, accent gradient at top (~30%), tiny mock card silhouette in lower portion
- Theme names centered below each square: "Teal" / "Midnight" (white at ~60-70% opacity)
- Sliding cover mechanic:
  - Slightly lighter dark cover (distinct from drawer `#0d0d0d` background)
  - Rounded corners, drop shadow (3D floating feel)
  - Slides between squares (~200-300ms smooth slide)
  - Active theme = uncovered square, inactive = covered
  - No entrance animation on revealed square
  - No extra active indicator beyond being uncovered

**Minimal layout now, extensible architecture underneath.** Each settings section is its own component. Drawer supports scrolling for future sections.

### Claude's Discretion
- Empty state design (when grid has zero contacts)
- Exact mock contact names and data (use user's headshot photo for all)
- Star level distribution across 30 mock contacts (mix of 1, 2, 3 stars; mix of yellow and blue)
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
- Contact count capsule is a "pride" element — should make users think "Wow, I have so many contacts"
- The Siri logo luminous gradient orb is the visual reference for the capsule — cool-toned aurora with warm gold number shining through
- Apple Intelligence warm gradient (amber -> coral -> pink -> magenta -> purple) is the reference for the Aurora theme
- UI design is 90% of the app — every visual detail matters and must be tested thoroughly
- Everything should feel "alive" — dynamic, natural, premium, game-like
- All features should be coded for easy future settings extensibility

</specifics>

<open_questions>
## Open Questions (to be resolved in respective phase discussions)

### Geometry and Dimensions (deferred to planning)
- Exact gap between header bottom edge and filter strip top edge
- Header floating mode exact margin from screen edges (~4-6px tentative)
- Filter strip side margins (tentative: match grid ~20px)
- Whether filter strip extends full viewport or matches grid width

### Aurora Theme (deferred to respective element phases)
- How each element adapts to the multi-color gradient background
- Card surface treatment on warm gradient
- Popup surface on Aurora theme (stay near-black or warm?)
- Header appearance on warm gradient background
- Capsule aurora colors on Aurora theme
- Title gradient treatment on Aurora theme
- Star semantic color visibility (yellow stars on warm background)
- Token structure for gradient-specific properties

### Future Features (noted, not designed)
- Custom filter creation UI (filter rules, icon selection, capsule description text)
- Search/filter contacts by name
- Email template system
- LinkedIn data integration via MCP
- Per-person custom page design (`/contacts/[id]`)
- Additional themes beyond the three
- Settings sections beyond Appearance (Account, Notifications, etc.)

</open_questions>

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
- New routes needed: `/contacts/[id]` (settings drawer replaces `/settings` route)
- User's headshot image needs to be stored in `public/` for placeholder use

</code_context>

<deferred>
## Deferred Ideas

- Search/filter contacts by name — future phase (Milestone 2 with real data)
- Email template system (pre-filled draft body when clicking Gmail button) — future phase
- LinkedIn data integration via MCP (pull profile/resume data from LinkedIn) — future milestone (data layer)
- Sidebar with settings — future phase (changes layout architecture)
- Per-person custom page design (`/contacts/[id]`) — Milestone 2
- Custom filter creation with user-defined rules, icons, and capsule description text — future phase
- Additional themes beyond Teal, Midnight, Aurora — future (architecture supports it)
- Always-on capsule aurora animation (currently hover-only, toggle is a one-line change)
- Settings sections: Account, Notifications, etc. — future phases

</deferred>

---

*Phase: 02-visual-foundation*
*Context gathered: 2026-03-05 (complete — ready for roadmap restructure and phase planning)*
