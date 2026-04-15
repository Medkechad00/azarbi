'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function HeroSplit() {
  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-linen flex flex-col justify-center px-6 lg:px-20 py-32 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 4.5 }}
          className="max-w-xl"
        >
          <span className="text-label text-smoke uppercase tracking-widest mb-6 block">
            The Original Masterweavers
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-night leading-[1.05] tracking-tight mb-8">
            One Rug.<br/>
            One Weaver.<br/>
            Yours Forever.
          </h1>
          <p className="text-smoke text-lg leading-relaxed mb-10 max-w-md">
            Connecting design-conscious buyers directly with the Amazigh women of the Atlas Mountains. 100% of the cooperative's asking price goes directly to them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href="/collections">Shop the Collection</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/bespoke">Bespoke Orders</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-screen bg-bone">
        <Image
          src="https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=1200&h=1600"
          alt="Authentic Beni Ourain rug draped in natural sunlight"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        {/* Subtle dark overlay for contrast if needed, or left natural */}
        <div className="absolute inset-0 bg-night/5" />
      </div>
    </section>
  )
}
