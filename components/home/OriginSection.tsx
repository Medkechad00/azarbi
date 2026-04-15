import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function OriginSection() {
  return (
    <section className="py-32 bg-night text-linen overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        <div className="w-full lg:w-1/2">
          <span className="text-label text-smoke uppercase tracking-widest mb-6 block">Origin Context</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
            Rooted in the peaks of the Atlas.
          </h2>
          <p className="text-smoke text-lg leading-relaxed mb-12 max-w-lg">
            Each rug is geographically distinct. The thick piles of Beni Ourain originated to protect against Middle Atlas snows, while the flat Kilim weaves were born from the nomadic necessity of the pre-Saharan plains. We travel directly to these isolated cooperatives.
          </p>
          
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div>
              <span className="block font-display text-4xl text-clay mb-2">14</span>
              <span className="text-label-sm uppercase tracking-widest text-smoke">Partner Cooperatives</span>
            </div>
            <div>
              <span className="block font-display text-4xl text-clay mb-2">120+</span>
              <span className="text-label-sm uppercase tracking-widest text-smoke">Independent Weavers</span>
            </div>
          </div>
          
          <Button asChild variant="secondary" className="bg-linen text-night hover:bg-bone transition-colors">
            <Link href="/our-story">Discover Our Story</Link>
          </Button>
        </div>
        
        <div className="w-full lg:w-1/2 relative aspect-square lg:aspect-[4/3] rounded-brand overflow-hidden filter grayscale opacity-80 mix-blend-screen">
          <Image 
            src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=1200&h=900" 
            alt="Panoramic view of the High Atlas Mountains where Azarbi's weaving cooperatives are based"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        
      </div>
    </section>
  )
}
