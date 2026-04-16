import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createStaticClient } from '@/lib/supabase/static'
import { formatPrice } from '@/lib/utils'
import { Accordion } from '@/components/ui/Accordion'
import { ProductSchema } from '@/components/seo/ProductSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { Metadata } from 'next'

// Client components for interactive blocks
import { BuyNowButton } from './BuyNowButton'
import { WishlistButton } from './WishlistButton'
import { WhatsAppCTA } from './WhatsAppCTA'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const supabase = await createClient()
  const { data: product } = await supabase
    .from('products')
    .select('slug, title, category, width_cm, length_cm, material_pile, price_usd, primary_image_url, region, weavers(name)')
    .eq('slug', params.slug)
    .single()

  if (!product) return {}

  return {
    title: `${product.title} — ${product.category.replace('_', ' ')} Rug from ${product.region}`,
    description: `Authentic ${product.category.replace('_', ' ')} rug (${product.width_cm}×${product.length_cm}cm). ${product.material_pile}. Woven by ${(product.weavers as any)?.name || 'a master artisan'} in ${product.region}, Morocco. One of a kind. Fair trade. $${product.price_usd.toLocaleString()}.`,
    openGraph: {
      images: [{ url: product.primary_image_url, width: 1200, height: 900 }],
      type: 'website', // Use standard website or article due to Next bugs, or 'og:product'
    },
    alternates: {
      canonical: `https://azarbi.com/products/${product.slug}`
    }
  }
}

export const revalidate = 60

export async function generateStaticParams() {
  const supabase = createStaticClient()
  const { data: products } = await supabase.from('products').select('slug')
  return products?.map((p) => ({ slug: p.slug })) || []
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const supabase = await createClient()
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      weavers(id, name, slug, bio, portrait_url),
      cooperatives(id, name, region, village)
    `)
    .eq('slug', params.slug)
    .single()

  if (error || !product) {
    notFound()
  }

  const images = [product.primary_image_url, ...(product.gallery_image_urls || [])]

  return (
    <article className="min-h-screen bg-linen pt-24 pb-32">
      <ProductSchema product={product} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://azarbi.com' },
        { name: 'Collections', url: 'https://azarbi.com/collections' },
        { name: product.category.replace('_', ' '), url: `https://azarbi.com/collections/${product.category}` },
        { name: product.title, url: `https://azarbi.com/products/${product.slug}` }
      ]} />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left: Image Gallery (55%) */}
          <div className="w-full lg:w-[55%] flex flex-col gap-4">
            <div className="relative aspect-rug w-full overflow-hidden rounded-brand bg-bone border border-bone2 group">
              <Image 
                src={product.primary_image_url} 
                alt={`Authentic ${product.category} rug, woven by ${product.weavers?.name} in ${product.region}, Morocco`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {product.is_one_of_one && product.status === 'available' && (
                <span className="absolute top-4 left-4 tag-cta text-[10px]">
                  Only 1 Left
                </span>
              )}
            </div>
            {/* Desktop thumbnails */}
            {images.length > 1 && (
              <div className="hidden lg:grid grid-cols-4 gap-4">
                {images.slice(1).map((img, i) => (
                  <div key={i} className="relative aspect-rug bg-bone rounded-brand overflow-hidden cursor-pointer border border-transparent hover:border-clay/60 transition-colors">
                    <Image src={img} alt={`${product.title} detail`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
            
            {/* Mobile swipe strip omitted for brevity, native scroll used */}
            {images.length > 1 && (
              <div className="flex lg:hidden gap-4 overflow-x-auto snap-x hide-scrollbar">
                {images.slice(1).map((img, i) => (
                  <div key={i} className="relative aspect-rug w-3/4 flex-shrink-0 snap-start bg-bone rounded-brand overflow-hidden">
                    <Image src={img} alt={`${product.title} detail`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Right: Info (45%) */}
          <div className="w-full lg:w-[45%] flex flex-col">
            <div className="sticky top-32">
              
              <p className="text-label text-smoke uppercase tracking-widest mb-4">
                {product.category.replace('_', ' ')} · {product.region}
              </p>
              
              <h1 className="font-display text-4xl lg:text-5xl text-night mb-4">{product.title}</h1>
              
              {product.weavers && (
                <Link href={`/weavers/${product.weavers.slug}`} className="inline-flex items-center gap-2 text-smoke hover:text-clay transition-colors mb-8 group">
                  <span className="text-[13px] italic">Woven by {product.weavers.name}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              )}
              
              <div className="h-px w-full bg-bone2 mb-8" />
              
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-3xl text-night">{formatPrice(product.price_usd)}</span>
              </div>
              
              <div className="flex flex-col gap-4 mb-8">
                <BuyNowButton 
                  slug={product.slug} 
                  status={product.status} 
                />
                <WishlistButton productId={product.id} slug={product.slug} />
              </div>
              
              <div className="h-px w-full bg-bone2 mb-8" />
              
              {/* Specs */}
              <div className="grid grid-cols-3 gap-y-4 mb-10 font-mono text-[13px] text-night">
                <div className="col-span-1 text-smoke font-sans text-label uppercase tracking-widest">Dimensions</div>
                <div className="col-span-2">{product.width_cm} × {product.length_cm} cm</div>
                
                <div className="col-span-1 text-smoke font-sans text-label uppercase tracking-widest">Pile Depth</div>
                <div className="col-span-2">{product.pile_depth_cm} cm</div>
                
                <div className="col-span-1 text-smoke font-sans text-label uppercase tracking-widest">Material</div>
                <div className="col-span-2">{product.material_pile}</div>
                
                <div className="col-span-1 text-smoke font-sans text-label uppercase tracking-widest">Region</div>
                <div className="col-span-2">{product.region}</div>
                
                <div className="col-span-1 text-smoke font-sans text-label uppercase tracking-widest">Ref</div>
                <div className="col-span-2">{product.sku}</div>
              </div>
              
              <div className="h-px w-full bg-bone2 mb-8" />
              
              {/* Accordions */}
              <Accordion 
                items={[
                  { title: "About this rug", children: <p>{product.description}</p> },
                  { title: "About the weaver", children: (
                    <div className="flex flex-col gap-4">
                      <p>{product.weavers?.bio}</p>
                      <Link href={`/weavers/${product.weavers?.slug}`} className="text-clay underline text-sm">Read full story</Link>
                    </div>
                  )},
                  { title: "Care instructions", children: <p>{product.care_notes || "Vacuum without a beater bar. Spot clean with mild soap and water. Professional cleaning recommended every 3-5 years."}</p> },
                  { title: "Shipping & Returns", children: <p>Free worldwide shipping via DHL Express. Delivery in 5-14 business days. Returns accepted within 14 days of delivery.</p> },
                ]} 
              />
              
            </div>
          </div>
        </div>
      </div>
      
      {/* WhatsApp Sticky Mobile CTA */}
      <WhatsAppCTA title={product.title} sku={product.sku} />
    </article>
  )
}
