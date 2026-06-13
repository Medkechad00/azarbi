import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { BespokeClient } from './BespokeClient'

export const metadata: Metadata = {
  title: 'Bespoke Commissions — Azarbi',
  description: 'Commission a one-of-a-kind Moroccan rug, precisely to your vision. Work directly with master weavers.',
}

export default async function BespokePage() {
  const supabase = await createClient()
  const { data: settings } = await supabase
    .from('platform_settings')
    .select('contact_email')
    .eq('id', 1)
    .single()

  return <BespokeClient email={settings?.contact_email ?? 'hello@azarbi.com'} />
}
