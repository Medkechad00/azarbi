import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { CollectionHeader } from '@/components/product/CollectionHeader'
import { ProductFilters } from '@/components/product/ProductFilters'
import { PaginatedGrid } from '@/components/product/PaginatedGrid'
import { Metadata } from 'next'

const CATEGORY_NAMES: Record<string, string> = {
  'beni-ourain': 'beni_ourain',
  'azilal': 'azilal',
  'kilim': 'kilim',
  'boucherouite': 'boucherouite',
}

const CATEGORY_TITLES: Record<string, string> = {
  'beni-ourain': 'Beni Ourain',
  'azilal': 'Azilal',
  'kilim': 'Kilim',
  'boucherouite': 'Boucherouite',
}

const CATEGORY_DESCS: Record<string, string> = {
  'beni-ourain': 'Characterised by high-pile un-dyed Mermousa wool and geometric brown or black lines. These thick, heavy rugs come from the Middle Atlas mountains.',
  'azilal': 'Woven from raw sheep\'s wool featuring vibrant, abstract symbols created from natural plant and mineral dyes. Each piece documents a personal family history.',
  'kilim': 'Flat-weaves created without pile. Renowned for their tight geometric patterns and durability. Woven by nomadic tribes seeking lighter, transportable craft.',
  'boucherouite': 'Vibrant, expressionist works made entirely from recycled textiles. Born from necessity, they are now celebrated for their unpredictable colour combinations.',
}

export async function generateMetadata(props: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const params = await props.params;
  const title = CATEGORY_TITLES[params.category]
  if (!title) return {}
  return {
    title: `${title} Rugs — Azarbi`,
    description: CATEGORY_DESCS[params.category],
  }
}

export default async function CategoryPage(props: {
  params: Promise<{ category: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const dbCategory = CATEGORY_NAMES[params.category]
  
  if (!dbCategory) {
    notFound()
  }

  const supabase = await createClient()
  
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'created_at'
  const orderAsc = sort === 'price_asc'
  const sortCol = sort === 'price_asc' || sort === 'price_desc' ? 'price_usd' : 'created_at'
  
  const { data: products, count } = await supabase
    .from('products')
    .select(`
      id, sku, slug, title, category, price_usd, width_cm, length_cm, region, status,
      is_one_of_one, is_new_arrival, primary_image_url,
      weavers(name, slug)
    `, { count: 'exact' })
    .eq('category', dbCategory)
    .order(sortCol, { ascending: orderAsc })
    .range(0, 23)

  return (
    <div className="bg-linen min-h-screen pb-32">
      <CollectionHeader 
        title={CATEGORY_TITLES[params.category]}
        category={dbCategory}
        description={CATEGORY_DESCS[params.category]}
      />
      
      <div className="container mx-auto px-6 lg:px-12">
        <ProductFilters />
        
        <PaginatedGrid 
          initialProducts={(products as any) || []} 
          totalCount={count || 0}
          category={dbCategory}
        />
      </div>
    </div>
  )
}
