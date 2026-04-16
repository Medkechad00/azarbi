import { createClient } from '@/lib/supabase/server'
import { CollectionHeader } from '@/components/product/CollectionHeader'
import { ProductFilters } from '@/components/product/ProductFilters'
import { PaginatedGrid } from '@/components/product/PaginatedGrid'
import { Metadata } from 'next'
import { CollectionSchema } from '@/components/seo/CollectionSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'All Collections — Azarbi Rugs',
  description: 'Explore our complete collection of authentic Moroccan Berber rugs. Beni Ourain, Azilal, Kilim, and Boucherouite — each rug unique, fair trade.',
  openGraph: {
    title: 'All Collections — Azarbi Rugs',
    description: 'Explore our complete collection of authentic Moroccan Berber rugs. Beni Ourain, Azilal, Kilim, and Boucherouite — each rug unique, fair trade.',
    url: 'https://azarbi.com/collections',
    type: 'website',
    images: [{
      url: '/og-collections.jpg',
      width: 1200,
      height: 630,
      alt: 'Azarbi — Handwoven Berber Rugs Collections'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Collections — Azarbi Rugs',
    description: 'Explore our complete collection of authentic Moroccan Berber rugs.',
    images: ['/og-collections.jpg']
  },
  alternates: {
    canonical: 'https://azarbi.com/collections'
  }
}

export default async function CollectionsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const supabase = await createClient()
  
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'created_at'
  const filterCat = typeof searchParams.category === 'string' ? searchParams.category : 'all'
  // Note: API uses order=desc for newest. We can map `sort` param accordingly.
  const orderAsc = sort === 'price_asc'
  const sortCol = sort === 'price_asc' || sort === 'price_desc' ? 'price_usd' : 'created_at'
  
  let query = supabase
    .from('products')
    .select(`
      id, sku, slug, title, category, price_usd, width_cm, length_cm, region, status,
      is_one_of_one, is_new_arrival, primary_image_url,
      weavers(name, slug)
    `, { count: 'exact' })
    .order(sortCol, { ascending: orderAsc })
    .range(0, 23)

  if (filterCat !== 'all') {
    query = query.eq('category', filterCat)
  }

  const { data: products, count } = await query

  const categoryLabels: Record<string, string> = {
    all: 'The Complete Edition',
    beni_ourain: 'Beni Ourain',
    azilal: 'Azilal',
    kilim: 'Kilim',
    boucherouite: 'Boucherouite',
  }
  
  const headerTitle = categoryLabels[filterCat] || filterCat.replace('_', ' ')

  return (
    <div className="bg-linen min-h-screen pb-32">
      <CollectionSchema
        name={`${headerTitle} — Azarbi Rugs`}
        description={`Explore our ${headerTitle.toLowerCase()} collection of authentic Moroccan Berber rugs.`}
        url={filterCat === 'all' ? 'https://azarbi.com/collections' : `https://azarbi.com/collections/${filterCat}`}
        products={(products as any) || []}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://azarbi.com' },
        { name: 'Collections', url: 'https://azarbi.com/collections' },
        ...(filterCat !== 'all' ? [{ name: headerTitle, url: `https://azarbi.com/collections/${filterCat}` }] : []),
      ]} />
      <CollectionHeader 
        title={headerTitle}
        category={filterCat === 'all' ? undefined : filterCat}
      />
      
      <div className="container mx-auto px-6 lg:px-12">
        <ProductFilters />
        
        <PaginatedGrid 
          initialProducts={(products as any) || []} 
          totalCount={count || 0}
          category={filterCat}
        />
      </div>
    </div>
  )
}
