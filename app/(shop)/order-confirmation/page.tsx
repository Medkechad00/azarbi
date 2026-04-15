'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/store/cart'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'phosphor-react'

export default function OrderConfirmationPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    // Once they hit confirmation, flush the local cart
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-[80vh] bg-linen flex flex-col items-center justify-center p-6 text-center">
      <CheckCircle size={64} weight="light" className="text-clay mb-8" />
      <h1 className="font-display text-4xl md:text-5xl text-night mb-4">Your piece is secured.</h1>
      
      <p className="text-smoke max-w-lg leading-relaxed mb-8 text-lg">
        Thank you for preserving the art of Amazigh weaving. We have received your payment and will begin preparing your rug for its journey from the Atlas Mountains to your home.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/collections">Continue Exploring</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/account">View Order Status</Link>
        </Button>
      </div>
    </div>
  )
}
