'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'

// ── Count-up with ease-out-quart easing ──
// The `1 - (1-t)^4` curve decelerates very heavily toward the end,
// making the final digits feel considered and deliberate, not mechanical.
function useCountUp(target: number, durationMs: number, active: boolean) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1)
      const eased = 1 - Math.pow(1 - t, 4)
      setValue(Math.round(eased * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, durationMs])

  return value
}

export function OriginSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  // Stats count-up fires once when the numbers enter the viewport
  const statsInView = useInView(statsRef, { once: true, margin: '-15% 0px' })
  const cooperatives = useCountUp(14,  1900, statsInView)
  const weavers      = useCountUp(120, 2500, statsInView)

  // ── Parallax: track section scroll progress and drive a spring-based Y offset ──
  // mass:2.2 + stiffness:24 = very high inertia — the image lags noticeably behind
  // the scroll position, feeling heavy and grounded like a stack of real rugs.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const rawY = useTransform(scrollYProgress, [0, 1], [32, -32])
  const smoothY = useSpring(rawY, { stiffness: 24, damping: 20, mass: 2.2 })

  return (
    <section ref={sectionRef} className="py-32 bg-night text-linen overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        {/* ── Left: Text & Stats ── */}
        <div className="w-full lg:w-1/2">
          <span className="text-label text-smoke uppercase tracking-widest mb-6 block">
            Origin Context
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
            Rooted in the peaks of the Atlas.
          </h2>
          <p className="text-smoke text-lg leading-relaxed mb-12 max-w-lg">
            Each rug is geographically distinct. The thick piles of Beni Ourain originated to protect
            against Middle Atlas snows, while the flat Kilim weaves were born from the nomadic necessity
            of the pre-Saharan plains. We travel directly to these isolated cooperatives.
          </p>

          <div ref={statsRef} className="grid grid-cols-2 gap-8 mb-12">
            <div>
              {/* tabular-nums keeps digits from jumping as they increment */}
              <span className="block font-display text-4xl text-clay mb-2 tabular-nums">
                {cooperatives}
              </span>
              <span className="text-label-sm uppercase tracking-widest text-smoke">
                Partner Cooperatives
              </span>
            </div>
            <div>
              <span className="block font-display text-4xl text-clay mb-2 tabular-nums">
                {weavers}+
              </span>
              <span className="text-label-sm uppercase tracking-widest text-smoke">
                Independent Weavers
              </span>
            </div>
          </div>

          <Button asChild variant="secondary" className="bg-linen text-night hover:bg-bone transition-colors">
            <Link href="/our-story">Discover Our Story</Link>
          </Button>
        </div>

        {/* ── Right: Parallax image ──
            The outer div clips the movement; the inner motion.div is oversized by
            12% on all sides so parallax movement never exposes an empty edge.
            The grayscale/blend-mode stay on the outer wrapper as before. ── */}
        <div className="w-full lg:w-1/2 relative aspect-square lg:aspect-[4/3] rounded-brand overflow-hidden filter grayscale opacity-80 mix-blend-screen">
          <motion.div
            className="absolute"
            style={{ inset: '-12%', y: smoothY }}
          >
            <Image
              src="/images/home/atlas-mountains-amazigh-weaving-cooperative.png"
              alt="Amazigh women weaving traditional Moroccan rugs in the High Atlas Mountains"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
