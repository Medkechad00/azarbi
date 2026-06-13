import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// Load .env.local manually
const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => l.split('=').map(s => s.trim()))
    .filter(([k]) => k)
    .map(([k, ...v]) => [k, v.join('=')])
)

const url = env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const email = 'med@gmail.com'
const password = '12345678'

const { data: list } = await supabase.auth.admin.listUsers()
const user = list?.users?.find(u => u.email === email)

if (!user) {
  console.log(`User ${email} not found. Creating...`)
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { role: 'super_admin' },
  })
  if (error) { console.error('Create failed:', error.message); process.exit(1) }
  console.log('Created:', data.user.id)
} else {
  const { error } = await supabase.auth.admin.updateUserById(user.id, {
    password,
    app_metadata: { role: 'super_admin' },
    email_confirm: true,
  })
  if (error) { console.error('Update failed:', error.message); process.exit(1) }
  console.log(`Updated ${email} → app_metadata.role = super_admin`)
}

console.log('\nDone! Login with:')
console.log(`  Email:    ${email}`)
console.log(`  Password: ${password}`)
