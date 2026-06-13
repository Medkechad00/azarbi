'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Category {
  id: string
  name: string
  slug: string
  image_url: string | null
}

// ── Container: staggers children as each enters the viewport ──
const STAGGER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
}

// ── Card: slides up while its inset clip retreats from top → reveals top-first,
//    like fabric being unrolled downward off a shelf ──
const CARD = {
  hidden: {
    opacity: 0,
    y: 48,
    clipPath: 'inset(100% 0% 0% 0%)',
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 0.92,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    },
  },
}

// ── Hover: organic polygon warp that mimics the imperfect edge of a real rug ──
// Each corner shifts by ~1-2% in a unique direction, breaking perfect geometry
const IMAGE_CONTAINER_HOVER = {
  hovered: {
    clipPath: 'polygon(0.8% 1.4%, 99.4% 0.2%, 99.3% 98.7%, 0.4% 99.8%)',
    transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] },
  },
}

const IMAGE_SCALE_HOVER = {
  hovered: {
    scale: 1.068,
    transition: { duration: 0.78, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] },
  },
}

const TEXT_HOVER = {
  hovered: {
    color: 'var(--color-clay)',
    transition: { duration: 0.32 },
  },
}

const ARROW_HOVER = {
  hovered: {
    x: 5,
    transition: { type: 'spring' as const, stiffness: 360, damping: 22 },
  },
}

export function CategoryGrid({ categories }: { categories: Category[] }) {
  const ref = useRef<HTMLDivElement>(null)
  // Fire once when the grid's top edge is 8% into the viewport
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={STAGGER}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {categories.map((cat) => (
        // Outer card: drives both the scroll-stagger entrance and the hover propagation
        <motion.div
          key={cat.id}
          variants={CARD}
          className="flex flex-col"
          whileHover="hovered"
        >
          <Link href={`/collections/${cat.slug}`} className="flex flex-col gap-4">

            {/* Image container: polygon warp on hover (organic rug edge) */}
            <motion.div
              className="relative aspect-[3/4] rounded-brand overflow-hidden bg-bone"
              style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
              variants={IMAGE_CONTAINER_HOVER}
            >
              {cat.image_url ? (
                // Inner image: gentle scale inside the container (cropped by overflow-hidden)
                <motion.div className="absolute inset-0" variants={IMAGE_SCALE_HOVER}>
                  <Image
                    src={cat.image_url}
                    alt={`${cat.name} rugs`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                </motion.div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-bone/80">
                  <span className="font-display text-2xl text-smoke/50">
                    {cat.name.charAt(0)}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Text row */}
            <div className="flex items-center justify-between">
              <motion.span
                className="font-display text-xl lg:text-2xl text-night"
                variants={TEXT_HOVER}
              >
                {cat.name}
              </motion.span>
              <motion.span className="text-smoke" variants={ARROW_HOVER}>
                →
              </motion.span>
            </div>

          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
