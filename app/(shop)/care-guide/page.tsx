import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Care Guide — Azarbi',
  description: 'How to care for your handwoven Moroccan rug. Cleaning, stain removal, storage, and long-term care tips.',
}

const dailyCare = [
  { icon: '✦', title: 'Rotate Regularly', desc: 'Rotate your rug 180° every 3–6 months to ensure even wear and prevent colour fading from sunlight.' },
  { icon: '✦', title: 'Vacuum Gently', desc: 'Vacuum weekly on a low setting without a beater bar. Always vacuum in the direction of the pile, never against it.' },
  { icon: '✦', title: 'Shake It Out', desc: 'For smaller rugs, take them outside and give them a good shake every few weeks to remove dust and debris.' },
  { icon: '✦', title: 'Use a Rug Pad', desc: 'A quality non-slip rug pad prevents bunching, protects your floor, adds cushioning, and extends the rug\'s life.' },
]

const stainGuide = [
  { stain: 'Coffee & Tea', method: 'Blot immediately. Apply cold water with white vinegar (1:1). Blot again. Repeat until clear.' },
  { stain: 'Red Wine', method: 'Blot (don\'t rub). Apply salt to absorb. After 15 min, vacuum salt. Dab with cold soda water.' },
  { stain: 'Pet Accidents', method: 'Blot thoroughly. Apply enzyme-based cleaner. Rinse with cold water. Air dry completely.' },
  { stain: 'Mud & Dirt', method: 'Let it dry completely. Vacuum or brush off dried mud. Spot-clean residue with mild soap and cold water.' },
  { stain: 'Grease & Oil', method: 'Sprinkle baking soda or cornstarch. Wait 30 min to absorb. Vacuum. Dab with diluted dish soap.' },
  { stain: 'Ink', method: 'Dab with rubbing alcohol on a white cloth. Work from the outside in. Rinse with cold water.' },
]

const seasons = [
  {
    num: '01',
    title: 'Spring Refresh',
    tasks: ['Deep vacuum both sides', 'Air out in shade for 2–4 hours', 'Check for moth activity', 'Rotate 180°'],
  },
  {
    num: '02',
    title: 'Summer Care',
    tasks: ['Move away from direct sunlight windows', 'Store heavy wool rugs if not in use', 'Keep room well-ventilated', 'Spot-treat any stains before they set'],
  },
  {
    num: '03',
    title: 'Autumn Prep',
    tasks: ['Professional clean if needed', 'Treat with moth deterrent (cedar blocks)', 'Rotate 180°', 'Check rug pad condition'],
  },
  {
    num: '04',
    title: 'Winter Enjoy',
    tasks: ['Keep away from radiators and fireplaces', 'Vacuum more frequently (indoor season)', 'Blot winter boot marks immediately', 'Enjoy the warmth underfoot!'],
  },
]

const donts = [
  'Never use bleach or harsh chemical cleaners',
  'Never machine wash or tumble dry',
  'Never rub a stain — always blot',
  'Avoid prolonged direct sunlight',
  'Don\'t fold for storage — always roll',
  'Never use a beater bar vacuum attachment',
]

