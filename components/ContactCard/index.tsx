'use client'

import { STAR_COLORS } from '@/lib/constants'
import type { ContactCardProps } from './types'

function StarIcon({ color }: { color: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export function ContactCard({ name, photo, starLevel, starColor }: ContactCardProps) {
  const fillColor = STAR_COLORS[starColor]

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col items-center"
      style={{
        aspectRatio: '3 / 4',
        background: 'var(--color-card-surface)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Circular photo */}
      <div className="pt-6 pb-3">
        <img
          src={photo}
          alt={name}
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      {/* Name */}
      <p
        className="font-medium text-sm px-3 text-center overflow-hidden whitespace-nowrap text-ellipsis w-full"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {name}
      </p>

      {/* Stars */}
      <div className="mt-auto pb-4 flex items-center justify-center gap-1">
        {Array.from({ length: starLevel }, (_, i) => (
          <StarIcon key={i} color={fillColor} />
        ))}
      </div>
    </div>
  )
}
