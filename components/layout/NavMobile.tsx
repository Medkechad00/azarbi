'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, ArrowRight } from 'phosphor-react'
import { useUI } from '@/store/ui'
import { cn } from '@/lib/utils'

export function NavMobile() {
  const { isNavOpen, closeNav } = useUI()

  React.useEffect(() => {
    if (isNavOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isNavOpen])

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-night/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isNavOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeNav}
      />

      <div
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 w-4/5 max-w-sm bg-linen border-r border-bone2 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col",
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-bone2">
          <Image src="/logo.svg" alt="Azarbi" width={110} height={30} />
          <button onClick={closeNav} className="text-smoke hover:text-clay">
            <X size={24} weight="light" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-6">
          <div className="flex flex-col gap-4 border-b border-bone2 pb-6">
            <span className="text-label-sm text-smoke uppercase tracking-widest">Shop</span>
            <Link href="/collections" className="font-display text-display-md text-night" onClick={closeNav}>All Rugs</Link>
            <Link href="/collections/beni-ourain" className="font-display text-2xl text-night" onClick={closeNav}>Beni Ourain</Link>
            <Link href="/collections/azilal" className="font-display text-2xl text-night" onClick={closeNav}>Azilal</Link>
            <Link href="/collections/kilim" className="font-display text-2xl text-night" onClick={closeNav}>Kilim</Link>
            <Link href="/collections/boucherouite" className="font-display text-2xl text-night" onClick={closeNav}>Boucherouite</Link>
          </div>

          <div className="flex flex-col gap-4">
            <Link href="/bespoke" className="text-label uppercase tracking-widest text-night flex items-center gap-2" onClick={closeNav}>
              Bespoke Orders <ArrowRight size={14} />
            </Link>
            <Link href="/our-story" className="text-label uppercase tracking-widest text-night flex items-center gap-2" onClick={closeNav}>
              Our Story <ArrowRight size={14} />
            </Link>
            <Link href="/weavers" className="text-label uppercase tracking-widest text-night flex items-center gap-2" onClick={closeNav}>
              The Weavers <ArrowRight size={14} />
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
