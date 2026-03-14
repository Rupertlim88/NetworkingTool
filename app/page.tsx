'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ContactCard } from '@/components/ContactCard'
import { MOCK_CONTACTS } from '@/lib/mock-data'
import { calculateGridDimensions } from '@/lib/grid-scaling'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function updateGrid() {
      if (!gridRef.current) return
      const result = calculateGridDimensions(window.innerWidth)
      if (!result) {
        gridRef.current.style.removeProperty('--card-width')
        gridRef.current.style.removeProperty('--card-gap')
        gridRef.current.style.removeProperty('--row-gap')
        return
      }
      gridRef.current.style.setProperty('--card-width', `${result.cardWidth}px`)
      gridRef.current.style.setProperty('--card-gap', `${result.gap}px`)
      gridRef.current.style.setProperty('--row-gap', `${result.rowGap}px`)

      // Scale shadow: grows with row gap but at 40% rate to avoid overwhelming cards
      // At reference rowGap=30px, s=1.0 (unchanged). At larger gaps, shadow grows slower.
      const rowGapDelta = result.rowGap - 30
      const s = 1 + (rowGapDelta * 0.4) / 30
      gridRef.current.style.setProperty('--shadow-card',
        `0 ${2*s}px ${4*s}px rgba(0,0,0,0.4), ` +
        `0 ${8*s}px ${16*s}px rgba(0,0,0,0.3), ` +
        `0 ${20*s}px ${40*s}px rgba(0,0,0,0.2), ` +
        `0 ${30*s}px ${40*s}px ${-10*s}px rgba(0,0,0,0.9)`
      )
    }

    updateGrid()
    window.addEventListener('resize', updateGrid)
    return () => window.removeEventListener('resize', updateGrid)
  }, [])

  useGSAP(
    () => {
      gsap.set('.contact-card', { opacity: 0, z: -100, scale: 0.9 })

      ScrollTrigger.batch('.contact-card', {
        interval: 0.1,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            z: 0,
            scale: 1,
            duration: 0.6,
            stagger: { each: 0.08, grid: 'auto', from: 'start' },
            ease: 'back.out(1.2)',
            overwrite: true,
          }),
        once: true,
      })
    },
    { scope: containerRef }
  )

  return (
    <div
      className="grid-page-bg"
      style={{ background: 'var(--color-grid-bg)', minHeight: '100vh' }}
    >
      {/* Fixed gradient bleed overlay */}
      <div
        className="fixed inset-x-0 top-0 pointer-events-none z-0"
        style={{ height: '20vh', background: 'var(--gradient-grid-bleed)' }}
      />

      {/* Grid container with perspective for Z-axis animation */}
      <div
        ref={containerRef}
        style={{ perspective: '1000px' }}
        className="relative z-10 pt-8 pb-16"
      >
        <div ref={gridRef} className="contact-grid">
          {MOCK_CONTACTS.map((contact) => (
            <div key={contact.id} className="contact-card">
              <ContactCard
                name={contact.name}
                photo={contact.photo}
                role={contact.role}
                company={contact.company}
                starLevel={contact.starLevel}
                starColor={contact.starColor}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
