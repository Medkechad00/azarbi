'use client'

import { useState, useRef, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// ─── Data ────────────────────────────────────────────────────────────────────

const pillars = [
  {
    icon: '◇',
    title: 'Zero Middlemen',
    headline: 'Direct from weaver to you',
    desc: "We work directly with 35+ cooperatives across the Middle and High Atlas Mountains. No warehouses, no wholesalers, no markups. The price you pay reflects the true value of the artisan's work.",
  },
  {
    icon: '◈',
    title: 'Fair Compensation',
    headline: 'Artisans set their own prices',
    desc: 'Our weavers determine their rates based on the complexity, materials, and time invested. We pay 100% upfront — never on consignment. Every transaction is transparent and traceable.',
  },
  {
    icon: '○',
    title: 'Cultural Preservation',
    headline: '1,000+ years of living tradition',
    desc: 'Each rug carries centuries of Amazigh symbolism — diamond motifs for protection, zigzag lines for water and life. By purchasing directly, you help ensure these techniques survive for future generations.',
  },
  {
    icon: '□',
    title: 'Sustainable Craft',
    headline: 'Natural materials, zero waste',
    desc: 'Virgin wool from local sheep, natural plant and mineral dyes, hand-spun yarn, and sun-drying. Every step is traditional, sustainable, and produces rugs built to last 50+ years.',
  },
]

const impactNumbers = [
  { value: '200+', label: 'Women weavers supported', detail: 'Across the Middle and High Atlas' },
  { value: '35+',  label: 'Cooperatives partnered',  detail: 'Each independently women-led'    },
  { value: '5%',   label: 'Reinvested per sale',     detail: 'Into cooperative infrastructure' },
  { value: '0',    label: 'Middlemen involved',      detail: 'Direct artisan-to-buyer model'   },
]

const investments = [
  { title: 'Looms & Equipment',       desc: 'Funding modern wooden looms and wool processing equipment so cooperatives can increase output without sacrificing quality.'                               },
  { title: 'Natural Dye Workshops',   desc: 'Training in traditional plant and mineral dyeing techniques — pomegranate, indigo, saffron, henna — keeping ancient colour recipes alive.'              },
  { title: 'Literacy Programs',       desc: 'Supporting reading and numeracy education for artisans and their children, enabling cooperative members to manage their own finances.'                   },
  { title: 'Apprentice Stipends',     desc: 'Monthly stipends for young women learning to weave, ensuring the next generation can afford to pursue the craft.'                                       },
]

const craftSteps = [
  {
    num: '01',
    title: 'Shearing & Sorting',
    desc: 'Wool is sheared from local sheep in late spring, then hand-sorted by quality and colour. The finest fleece is reserved for Beni Ourain and Azilal rugs.',
  },
  {
    num: '02',
    title: 'Spinning & Dyeing',
    desc: 'Wool is washed in mountain streams, carded, and spun into yarn on wooden drop spindles. Natural dyes are prepared from pomegranate, indigo, saffron, and henna.',
  },
  {
    num: '03',
    title: 'Weaving & Finishing',
    desc: 'Weavers work on traditional low-ground looms, tying each knot individually. A single rug may contain over 100,000 hand-tied knots and take 2–6 months to complete.',
  },
]

// ─── Constants ───────────────────────────────────────────────────────────────

// Heavy inertia — intentional, editorial pacing
const EASE_EDITORIAL: [number, number, number, number] = [0.16, 1, 0.3, 1]
const SPRING_THREAD = { stiffness: 80, damping: 22, mass: 1.2 }

// Single-line string — multiline JSX literals create SSR/client whitespace mismatches
const THREAD_PATH = 'M 0,28 C 70,6 130,50 200,28 C 270,6 330,50 400,28 C 470,6 530,50 600,28 C 670,6 730,50 800,28 C 870,6 930,50 1000,28 C 1070,6 1130,50 1200,28'

// ─── Counter hook (easeOutQuart deceleration) ─────────────────────────────────

function useCounter(target: number, duration: number, enabled: boolean): number {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!enabled) { setValue(0); return }
    let startTime = 0
    let raf = 0
    const tick = (ts: number) => {
      if (!startTime) startTime = ts
      const t = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 4)
      setValue(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [enabled, target, duration])
  return value
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <motion.div
      className="flex items-center gap-4 mb-10"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
    >
      <h2 className="font-display text-2xl text-night flex-shrink-0">{title}</h2>
      <motion.div
        className="h-px flex-1 bg-bone2 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE_EDITORIAL }}
      />
    </motion.div>
  )
}

