import { createClient } from '@/lib/supabase/server'
import { createStaticClient } from '@/lib/supabase/static'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Metadata } from 'next'
import { ProductGrid } from '@/components/product/ProductGrid'
import { PersonSchema } from '@/components/seo/PersonSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const supabase = await createClient()
  const { data: weaver } = await supabase
    .from('weavers')
    .select('name, bio')
    .eq('slug', params.slug)
    .single()

  if (!weaver) return {}

  return {
    title: `${weaver.name} — Azarbi Weavers`,
    description: weaver.bio?.substring(0, 160),
  }
}

export const revalidate = 86400 // weavers change rarely

export async function generateStaticParams() {
  const supabase = createStaticClient()
  const { data: weavers } = await supabase.from('weavers').select('slug')
  return weavers?.map((w) => ({ slug: w.slug })) || []
}

export default async function WeaverProfilePage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params;
  const supabase = await createClient()
  
  const { data: weaver } = await supabase
    .from('weavers')
    .select(`
      *,
      cooperatives(name, region, village, description)
    `)
    .eq('slug', params.slug)
    .single()

  if (!weaver) {
    notFound()
  }

  // Fetch all products by this weaver
  const { data: products } = await supabase
    .from('products')
    .select(`
      id, sku, slug, title, category, price_usd, width_cm, length_cm, region, status,
      is_one_of_one, is_new_arrival, primary_image_url,
      weavers(name, slug)
    `)
    .eq('weaver_id', weaver.id)
    .order('created_at', { ascending: false })

  return (
    <div className="bg-linen min-h-screen pb-32">
      <PersonSchema weaver={weaver} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://azarbi.com' },
        { name: 'Weavers', url: 'https://azarbi.com/weavers' },
        { name: weaver.name, url: `https://azarbi.com/weavers/${weaver.slug}` },
      ]} />
      
      {/* Split Hero */}
      <div className="flex flex-col lg:flex-row min-h-[85vh] border-b border-bone2">
        {/* Left: Bio Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-20 py-24 bg-bone/30">
          <p className="text-label text-smoke uppercase tracking-widest mb-6">
            Master Weaver · {weaver.years_weaving} Years Experience
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-night leading-tight mb-8">
            {weaver.name}
          </h1>
          <div className="prose prose-p:text-smoke prose-p:leading-relaxed max-w-lg mb-12">
            <p className="text-lg">{weaver.bio}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-bone2">
            <div>
              <span className="block text-label-sm uppercase tracking-widest text-smoke mb-2">Cooperative</span>
              <span className="font-sans text-night">{weaver.cooperatives?.name}</span>
            </div>
            <div>
              <span className="block text-label-sm uppercase tracking-widest text-smoke mb-2">Location</span>
              <span className="font-sans text-night">{weaver.cooperatives?.village}, {weaver.cooperatives?.region}</span>
            </div>
          </div>
        </div>
        
        {/* Right: Portrait Image */}
        <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-full bg-bone filter sepia-[0.1] contrast-[1.05]">
          <Image 
            src={weaver.portrait_url || 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=800&h=1067'} 
            alt={`Portrait of ${weaver.name}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Weaver's Portfolio Gallery */}
      <div className="container mx-auto px-6 lg:px-12 pt-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-display text-3xl text-night">Woven by {weaver.name}</h2>
          <span className="text-label uppercase tracking-widest text-smoke border border-smoke/30 px-4 py-2 rounded-brand">
            {products?.length || 0} Pieces
          </span>
        </div>
        
        <ProductGrid products={(products as any) || []} />
      </div>

    </div>
  )
}
