import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// A simple Supabase client for build-time / static contexts
// where cookies() is not available (e.g. generateStaticParams)
export function createStaticClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Service-role client for server-side operations that bypass RLS (e.g. storage uploads)
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
