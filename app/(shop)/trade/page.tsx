import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Trade Program — Azarbi',
  description: 'Exclusive pricing, priority sourcing, and dedicated support for interior designers, architects, and hospitality professionals.',
}

const benefits = [
  { icon: '◇', title: 'Exclusive Pricing', desc: 'Preferential pricing on all rugs, with additional project-based discounts for multi-piece orders.' },
  { icon: '◈', title: 'Priority Sourcing', desc: 'Need a specific size, colour palette, or weaving style? We source directly from our cooperative network on your behalf.' },
  { icon: '○', title: 'Dedicated Account Manager', desc: 'A single point of contact who understands your aesthetic and curates selections tailored to your projects.' },
  { icon: '□', title: 'Memo Program', desc: 'Borrow rugs on approval to present to clients. We ship directly to your studio or project site.' },
  { icon: '△', title: 'High-Res Assets', desc: 'Professional photography and product specifications for your mood boards and client presentations.' },
  { icon: '⬡', title: 'Extended Returns', desc: 'Trade members enjoy a 30-day return window instead of the standard 14 days for maximum flexibility.' },
]

const steps = [
  { num: '01', title: 'Apply', desc: 'Fill out the form below with your company details and a link to your portfolio or website.' },
  { num: '02', title: 'Approval', desc: 'Our team reviews applications within 2 business days. We accept designers, architects, stylists, stagers, and hospitality buyers.' },
  { num: '03', title: 'Start Sourcing', desc: 'Once approved, receive your trade credentials and browse our entire collection with trade pricing applied automatically.' },
]

const stats = [
  { value: '35+', label: 'Cooperatives' },
  { value: '200+', label: 'Active weavers' },
  { value: '48h', label: 'Avg. approval time' },
  { value: '30 days', label: 'Return window' },
]

export default async function TradeProgramPage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('platform_settings').select('contact_email').eq('id', 1).single()
  const email = settings?.contact_email || 'hello@azarbi.com'
  return (
    <div className="bg-linen min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Title */}
        <p className="text-label uppercase tracking-[0.1em] text-smoke mb-4">For Professionals</p>
        <h1 className="font-display text-display-xl text-night mb-6">Trade Program</h1>
        <p className="text-lg text-smoke leading-relaxed mb-16 max-w-2xl">
          Azarbi partners with interior designers, architects, stylists, and hospitality professionals 
          who value authenticity. Our Trade Program makes sourcing handwoven Moroccan rugs effortless for your projects.
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-argane/10 border border-argane/20 rounded-brand p-6 text-center">
              <span className="font-mono text-3xl text-night block mb-1">{stat.value}</span>
              <span className="text-label-sm uppercase tracking-widest text-smoke">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-2xl text-night flex-shrink-0">Member Benefits</h2>
            <div className="h-px flex-1 bg-bone2" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-bone/30 rounded-brand border border-bone2 p-8 group hover:border-clay/30 transition-colors">
                <span className="text-2xl text-clay/50 block mb-4">{benefit.icon}</span>
                <h3 className="font-display text-lg text-night mb-3 group-hover:text-clay transition-colors">{benefit.title}</h3>
                <p className="text-sm text-smoke leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-2xl text-night flex-shrink-0">How It Works</h2>
            <div className="h-px flex-1 bg-bone2" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative bg-bone/30 rounded-brand border border-bone2 p-8">
                <span className="font-mono text-5xl text-clay/20 absolute top-6 right-8">{step.num}</span>
                <div className="relative z-10">
                  <h3 className="font-display text-xl text-night mb-3">{step.title}</h3>
                  <p className="text-sm text-smoke leading-relaxed">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <span className="hidden md:block absolute top-1/2 -right-4 text-clay/40 text-xl z-20">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-2xl text-night flex-shrink-0">Apply for Trade Access</h2>
            <div className="h-px flex-1 bg-bone2" />
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left: Why join */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-argane/10 border border-argane/20 rounded-brand p-8">
                <p className="font-display text-lg text-night leading-relaxed mb-6">
                  &ldquo;Working with Azarbi has transformed how I source rugs for my residential projects. 
                  The quality is unmatched and my clients love knowing the weaver&apos;s story.&rdquo;
                </p>
                <div>
                  <span className="text-sm text-night font-medium block">Sarah Mitchell</span>
                  <span className="text-label-sm text-smoke uppercase tracking-widest">Interior Designer, London</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  'No minimum order requirements',
                  'Quarterly lookbook with new arrivals',
                  'Priority access to rare finds',
                  'Direct weaver commissioning',
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
              <form className="flex flex-col gap-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="text-label-sm uppercase tracking-widest text-smoke block mb-2">Full Name</label>
                    <input id="name" type="text" placeholder="Your name" className="w-full px-4 py-3 border border-bone2 rounded-brand bg-linen text-night placeholder:text-smoke/50 focus:outline-none focus:border-clay transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="company" className="text-label-sm uppercase tracking-widest text-smoke block mb-2">Company</label>
                    <input id="company" type="text" placeholder="Studio or firm name" className="w-full px-4 py-3 border border-bone2 rounded-brand bg-linen text-night placeholder:text-smoke/50 focus:outline-none focus:border-clay transition-colors" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="text-label-sm uppercase tracking-widest text-smoke block mb-2">Email</label>
                    <input id="email" type="email" placeholder="your@email.com" className="w-full px-4 py-3 border border-bone2 rounded-brand bg-linen text-night placeholder:text-smoke/50 focus:outline-none focus:border-clay transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="website" className="text-label-sm uppercase tracking-widest text-smoke block mb-2">Website / Portfolio</label>
                    <input id="website" type="url" placeholder="https://your-studio.com" className="w-full px-4 py-3 border border-bone2 rounded-brand bg-linen text-night placeholder:text-smoke/50 focus:outline-none focus:border-clay transition-colors" />
                  </div>
                </div>
                <div>
                  <label htmlFor="role" className="text-label-sm uppercase tracking-widest text-smoke block mb-2">Your Role</label>
                  <select id="role" className="w-full px-4 py-3 border border-bone2 rounded-brand bg-linen text-night focus:outline-none focus:border-clay transition-colors">
                    <option value="">Select your role</option>
                    <option value="interior_designer">Interior Designer</option>
                    <option value="architect">Architect</option>
                    <option value="stylist">Stylist / Stager</option>
                    <option value="hospitality">Hospitality Buyer</option>
                    <option value="retail">Retail Buyer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="text-label-sm uppercase tracking-widest text-smoke block mb-2">About Your Projects</label>
                  <textarea id="message" rows={4} placeholder="What types of projects do you work on? Approximate annual rug sourcing volume?" className="w-full px-4 py-3 border border-bone2 rounded-brand bg-linen text-night placeholder:text-smoke/50 focus:outline-none focus:border-clay transition-colors resize-none" />
                </div>
                <button type="submit" className="btn-primary h-12 mt-2">Submit Application</button>
              </form>
            </div>
          </div>
        </div>

        {/* Contact bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-bone2">
          <div>
            <h3 className="font-display text-lg text-night mb-1">Questions about the Trade Program?</h3>
            <p className="text-sm text-smoke">We&apos;re happy to discuss how we can support your next project.</p>
          </div>
          <a href={`mailto:${email}`} className="btn-secondary">{email}</a>
        </div>

      </div>
    </div>
  )
}
