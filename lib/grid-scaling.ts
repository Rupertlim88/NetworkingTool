/**
 * Quadratic grid scaling — gap grows proportionally to card area (width²)
 *
 * At each breakpoint threshold, values match the original CSS exactly.
 * Between thresholds, card width grows sub-linearly (√-ish) while
 * gaps grow super-linearly, keeping gap ∝ card_area.
 *
 * Math: N*w + (N-1)*k*w² = available_space
 * where k = gap/w² calibrated at each threshold.
 */

interface BreakpointConfig {
  minWidth: number
  cols: number
  k: number       // gap = k * width² (calibrated at threshold)
  rowRatio: number // row-gap = rowRatio * column-gap
}

// All thresholds calibrated to gap:card ratio of 0.42 (from 4-col reference)
//   4 col @ 1200px: w=156px, g=66px, k = 66/156² = 0.002712
//   3 col @  900px: w=160.5px, g=67.4px, k = 67.4/160.5² = 0.002616
//   2 col @  580px: w=164.2px, g=68.9px, k = 68.9/164.2² = 0.002556
const BREAKPOINTS: BreakpointConfig[] = [
  { minWidth: 1200, cols: 4, k: 0.002712, rowRatio: 0.4545 },
  { minWidth: 900,  cols: 3, k: 0.002616, rowRatio: 0.4006 },
  { minWidth: 580,  cols: 2, k: 0.002556, rowRatio: 0.2946 },
]

const SIDE_PADDING_RATIO = 0.1575 // 15.75vw

export interface GridDimensions {
  cardWidth: number
  gap: number
  rowGap: number
  cols: number
}

export function calculateGridDimensions(viewportWidth: number): GridDimensions | null {
  const bp = BREAKPOINTS.find(b => viewportWidth >= b.minWidth)
  if (!bp) return null // Below 580px: 1 column, CSS handles it

  const { cols, k, rowRatio } = bp
  const available = viewportWidth * (1 - 2 * SIDE_PADDING_RATIO)

  // Solve quadratic: (cols-1)*k*w² + cols*w - available = 0
  const a = (cols - 1) * k
  const b = cols
  const c = -available

  const discriminant = b * b - 4 * a * c
  const w = (-b + Math.sqrt(discriminant)) / (2 * a)
  const g = k * w * w
  const rowGap = g * rowRatio

  return { cardWidth: w, gap: g, rowGap, cols }
}
