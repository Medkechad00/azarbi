'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion'
import { BespokeForm } from './BespokeForm'

/* ─── static data ─────────────────────────────────────── */

const steps = [
  {
    num: '01',
    title: 'Consultation & Design',
    desc: 'Share your inspiration — dimensions, colour palette, pattern style, and budget. We consult with our master weavers to translate your vision into a weaving plan.',
    duration: '1–3 days',
  },
  {
    num: '02',
    title: 'Quotation & Materials',
    desc: 'We provide a detailed quote and timeline. Once a 50% deposit is paid, raw wool is sourced, hand-spun, and dyed using your chosen palette.',
    duration: '3–5 days',
  },
  {
    num: '03',
    title: 'Weaving & Updates',
    desc: "Your weaver begins hand-knotting your rug on a traditional loom. We send photographic progress updates throughout so you can see your piece come to life.",
    duration: '4–12 weeks',
  },
  {
    num: '04',
    title: 'Finishing & Delivery',
    desc: "The finished rug is washed in mountain streams, sun-dried, and carefully inspected. It's then shipped worldwide via DHL Express with a Certificate of Authenticity.",
    duration: '5–14 days',
  },
]

const options = [
  { icon: '◇', title: 'Size', desc: 'Any dimension — from a 60×90 cm doormat to a 400×500 cm grand salon piece.' },
  { icon: '◈', title: 'Colour', desc: 'Choose from natural undyed wool, traditional plant dyes, or custom mineral dye palettes.' },
  { icon: '□', title: 'Pattern', desc: 'Beni Ourain diamonds, Azilal abstracts, geometric kilims, or your own original design.' },
  { icon: '○', title: 'Material', desc: 'Virgin wool, Mermousa wool, cotton warp, or recycled textile (Boucherouite style).' },
  { icon: '△', title: 'Pile Depth', desc: 'From 0.3 cm flat-weave kilims to 4 cm ultra-plush Beni Ourain clouds.' },
  { icon: '⬡', title: 'Budget', desc: 'Starting from $350 for small pieces. We work within your range to find the right solution.' },
]

const stats = [
  { value: '100+', label: 'Custom rugs delivered' },
  { value: '4–12', label: 'Weeks production' },
  { value: '35+', label: 'Weavers available' },
  { value: '∞', label: 'Design possibilities' },
]

const perks = [
  'No minimum order value',
  'Progress photos throughout production',
  'Certificate of Authenticity included',
  '50% deposit, 50% on completion',
  'Free worldwide shipping',
]

/* ─── shared easing ───────────────────────────────────── */

const EASE_PREMIUM = [0.25, 1, 0.5, 1] as const
const HOVER_SPRING = { type: 'spring' as const, mass: 1, stiffness: 280, damping: 22 }

/* ─── HeroImage — mouse-move parallax depth ───────────── */

function HeroImage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const springCfg = { damping: 28, stiffness: 110 }
  const sx = useSpring(rawX, springCfg)
  const sy = useSpring(rawY, springCfg)

  // Three depth planes — different speeds & opposite badge direction
  const imgX = useTransform(sx, [-1, 1], [-9, 9])
  const imgY = useTransform(sy, [-1, 1], [-5, 5])
  const overlayX = useTransform(sx, [-1, 1], [-4, 4])
  const overlayY = useTransform(sy, [-1, 1], [-2, 2])
  const badgeX = useTransform(sx, [-1, 1], [15, -15])
  const badgeY = useTransform(sy, [-1, 1], [8, -8])

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = containerRef.current?.getBoundingClientRect()
    if (!r) return
    rawX.set(((e.clientX - r.left) / r.width) * 2 - 1)
    rawY.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }

  function onMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[21/9] rounded-brand overflow-hidden mb-20"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* image — scales up slightly so movement never reveals edges */}
      <motion.div
        className="absolute inset-0"
        style={{ x: imgX, y: imgY, scale: 1.08 }}
      >
        <Image
          src="/images/bespoke/moroccan-loom-weaving-workshop.png"
          alt="Flat lay of a Moroccan weaving workshop showing traditional tools and vibrant wool yarns"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </motion.div>

      {/* gradient overlay — midground */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-night/40 to-transparent"
        style={{ x: overlayX, y: overlayY }}
      />

      {/* badge — foreground, moves opposite direction for depth */}
      <motion.div
        className="absolute bottom-8 left-8 z-10"
        style={{ x: badgeX, y: badgeY }}
      >
        <span className="bg-linen/90 backdrop-blur-sm text-night text-sm px-5 py-2.5 rounded-brand">
          Every bespoke rug is 100% unique — designed by you, woven by a master artisan
        </span>
      </motion.div>
    </div>
  )
}

/* ─── CustomCard — stagger in + hover spring ─────────── */

