'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

// Elastic ease mimics a heavy textile settling — fast initial movement, organic bounce decay
const ELASTIC: [number, number, number, number] = [0.215, 0.61, 0.355, 1]
const SMOOTH: [number, number, number, number] = [0.25, 1, 0.5, 1]

const HERO_LINES = ['One Rug.', 'One Weaver.', 'Yours Forever.']

export function HeroSplit() {
  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row">
      {/* ── Left: Text Panel ── */}
      <div className="w-full md:w-1/2 bg-linen flex flex-col justify-center px-6 lg:px-20 py-32 md:py-0">
        <div className="max-w-xl">

          {/* Eyebrow — simple fade + drift */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: SMOOTH, delay: 4.5 }}
            className="text-label text-smoke uppercase tracking-widest mb-6 block"
          >
            The Original Masterweavers
          </motion.span>

          {/* Heading — each line masks upward from behind an invisible boundary */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-night leading-[1.05] tracking-tight mb-8">
            {HERO_LINES.map((line, i) => (
              // overflow-hidden is the invisible boundary; the text slides up from below it
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: '115%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: 1.05,
                    ease: ELASTIC,
                    delay: 4.65 + i * 0.18,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: SMOOTH, delay: 5.2 }}
            className="text-smoke text-lg leading-relaxed mb-10 max-w-md"
          >
            Connecting design-conscious buyers directly with the Amazigh women of the Atlas Mountains.
            100% of the cooperative&apos;s asking price goes directly to them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: SMOOTH, delay: 5.42 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild>
              <Link href="/collections">Shop the Collection</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/bespoke">Bespoke Orders</Link>
            </Button>
          </motion.div>

        </div>
      </div>

      {/* ── Right: Image "Unroll" Panel ──
          The clip-path sweeps from a thin sliver at the left edge to full width,
          with a deliberately angled leading edge (columns advance faster at top than
          bottom) to mimic a heavy textile being laid down diagonally.
          The simultaneous scale from 1.08 → 1.0 sells the weight landing. */}
      <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-screen bg-bone overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{
            clipPath: 'polygon(0% 0%, 6% 0%, 0% 100%, 0% 100%)',
            scale: 1.08,
          }}
          animate={{
            clipPath: [
              'polygon(0% 0%, 6%  0%,  0%  100%, 0% 100%)',
              'polygon(0% 0%, 62% 0%,  54% 100%, 0% 100%)',
              'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ],
            scale: 1,
          }}
          transition={{
            clipPath: {
              duration: 1.55,
              ease: ELASTIC,
              delay: 4.3,
              times: [0, 0.5, 1],
            },
            scale: {
              duration: 2.1,
              ease: SMOOTH,
              delay: 4.3,
            },
          }}
        >
          <Image
            src="/images/home/luxury-moroccan-artisan-rug-hero.png"
            alt="Exquisite hand-tied Moroccan rug featuring traditional Amazigh patterns"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-night/5" />
        </motion.div>
      </div>
    </section>
  )
}