export default function CareGuidePage() {
  return (
    <div className="bg-linen min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Title */}
        <p className="text-label uppercase tracking-[0.1em] text-smoke mb-4">Helpful Resource</p>
        <h1 className="font-display text-display-xl text-night mb-6">Care Guide</h1>
        <p className="text-lg text-smoke leading-relaxed mb-16 max-w-2xl">
          A well-cared-for Moroccan rug lasts generations. Follow these simple guidelines 
          to keep your handwoven piece beautiful for years to come.
        </p>

        {/* Golden rule banner */}
        <div className="bg-argane/10 border border-argane/20 rounded-brand p-8 lg:p-10 mb-16">
          <p className="font-display text-xl text-night leading-relaxed">
            The golden rule: <strong>blot, don&apos;t rub</strong>. Whether it&apos;s a spill, a stain, or a splash — 
            always press gently with a clean cloth. Rubbing spreads the stain and damages fibres.
          </p>
        </div>

        {/* Daily care */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-2xl text-night flex-shrink-0">Daily Care Essentials</h2>
            <div className="h-px flex-1 bg-bone2" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dailyCare.map((item) => (
              <div key={item.title} className="bg-bone/30 rounded-brand border border-bone2 p-8 group hover:border-clay/30 transition-colors">
                <span className="text-xl text-clay/50 block mb-4">{item.icon}</span>
                <h3 className="font-display text-lg text-night mb-3 group-hover:text-clay transition-colors">{item.title}</h3>
                <p className="text-sm text-smoke leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stain removal guide */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-2xl text-night flex-shrink-0">Stain Removal Guide</h2>
            <div className="h-px flex-1 bg-bone2" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stainGuide.map((item) => (
              <div key={item.stain} className="bg-bone/30 rounded-brand border border-bone2 p-6">
                <span className="font-mono text-sm text-clay bg-clay/10 px-3 py-1 rounded-brand inline-block mb-4">{item.stain}</span>
                <p className="text-sm text-smoke leading-relaxed">{item.method}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal care */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-2xl text-night flex-shrink-0">Seasonal Care Calendar</h2>
            <div className="h-px flex-1 bg-bone2" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasons.map((season) => (
              <div key={season.num} className="relative bg-bone/30 rounded-brand border border-bone2 p-8">
                <span className="font-mono text-5xl text-clay/15 absolute top-4 right-6">{season.num}</span>
                <div className="relative z-10">
                  <h3 className="font-display text-lg text-night mb-4">{season.title}</h3>
                  <div className="flex flex-col gap-2">
                    {season.tasks.map((task) => (
                      <div key={task} className="flex items-start gap-2">
                        <span className="text-clay/50 mt-0.5 flex-shrink-0 text-xs">✦</span>
                        <span className="text-sm text-smoke">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Things to avoid */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-2xl text-night flex-shrink-0">Things to Avoid</h2>
            <div className="h-px flex-1 bg-bone2" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {donts.map((item) => (
              <div key={item} className="flex items-center gap-4 bg-red-50/50 border border-red-200/30 rounded-brand p-5">
                <span className="text-red-400 flex-shrink-0 text-lg">✕</span>
                <span className="text-sm text-night">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro cleaning */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-argane/10 border border-argane/20 rounded-brand p-8">
            <h3 className="font-display text-xl text-night mb-3">Professional Cleaning</h3>
            <p className="text-smoke text-sm leading-relaxed mb-4">
              We recommend professional cleaning every 3–5 years. Always choose a cleaner experienced 
              with handwoven wool rugs — not all dry cleaners understand natural-dye fibres.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-clay">✓</span>
                <span className="text-sm text-smoke">Ask for hand-washing, not machine</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-clay">✓</span>
                <span className="text-sm text-smoke">Request air-drying, not tumble</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-clay">✓</span>
                <span className="text-sm text-smoke">Specify no bleach or optical brighteners</span>
              </div>
            </div>
          </div>
          <div className="bg-bone/30 border border-bone2 rounded-brand p-8">
            <h3 className="font-display text-xl text-night mb-3">Long-Term Storage</h3>
            <p className="text-smoke text-sm leading-relaxed mb-4">
              If you need to store your rug for an extended period, follow these steps to keep it in perfect condition.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-clay">✓</span>
                <span className="text-sm text-smoke">Clean thoroughly before storing</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-clay">✓</span>
                <span className="text-sm text-smoke">Roll (never fold) with pile facing inward</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-clay">✓</span>
                <span className="text-sm text-smoke">Wrap in breathable cotton, not plastic</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-clay">✓</span>
                <span className="text-sm text-smoke">Store flat in a cool, dry place with cedar blocks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-bone2">
          <div>
            <h3 className="font-display text-lg text-night mb-1">Need care advice for your specific rug?</h3>
            <p className="text-sm text-smoke">We&apos;re always happy to help with personalised care tips.</p>
          </div>
          <Link href="/contact" className="btn-secondary">Contact Us</Link>
        </div>

      </div>
    </div>
  )
}
