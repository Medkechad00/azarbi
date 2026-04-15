import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { NavMobile } from '@/components/layout/NavMobile'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/layout/CartDrawer'
import { SplashScreen } from '@/components/layout/SplashScreen'

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SplashScreen />
      <Navbar />
      <NavMobile />
      <CartDrawer />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </>
  )
}
