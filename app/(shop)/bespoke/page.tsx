import { Metadata } from 'next'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { BespokeForm } from './BespokeForm'

export const metadata: Metadata = {
  title: 'Bespoke Commissions — Azarbi',
  description: 'Commission a one-of-a-kind Moroccan rug, precisely to your vision. Work directly with master weavers.',
}

const steps = [
  { num: '01', title: 'Consultation & Design', desc: 'Share your inspiration — dimensions, colour palette, pattern style, and budget. We consult with our master weavers to translate your vision into a weaving plan.', duration: '1–3 days' },
  { num: '02', title: 'Quotation & Materials', desc: 'We provide a detailed quote and timeline. Once a 50% deposit is paid, raw wool is sourced, hand-spun, and dyed using your chosen palette.', duration: '3–5 days' },
  { num: '03', title: 'Weaving & Updates', desc: 'Your weaver begins hand-knotting your rug on a traditional loom. We send photographic progress updates throughout so you can see your piece come to life.', duration: '4–12 weeks' },
  { num: '04', title: 'Finishing & Delivery', desc: 'The finished rug is washed in mountain streams, sun-dried, and carefully inspected. It\'s then shipped worldwide via DHL Express with a Certificate of Authenticity.', duration: '5–14 days' },
]

const options = [
  { icon: '◇', title: 'Size', desc: 'Any dimension — from a 60×90 cm doormat to a 400×500 cm grand salon piece.' },
  { icon: '◈', title: 'Colour', desc: 'Choose from natural undyed wool, traditional plant dyes, or custom mineral dye palettes.' },
  { icon: '□', title: 'Pattern', desc: 'Beni Ourain diamonds, Azilal abstracts, geometric kilims, or your own original design.' },
  { icon: '○', title: 'Material', desc: 'Virgin wool, Mermousa wool, cotton warp, or recycled textile (Boucherouite style).' },
  { icon: '△', title: 'Pile Depth', desc: 'From 0.3 cm flat-weave kilims to 4 cm ultra-plush Beni Ourain clouds.' },
  { icon: '⬡', title: 'Budget', desc: 'Starting from $350 for small pieces. We work within your range to find the right solution.' },
]

const stats = [
  { value: '100+', label: 'Custom rugs delivered' },
  { value: '4–12', label: 'Weeks production' },
  { value: '35+', label: 'Weavers available' },
  { value: '∞', label: 'Design possibilities' },
]

export default async function BespokePage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('platform_settings').select('contact_email').eq('id', 1).single()
  const email = settings?.contact_email || 'hello@azarbi.com'
  return (
    <div className="bg-linen min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Title */}
        <p className="text-label uppercase tracking-[0.1em] text-smoke mb-4">Custom Commissions</p>
        <h1 className="font-display text-display-xl text-night mb-6">Bespoke</h1>
        <p className="text-lg text-smoke leading-relaxed mb-16 max-w-2xl">
          Commission a rug, precisely to your vision. Work directly with master weavers 
          in the Atlas Mountains to create a one-of-a-kind piece for your space.
        </p>

        {/* Hero image */}
        <div className="relative w-full aspect-[21/9] rounded-brand overflow-hidden mb-20">
          <Image
            src="https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=1600"
            alt="Amazigh artisan weaving a bespoke Berber rug on a traditional wooden loom in Morocco"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/40 to-transparent" />
          <div className="absolute bottom-8 left-8 z-10">
            <span className="bg-linen/90 backdrop-blur-sm text-night text-sm px-5 py-2.5 rounded-brand">
              Every bespoke rug is 100% unique — designed by you, woven by a master artisan
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-argane/10 border border-argane/20 rounded-brand p-6 text-center">
              <span className="font-mono text-3xl text-night block mb-1">{stat.value}</span>
              <span className="text-label-sm uppercase tracking-widest text-smoke">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Customisation options */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-2xl text-night flex-shrink-0">What You Can Customise</h2>
            <div className="h-px flex-1 bg-bone2" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {options.map((opt) => (
              <div key={opt.title} className="bg-bone/30 rounded-brand border border-bone2 p-8 group hover:border-clay/30 transition-colors">
                <span className="text-2xl text-clay/50 block mb-4">{opt.icon}</span>
                <h3 className="font-display text-lg text-night mb-3 group-hover:text-clay transition-colors">{opt.title}</h3>
                <p className="text-sm text-smoke leading-relaxed">{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Process */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-2xl text-night flex-shrink-0">The Process</h2>
            <div className="h-px flex-1 bg-bone2" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative bg-bone/30 rounded-brand border border-bone2 p-8">
                <span className="font-mono text-5xl text-clay/15 absolute top-4 right-6">{step.num}</span>
                <div className="relative z-10">
                  <h3 className="font-display text-lg text-night mb-3">{step.title}</h3>
                  <p className="text-sm text-smoke leading-relaxed mb-4">{step.desc}</p>
                  <span className="font-mono text-xs text-clay bg-clay/10 px-3 py-1 rounded-brand">{step.duration}</span>
                </div>
                {i < steps.length - 1 && (
                  <span className="hidden lg:block absolute top-1/2 -right-4 text-clay/40 text-xl z-20">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial + Form */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-2xl text-night flex-shrink-0">Start Your Commission</h2>
            <div className="h-px flex-1 bg-bone2" />
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left: Testimonial */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-argane/10 border border-argane/20 rounded-brand p-8">
                <p className="font-display text-lg text-night leading-relaxed mb-6">
                  &ldquo;We commissioned a 3×4m Beni Ourain for our client&apos;s living room. The result 
                  was beyond anything we could have found off-the-shelf. Truly spectacular craftsmanship.&rdquo;
                </p>
                <div>
                  <span className="text-sm text-night font-medium block">James Chen</span>
                  <span className="text-label-sm text-smoke uppercase tracking-widest">Architect, New York</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  'No minimum order value',
                  'Progress photos throughout production',
                  'Certificate of Authenticity included',
                  '50% deposit, 50% on completion',
                  'Free worldwide shipping',
                ].map((perk) => (
                  <div key={perk} className="flex items-center gap-3">
                    <span className="text-clay">✓</span>
                    <span className="text-sm text-smoke">{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3 bg-bone/30 rounded-brand border border-bone2 p-8 lg:p-10">
              <BespokeForm />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-bone2">
          <div>
            <h3 className="font-display text-lg text-night mb-1">Prefer to discuss in person?</h3>
            <p className="text-sm text-smoke">Send us a message and we&apos;ll arrange a call or WhatsApp consultation.</p>
          </div>
          <a href={`mailto:${email}`} className="btn-secondary">{email}</a>
        </div>

      </div>
    </div>
  )
}
