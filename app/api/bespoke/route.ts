import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { rateLimit, rateLimitExceeded } from '@/lib/rate-limit'

const BespokeSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(254),
  phone: z.string().max(30).optional(),
  category_pref: z.enum(['beni_ourain', 'azilal', 'kilim', 'boucherouite', 'unsure']).optional(),
  width_cm: z.union([z.string(), z.number()]).optional(),
  length_cm: z.union([z.string(), z.number()]).optional(),
  message: z.string().min(1).max(5000),
})

export async function POST(req: NextRequest) {
  const { success } = rateLimit(req, { limit: 5, windowSeconds: 60 })
  if (!success) return rateLimitExceeded()

  try {
    const supabase = await createClient()
    const raw = await req.json()

    const data = BespokeSchema.parse(raw)

    // Ensure numbers are null if empty string
    const payload = {
      ...data,
      width_cm: data.width_cm ? Number(data.width_cm) : null,
      length_cm: data.length_cm ? Number(data.length_cm) : null,
    }

    const { error } = await supabase
      .from('bespoke_enquiries')
      .insert([payload])

    if (error) {
      console.error('Bespoke DB insert error:', error)
      return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 })
    }

    return NextResponse.json({ success: true })

  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: err.errors.map(e => e.message) },
        { status: 400 }
      )
    }
    console.error('Bespoke enquiry error:', err)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
