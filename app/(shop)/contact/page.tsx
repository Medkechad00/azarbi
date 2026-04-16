import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ContactPageSchema } from '@/components/seo/ContactPageSchema'

export const metadata: Metadata = {
  title: 'Contact Us — Azarbi',
  description: 'Get in touch with the Azarbi team. We\'re here to help with orders, bespoke enquiries, trade accounts, and anything else.',
  openGraph: {
    title: 'Contact Us — Azarbi',
    description: 'Get in touch with the Azarbi team. We\'re here to help with orders, bespoke enquiries, trade accounts, and anything else.',
    url: 'https://azarbi.com/contact',
    type: 'website',
    images: [{
      url: '/og-contact.jpg',
      width: 1200,
      height: 630,
      alt: 'Azarbi — Contact Us for Moroccan Rugs'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us — Azarbi',
    description: 'Get in touch with the Azarbi team. We\'re here to help with orders, bespoke enquiries.',
    images: ['/og-contact.jpg']
  },
  alternates: {
    canonical: 'https://azarbi.com/contact'
  }
}

const quickLinks = [
  { icon: '◇', label: 'Bespoke Commission', desc: 'Design your dream rug with our weavers.', href: '/bespoke' },
  { icon: '□', label: 'Trade Program', desc: 'Exclusive pricing for design professionals.', href: '/trade' },
  { icon: '△', label: 'FAQ', desc: 'Answers to common questions.', href: '/faq' },
  { icon: '○', label: 'Returns & Shipping', desc: 'Our policies explained clearly.', href: '/terms' },
]

export default async function ContactPage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('platform_settings').select('*').eq('id', 1).single()

  const channels = [
    {
      icon: '✉',
      title: 'Email',
      value: settings?.contact_email || 'hello@azarbi.com',
      href: `mailto:${settings?.contact_email || 'hello@azarbi.com'}`,
      detail: settings?.support_snippet || 'We respond within 24 hours, Monday–Friday.',
    },
    {
      icon: '◉',
      title: 'WhatsApp',
      value: settings?.whatsapp_number || 'Chat with us',
      href: settings?.whatsapp_number ? `https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}` : 'https://wa.me/',
      detail: 'Available 9am–6pm GMT, Monday–Saturday.',
    },
    {
      icon: '◎',
      title: 'Instagram',
      value: settings?.instagram_handle || '@azarbi.rugs',
      href: `https://instagram.com/${(settings?.instagram_handle || 'azarbi.rugs').replace('@', '')}`,
      detail: 'DMs open for quick questions.',
    },
  ]

  return (
    <div className="bg-linen min-h-screen pt-24 pb-32">
      <ContactPageSchema />
      <div className="container mx-auto px-6 lg:px-12">

        {/* Title */}
        <p className="text-label uppercase tracking-[0.1em] text-smoke mb-4">Get in Touch</p>
        <h1 className="font-display text-display-xl text-night mb-6">Contact Us</h1>
        <p className="text-lg text-smoke leading-relaxed mb-16 max-w-2xl">
          Whether you have a question about an order, need help choosing the perfect rug, 
          or want to discuss a bespoke commission — we&apos;d love to hear from you.
        </p>

        {/* Contact channels */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {channels.map((ch) => (
            <a
              key={ch.title}
              href={ch.href}
              target={ch.href.startsWith('http') ? '_blank' : undefined}
              rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="bg-bone/30 rounded-brand border border-bone2 p-8 group hover:border-clay/30 transition-all font-sans"
            >
              <span className="text-3xl text-clay/50 block mb-4">{ch.icon}</span>
              <h2 className="font-display text-lg text-night mb-1 group-hover:text-clay transition-colors">{ch.title}</h2>
              <span className="text-clay text-sm block mb-3 font-medium">{ch.value}</span>
              <p className="text-[13px] text-smoke leading-relaxed">{ch.detail}</p>
            </a>
          ))}
        </div>

        {/* Main content: form + info */}
        <div className="grid lg:grid-cols-5 gap-10 mb-20">

          {/* Form */}
          <div className="lg:col-span-3 bg-bone/30 rounded-brand border border-bone2 p-8 lg:p-10">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-display text-2xl text-night flex-shrink-0">Send a Message</h2>
              <div className="h-px flex-1 bg-bone2" />
            </div>
            <form className="flex flex-col gap-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="text-label-sm uppercase tracking-widest text-smoke block mb-2">Name</label>
                  <input id="name" type="text" placeholder="Your full name" className="w-full px-4 py-3 border border-bone2 rounded-brand bg-linen text-night placeholder:text-smoke/50 focus:outline-none focus:border-clay transition-colors" />
                </div>
                <div>
                  <label htmlFor="email" className="text-label-sm uppercase tracking-widest text-smoke block mb-2">Email</label>
                  <input id="email" type="email" placeholder="your@email.com" className="w-full px-4 py-3 border border-bone2 rounded-brand bg-linen text-night placeholder:text-smoke/50 focus:outline-none focus:border-clay transition-colors" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="text-label-sm uppercase tracking-widest text-smoke block mb-2">Subject</label>
                <select id="subject" className="w-full px-4 py-3 border border-bone2 rounded-brand bg-linen text-night focus:outline-none focus:border-clay transition-colors">
                  <option value="">Select a topic</option>
                  <option value="order">Order enquiry</option>
                  <option value="product">Product question</option>
                  <option value="bespoke">Bespoke commission</option>
                  <option value="trade">Trade / Interior Design</option>
                  <option value="other">Something else</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="text-label-sm uppercase tracking-widest text-smoke block mb-2">Message</label>
                <textarea id="message" rows={5} placeholder="Tell us what you need..." className="w-full px-4 py-3 border border-bone2 rounded-brand bg-linen text-night placeholder:text-smoke/50 focus:outline-none focus:border-clay transition-colors resize-none" />
              </div>
              <button type="submit" className="btn-primary h-12 mt-2">Send Message</button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Location */}
            <div className="bg-argane/10 border border-argane/20 rounded-brand p-8">
              <h3 className="font-display text-lg text-night mb-4">Based In</h3>
              <p className="text-smoke leading-relaxed mb-4">
                Atlas Mountains, Morocco<br />
                Shipping worldwide via DHL Express
              </p>
              <div className="flex flex-col gap-2 pt-4 border-t border-argane/20">
                <div className="flex items-center gap-3">
                  <span className="text-clay">✓</span>
                  <span className="text-sm text-smoke">Free international shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-clay">✓</span>
                  <span className="text-sm text-smoke">5–14 business days delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-clay">✓</span>
                  <span className="text-sm text-smoke">14-day return policy</span>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-4 bg-bone/30 rounded-brand border border-bone2 p-5 group hover:border-clay/30 transition-all"
                >
                  <span className="text-xl text-clay/50 flex-shrink-0">{link.icon}</span>
                  <div className="flex-1">
                    <span className="text-sm text-night font-medium group-hover:text-clay transition-colors block">{link.label}</span>
                    <span className="text-[12px] text-smoke">{link.desc}</span>
                  </div>
                  <span className="text-smoke/40 group-hover:text-clay transition-colors">→</span>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-bone2">
          <div>
            <h3 className="font-display text-lg text-night mb-1">Prefer a call?</h3>
            <p className="text-sm text-smoke">Send us a message and we&apos;ll schedule a time that works for you.</p>
          </div>
          <a href={`mailto:${settings?.contact_email || 'hello@azarbi.com'}`} className="btn-secondary">{settings?.contact_email || 'hello@azarbi.com'}</a>
        </div>

      </div>
    </div>
  )
}
