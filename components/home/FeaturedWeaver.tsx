import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export async function FeaturedWeaver() {
  const supabase = await createClient()
  
  const { data: weaver } = await supabase
    .from('weavers')
    .select(`
      id, name, slug, bio, portrait_url, years_weaving,
      cooperatives(name, region)
    `)
    .eq('featured', true)
    .single()

  if (!weaver) return null

  return (
    <section className="py-24 bg-linen">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-1/2 relative aspect-[4/5] overflow-hidden rounded-brand bg-bone">
            <Image 
              src={weaver.portrait_url || 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e'} 
              alt={`Portrait of ${weaver.name}, master weaver`}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="w-full lg:w-1/2 max-w-xl">
            <span className="text-label text-smoke uppercase tracking-widest mb-6 block">
              Featured Masterweaver
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-night mb-6">
              Meet {weaver.name}
            </h2>
            <p className="text-smoke text-lg leading-relaxed mb-8">
              {weaver.bio?.substring(0, 200)}...
            </p>
            <div className="flex flex-col gap-2 mb-10 pb-10 border-b border-bone2">
              <span className="text-label uppercase tracking-widest text-night">
                {(weaver.cooperatives as any)?.name || 'Atlas Mountains Cooperative'}
              </span>
              <span className="text-sm text-smoke italic">
                {weaver.years_weaving} years of preserving craft
              </span>
            </div>
            
            <Link href={`/weavers/${weaver.slug}`} className="btn-primary">
              Read {weaver.name}&apos;s Story
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  )
}
