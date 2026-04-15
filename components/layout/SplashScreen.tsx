'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export function SplashScreen() {
  const [phase, setPhase] = useState<'weave' | 'fly' | 'reveal' | 'done'>('weave')
  const [navTarget, setNavTarget] = useState({ x: 0, y: 0, scale: 0.34 })
  const logoRef = useRef<HTMLDivElement>(null)

  const calcNavPosition = useCallback(() => {
    // Find the navbar logo element to get its exact position
    const navLogo = document.querySelector('[data-splash-target]') as HTMLElement
    const splashLogo = logoRef.current

    if (navLogo && splashLogo) {
      const navRect = navLogo.getBoundingClientRect()
      const splashRect = splashLogo.getBoundingClientRect()

      // Calculate the center-to-center offset
      const navCenterX = navRect.left + navRect.width / 2
      const navCenterY = navRect.top + navRect.height / 2
      const splashCenterX = splashRect.left + splashRect.width / 2
      const splashCenterY = splashRect.top + splashRect.height / 2

      // Calculate scale: navbar logo is 160px wide, splash SVG viewBox is 949 units
      // The splash SVG rendered width varies by breakpoint, so calculate dynamically
      const targetScale = navRect.width / splashRect.width

      setNavTarget({
        x: navCenterX - splashCenterX,
        y: navCenterY - splashCenterY,
        scale: targetScale,
      })
    } else {
      // Fallback if navbar logo not found
      const vh = window.innerHeight
      setNavTarget({ x: 0, y: -(vh / 2) + 36, scale: 0.34 })
    }
  }, [])

  useEffect(() => {
    // Wait a frame for layout, then calculate positions
    requestAnimationFrame(() => {
      calcNavPosition()
    })
    window.addEventListener('resize', calcNavPosition)

    // Phase 1: Weaving animation runs for 2.8s
    const flyTimer = setTimeout(() => setPhase('fly'), 2800)
    // Phase 2: Fly to navbar takes 0.9s, then reveal
    const revealTimer = setTimeout(() => setPhase('reveal'), 3700)
    // Phase 3: Background fades, done
    const doneTimer = setTimeout(() => setPhase('done'), 4500)

    return () => {
      window.removeEventListener('resize', calcNavPosition)
      clearTimeout(flyTimer)
      clearTimeout(revealTimer)
      clearTimeout(doneTimer)
    }
  }, [calcNavPosition])

  if (phase === 'done') return null

  const isFlying = phase === 'fly' || phase === 'reveal'
  const isRevealing = phase === 'reveal'

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      aria-hidden="true"
      style={{
        backgroundColor: '#F4EFE5',
        opacity: isRevealing ? 0 : 1,
        transition: isRevealing
          ? 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
          : 'none',
        pointerEvents: isRevealing ? 'none' : 'auto',
      }}
    >
      {/* Subtle woven texture overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'8\' height=\'8\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h1v1H0zM4 4h1v1H4z\' fill=\'%238C4A3008\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Ambient glow behind logo */}
      <div
        className="absolute"
        style={{
          width: '500px',
          height: '200px',
          background: 'radial-gradient(ellipse, rgba(140,74,48,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: isFlying ? 0 : 1,
          transition: 'opacity 0.6s ease-out',
        }}
      />

      {/* Logo container — centered, then flies to navbar */}
      <div
        ref={logoRef}
        style={{
          transform: isFlying
            ? `translate(${navTarget.x}px, ${navTarget.y}px) scale(${navTarget.scale})`
            : 'translate(0, 0) scale(1)',
          transition: isFlying
            ? 'transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)'
            : 'none',
          willChange: 'transform',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 949 253.32"
          className="w-[280px] sm:w-[340px] md:w-[400px]"
          style={{ overflow: 'visible' }}
        >
          {/* ═══ OUTER BORDER — draws itself like thread on a loom ═══ */}
          <rect
            x="9.5" y="9.5" width="930" height="234.32"
            fill="none"
            stroke="#8C4A30"
            strokeMiterlimit={10}
            strokeWidth={19}
            style={{
              strokeDasharray: 2328,
              strokeDashoffset: 2328,
              animation: 'drawBorder 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            }}
          />

          {/* Fill appears after border draws */}
          <rect
            x="9.5" y="9.5" width="930" height="234.32"
            fill="#8C4A30"
            stroke="none"
            style={{
              opacity: 0,
              animation: 'fadeIn 0.5s ease 1.1s forwards',
            }}
          />

          {/* ═══ INNER BORDER — second thread line ═══ */}
          <rect
            x="30.97" y="29.16" width="887.26" height="194.94"
            fill="none"
            stroke="#F5F1EB"
            strokeMiterlimit={10}
            strokeWidth={19}
            style={{
              strokeDasharray: 2164,
              strokeDashoffset: 2164,
              animation: 'drawInner 1s cubic-bezier(0.4, 0, 0.2, 1) 1.1s forwards',
            }}
          />

          {/* ═══ LETTERS — woven into the fabric one by one ═══ */}
          {/* Letter A */}
          <g style={{ opacity: 0, animation: 'weaveLetter 0.45s ease 1.5s forwards' }}>
            <polygon fill="#F5F1EB" points="119.71 98.59 100.42 98.59 100.42 117.88 100.42 193.73 119.71 193.73 119.71 117.88 138.99 117.88 138.99 193.73 158.28 193.73 158.28 117.88 158.28 98.59 138.99 98.59 119.71 98.59"/>
            <polygon fill="#F5F1EB" points="177.57 60.02 158.28 60.02 138.99 60.02 119.71 60.02 100.42 60.02 81.14 60.02 61.85 60.02 61.85 79.3 61.85 98.59 61.85 117.88 61.85 193.73 81.14 193.73 81.14 117.88 81.14 98.59 81.14 79.3 100.42 79.3 119.71 79.3 138.99 79.3 158.28 79.3 177.57 79.3 177.57 98.59 177.57 117.88 177.57 193.73 196.85 193.73 196.85 117.88 196.85 98.59 196.85 79.3 196.85 60.02 177.57 60.02"/>
          </g>

          {/* Letter S */}
          <g style={{ opacity: 0, animation: 'weaveLetter 0.45s ease 1.65s forwards' }}>
            <polygon fill="#F5F1EB" points="330.55 136.44 254.22 136.44 254.22 155.56 349.68 155.56 349.68 59.94 215.97 59.94 215.97 79.06 330.55 79.06 330.55 136.44"/>
            <polygon fill="#F5F1EB" points="235.09 117.31 311.43 117.31 311.43 98.19 215.97 98.19 215.97 193.81 349.68 193.81 349.68 174.68 235.09 174.68 235.09 117.31"/>
          </g>

          {/* Letter E */}
          <g style={{ opacity: 0, animation: 'weaveLetter 0.45s ease 1.8s forwards' }}>
            <polygon fill="#F5F1EB" points="426.66 98.59 407.37 98.59 407.37 117.88 407.37 193.73 426.66 193.73 426.66 117.88 445.94 117.88 445.94 193.73 465.23 193.73 465.23 117.88 465.23 98.59 445.94 98.59 426.66 98.59"/>
            <polygon fill="#F5F1EB" points="484.52 60.02 465.23 60.02 445.94 60.02 426.66 60.02 407.37 60.02 388.09 60.02 368.8 60.02 368.8 79.3 368.8 98.59 368.8 117.88 368.8 193.73 388.09 193.73 388.09 117.88 388.09 98.59 388.09 79.3 407.37 79.3 426.66 79.3 445.94 79.3 465.23 79.3 484.52 79.3 484.52 98.59 484.52 117.88 484.52 193.73 503.8 193.73 503.8 117.88 503.8 98.59 503.8 79.3 503.8 60.02 484.52 60.02"/>
          </g>

          {/* Letter R */}
          <g style={{ opacity: 0, animation: 'weaveLetter 0.45s ease 1.95s forwards' }}>
            <polygon fill="#F5F1EB" points="618.66 98.24 561.18 98.24 561.18 193.7 580.3 193.7 580.3 117.36 618.66 117.36 618.66 98.24"/>
            <polygon fill="#F5F1EB" points="656.8 59.99 522.93 59.99 522.93 193.7 542.05 193.7 542.05 79.11 637.67 79.11 637.67 136.48 599.54 136.48 599.54 156.57 614.73 174.58 618.66 179.24 630.85 193.7 655.87 193.7 639.75 174.58 623.75 155.61 656.8 155.61 656.8 59.99"/>
          </g>

          {/* Letter B */}
          <g style={{ opacity: 0, animation: 'weaveLetter 0.45s ease 2.1s forwards' }}>
            <polygon fill="#F5F1EB" points="675.92 79.04 675.92 59.92 810.61 59.92 810.61 67.84 810.61 79.04 810.61 98.16 810.61 104.92 810.61 117.29 675.92 117.29 675.92 98.16 791.49 98.16 791.49 79.04 675.92 79.04"/>
            <polygon fill="#F5F1EB" points="810.61 144.34 810.61 155.53 810.61 174.66 810.61 181.41 810.61 193.78 675.92 193.78 675.92 174.66 791.49 174.66 791.49 155.53 675.92 155.53 675.92 136.41 810.61 136.41 810.61 144.34"/>
          </g>

          {/* Letter I */}
          <g style={{ opacity: 0, animation: 'weaveLetter 0.45s ease 2.25s forwards' }}>
            <path fill="#F5F1EB" d="M829.74,60.02v133.71h57.37V60.02h-57.37ZM867.99,174.6h-19.12v-95.46h19.12v95.46Z"/>
          </g>
        </svg>
      </div>

      {/* Subtle loading indicator */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        style={{
          opacity: isFlying ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      >
        <div
          className="w-12 h-[1px] bg-clay/30 overflow-hidden rounded-full"
        >
          <div
            className="h-full bg-clay/70 rounded-full"
            style={{
              animation: 'loadingBar 2.4s ease-in-out forwards',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes drawBorder {
          from { stroke-dashoffset: 2328; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes drawInner {
          from { stroke-dashoffset: 2164; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes weaveLetter {
          0%   { opacity: 0; transform: translateY(6px) scaleY(0.8); }
          50%  { opacity: 1; transform: translateY(-1px) scaleY(1.01); }
          100% { opacity: 1; transform: translateY(0) scaleY(1); }
        }
        @keyframes loadingBar {
          0%   { width: 0%; }
          60%  { width: 70%; }
          100% { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}
