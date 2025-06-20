'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const Page = () => {
  const [isOpening, setIsOpening] = useState(false)
  const router = useRouter()

  const handleOpen = () => {
    if (!isOpening) {
      setIsOpening(true)
      setTimeout(() => {
        router.push('/invitation')
      }, 1200) // match animation duration
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--color-background)' }}>
      {/* Envelope wrapper */}
      <motion.div
        style={{ position: 'relative', width: 420, height: 340, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', cursor: isOpening ? 'default' : 'pointer' }}
        onClick={handleOpen}
        initial={false}
        animate={isOpening ? 'open' : 'closed'}
      >
        {/* Envelope flap - SVG for curved bottom */}
        <motion.div
          variants={{
            closed: { rotateX: 0, y: 0, transition: { duration: 1.2 } },
            open: { rotateX: -120, y: -80, transition: { duration: 1.2, ease: [0.4, 0.1, 0.2, 1] } },
          }}
          initial="closed"
          animate={isOpening ? 'open' : 'closed'}
          style={{
            width: 420,
            height: 110,
            position: 'absolute',
            top: 60,
            left: 0,
            zIndex: 2,
            transformOrigin: 'top center',
            pointerEvents: 'none',
          }}
        >
          <svg width="420" height="110" viewBox="0 0 420 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
            <path d="M0 0 L210 70 Q210 110 210 110 Q210 110 210 70 L420 0 Z" fill="var(--color-gold)" />
            <path d="M0 0 L210 70 Q210 100 210 100 Q210 100 210 70 L420 0 Z" fill="var(--color-gold)" />
            <path d="M0 0 L210 100 Q210 110 210 110 Q210 110 210 100 L420 0 Z" fill="var(--color-gold)" />
          </svg>
        </motion.div>
        {/* Envelope body */}
        <motion.div
          variants={{
            closed: { y: 0, opacity: 1, transition: { duration: 1.2 } },
            open: { y: -40, opacity: 1, transition: { duration: 1.2, ease: [0.4, 0.1, 0.2, 1] } },
          }}
          initial="closed"
          animate={isOpening ? 'open' : 'closed'}
          style={{
            position: 'absolute',
            top: 60,
            left: 0,
            width: 420,
            height: 260,
            background: 'var(--color-white)',
            border: '2px solid var(--color-gold)',
            borderRadius: '0 0 16px 16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{ fontSize: 32, marginTop: 60 }}>💖</div>
          <div style={{ fontFamily: 'Dancing Script, var(--font-cursive), cursive', fontSize: 36, color: 'var(--color-dark-teal)', marginBottom: 2 }}>
            Verj & Ann
          </div>
          <div style={{ fontSize: 18, color: 'var(--color-charcoal)', marginBottom: 4 }}>August 15, 2025</div>
        </motion.div>
        {/* Envelope shadow for depth */}
        <div style={{
          position: 'absolute',
          top: 30,
          left: 10,
          width: 400,
          height: 250,
          background: 'rgba(0,0,0,0.04)',
          borderRadius: '0 0 14px 14px',
          zIndex: 0,
          filter: 'blur(2px)',
        }} />
      </motion.div>
      <div style={{ marginTop: 32, fontSize: 18, color: '#555', textAlign: 'center', userSelect: 'none' }}>
        Click to open your invitation
      </div>
    </div>
  )
}

export default Page