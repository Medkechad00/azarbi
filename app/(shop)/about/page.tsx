import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = { title: 'Our Story — Azarbi Masterweavers' }

export default function AboutPage() {
  return (
    <div className="bg-linen min-h-screen">
      
      {/* Hero */}
      <div className="pt-32 pb-24 border-b border-bone2 bg-bone/30">
        <div className="container mx-auto px-6 lg:px-12 text-center max-w-4xl">
          <span className="text-label uppercase tracking-widest text-smoke mb-6 block">Our Story</span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-night leading-tight mb-8">
            Empowering the women who weave the Atlas.
          </h1>
          <p className="text-lg text-smoke leading-relaxed">
            Azarbi was founded to disrupt a fiercely inequitable supply chain. Traditional Moroccan rug markets see master artisans earning as little as 5% of their piece's final retail value. We exist to rewrite that equation.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-24">
        
        {/* Section 1 */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center mb-32">
          <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-brand overflow-hidden filter grayscale opacity-90">
            <Image 
              src="https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=1200"
              alt="Amazigh woman artisan hand-weaving a traditional Berber rug on a wooden loom in the Atlas Mountains"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 max-w-xl">
            <h2 className="font-display text-4xl text-night mb-6">100% of the asking price.</h2>
            <div className="prose prose-p:text-smoke prose-p:leading-relaxed">
              <p>We do not negotiate prices down. When we visit a cooperative in the Atlas mountains, we ask the weaver what she values her weeks of labour at. We pay that exact price.</p>
              <p>Our profit margin is added entirely on top of her asking price to cover transport, international shipping, washing, and operational costs. The artisan is never squeezed.</p>
            </div>
          </div>
        </div>
        
        {/* Section 2 */}
        <div className="flex flex-col-reverse lg:flex-row gap-16 lg:gap-24 items-center mb-32">
          <div className="w-full lg:w-1/2 max-w-xl">
            <h2 className="font-display text-4xl text-night mb-6">Matrilineal heritage.</h2>
            <div className="prose prose-p:text-smoke prose-p:leading-relaxed">
              <p>These techniques—complex knots, flat weaves, natural dyeing—are exclusively passed down from mother to daughter in Amazigh (Berber) culture.</p>
              <p>By guaranteeing fair compensation, we ensure these women can achieve extreme financial independence in deeply patriarchal rural areas, while keeping the ancient craft economically viable for the next generation.</p>
            </div>
            <Button asChild className="mt-8">
              <Link href="/weavers">Meet the Master Weavers</Link>
            </Button>
          </div>
          <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-brand bg-bone overflow-hidden filter grayscale opacity-90">
            <Image 
              src="https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=1200"
              alt="Close-up of skilled hands tying intricate knots in a handwoven Moroccan Berber rug"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

      </div>
      
    </div>
  )
}
