import { createClient } from '@/lib/supabase/server'

interface CollectionHeaderProps {
  category?: string
  title: string
  description?: string
}

export async function CollectionHeader({ category, title, description }: CollectionHeaderProps) {
  const supabase = await createClient()
  
  let artisanCount = 0
  if (category && category !== 'all') {
    const { data } = await supabase
      .from('products')
      .select('weaver_id')
      .eq('category', category)
    
    if (data) {
      const uniqueWeavers = new Set(data.map(p => p.weaver_id).filter(Boolean))
      artisanCount = uniqueWeavers.size
    }
  } else {
    const { count } = await supabase
      .from('weavers')
      .select('*', { count: 'exact', head: true })
    artisanCount = count || 0
  }

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="text-label uppercase tracking-[0.1em] text-smoke mb-4">Collections</p>
          <h1 className="font-display text-display-xl text-night mb-4">
            {title}
          </h1>
          <p className="text-smoke text-lg leading-relaxed max-w-xl">
            {description || "Explore our collection of authentic, handwoven masterworks from the Atlas Mountains."}
          </p>
        </div>
        
        <div className="flex flex-col gap-1 items-start md:items-end p-5 border border-bone2 rounded-brand bg-bone/30">
          <span className="font-display text-3xl text-clay tracking-wider">{artisanCount}</span>
          <span className="text-label-sm text-night uppercase tracking-widest mt-1">Master Weavers</span>
        </div>
      </div>
    </div>
  )
}
