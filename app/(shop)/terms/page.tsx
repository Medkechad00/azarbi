import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Terms of Service — Azarbi',
  description: 'Terms and conditions governing the use of azarbi.com and purchase of Azarbi products.',
}

const sections = [
  {
    num: '01',
    title: 'Products & Authenticity',
    items: [
      'All rugs sold by Azarbi are one-of-a-kind, handwoven pieces sourced directly from cooperatives in the Atlas Mountains, Morocco.',
      'Product images are representative — slight variations in colour and texture are inherent to handmade goods and are not considered defects.',
      'Every rug comes with a Certificate of Authenticity documenting the weaver\'s name, cooperative, and region of origin.',
    ],
  },
  {
    num: '02',
    title: 'Purchasing Process',
    items: [
      'Purchases are completed through our partner marketplace (Etsy, eBay, or similar).',
      'When you click "Complete Purchase" on our checkout page, you are redirected to the marketplace listing.',
      'The purchase transaction is governed by the marketplace\'s terms and buyer protection policies.',
      'Azarbi is responsible for product authenticity, description accuracy, packaging, and shipping.',
    ],
  },
  {
    num: '03',
    title: 'Pricing & Payment',
    items: [
      'All prices are listed in US Dollars.',
      'Every order includes complimentary international shipping via DHL Express.',
      'Import duties and local taxes may apply depending on your country and are the buyer\'s responsibility.',
    ],
  },
  {
    num: '04',
    title: 'Shipping & Delivery',
    items: [
      'Orders are shipped within 3–5 business days of purchase confirmation.',
      'Delivery takes 5–14 business days depending on destination.',
      'Each rug is carefully rolled (never folded), wrapped in acid-free tissue paper, and placed in a durable shipping package.',
      'Tracking information is provided via email once your order ships.',
    ],
  },
  {
    num: '05',
    title: 'Returns & Refunds',
    items: [
      'Returns accepted within 14 days of delivery, provided the rug is unused, unaltered, and undamaged.',
      'Email {{EMAIL}} with your order number and reason to initiate a return.',
      'Return shipping costs are the buyer\'s responsibility unless the item arrived damaged.',
      'Refunds are processed within 7 business days of receiving the returned item.',
      'Damaged items will be replaced or fully refunded at our expense.',
    ],
  },
  {
    num: '06',
    title: 'Intellectual Property',
    items: [
      'All content on azarbi.com — photographs, text, design, and branding — is the property of Azarbi.',
      'Reproduction without written permission is prohibited.',
    ],
  },
  {
    num: '07',
    title: 'Liability & Governance',
    items: [
      'Azarbi is not liable for indirect, incidental, or consequential damages arising from website use or product purchases, except where required by applicable law.',
      'These terms are governed by the laws of Morocco.',
      'Disputes will be resolved through good-faith negotiation before pursuing formal legal proceedings.',
    ],
  },
]

export default async function TermsPage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('platform_settings').select('contact_email').eq('id', 1).single()
  const email = settings?.contact_email || 'hello@azarbi.com'
  return (
    <div className="bg-linen min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6 lg:px-12">

        <p className="text-label uppercase tracking-[0.1em] text-smoke mb-4">Legal</p>
        <h1 className="font-display text-display-xl text-night mb-4">Terms of Service</h1>
        <p className="text-smoke mb-16">Last updated: March 2026</p>

        {/* Overview banner */}
        <div className="bg-argane/10 border border-argane/20 rounded-brand p-8 lg:p-10 mb-16">
          <p className="font-display text-xl text-night leading-relaxed">
            By using azarbi.com and purchasing our products, you agree to these terms. 
            We&apos;ve written them in plain language so you know exactly what to expect.
          </p>
        </div>

        {/* Terms sections */}
        <div className="flex flex-col gap-6 mb-16">
          {sections.map((section) => (
            <div key={section.num} className="bg-bone/30 rounded-brand border border-bone2 p-8 lg:p-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-3xl text-clay/60">{section.num}</span>
                <h2 className="font-display text-xl text-night">{section.title}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-3">
                {section.items.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-clay/50 mt-1.5 flex-shrink-0">✦</span>
                    <p className="text-sm text-smoke leading-relaxed">{item.replace('{{EMAIL}}', email)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-bone2">
          <div>
            <h3 className="font-display text-lg text-night mb-1">Questions about these terms?</h3>
            <p className="text-sm text-smoke">We&apos;re always happy to clarify anything.</p>
          </div>
          <a href={`mailto:${email}`} className="btn-secondary">{email}</a>
        </div>

      </div>
    </div>
  )
}
