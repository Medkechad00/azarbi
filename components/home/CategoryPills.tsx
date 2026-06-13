import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { CategoryGrid } from './CategoryGrid'

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
          <Link
            href="/collections"
            className="text-label uppercase tracking-widest text-smoke hover:text-clay transition-colors hidden sm:block"
          >
            View All Series
          </Link>
        </div>
        <CategoryGrid categories={categories} />
      </div>
    </section>
  )
}
