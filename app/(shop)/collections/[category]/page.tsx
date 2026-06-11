import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { CollectionHeader } from '@/components/product/CollectionHeader'
import { ProductFilters } from '@/components/product/ProductFilters'
import { PaginatedGrid } from '@/components/product/PaginatedGrid'
import { Metadata } from 'next'

export async function generateMetadata(props: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const params = await props.params;
  const supabase = await createClient()
  // Look up by slug (URL uses hyphens, DB may use underscores)
  const slugVariants = [params.category, params.category.replace(/-/g, '_')]
  const { data } = await supabase
    .from('categories')
    .select('name, description')
    .or(slugVariants.map(s => `slug.eq.${s}`).join(','))
    .limit(1)
    .single()

  if (!data) return {}
  return {
    title: `${data.name} Rugs — Azarbi`,
    description: data.description || `Explore our ${data.name} collection of authentic Moroccan Berber rugs.`,
  }
}

export default async function CategoryPage(props: {
  params: Promise<{ category: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const supabase = await createClient()

  // Resolve URL slug to DB slug (beni-ourain → beni_ourain)
  const urlSlug = params.category
  const dbSlug = urlSlug.replace(/-/g, '_')

  // Validate category exists
  const { data: category } = await supabase
    .from('categories')
    .select('slug, name, description')
    .or(`slug.eq.${urlSlug},slug.eq.${dbSlug}`)
    .limit(1)
    .single()

  if (!category) {
    notFound()
  }

  // Fetch all categories for filter tabs
  const { data: allCategories } = await supabase
    .from('categories')
    .select('slug, name')
    .order('name')

  const categoryTabs = (allCategories || []).map(c => ({
    id: c.slug,
    slug: c.slug.replace(/_/g, '-'),
    label: c.name,
  }))

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
    .eq('category', category.slug)
    .order(sortCol, { ascending: orderAsc })
    .range(0, 23)

  return (
    <div className="bg-linen min-h-screen pb-32">
      <CollectionHeader 
        title={category.name}
        category={category.slug}
        description={category.description}
      />
      
      <div className="container mx-auto px-6 lg:px-12">
        <ProductFilters categories={categoryTabs} />
        
        <PaginatedGrid 
          initialProducts={(products as any) || []} 
          totalCount={count || 0}
          category={category.slug}
        />
      </div>
    </div>
  )
}
