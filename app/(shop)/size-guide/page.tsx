import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Size Guide — Azarbi',
  description: 'Find the perfect rug size for your space. Room-by-room sizing recommendations for Moroccan rugs.',
}

const rooms = [
  {
    name: 'Living Room',
    icon: '⬡',
    sizes: [
      { label: 'Under Sofa', dims: '200 × 300 cm', note: 'Front legs of furniture on the rug.' },
      { label: 'Full Room', dims: '250 × 350 cm', note: 'All furniture sits on the rug.' },
      { label: 'Accent', dims: '150 × 200 cm', note: 'Between seating. No furniture on rug.' },
    ],
    tip: 'Leave 45–60 cm of floor visible between the rug edge and the wall for a balanced look.',
  },
  {
    name: 'Bedroom',
    icon: '◇',
    sizes: [
      { label: 'King Bed', dims: '250 × 300 cm', note: 'Extends 60 cm beyond each side.' },
      { label: 'Queen Bed', dims: '200 × 300 cm', note: 'Extends 45 cm beyond each side.' },
      { label: 'Runners', dims: '80 × 250 cm', note: 'Placed on either side of the bed.' },
    ],
    tip: 'Position the rug to extend at least 60 cm beyond the foot of the bed for a luxurious step-out.',
  },
  {
    name: 'Dining Room',
    icon: '□',
    sizes: [
      { label: '6-Seat Table', dims: '200 × 300 cm', note: 'Chairs stay on the rug when pulled out.' },
      { label: '4-Seat Table', dims: '180 × 250 cm', note: 'Allow 75 cm beyond each table edge.' },
      { label: 'Round Table', dims: '250 × 250 cm', note: 'Or a round rug 120 cm wider than the table.' },
    ],
    tip: 'The rug should extend at least 75 cm beyond the table edge so chairs remain on the rug when in use.',
  },
  {
    name: 'Entryway & Hall',
    icon: '△',
    sizes: [
      { label: 'Foyer', dims: '120 × 180 cm', note: 'Creates a welcoming landing zone.' },
      { label: 'Hallway Runner', dims: '80 × 300 cm', note: 'Leave 10 cm on each side.' },
      { label: 'Doormat Size', dims: '60 × 90 cm', note: 'For compact entries.' },
    ],
    tip: 'Hall runners should be roughly 30 cm narrower than the hallway and leave equal space on both sides.',
  },
]

const categories = [
  { name: 'Beni Ourain', pile: '2.0 – 3.5 cm', texture: 'Dense, plush', bestFor: 'Living rooms, bedrooms', weight: '4 – 6 kg/m²' },
  { name: 'Azilal', pile: '1.5 – 2.5 cm', texture: 'Medium, soft', bestFor: 'Living rooms, nurseries', weight: '3 – 5 kg/m²' },
  { name: 'Kilim', pile: '0.2 – 0.5 cm', texture: 'Flat-weave, smooth', bestFor: 'Dining rooms, kitchens, hallways', weight: '2 – 3 kg/m²' },
  { name: 'Boucherouite', pile: '1.0 – 2.0 cm', texture: 'Varied, textured', bestFor: 'Accent walls, bedrooms', weight: '2 – 4 kg/m²' },
]

export default function SizeGuidePage() {
  return (
    <div className="bg-linen min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Title */}
        <p className="text-label uppercase tracking-[0.1em] text-smoke mb-4">Helpful Resource</p>
        <h1 className="font-display text-display-xl text-night mb-6">Size Guide</h1>
        <p className="text-lg text-smoke leading-relaxed mb-16 max-w-2xl">
          Choosing the right rug size transforms a room. Use our room-by-room guide 
          to find the perfect dimensions for your space.
        </p>

        {/* Quick measure tip */}
        <div className="bg-argane/10 border border-argane/20 rounded-brand p-8 lg:p-10 mb-16">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <span className="text-4xl">📐</span>
            <div>
              <h2 className="font-display text-lg text-night mb-2">Quick Measure Trick</h2>
              <p className="text-smoke text-sm leading-relaxed">
                Use painter&apos;s tape or newspaper to outline the rug dimensions on your floor before ordering. 
                Live with the outline for a day to see how it feels in the space. It&apos;s the simplest way to confirm the perfect size.
              </p>
            </div>
          </div>
        </div>

        {/* Room-by-room guide */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-2xl text-night flex-shrink-0">Room-by-Room Sizing</h2>
            <div className="h-px flex-1 bg-bone2" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {rooms.map((room) => (
              <div key={room.name} className="bg-bone/30 rounded-brand border border-bone2 p-8 group hover:border-clay/30 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl text-clay/50">{room.icon}</span>
                  <h3 className="font-display text-xl text-night">{room.name}</h3>
                </div>

                <div className="flex flex-col gap-4 mb-6">
                  {room.sizes.map((size) => (
                    <div key={size.label} className="flex items-start gap-4">
                      <span className="font-mono text-sm text-night bg-bone rounded-brand px-3 py-1 flex-shrink-0 border border-bone2">{size.dims}</span>
                      <div>
                        <span className="text-sm text-night font-medium block">{size.label}</span>
                        <span className="text-[12px] text-smoke">{size.note}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-bone2">
                  <p className="text-[12px] text-smoke italic">💡 {room.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category comparison table */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-2xl text-night flex-shrink-0">Compare by Category</h2>
            <div className="h-px flex-1 bg-bone2" />
          </div>

          <div className="bg-bone/30 rounded-brand border border-bone2 overflow-hidden">
            {/* Header */}
            <div className="hidden md:grid grid-cols-5 gap-4 p-5 bg-bone/50 border-b border-bone2 text-label-sm uppercase tracking-widest text-smoke">
              <span>Category</span>
              <span>Pile Depth</span>
              <span>Texture</span>
              <span>Best For</span>
              <span>Weight</span>
            </div>
            {/* Rows */}
            {categories.map((cat, i) => (
              <div key={cat.name} className={`grid md:grid-cols-5 gap-4 p-5 ${i < categories.length - 1 ? 'border-b border-bone2' : ''}`}>
                <span className="font-display text-night md:text-base text-lg">{cat.name}</span>
                <div className="md:block flex gap-2">
                  <span className="md:hidden text-label-sm uppercase tracking-widest text-smoke">Pile: </span>
                  <span className="text-sm text-smoke font-mono">{cat.pile}</span>
                </div>
                <div className="md:block flex gap-2">
                  <span className="md:hidden text-label-sm uppercase tracking-widest text-smoke">Texture: </span>
                  <span className="text-sm text-smoke">{cat.texture}</span>
                </div>
                <div className="md:block flex gap-2">
                  <span className="md:hidden text-label-sm uppercase tracking-widest text-smoke">Best for: </span>
                  <span className="text-sm text-smoke">{cat.bestFor}</span>
                </div>
                <div className="md:block flex gap-2">
                  <span className="md:hidden text-label-sm uppercase tracking-widest text-smoke">Weight: </span>
                  <span className="text-sm text-smoke font-mono">{cat.weight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-bone2">
          <div>
            <h3 className="font-display text-lg text-night mb-1">Need help choosing a size?</h3>
            <p className="text-sm text-smoke">Send us your room photos and we&apos;ll recommend the perfect rug.</p>
          </div>
          <Link href="/contact" className="btn-secondary">Contact Us</Link>
        </div>

      </div>
    </div>
  )
}
