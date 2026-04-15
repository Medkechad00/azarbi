import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const ADMIN_ROUTES = /^\/admin/
const PUBLIC_ADMIN_ROUTES = ['/admin/login']
const ROLE_ROUTES: Record<string, string[]> = {
  '/admin/customers': ['super_admin', 'operations'],
  '/admin/analytics': ['super_admin', 'operations', 'read_only'],
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) { return request.cookies.get(name)?.value },
        set(name, value, options) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name, options) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user }, error } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  // Admin route protection
  if (ADMIN_ROUTES.test(path) && !PUBLIC_ADMIN_ROUTES.includes(path)) {
    if (!user || error) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const role = user.app_metadata?.role
    const adminRoles = ['admin', 'super_admin', 'operations', 'content', 'read_only']

    if (!role || !adminRoles.includes(role)) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Check specific route permissions
    for (const [route, allowedRoles] of Object.entries(ROLE_ROUTES)) {
      if (path.startsWith(route) && !allowedRoles.includes(role)) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
    }
  }

  return response
}

export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*'],
}
