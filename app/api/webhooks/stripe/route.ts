import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16' as any,
})

const resend = new Resend(process.env.RESEND_API_KEY)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 })
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    
    // In a full production app, we would:
    // 1. Mark specific items sold in the Supabase products table based on metadata
    // 2. Create the Order in the orders table
    // 3. Send email using Resend
    
    const customerEmail = paymentIntent.receipt_email || 'customer@example.com'
    
    // Sending email via Resend
    try {
      await resend.emails.send({
        from: 'Azarbi Orders <orders@azarbi.com>',
        to: [customerEmail],
        subject: 'Order Confirmation — Azarbi Masterweavers',
        html: `
          <h1>Thank you for your order!</h1>
          <p>We've received your payment of $${(paymentIntent.amount / 100).toFixed(2)} USD.</p>
          <p>Your authentic Atlas Mountain rug is being prepared for international shipping. You will receive a tracking number shortly.</p>
        `,
      })
    } catch (error) {
      console.error('Failed to send Resend email', error)
    }
  }

  return NextResponse.json({ received: true })
}
