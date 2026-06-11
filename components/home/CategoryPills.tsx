import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'

// Fallback placeholder when a category has no image_url yet
const FALLBACK_IMAGE = '/images/placeholder-category.svg'

export async function CategoryPills() {
  const supabase = await createClient()
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug, image_url')
    .order('name')
    .limit(4)

  if (!categories || categories.length === 0) return null

  return (
    <section className="py-24 bg-linen border-t border-bone2">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-display text-4xl text-night">Shop by Craft</h2>
          <Link href="/collections" className="text-label uppercase tracking-widest text-smoke hover:text-clay transition-colors hidden sm:block">
            View All Series
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/collections/${cat.slug}`}
              className="group flex flex-col gap-4"
            >
              <div className="relative aspect-[3/4] rounded-brand overflow-hidden bg-bone">
                {cat.image_url ? (
                  <Image 
                    src={cat.image_url} 
                    alt={`${cat.name} rugs`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-bone/80">
                    <span className="font-display text-2xl text-smoke/50">{cat.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-display text-xl lg:text-2xl text-night group-hover:text-clay transition-colors">{cat.name}</span>
                <span className="text-smoke group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
