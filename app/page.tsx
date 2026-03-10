'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ContactCard } from '@/components/ContactCard'
import { MOCK_CONTACTS } from '@/lib/mock-data'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

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
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5 mx-auto max-w-[1400px] px-5">
          {MOCK_CONTACTS.map((contact) => (
            <div key={contact.id} className="contact-card">
              <ContactCard
                name={contact.name}
                photo={contact.photo}
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
