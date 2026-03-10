'use client'

import { STAR_COLORS } from '@/lib/constants'
import type { ContactCardProps } from './types'

function StarIcon({ color }: { color: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export function ContactCard({ name, photo, role, company, starLevel, starColor }: ContactCardProps) {
  const fillColor = STAR_COLORS[starColor]
  const nameSize = name.length > 15 ? 'text-sm' : 'text-base'

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col items-center w-full h-full"
      style={{
        aspectRatio: '3 / 4',
        background: 'var(--color-card-surface)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Rounded rectangle photo — fills top ~58% of card */}
      <div className="px-3 pt-3 w-full overflow-hidden" style={{ flex: '0 0 58%', minHeight: 0 }}>
        <img
          src={photo}
          alt={name}
          className="w-full h-full rounded-xl object-cover"
        />
      </div>

      {/* Name — dynamic size based on length */}
      <p
        className={`font-medium ${nameSize} px-4 pt-2 text-center overflow-hidden whitespace-nowrap text-ellipsis w-full`}
        style={{ color: 'var(--color-text-primary)' }}
      >
        {name}
      </p>

      {/* Role */}
      {role && (
        <p
          className="text-xs font-normal px-4 pt-1 text-center overflow-hidden whitespace-nowrap text-ellipsis w-full"
          style={{ color: 'var(--color-text-primary)', opacity: 0.7 }}
        >
          {role}
        </p>
      )}

      {/* Company */}
      {company && (
        <p
          className="text-xs font-normal px-4 pt-0.5 text-center overflow-hidden whitespace-nowrap text-ellipsis w-full"
          style={{ color: 'var(--color-text-primary)', opacity: 0.5 }}
        >
          {company}
        </p>
      )}

      {/* Stars */}
      <div className="mt-auto pb-4 flex items-center justify-center gap-1.5">
        {Array.from({ length: starLevel }, (_, i) => (
          <StarIcon key={i} color={fillColor} />
        ))}
      </div>
    </div>
  )
}
