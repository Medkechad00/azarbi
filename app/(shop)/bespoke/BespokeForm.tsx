'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

const EASE_LABEL = [0.25, 1, 0.5, 1] as const

/* ─── Floating label input ────────────────────────────── */

function FloatingInput({
  label,
  name,
  type = 'text',
  required,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const lifted = focused || hasValue

  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        required={required}
        placeholder={lifted ? placeholder ?? '' : ''}
        className="w-full bg-linen border border-bone2 rounded-brand px-4 pt-6 pb-2 font-sans text-sm text-night focus:outline-none focus:border-clay transition-colors duration-200"
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          setHasValue(e.target.value.length > 0)
        }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
      />
      <motion.label
        animate={
          lifted
            ? { y: -11, scale: 0.72, color: focused ? '#8C4A30' : '#9B8F85' }
            : { y: 0, scale: 1, color: '#9B8F85' }
        }
        transition={{ duration: 0.2, ease: EASE_LABEL }}
        className="absolute left-4 top-[1.05rem] text-sm origin-left pointer-events-none"
      >
        {label}
        {required && <span className="ml-0.5 opacity-60">*</span>}
      </motion.label>
    </div>
  )
}

/* ─── Floating label textarea ─────────────────────────── */

function FloatingTextarea({
  label,
  name,
  rows = 4,
  required,
  placeholder,
}: {
  label: string
  name: string
  rows?: number
  required?: boolean
  placeholder?: string
}) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const lifted = focused || hasValue

  return (
    <div className="relative">
      <textarea
        name={name}
        rows={rows}
        required={required}
        placeholder={lifted ? placeholder ?? '' : ''}
        className="w-full bg-linen border border-bone2 rounded-brand px-4 pt-6 pb-2 font-sans text-sm text-night focus:outline-none focus:border-clay resize-none transition-colors duration-200"
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          setHasValue(e.target.value.length > 0)
        }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
      />
      <motion.label
        animate={
          lifted
            ? { y: -11, scale: 0.72, color: focused ? '#8C4A30' : '#9B8F85' }
            : { y: 0, scale: 1, color: '#9B8F85' }
        }
        transition={{ duration: 0.2, ease: EASE_LABEL }}
        className="absolute left-4 top-[1.05rem] text-sm origin-left pointer-events-none"
      >
        {label}
        {required && <span className="ml-0.5 opacity-60">*</span>}
      </motion.label>
    </div>
  )
}

/* ─── Weave loader — loom threads sweeping across ─────── */

function WeaveLoader() {
  return (
    <div className="relative h-5 w-28 mx-auto overflow-hidden" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-linen/60 rounded-full"
          style={{ top: `${4 + i * 3}px`, width: `${20 + i * 4}px` }}
          animate={{ x: ['-220%', '480%'] }}
          transition={{
            duration: 1.15,
            delay: i * 0.14,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Magnetic submit button ──────────────────────────── */

function MagneticSubmit({ status }: { status: 'idle' | 'loading' | 'success' | 'error' }) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18 })
  const sy = useSpring(y, { stiffness: 200, damping: 18 })

  function onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type="submit"
      disabled={status === 'loading'}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative w-full h-14 bg-clay text-linen rounded-brand font-sans uppercase tracking-[0.18em] text-xs overflow-hidden flex items-center justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {/* shimmer sweep on hover */}
      {status !== 'loading' && (
        <motion.span
          aria-hidden
          className="absolute inset-0 -skew-x-12 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(244,239,229,0.08) 50%, transparent 100%)',
          }}
          initial={{ x: '-110%' }}
          whileHover={{ x: '220%' }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
        />
      )}

      <AnimatePresence mode="wait" initial={false}>
        {status === 'loading' ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <WeaveLoader />
          </motion.span>
        ) : (
          <motion.span
            key="label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            Submit Enquiry
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

/* ─── BespokeForm ─────────────────────────────────────── */

export function BespokeForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    try {
      const res = await fetch('/api/bespoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="text-center py-12"
      >
        <h4 className="font-display text-2xl text-night mb-4">Enquiry Received</h4>
        <p className="text-smoke text-sm leading-relaxed">
          Thank you. Our bespoke team will review your specifications and contact you
          within 48 hours.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput label="Name" name="name" required />
        <FloatingInput label="Email" name="email" type="email" required />
      </div>

      <div>
        <label className="text-label-sm uppercase tracking-widest text-smoke mb-2 block">
          Category Preference
        </label>
        <select
          name="category_pref"
          className="w-full bg-linen border border-bone2 rounded-brand px-4 py-3 font-sans text-sm text-night focus:outline-none focus:border-clay transition-colors"
        >
          <option value="beni_ourain">Beni Ourain (Geometric, High-pile)</option>
          <option value="azilal">Azilal (Abstract, Mid-pile)</option>
          <option value="kilim">Kilim (Flat-weave)</option>
          <option value="boucherouite">Boucherouite (Recycled)</option>
          <option value="unsure">Unsure / Need Advice</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <FloatingInput label="Width (cm)" name="width_cm" type="number" placeholder="e.g. 200" />
        <FloatingInput label="Length (cm)" name="length_cm" type="number" placeholder="e.g. 300" />
      </div>

      <FloatingTextarea
        label="Message / Design Vision"
        name="message"
        required
        rows={4}
        placeholder="Describe your room, colors, patterns, and what you're looking for…"
      />

      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-clay text-sm"
          >
            An error occurred. Please try again or email us directly.
          </motion.p>
        )}
      </AnimatePresence>

      <MagneticSubmit status={status} />
    </form>
  )
}