// ─── StatCard (counter + blur-to-focus) ──────────────────────────────────────

interface StatItem { value: string; label: string; detail: string }

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const numeric = parseInt(stat.value.replace(/\D/g, ''), 10) || 0
  const suffix  = stat.value.replace(/\d/g, '')
  const count   = useCounter(numeric, 1800, isInView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: EASE_EDITORIAL }}
      className="bg-argane/10 border border-argane/20 rounded-brand p-8 text-center"
    >
      <span
        className="font-mono text-4xl text-night block mb-2 tabular-nums"
        aria-label={stat.value}
      >
        {isInView ? count : 0}{suffix}
      </span>

      <motion.span
        className="text-sm text-night font-medium block mb-1"
        initial={{ filter: 'blur(4px)', opacity: 0.3 }}
        animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: index * 0.1 + 0.5 }}
      >
        {stat.label}
      </motion.span>

      <motion.span
        className="text-[12px] text-smoke"
        initial={{ filter: 'blur(4px)', opacity: 0 }}
        animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: index * 0.1 + 0.85 }}
      >
        {stat.detail}
      </motion.span>
    </motion.div>
  )
}

// ─── PillarCard (accordion) ───────────────────────────────────────────────────

interface PillarItem { icon: string; title: string; headline: string; desc: string }

