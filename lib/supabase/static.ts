import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// A simple Supabase client for build-time / static contexts
// where cookies() is not available (e.g. generateStaticParams)
export function createStaticClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
