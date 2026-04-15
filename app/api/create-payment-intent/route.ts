import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'
import { rateLimit, rateLimitExceeded } from '@/lib/rate-limit'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16' as any,
})

export async function POST(req: NextRequest) {
  const { success } = rateLimit(req, { limit: 10, windowSeconds: 60 })
  if (!success) return rateLimitExceeded()

  try {
    const body = await req.json()
    const { items } = body // Cart items array

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Fetch real prices from database — never trust client-sent prices
    const productIds = items.map((i: any) => i.productId).filter(Boolean)
    if (productIds.length === 0) {
      return NextResponse.json({ error: 'Invalid cart items' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: products, error: dbError } = await supabase
      .from('products')
      .select('id, price_usd, status')
      .in('id', productIds)

    if (dbError || !products || products.length === 0) {
      return NextResponse.json({ error: 'Could not verify products' }, { status: 400 })
    }

    // Verify all products are available
    const unavailable = products.filter(p => p.status !== 'available')
    if (unavailable.length > 0) {
      return NextResponse.json({ error: 'Some products are no longer available' }, { status: 400 })
    }

    // Calculate total from server-verified prices
    const totalAmount = products.reduce((sum, p) => sum + Number(p.price_usd), 0)

    if (totalAmount <= 0) {
      return NextResponse.json({ error: 'Invalid order total' }, { status: 400 })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // convert to cents
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
    
  } catch (error: any) {
    console.error('Payment intent error:', error)
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 })
  }
}
