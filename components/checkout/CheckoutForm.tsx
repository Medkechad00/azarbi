'use client'

import React, { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { useCart } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import { Input } from '@/components/ui/input'

export function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const { total, clearCart } = useCart()

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsLoading(true)
    setErrorMessage(null)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
        receipt_email: email,
      },
    })

    if (error) {
      setErrorMessage(error.message ?? 'An unknown error occurred')
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div>
        <h3 className="text-label uppercase tracking-widest text-night mb-4 pb-2 border-b border-bone2">Contact Information</h3>
        <Input 
          type="email" 
          placeholder="Email address for receipt" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
        />
      </div>
      
      <div>
        <h3 className="text-label uppercase tracking-widest text-night mb-4 pb-2 border-b border-bone2">Shipping Details</h3>
        <div className="p-4 bg-bone/30 text-smoke text-sm border border-bone2 rounded-brand mb-4">
          Note: Since this is a prototype, physical shipping inputs are expedited. Just provide your payment details to confirm the mock order.
        </div>
      </div>

      <div>
        <h3 className="text-label uppercase tracking-widest text-night mb-4 pb-2 border-b border-bone2">Payment</h3>
        <PaymentElement />
      </div>

      {errorMessage && (
        <div className="text-clay text-sm bg-clay/10 p-4 rounded-brand border border-clay/20">
          {errorMessage}
        </div>
      )}

      <Button 
        type="submit" 
        disabled={isLoading || !stripe || !elements} 
        className="w-full justify-center mt-4 h-14"
      >
        {isLoading ? 'Processing...' : `Pay ${formatPrice(total())}`}
      </Button>
    </form>
  )
}