function PillarCard({
  pillar,
  isActive,
  hasFocus,
  onToggle,
}: {
  pillar: PillarItem
  isActive: boolean
  hasFocus: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      animate={{ opacity: hasFocus && !isActive ? 0.4 : 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      onClick={onToggle}
      onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && onToggle()}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      className={[
        'rounded-brand border p-8 cursor-pointer select-none outline-none',
        'focus-visible:ring-2 focus-visible:ring-clay/40',
        'transition-[background-color,border-color,box-shadow] duration-300',
        isActive
          ? 'bg-night border-clay/30 shadow-md'
          : 'bg-bone/30 border-bone2 hover:border-clay/20',
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <span className={`text-2xl block mb-3 transition-colors duration-300 ${isActive ? 'text-clay' : 'text-clay/50'}`}>
            {pillar.icon}
          </span>
          <h3 className={`font-display text-lg leading-snug transition-colors duration-300 ${isActive ? 'text-linen' : 'text-night'}`}>
            {pillar.title}
          </h3>
          <p className={`text-[12px] italic mt-1 transition-colors duration-300 ${isActive ? 'text-clay/70' : 'text-clay'}`}>
            {pillar.headline}
          </p>
        </div>
        <motion.span
          animate={{ rotate: isActive ? 45 : 0 }}
          transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
          className={`text-xl font-light flex-shrink-0 mt-1 transition-colors duration-300 ${isActive ? 'text-clay/80' : 'text-smoke/40'}`}
        >
          +
        </motion.span>
      </div>

      {/* Collapsed preview */}
      <AnimatePresence initial={false}>
        {!isActive && (
          <motion.p
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-smoke/70 leading-relaxed line-clamp-2"
          >
            {pillar.desc}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Expanded — line-by-line reveal via clip-path mask */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.48, ease: EASE_EDITORIAL }}
            style={{ overflow: 'hidden' }}
          >
            <div className="border-t border-white/10 pt-4 mt-1">
              <motion.p
                initial={{ clipPath: 'inset(0 0 100% 0)', y: 14 }}
                animate={{ clipPath: 'inset(0 0 0% 0)',   y: 0  }}
                transition={{ duration: 0.55, delay: 0.08, ease: EASE_EDITORIAL }}
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(244,239,229,0.82)', lineHeight: '1.85', letterSpacing: '0.01em' }}
              >
                {pillar.desc}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── CraftSection (SVG thread + scroll-bound card reveal) ─────────────────────

function CraftSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 20%'],
  })

  // Spring gives the thread an organic, lagging-thread pull
  const rawProgress = useTransform(scrollYProgress, [0, 1], [0, 1])
  const pathLength  = useSpring(rawProgress, SPRING_THREAD)

  // Each card wakes as the thread reaches it (staggered thirds)
  const card1Scale   = useTransform(pathLength, [0,    0.22, 0.40], [0.95, 0.95, 1.0])
  const card2Scale   = useTransform(pathLength, [0.32, 0.56, 0.70], [0.95, 0.95, 1.0])
  const card3Scale   = useTransform(pathLength, [0.62, 0.84, 1.00], [0.95, 0.95, 1.0])
  const card1Opacity = useTransform(pathLength, [0,    0.30],        [0.35, 1])
  const card2Opacity = useTransform(pathLength, [0.30, 0.60],        [0.35, 1])
  const card3Opacity = useTransform(pathLength, [0.60, 0.90],        [0.35, 1])

  const scales    = [card1Scale,   card2Scale,   card3Scale  ]
  const opacities = [card1Opacity, card2Opacity, card3Opacity]

  return (
    <div ref={containerRef} className="mb-20">
      <SectionHeader title="The Craft Behind Every Rug" />

      {/* Thread — sits between heading and cards, desktop only */}
      <div className="h-14 mb-4 hidden lg:block" aria-hidden="true">
        <svg
          width="100%"
          height="56"
          viewBox="0 0 1200 56"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Static guide wire */}
          <line x1="0" y1="28" x2="1200" y2="28" stroke="#D9CFBF" strokeWidth="0.5" />

          {/* Animated woolen thread — organic sine wave */}
          <motion.path
            d={THREAD_PATH}
            stroke="#8C4A30"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            style={{ pathLength, opacity: 0.72 }}
          />
        </svg>
      </div>

      {/* Cards — scale + fade triggered by the thread reaching each one */}
      <div className="grid lg:grid-cols-3 gap-6">
        {craftSteps.map((step, i) => (
          <motion.div
            key={step.title}
            style={{ scale: scales[i], opacity: opacities[i] }}
            className="bg-bone/30 rounded-brand border border-bone2 p-8 origin-bottom will-change-transform"
          >
            <span className="font-mono text-5xl text-clay/15 block mb-2">{step.num}</span>
            <h3 className="font-display text-lg text-night mb-3">{step.title}</h3>
            <p
              className="text-sm text-smoke leading-relaxed"
              style={{ lineHeight: '1.82', letterSpacing: '0.01em' }}
            >
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OurStoryClient() {
  const [activePillar, setActivePillar] = useState<number | null>(null)
  const toggle = (i: number) => setActivePillar(p => p === i ? null : i)

  return (
    <div className="bg-linen min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6 lg:px-12">

        {/* ── Page title ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_EDITORIAL }}
        >
          <p className="text-label uppercase tracking-[0.1em] text-smoke mb-4">About Azarbi</p>
          <h1 className="font-display text-display-xl text-night mb-6">Our Story</h1>
          <p
            className="text-lg text-smoke mb-16 max-w-2xl"
            style={{ lineHeight: '1.85', letterSpacing: '0.015em' }}
          >
            Azarbi — meaning &ldquo;rugs&rdquo; in Tamazight — was born from a simple belief:
            the women who weave these masterpieces deserve to be recognised, respected, and fairly paid.
          </p>
        </motion.div>

        {/* ── Hero & Loom ── */}
        <div className="relative mb-28">

          {/* Image: warm exposure shift on load */}
          <motion.div
            className="relative w-full aspect-[21/9] rounded-brand overflow-hidden"
            initial={{ opacity: 0, filter: 'brightness(0.45) saturate(0.55)' }}
            animate={{ opacity: 1, filter: 'brightness(1) saturate(1)' }}
            transition={{ duration: 1.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src="/images/story/amazigh-weaving-heritage-story.png"
              alt="Authentic Amazigh craftsmanship and weaving heritage in the Atlas Mountains"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-night/50 to-transparent" />
          </motion.div>

          {/* Blockquote — editorial stamp, slides in from right with heavy inertia */}
          <div className="relative md:absolute md:bottom-0 md:right-8 md:translate-y-1/2 mt-6 md:mt-0">
            <motion.div
              className="bg-linen rounded-brand border border-bone2 p-8 lg:p-10 md:max-w-md shadow-sm"
              initial={{ opacity: 0, x: 68 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 0.85, ease: EASE_EDITORIAL }}
            >
              <p
                className="font-display text-xl text-night mb-4"
                style={{ lineHeight: '1.72', letterSpacing: '-0.012em' }}
              >
                &ldquo;Every knot in an Amazigh rug is a word. Every rug is a story.
                We simply help these stories find the homes that will cherish them.&rdquo;
              </p>
              <span className="text-label-sm text-smoke uppercase tracking-widest">
                — Azarbi Founding Team
              </span>
            </motion.div>
          </div>
        </div>

        {/* ── Why We Exist ── */}
        <div className="mb-20">
          <SectionHeader title="Why Azarbi Exists" />
          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                num: '01',
                title: 'The Problem We Saw',
                cls: 'bg-bone/30 border-bone2',
                body: [
                  "For centuries, Amazigh women across Morocco's Atlas Mountains have woven extraordinary rugs — each piece a living archive of family histories, spiritual symbols, and tribal identity.",
                  "Yet these artisans rarely saw fair compensation. A complex chain of middlemen, exporters, and mass-market retailers extracted the value at every step, leaving cooperatives struggling to sustain their craft and communities.",
                  "The rugs sold for thousands in European and American showrooms. The women who spent months weaving them earned a fraction.",
                ],
              },
              {
                num: '02',
                title: 'What We Do Differently',
                cls: 'bg-argane/10 border-argane/20',
                body: [
                  "Azarbi removes every intermediary between the weaver and you. We travel to the cooperatives, build long-term relationships, and let artisans set their own prices based on the true value of their work.",
                  "Every rug comes with a Certificate of Authenticity documenting the weaver's name, her cooperative, the region, materials used, and approximate weaving duration. You know exactly who made your rug and where your money goes.",
                  "This isn't charity — it's commerce done right. Fair pricing for exceptional work.",
                ],
              },
            ].map((card, i) => (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.78, delay: i * 0.14, ease: EASE_EDITORIAL }}
                className={`rounded-brand border p-8 lg:p-10 ${card.cls}`}
              >
                <span className="font-mono text-5xl text-clay/15 block mb-4">{card.num}</span>
                <h3 className="font-display text-xl text-night mb-4">{card.title}</h3>
                {card.body.map((p, pi) => (
                  <p
                    key={pi}
                    className="text-smoke text-[15px] mb-4 last:mb-0"
                    style={{ lineHeight: '1.85', letterSpacing: '0.01em' }}
                  >
                    {p}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Our Pillars (Accordion) ── */}
        <div className="mb-20">
          <SectionHeader title="Our Pillars" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((pillar, i) => (
              <PillarCard
                key={pillar.title}
                pillar={pillar}
                isActive={activePillar === i}
                hasFocus={activePillar !== null}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>

        {/* ── Impact Numbers ── */}
        <div className="mb-20">
          <SectionHeader title="Our Impact" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactNumbers.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>

        {/* ── Where Your 5% Goes ── */}
        <div className="mb-20">
          <SectionHeader title="Where Your 5% Goes" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.72, ease: EASE_EDITORIAL }}
            className="bg-bone/30 rounded-brand border border-bone2 p-8 lg:p-10"
          >
            <p
              className="text-smoke mb-8 max-w-2xl"
              style={{ lineHeight: '1.82', letterSpacing: '0.01em' }}
            >
              We reinvest 5% of every sale back into cooperative infrastructure. This isn&apos;t a
              marketing pledge — it&apos;s a core part of our operating model. Here&apos;s how it&apos;s spent:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {investments.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_EDITORIAL }}
                  className="flex gap-4 items-start"
                >
                  <span className="text-clay mt-1 flex-shrink-0">✦</span>
                  <div>
                    <h4 className="text-night font-medium mb-1">{item.title}</h4>
                    <p
                      className="text-sm text-smoke leading-relaxed"
                      style={{ lineHeight: '1.78' }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── The Craft — SVG Thread Section ── */}
        <CraftSection />

        {/* ── Bottom CTAs ── */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.72, ease: EASE_EDITORIAL }}
        >
          <div className="bg-argane/10 border border-argane/20 rounded-brand p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl text-night mb-3">Browse Collections</h3>
              <p
                className="text-smoke text-sm leading-relaxed mb-6"
                style={{ lineHeight: '1.78' }}
              >
                Discover one-of-a-kind rugs handwoven by the artisans behind our mission.
              </p>
            </div>
            <Link href="/collections" className="btn-primary text-center">Shop Now</Link>
          </div>

          <div className="bg-bone/30 border border-bone2 rounded-brand p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl text-night mb-3">Meet the Weavers</h3>
              <p
                className="text-smoke text-sm leading-relaxed mb-6"
                style={{ lineHeight: '1.78' }}
              >
                Get to know the women preserving these ancient techniques across the Atlas Mountains.
              </p>
            </div>
            <Link href="/weavers" className="btn-secondary text-center">View Weavers</Link>
          </div>

          <div className="bg-bone/30 border border-bone2 rounded-brand p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl text-night mb-3">Commission a Rug</h3>
              <p
                className="text-smoke text-sm leading-relaxed mb-6"
                style={{ lineHeight: '1.78' }}
              >
                Design your dream piece with our master weavers. 100% custom, 100% unique.
              </p>
            </div>
            <Link href="/bespoke" className="btn-secondary text-center">Start Bespoke</Link>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
