export function CraftProcess() {
  const steps = [
    {
      number: '01',
      title: 'Sourcing the Wool',
      description: 'The foundation of every piece is live-shorn wool from high-altitude Atlas sheep. Rich in lanolin, it provides natural stain resistance and incredible softness.'
    },
    {
      number: '02',
      title: 'Dyeing & Spinning',
      description: 'Depending on the rug, wool is either left entirely undyed, or saturated with native botanical extracts like saffron, madder root, and indigo.'
    },
    {
      number: '03',
      title: 'Knotting on the Loom',
      description: 'Using techniques passed down matrilineally, the weavers sit at upright looms for weeks, tying up to 100,000 individual knots for a single rug.'
    }
  ]

  return (
    <section className="py-32 bg-bone/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <span className="text-label text-smoke uppercase tracking-widest mb-4 block">
            The Process
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-night mb-6">
            Woven in geological time.
          </h2>
          <p className="text-smoke text-lg leading-relaxed max-w-2xl">
            There are no factories. No industrial looms. Every Azarbi rug is entirely made by hand in the weaver&apos;s own home or local cooperative.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="relative bg-linen rounded-brand border border-bone2 p-8 group hover:border-clay/30 transition-colors">
              <span className="font-mono text-5xl text-clay/20 absolute top-6 right-8">
                {step.number}
              </span>
              <div className="relative z-10">
                <h3 className="font-display text-2xl text-night mb-4 group-hover:text-clay transition-colors">
                  {step.title}
                </h3>
                <p className="text-smoke leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