function CustomCard({ opt, index }: { opt: typeof options[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.05, ease: EASE_PREMIUM }}
      whileHover={{
        y: -8,
        boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
        transition: HOVER_SPRING,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="bg-bone/30 rounded-brand border border-bone2 p-8 hover:border-clay/30 transition-colors cursor-default"
    >
      <motion.span
        className="text-2xl block mb-4"
        animate={
          hovered
            ? { rotate: 8, x: 3, color: 'rgba(140,74,48,0.7)' }
            : { rotate: 0, x: 0, color: 'rgba(140,74,48,0.5)' }
        }
        transition={HOVER_SPRING}
      >
        {opt.icon}
      </motion.span>

      <motion.h3
        className="font-display text-lg mb-3"
        animate={{ color: hovered ? '#8C4A30' : '#1C1815' }}
        transition={{ duration: 0.18 }}
      >
        {opt.title}
      </motion.h3>

      <p className="text-sm text-smoke leading-relaxed">{opt.desc}</p>
    </motion.div>
  )
}

/* ─── ProcessCard — 3D tilt + step number fade ─────────── */

function ProcessCard({
  step,
  index,
  total,
}: {
  step: typeof steps[0]
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  // Tighter viewport window so the tilt flattens near centre
  const inView = useInView(ref, { margin: '-18% 0px -18% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotateX: 4 }}
      animate={inView ? { opacity: 1, rotateX: 0 } : { opacity: 0.5, rotateX: 4 }}
      transition={{ duration: 0.75, ease: EASE_PREMIUM }}
      style={{ transformPerspective: 1000 }}
      className="relative bg-bone/30 rounded-brand border border-bone2 p-8"
    >
      {/* step number — dims / lights up on focal entry */}
      <motion.span
        className="font-mono text-5xl absolute top-4 right-6 select-none"
        animate={
          inView
            ? { opacity: 0.55, color: '#8C4A30' }
            : { opacity: 0.1, color: '#8C4A30' }
        }
        transition={{ duration: 0.45 }}
      >
        {step.num}
      </motion.span>

      <div className="relative z-10">
        <h3 className="font-display text-lg text-night mb-3">{step.title}</h3>
        <p className="text-sm text-smoke leading-relaxed mb-4">{step.desc}</p>
        <span className="font-mono text-xs text-clay bg-clay/10 px-3 py-1 rounded-brand">
          {step.duration}
        </span>
      </div>

      {index < total - 1 && (
        <motion.span
          className="hidden lg:block absolute top-1/2 -right-4 text-xl z-20"
          animate={inView ? { opacity: 0.5, x: 0 } : { opacity: 0.15, x: -3 }}
          transition={{ duration: 0.35 }}
          style={{ color: '#8C4A30' }}
        >
          →
        </motion.span>
      )}
    </motion.div>
  )
}

/* ─── SectionHeading ─────────────────────────────────── */

function SectionHeading({ children }: { children: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: EASE_PREMIUM }}
      className="flex items-center gap-4 mb-10"
    >
      <h2 className="font-display text-2xl text-night flex-shrink-0">{children}</h2>
      <div className="h-px flex-1 bg-bone2" />
    </motion.div>
  )
}

/* ─── BespokeClient — main export ───────────────────── */

export function BespokeClient({ email }: { email: string }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <div className="bg-linen min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6 lg:px-12">

        {/* ── Hero text ── */}
        <div ref={heroRef}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE_PREMIUM }}
            className="text-label uppercase tracking-[0.1em] text-smoke mb-4"
          >
            Custom Commissions
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.12, ease: EASE_PREMIUM }}
            className="font-display text-display-xl text-night mb-4 leading-none"
          >
            Bespoke
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_PREMIUM }}
            className="font-display text-display-md text-clay mb-4 max-w-2xl leading-snug"
          >
            Your Design. Our Loom.{' '}
            <span className="text-night">A Rug Tailored For Your Space.</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.28, ease: EASE_PREMIUM }}
            className="text-base text-smoke leading-relaxed mb-16 max-w-lg"
          >
            {"Work directly with master weavers in the Atlas Mountains — every knot placed exactly to your vision, from first sketch to finished weave."}
          </motion.p>
        </div>

        {/* ── Hero image with parallax ── */}
        <HeroImage />

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: EASE_PREMIUM }}
              className="bg-argane/10 border border-argane/20 rounded-brand p-6 text-center"
            >
              <span className="font-mono text-3xl text-night block mb-1">{stat.value}</span>
              <span className="text-label-sm uppercase tracking-widest text-smoke">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* ── Customisation options ── */}
        <div className="mb-20">
          <SectionHeading>What You Can Customise</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {options.map((opt, i) => (
              <CustomCard key={opt.title} opt={opt} index={i} />
            ))}
          </div>
        </div>

        {/* ── Process ── */}
        <div className="mb-20">
          <SectionHeading>The Process</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <ProcessCard key={step.num} step={step} index={i} total={steps.length} />
            ))}
          </div>
        </div>

        {/* ── Commission form ── */}
        <div className="mb-16">
          <SectionHeading>Start Your Commission</SectionHeading>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left — testimonial + perks */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, ease: EASE_PREMIUM }}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              <div className="bg-argane/10 border border-argane/20 rounded-brand p-8">
                <p className="font-display text-lg text-night leading-relaxed mb-6">
                  {"“We commissioned a 3×4m Beni Ourain for our client’s living room. The result was beyond anything we could have found off-the-shelf. Truly spectacular craftsmanship.”"}
                </p>
                <div>
                  <span className="text-sm text-night font-medium block">James Chen</span>
                  <span className="text-label-sm text-smoke uppercase tracking-widest">
                    Architect, New York
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {perks.map((perk, i) => (
                  <motion.div
                    key={perk}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: EASE_PREMIUM }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-clay text-sm">✓</span>
                    <span className="text-sm text-smoke">{perk}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: 0.1, ease: EASE_PREMIUM }}
              className="lg:col-span-3 bg-bone/30 rounded-brand border border-bone2 p-8 lg:p-10"
            >
              <BespokeForm />
            </motion.div>
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-bone2"
        >
          <div>
            <h3 className="font-display text-lg text-night mb-1">Prefer to discuss in person?</h3>
            <p className="text-sm text-smoke">
              Send us a message and we&apos;ll arrange a call or WhatsApp consultation.
            </p>
          </div>
          <a href={`mailto:${email}`} className="btn-secondary">
            {email}
          </a>
        </motion.div>

      </div>
    </div>
  )
}
