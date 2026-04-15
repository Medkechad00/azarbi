'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, List } from 'phosphor-react'
import { useUI } from '@/store/ui'
import { useCart } from '@/store/cart'
import { cn } from '@/lib/utils'

// Sync with SplashScreen phases
const SPLASH_FLY_END = 3700   // When splash logo arrives at nav position
const SPLASH_DONE   = 4500   // When splash overlay fully gone
const NAV_STAGGER   = 120    // Stagger delay between nav elements

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [showLogo, setShowLogo] = React.useState(false)
  const [showNav, setShowNav] = React.useState(false)
  const { toggleCart, toggleNav } = useUI()
  const cartCount = useCart((state) => state.count())

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 48)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Delay navbar logo appearance until splash animation flies logo into position
  React.useEffect(() => {
    const logoTimer = setTimeout(() => setShowLogo(true), SPLASH_FLY_END)
    const navTimer = setTimeout(() => setShowNav(true), SPLASH_DONE)
    return () => {
      clearTimeout(logoTimer)
      clearTimeout(navTimer)
    }
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-colors duration-300',
        isScrolled ? 'bg-linen border-b border-bone2 py-3' : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Left: Hamburger (Mobile) + Links (Desktop) */}
        <div className="flex-1 flex items-center">
          <button 
            className="p-2 -ml-2 lg:hidden text-night" 
            onClick={toggleNav}
            aria-label="Menu"
          >
            <List size={24} weight="light" />
          </button>
          
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { href: '/collections', label: 'Collections' },
              { href: '/our-story', label: 'Our Story' },
              { href: '/bespoke', label: 'Bespoke' },
            ].map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-label uppercase tracking-widest text-night hover:text-clay transition-colors"
                style={{
                  opacity: showNav ? 1 : 0,
                  transform: showNav ? 'translateY(0)' : 'translateY(-8px)',
                  transition: `opacity 0.5s ease ${i * NAV_STAGGER}ms, transform 0.5s ease ${i * NAV_STAGGER}ms`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center: Logo — hidden until splash logo arrives in position */}
        <div className="flex-shrink-0" data-splash-target>
          <Link
            href="/"
            className="block"
            style={{
              opacity: showLogo ? 1 : 0,
              transition: 'opacity 0.15s ease',
            }}
          >
            <Image
              src="/logo.svg"
              alt="Azarbi"
              width={160}
              height={43}
              priority
            />
          </Link>
        </div>

        {/* Right: Cart */}
        <div
          className="flex-1 flex items-center justify-end"
          style={{
            opacity: showNav ? 1 : 0,
            transform: showNav ? 'translateY(0)' : 'translateY(-8px)',
            transition: 'opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s',
          }}
        >
          <button 
            className="flex items-center gap-2 p-2 -mr-2 text-night hover:text-clay transition-colors"
            onClick={toggleCart}
          >
            <span className="hidden sm:inline text-label uppercase tracking-widest mt-0.5">Cart</span>
            <div className="relative">
              <ShoppingCart size={22} weight="light" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-clay text-[9px] text-white">
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
