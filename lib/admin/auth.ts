import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type AdminRole = 'super_admin' | 'admin' | 'operations' | 'content' | 'read_only'

const ADMIN_ROLES: AdminRole[] = ['super_admin', 'admin', 'operations', 'content', 'read_only']

export async function getAdminUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) { return cookieStore.get(name)?.value },
        set() {},
        remove() {},
      },
    }
  )

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  return user
}

export async function requireAdmin(allowedRoles?: AdminRole[]) {
  const user = await getAdminUser()

  if (!user) {
    redirect('/admin/login')
  }

  const role = user.app_metadata?.role as AdminRole | undefined

  if (!role || !ADMIN_ROLES.includes(role)) {
    redirect('/')
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    redirect('/admin/dashboard')
  }

  return { user, role }
}

export function checkAdminRole(role: string | undefined): boolean {
  if (!role) return false
  return ADMIN_ROLES.includes(role as AdminRole)
}

export function hasPermission(userRole: AdminRole, requiredRoles: AdminRole[]): boolean {
  return requiredRoles.includes(userRole)
}
