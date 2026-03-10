---
phase: 3
slug: contact-grid-cards
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-10
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None detected — visual verification via dev server |
| **Config file** | none — no test framework installed |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run dev` (manual visual check) |
| **Estimated runtime** | ~15 seconds (build) |

---

## Sampling Rate

- **After every task commit:** Run `npm run build` (zero TS errors)
- **After every plan wave:** Visual check of all breakpoints (desktop/tablet/mobile) via dev server
- **Before `/gsd:verify-work`:** Full visual inspection at 3 breakpoints + scroll animation verification
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | INT-01 | build | `npm run build` | ✅ | ⬜ pending |
| 03-01-02 | 01 | 1 | INT-02 | build | `npm run build` | ✅ | ⬜ pending |
| 03-01-03 | 01 | 1 | INT-03 | build | `npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements. No test framework install needed — this phase is visual/animation-heavy and relies on build verification + manual visual inspection.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Grid renders 5/3/2 columns at breakpoints | INT-01 | CSS layout visual | Resize browser to desktop (>1024px), tablet (768-1024px), mobile (<768px) — verify column count |
| Cards have 3:4 portrait ratio | INT-01 | Visual proportions | Inspect card aspect ratio at each breakpoint |
| Hover scale(1.02) + accent glow | INT-01 | CSS interaction | Hover each card, verify subtle scale and glow effect |
| Z-axis entrance animation on scroll | INT-01 | GSAP ScrollTrigger | Scroll down page, verify cards pop in with stagger |
| Fixed gradient bleed stays in place | INT-01 | Viewport-fixed CSS | Scroll page, verify top gradient does not move |
| Layered box-shadow depth | INT-01 | Visual depth | Compare card shadows against design tokens |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
