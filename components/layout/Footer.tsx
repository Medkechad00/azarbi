import Link from 'next/link'
import Image from 'next/image'
import { MotifBackground } from '@/components/ui/MotifBackground'
import { createClient } from '@/lib/supabase/server'

export async function Footer() {
  const supabase = await createClient()
  
  // Fetch dynamic settings for support/HQ if they exist
  const { data: settings } = await supabase.from('platform_settings').select('*').eq('id', 1).single()

  return (
    <footer className="relative bg-night text-linen overflow-hidden pt-24 pb-12 mt-auto">
      <MotifBackground className="text-linen" />
      
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          <div className="lg:col-span-1">
            <Image src="/logo.svg" alt="Azarbi" width={130} height={35} className="mb-4" />
            <p className="text-smoke text-sm leading-relaxed max-w-xs">
              One Rug. One Weaver. Yours Forever.<br/><br/>
              Connecting design-conscious buyers directly with women weaver cooperatives in the {settings?.location_address || 'Atlas Mountains'}.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-smoke">
               {settings?.contact_email && <a href={`mailto:${settings.contact_email}`} className="hover:text-linen transition-colors">{settings.contact_email}</a>}
               {settings?.instagram_handle && <a href="https://instagram.com" target="_blank" className="hover:text-linen transition-colors">{settings.instagram_handle}</a>}
            </div>
          </div>
          
          <div>
            <h4 className="text-label uppercase tracking-widest text-smoke mb-6">Collections</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/collections/beni-ourain" className="hover:text-clay transition-colors">Beni Ourain</Link></li>
              <li><Link href="/collections/azilal" className="hover:text-clay transition-colors">Azilal</Link></li>
              <li><Link href="/collections/kilim" className="hover:text-clay transition-colors">Kilim</Link></li>
              <li><Link href="/collections/boucherouite" className="hover:text-clay transition-colors">Boucherouite</Link></li>
              <li><Link href="/bespoke" className="hover:text-clay transition-colors">Bespoke Orders</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-label uppercase tracking-widest text-smoke mb-6">About</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/our-story" className="hover:text-clay transition-colors">Our Story</Link></li>
              <li><Link href="/weavers" className="hover:text-clay transition-colors">The Weavers</Link></li>
              <li><Link href="/journal" className="hover:text-clay transition-colors">Journal</Link></li>
              <li><Link href="/trade" className="hover:text-clay transition-colors">Trade Program</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-label uppercase tracking-widest text-smoke mb-6">Support</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/care-guide" className="hover:text-clay transition-colors">Care Guide</Link></li>
              <li><Link href="/size-guide" className="hover:text-clay transition-colors">Size Guide</Link></li>
              <li><Link href="/faq" className="hover:text-clay transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-clay transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-linen/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-smoke">
            &copy; {new Date().getFullYear()} Azarbi. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-smoke">
            <Link href="/privacy" className="hover:text-linen transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-linen transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
