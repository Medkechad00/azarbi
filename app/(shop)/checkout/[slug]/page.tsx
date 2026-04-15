import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { Metadata } from 'next'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const supabase = await createClient()
  const { data: product } = await supabase.from('products').select('title').eq('slug', params.slug).single()
  if (!product) return {}
  return { title: `Checkout — ${product.title} — Azarbi` }
}

export default async function CheckoutPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const supabase = await createClient()
  
  const { data: product } = await supabase
    .from('products')
    .select(`
      id, sku, slug, title, category, price_usd, width_cm, length_cm,
      material_pile, region, primary_image_url, purchase_url, status,
      weavers(name, slug)
    `)
    .eq('slug', params.slug)
    .single()

  if (!product) notFound()

  const weaver = product.weavers as any

  return (
    <div className="min-h-screen bg-linen pt-24 pb-32">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-smoke mb-12">
          <Link href="/collections" className="hover:text-clay transition-colors">Collections</Link>
          <span>→</span>
          <Link href={`/products/${product.slug}`} className="hover:text-clay transition-colors">{product.title}</Link>
          <span>→</span>
          <span className="text-night">Checkout</span>
        </nav>

        <h1 className="font-display text-4xl md:text-5xl text-night mb-12">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left: Product Summary */}
          <div className="w-full lg:w-1/2">
            <div className="bg-bone/30 rounded-brand border border-bone2 overflow-hidden">
              {/* Product Image */}
              <div className="relative aspect-square bg-bone">
                <Image
                  src={product.primary_image_url}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              
              {/* Product Info */}
              <div className="p-6 lg:p-8">
                <span className="text-label-sm text-smoke uppercase tracking-widest block mb-2">
                  {product.category.replace('_', ' ')} · One of a Kind
                </span>
                <h2 className="font-display text-2xl text-night mb-2">{product.title}</h2>
                {weaver?.name && (
                  <p className="text-sm text-smoke italic mb-4">
                    Handwoven by {weaver.name}
                  </p>
                )}
                
                <div className="grid grid-cols-2 gap-3 font-mono text-[13px] text-night pt-4 border-t border-bone2">
                  <div>
                    <span className="text-smoke font-sans text-[11px] uppercase tracking-widest block mb-1">Dimensions</span>
                    {product.width_cm} × {product.length_cm} cm
                  </div>
                  <div>
                    <span className="text-smoke font-sans text-[11px] uppercase tracking-widest block mb-1">Material</span>
                    {product.material_pile}
                  </div>
                  <div>
                    <span className="text-smoke font-sans text-[11px] uppercase tracking-widest block mb-1">Region</span>
                    {product.region}
                  </div>
                  <div>
                    <span className="text-smoke font-sans text-[11px] uppercase tracking-widest block mb-1">Ref</span>
                    {product.sku}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary + CTA */}
          <div className="w-full lg:w-1/2">
            <div className="bg-bone/30 rounded-brand border border-bone2 p-8 lg:p-10 sticky top-32">
              <h2 className="text-label uppercase tracking-widest text-night mb-8">Order Summary</h2>
              
              <div className="flex flex-col gap-4 pb-6 mb-6 border-b border-bone2">
                <div className="flex justify-between text-night">
                  <span>{product.title}</span>
                  <span className="font-mono">{formatPrice(product.price_usd)}</span>
                </div>
                <div className="flex justify-between text-night">
                  <span>International Shipping</span>
                  <span className="text-clay font-sans">Complimentary</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-10">
                <span className="text-lg text-night">Total</span>
                <span className="font-mono text-3xl text-night">{formatPrice(product.price_usd)}</span>
              </div>

              {/* External Purchase Button */}
              {product.purchase_url ? (
                <a
                  href={product.purchase_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full h-14 flex items-center justify-center gap-3 text-center group"
                >
                  Complete Purchase
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              ) : (
                <button
                  disabled
                  className="btn-primary w-full h-14 opacity-60 cursor-not-allowed"
                >
                  Purchase Link Coming Soon
                </button>
              )}

              <div className="mt-8 flex flex-col gap-3 text-center">
                <p className="text-[11px] text-smoke">
                  You will be redirected to our secure partner marketplace to complete your purchase.
                </p>
                <div className="flex items-center justify-center gap-6 text-[11px] text-smoke pt-4 border-t border-bone2">
                  <span>✓ Authentic guarantee</span>
                  <span>✓ Free worldwide shipping</span>
                </div>
                <div className="flex items-center justify-center gap-6 text-[11px] text-smoke">
                  <span>✓ 14-day returns</span>
                  <span>✓ Certificate of origin</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
