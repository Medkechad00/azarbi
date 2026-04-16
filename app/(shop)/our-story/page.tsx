import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Story — Azarbi | Authentic Moroccan Rugs Direct from Atlas Mountains',
  description: 'Azarbi connects you directly with women-led weaving cooperatives in Morocco\'s Atlas Mountains. Fair trade, zero middlemen, one-of-a-kind handwoven Berber rugs. Learn how every purchase supports artisan communities.',
  keywords: 'Moroccan rugs, Berber rugs, Atlas Mountains, fair trade rugs, handwoven rugs, Amazigh weavers, Beni Ourain, artisan cooperatives',
  openGraph: {
    title: 'Our Story — Azarbi | Authentic Moroccan Rugs',
    description: 'Azarbi connects you directly with women-led weaving cooperatives in Morocco\'s Atlas Mountains. Fair trade, zero middlemen, one-of-a-kind handwoven Berber rugs.',
    url: 'https://azarbi.com/our-story',
    type: 'website',
    images: [{
      url: '/og-our-story.jpg',
      width: 1200,
      height: 630,
      alt: 'Azarbi — Handwoven Berber Rugs from Atlas Mountains'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Story — Azarbi | Authentic Moroccan Rugs',
    description: 'Azarbi connects you directly with women-led weaving cooperatives in Morocco\'s Atlas Mountains.',
    images: ['/og-our-story.jpg']
  },
  alternates: {
    canonical: 'https://azarbi.com/our-story'
  }
}

const pillars = [
  {
    icon: '◇',
    title: 'Zero Middlemen',
    headline: 'Direct from weaver to you',
    desc: 'We work directly with 35+ cooperatives across the Middle and High Atlas Mountains. No warehouses, no wholesalers, no markups. The price you pay reflects the true value of the artisan\'s work.',
  },
  {
    icon: '◈',
    title: 'Fair Compensation',
    headline: 'Artisans set their own prices',
    desc: 'Our weavers determine their rates based on the complexity, materials, and time invested. We pay 100% upfront — never on consignment. Every transaction is transparent and traceable.',
  },
  {
    icon: '○',
    title: 'Cultural Preservation',
    headline: '1,000+ years of living tradition',
    desc: 'Each rug carries centuries of Amazigh symbolism — diamond motifs for protection, zigzag lines for water and life. By purchasing directly, you help ensure these techniques survive for future generations.',
  },
  {
    icon: '□',
    title: 'Sustainable Craft',
    headline: 'Natural materials, zero waste',
    desc: 'Virgin wool from local sheep, natural plant and mineral dyes, hand-spun yarn, and sun-drying. Every step is traditional, sustainable, and produces rugs built to last 50+ years.',
  },
]

const impactNumbers = [
  { value: '200+', label: 'Women weavers supported', detail: 'Across the Middle and High Atlas' },
  { value: '35+', label: 'Cooperatives partnered', detail: 'Each independently women-led' },
  { value: '5%', label: 'Reinvested per sale', detail: 'Into cooperative infrastructure' },
  { value: '0', label: 'Middlemen involved', detail: 'Direct artisan-to-buyer model' },
]

const investments = [
  { title: 'Looms & Equipment', desc: 'Funding modern wooden looms and wool processing equipment so cooperatives can increase output without sacrificing quality.' },
  { title: 'Natural Dye Workshops', desc: 'Training in traditional plant and mineral dyeing techniques — pomegranate, indigo, saffron, henna — keeping ancient colour recipes alive.' },
  { title: 'Literacy Programs', desc: 'Supporting reading and numeracy education for artisans and their children, enabling cooperative members to manage their own finances.' },
  { title: 'Apprentice Stipends', desc: 'Monthly stipends for young women learning to weave, ensuring the next generation can afford to pursue the craft.' },
]

export default function OurStoryPage() {
  return (
    <div className="bg-linen min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Title */}
        <p className="text-label uppercase tracking-[0.1em] text-smoke mb-4">About Azarbi</p>
        <h1 className="font-display text-display-xl text-night mb-6">Our Story</h1>
        <p className="text-lg text-smoke leading-relaxed mb-16 max-w-2xl">
          Azarbi — meaning &ldquo;rugs&rdquo; in Tamazight — was born from a simple belief: 
          the women who weave these masterpieces deserve to be recognised, respected, and fairly paid.
        </p>

        {/* Hero with overlapping quote */}
        <div className="relative mb-28">
          <div className="relative w-full aspect-[21/9] rounded-brand overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1489749798305-4fea3ae63d23?auto=format&fit=crop&q=80&w=1600"
              alt="Atlas Mountains landscape where Azarbi cooperatives are based"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-night/50 to-transparent" />
          </div>
          {/* Overlapping card */}
          <div className="relative md:absolute md:bottom-0 md:right-8 md:translate-y-1/2 bg-linen rounded-brand border border-bone2 p-8 lg:p-10 md:max-w-md shadow-sm mt-6 md:mt-0">
            <p className="font-display text-xl text-night leading-relaxed mb-4">
              &ldquo;Every knot in an Amazigh rug is a word. Every rug is a story. 
              We simply help these stories find the homes that will cherish them.&rdquo;
            </p>
            <span className="text-label-sm text-smoke uppercase tracking-widest">— Azarbi Founding Team</span>
          </div>
        </div>

        {/* The Problem & The Solution */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-2xl text-night flex-shrink-0">Why Azarbi Exists</h2>
            <div className="h-px flex-1 bg-bone2" />
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-bone/30 rounded-brand border border-bone2 p-8 lg:p-10">
              <span className="font-mono text-5xl text-clay/15 block mb-4">01</span>
              <h3 className="font-display text-xl text-night mb-4">The Problem We Saw</h3>
              <p className="text-smoke text-[15px] leading-relaxed mb-4">
                For centuries, Amazigh women across Morocco&apos;s Atlas Mountains have woven extraordinary 
                rugs — each piece a living archive of family histories, spiritual symbols, and tribal identity.
              </p>
              <p className="text-smoke text-[15px] leading-relaxed mb-4">
                Yet these artisans rarely saw fair compensation. A complex chain of middlemen, 
                exporters, and mass-market retailers extracted the value at every step, leaving 
                cooperatives struggling to sustain their craft and communities.
              </p>
              <p className="text-smoke text-[15px] leading-relaxed">
                The rugs sold for thousands in European and American showrooms. The women who 
                spent months weaving them earned a fraction.
              </p>
            </div>
            <div className="bg-argane/10 border border-argane/20 rounded-brand p-8 lg:p-10">
              <span className="font-mono text-5xl text-clay/15 block mb-4">02</span>
              <h3 className="font-display text-xl text-night mb-4">What We Do Differently</h3>
              <p className="text-smoke text-[15px] leading-relaxed mb-4">
                Azarbi removes every intermediary between the weaver and you. We travel to the 
                cooperatives, build long-term relationships, and let artisans set their own prices 
                based on the true value of their work.
              </p>
              <p className="text-smoke text-[15px] leading-relaxed mb-4">
                Every rug comes with a <strong>Certificate of Authenticity</strong> documenting 
                the weaver&apos;s name, her cooperative, the region, materials used, and approximate 
                weaving duration. You know exactly who made your rug and where your money goes.
              </p>
              <p className="text-smoke text-[15px] leading-relaxed">
                This isn&apos;t charity — it&apos;s commerce done right. Fair pricing for exceptional work.
              </p>
            </div>
          </div>
        </div>

        {/* Four Pillars */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-2xl text-night flex-shrink-0">Our Pillars</h2>
            <div className="h-px flex-1 bg-bone2" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="bg-bone/30 rounded-brand border border-bone2 p-8 group hover:border-clay/30 transition-colors">
                <span className="text-2xl text-clay/50 block mb-4">{pillar.icon}</span>
                <h3 className="font-display text-lg text-night mb-1 group-hover:text-clay transition-colors">{pillar.title}</h3>
                <p className="text-[12px] text-clay italic mb-4">{pillar.headline}</p>
                <p className="text-sm text-smoke leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Numbers */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-2xl text-night flex-shrink-0">Our Impact</h2>
            <div className="h-px flex-1 bg-bone2" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactNumbers.map((stat) => (
              <div key={stat.label} className="bg-argane/10 border border-argane/20 rounded-brand p-8 text-center">
                <span className="font-mono text-4xl text-night block mb-2">{stat.value}</span>
                <span className="text-sm text-night font-medium block mb-1">{stat.label}</span>
                <span className="text-[12px] text-smoke">{stat.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Community Investment */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-2xl text-night flex-shrink-0">Where Your 5% Goes</h2>
            <div className="h-px flex-1 bg-bone2" />
          </div>
          <div className="bg-bone/30 rounded-brand border border-bone2 p-8 lg:p-10 mb-6">
            <p className="text-smoke leading-relaxed mb-8 max-w-2xl">
              We reinvest 5% of every sale back into cooperative infrastructure. This isn&apos;t a 
              marketing pledge — it&apos;s a core part of our operating model. Here&apos;s how it&apos;s spent:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {investments.map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <span className="text-clay mt-1 flex-shrink-0">✦</span>
                  <div>
                    <h4 className="text-night font-medium mb-1">{item.title}</h4>
                    <p className="text-sm text-smoke leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The Craft */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-2xl text-night flex-shrink-0">The Craft Behind Every Rug</h2>
            <div className="h-px flex-1 bg-bone2" />
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-bone/30 rounded-brand border border-bone2 p-8">
              <span className="font-mono text-5xl text-clay/15 block mb-2">01</span>
              <h3 className="font-display text-lg text-night mb-3">Shearing & Sorting</h3>
              <p className="text-sm text-smoke leading-relaxed">
                Wool is sheared from local sheep in late spring, then hand-sorted by quality 
                and colour. The finest fleece is reserved for Beni Ourain and Azilal rugs.
              </p>
            </div>
            <div className="bg-bone/30 rounded-brand border border-bone2 p-8">
              <span className="font-mono text-5xl text-clay/15 block mb-2">02</span>
              <h3 className="font-display text-lg text-night mb-3">Spinning & Dyeing</h3>
              <p className="text-sm text-smoke leading-relaxed">
                Wool is washed in mountain streams, carded, and spun into yarn on wooden drop 
                spindles. Natural dyes are prepared from pomegranate, indigo, saffron, and henna.
              </p>
            </div>
            <div className="bg-bone/30 rounded-brand border border-bone2 p-8">
              <span className="font-mono text-5xl text-clay/15 block mb-2">03</span>
              <h3 className="font-display text-lg text-night mb-3">Weaving & Finishing</h3>
              <p className="text-sm text-smoke leading-relaxed">
                Weavers work on traditional low-ground looms, tying each knot individually. 
                A single rug may contain over 100,000 hand-tied knots and take 2–6 months to complete.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-argane/10 border border-argane/20 rounded-brand p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl text-night mb-3">Browse Collections</h3>
              <p className="text-smoke text-sm leading-relaxed mb-6">
                Discover one-of-a-kind rugs handwoven by the artisans behind our mission.
              </p>
            </div>
            <Link href="/collections" className="btn-primary text-center">Shop Now</Link>
          </div>
          <div className="bg-bone/30 border border-bone2 rounded-brand p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl text-night mb-3">Meet the Weavers</h3>
              <p className="text-smoke text-sm leading-relaxed mb-6">
                Get to know the women preserving these ancient techniques across the Atlas Mountains.
              </p>
            </div>
            <Link href="/weavers" className="btn-secondary text-center">View Weavers</Link>
          </div>
          <div className="bg-bone/30 border border-bone2 rounded-brand p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl text-night mb-3">Commission a Rug</h3>
              <p className="text-smoke text-sm leading-relaxed mb-6">
                Design your dream piece with our master weavers. 100% custom, 100% unique.
              </p>
            </div>
            <Link href="/bespoke" className="btn-secondary text-center">Start Bespoke</Link>
          </div>
        </div>

      </div>
    </div>
  )
}
