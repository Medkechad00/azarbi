'use client'

import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useCart } from '@/store/cart'
import { CheckoutForm } from '@/components/checkout/CheckoutForm'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('')
  const { items, total } = useCart()

  useEffect(() => {
    if (items.length > 0) {
      // Create PaymentIntent as soon as the page loads
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
    }
  }, [items])

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-linen flex items-center justify-center">
        <p className="text-smoke">Your cart is empty. Please add items before checking out.</p>
      </div>
    )
  }

  const appearance = {
    theme: 'flat' as const,
    variables: {
      fontFamily: 'Josefin Sans, sans-serif',
      colorPrimary: '#8C4A30', // Argane
      colorBackground: '#F4EFE5', // Linen
      colorText: '#1C1815', // Night
      colorDanger: '#B34D4D',
    },
  }

  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className="min-h-screen bg-bone pt-24 pb-32">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <h1 className="font-display text-4xl text-night mb-12">Secure Checkout</h1>
        
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-24">
          
          <div className="w-full lg:w-1/2 p-8 bg-linen rounded-brand shadow-sm border border-bone2">
            {clientSecret ? (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm clientSecret={clientSecret} />
              </Elements>
            ) : (
              <div className="h-64 flex items-center justify-center text-smoke animate-pulse">
                Initiating secure connection...
              </div>
            )}
          </div>
          
          <div className="w-full lg:w-1/2">
            <h2 className="text-label uppercase tracking-widest text-night mb-6">Order Summary</h2>
            <div className="flex flex-col gap-6 mb-8">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4 items-center">
                  <div className="relative w-16 aspect-rug rounded-sm overflow-hidden bg-bone">
                    <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <span className="block font-sans text-night text-sm">{item.title}</span>
                    <span className="block text-smoke text-xs">{item.sku}</span>
                  </div>
                  <span className="font-mono text-sm">{formatPrice(item.price_usd)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-bone2 pt-6 flex justify-between items-center text-night">
              <span className="font-sans">Total</span>
              <span className="font-mono text-2xl">{formatPrice(total())}</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
