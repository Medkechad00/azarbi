import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Master Weavers — Azarbi Rugs',
  description: 'Meet the Amazigh artisans behind authentic Moroccan Berber rugs. Each weaver brings decades of experience and unique artistic vision to every handwoven piece.',
  openGraph: {
    title: 'The Master Weavers — Azarbi Rugs',
    description: 'Meet the Amazigh artisans behind authentic Moroccan Berber rugs. Each weaver brings decades of experience and unique artistic vision.',
    url: 'https://azarbi.com/weavers',
    type: 'website',
    images: [{
      url: '/og-weavers.jpg',
      width: 1200,
      height: 630,
      alt: 'Azarbi — Master Weavers of Moroccan Berber Rugs'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Master Weavers — Azarbi Rugs',
    description: 'Meet the Amazigh artisans behind authentic Moroccan Berber rugs.',
    images: ['/og-weavers.jpg']
  },
  alternates: {
    canonical: 'https://azarbi.com/weavers'
  }
}

export default async function WeaversPage() {
  const supabase = await createClient()
  
  const { data: weavers } = await supabase
    .from('weavers')
    .select(`
      id, name, slug, bio, portrait_url, specialties, years_weaving,
      cooperatives(name, region)
    `)
    .order('name', { ascending: true })

  return (
    <div className="bg-linen min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="max-w-3xl mb-16">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-night mb-6 leading-tight">
            The Master Weavers
          </h1>
          <p className="text-smoke text-lg leading-relaxed">
            Every Azarbi rug is hand-knotted by an independent artisan across the Atlas Mountains. 
            We bypass middlemen so that 100% of the cooperative's asking price goes directly to them.
            Get to know the women preserving these ancient techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {weavers?.map((weaver) => (
            <Link 
              key={weaver.id} 
              href={`/weavers/${weaver.slug}`}
              className="group flex flex-col gap-6"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-brand bg-bone border border-bone2">
                <Image 
                  src={weaver.portrait_url || 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=800&h=1067'} 
                  alt={`Portrait of ${weaver.name}, Amazigh master weaver`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0 duration-500"
                />
              </div>
              
              <div>
                <p className="text-label-sm text-smoke uppercase tracking-widest mb-2">
                  {(weaver.cooperatives as any)?.[0]?.name || (weaver.cooperatives as any)?.name} · {(weaver.cooperatives as any)?.[0]?.region || (weaver.cooperatives as any)?.region}
                </p>
                <h2 className="font-display text-2xl text-night mb-2 group-hover:text-clay transition-colors">
                  {weaver.name}
                </h2>
                <p className="text-smoke line-clamp-2 text-sm leading-relaxed mb-4">
                  {weaver.bio}
                </p>
                <span className="text-label text-night uppercase tracking-widest border-b border-night/30 pb-1 group-hover:border-clay group-hover:text-clay transition-colors">
                  Read Profile
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
