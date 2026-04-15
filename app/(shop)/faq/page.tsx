import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Azarbi',
  description: 'Answers to common questions about Azarbi rugs, ordering, shipping, returns, and care.',
}

const categories = [
  {
    icon: '◇',
    title: 'Ordering & Payment',
    items: [
      { q: 'How do I purchase a rug?', a: 'Browse our collections, select a rug, and click "Acquire This Piece." You\'ll be taken to our checkout page, then redirected to our secure partner marketplace to complete the transaction.' },
      { q: 'What payment methods do you accept?', a: 'Our partner marketplace accepts all major credit cards, PayPal, Apple Pay, and Google Pay.' },
      { q: 'Are the prices in USD?', a: 'Yes, all prices are listed in US Dollars. Your bank will handle any currency conversion at current rates.' },
      { q: 'Are your rugs really one-of-a-kind?', a: 'Yes. Every rug is handwoven by a single artisan and is completely unique. Once sold, it cannot be replicated exactly.' },
    ]
  },
  {
    icon: '△',
    title: 'Shipping & Delivery',
    items: [
      { q: 'Do you ship internationally?', a: 'Yes! We ship worldwide via DHL Express. Delivery takes 5–14 business days depending on your location.' },
      { q: 'Is shipping free?', a: 'Yes, all orders include complimentary international shipping.' },
      { q: 'How is my rug packaged?', a: 'Each rug is carefully rolled (never folded), wrapped in acid-free tissue paper, and placed in a durable shipping tube or box.' },
      { q: 'Will I need to pay import duties?', a: 'Import taxes and customs duties are determined by your country and are the buyer\'s responsibility.' },
    ]
  },
  {
    icon: '○',
    title: 'Returns & Exchanges',
    items: [
      { q: 'What is your return policy?', a: 'We accept returns within 14 days of delivery. The rug must be in its original condition — unaltered and undamaged.' },
      { q: 'Who pays for return shipping?', a: 'Return shipping costs are the buyer\'s responsibility unless the item arrived damaged or differs significantly from the listing.' },
      { q: 'What if my rug arrives damaged?', a: 'Contact us immediately with photos. We\'ll arrange a replacement or full refund including shipping costs.' },
    ]
  },
  {
    icon: '□',
    title: 'Rug Care',
    items: [
      { q: 'How do I clean my Moroccan rug?', a: 'Vacuum regularly without a beater bar. Spot-clean spills immediately with mild soap and cold water. Professional cleaning every 3–5 years.' },
      { q: 'Can I use a rug pad?', a: 'Yes, we strongly recommend a non-slip rug pad to protect both the rug and your floor, and to add extra cushioning.' },
      { q: 'Will the colours fade?', a: 'Rugs with natural dyes may soften slightly over time — this is part of their beauty. Avoid prolonged direct sunlight.' },
    ]
  },
  {
    icon: '◈',
    title: 'Bespoke & Trade',
    items: [
      { q: 'Can I commission a custom rug?', a: 'Absolutely! Visit our Bespoke page to share your ideal size, colours, pattern, and budget. Production typically takes 6–16 weeks.' },
      { q: 'Do you offer trade pricing?', a: 'Yes. Interior designers, architects, and hospitality professionals can apply for our Trade Program for exclusive discounts and priority sourcing.' },
    ]
  },
]

export default function FAQPage() {
  return (
    <div className="bg-linen min-h-screen pt-24 pb-32 scroll-smooth">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Title */}
        <p className="text-label uppercase tracking-[0.1em] text-smoke mb-4">Support</p>
        <h1 className="font-display text-display-xl text-night mb-6">Frequently Asked Questions</h1>
        <p className="text-lg text-smoke leading-relaxed mb-16 max-w-2xl">
          Find answers to common questions about our rugs, ordering, shipping, and care.
          Can&apos;t find what you&apos;re looking for? <Link href="/contact" className="text-clay hover:underline">Contact us</Link>.
        </p>

        {/* Category navigation pills */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <a
              key={cat.title}
              href={`#${cat.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-brand border border-bone2 bg-bone/30 text-sm text-night hover:border-clay/30 hover:text-clay transition-all"
            >
              <span className="text-clay/50">{cat.icon}</span>
              {cat.title}
            </a>
          ))}
        </div>

        {/* FAQ sections */}
        <div className="flex flex-col gap-8 mb-20">
          {categories.map((cat) => (
            <div
              key={cat.title}
              id={cat.title.toLowerCase().replace(/\s+/g, '-')}
              className="bg-bone/30 rounded-brand border border-bone2 p-8 lg:p-10 scroll-mt-32"
            >
              {/* Section header */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-2xl text-clay/50">{cat.icon}</span>
                <h2 className="font-display text-xl text-night">{cat.title}</h2>
                <span className="text-label-sm text-smoke uppercase tracking-widest ml-auto">{cat.items.length} questions</span>
              </div>

              {/* Q&A grid */}
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                {cat.items.map((faq) => (
                  <div key={faq.q} className="pb-6 border-b border-bone2 last:border-0 last:pb-0">
                    <h3 className="text-night font-medium mb-2 text-[15px]">{faq.q}</h3>
                    <p className="text-sm text-smoke leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-argane/10 border border-argane/20 rounded-brand p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl text-night mb-3">Still Have Questions?</h3>
              <p className="text-smoke text-sm leading-relaxed mb-6">
                We&apos;re happy to help with anything not covered above. 
                Our team typically responds within 24 hours.
              </p>
            </div>
            <Link href="/contact" className="btn-primary text-center">Contact Us</Link>
          </div>
          <div className="bg-bone/30 border border-bone2 rounded-brand p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl text-night mb-3">Need Something Custom?</h3>
              <p className="text-smoke text-sm leading-relaxed mb-6">
                Design your dream rug with our master weavers. Tell us your vision 
                and we&apos;ll make it real.
              </p>
            </div>
            <Link href="/bespoke" className="btn-secondary text-center">Start a Bespoke Commission</Link>
          </div>
        </div>

      </div>
    </div>
  )
}
