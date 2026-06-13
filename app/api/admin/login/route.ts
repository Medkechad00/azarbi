import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, rateLimitExceeded } from '@/lib/rate-limit'

// Rate-limit gate only — actual sign-in happens client-side so browser cookies are set reliably
export async function POST(req: NextRequest) {
  const { success } = rateLimit(req, { limit: 5, windowSeconds: 60 })
  if (!success) return rateLimitExceeded()

  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
