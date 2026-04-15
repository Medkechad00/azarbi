import { NextRequest, NextResponse } from 'next/server'

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key)
    }
  }
}, 5 * 60 * 1000)

interface RateLimitOptions {
  /** Maximum number of requests within the window */
  limit: number
  /** Time window in seconds */
  windowSeconds: number
}

/**
 * In-memory rate limiter. Suitable for single-instance deployments.
 * For multi-instance (e.g. Vercel serverless), switch to @upstash/ratelimit with Redis.
 */
export function rateLimit(
  request: NextRequest,
  options: RateLimitOptions
): { success: boolean; remaining: number } {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown'

  const key = `${ip}:${request.nextUrl.pathname}`
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, {
      count: 1,
      resetAt: now + options.windowSeconds * 1000,
    })
    return { success: true, remaining: options.limit - 1 }
  }

  if (entry.count >= options.limit) {
    return { success: false, remaining: 0 }
  }

  entry.count++
  return { success: true, remaining: options.limit - entry.count }
}

/**
 * Helper to return a 429 response when rate limit is exceeded.
 */
export function rateLimitExceeded(): NextResponse {
  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    { status: 429, headers: { 'Retry-After': '60' } }
  )
}
