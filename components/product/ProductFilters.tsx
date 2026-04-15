'use client'

import * as React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'all', slug: '', label: 'All Rugs' },
  { id: 'beni_ourain', slug: 'beni-ourain', label: 'Beni Ourain' },
  { id: 'azilal', slug: 'azilal', label: 'Azilal' },
  { id: 'kilim', slug: 'kilim', label: 'Kilim' },
  { id: 'boucherouite', slug: 'boucherouite', label: 'Boucherouite' },
]

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  
  const currentSort = searchParams.get('sort') || 'created_at'

  // Detect which category is active from the URL path
  const pathSegment = pathname.split('/').pop() || ''
  const activeFromPath = categories.find(c => c.slug === pathSegment)
  const activeCategory = activeFromPath?.id || (pathname === '/collections' ? 'all' : 'all')

  const handleCategoryClick = (cat: typeof categories[number]) => {
    const sortParam = currentSort !== 'created_at' ? `?sort=${currentSort}` : ''
    if (cat.id === 'all') {
      router.push(`/collections${sortParam}`)
    } else {
      router.push(`/collections/${cat.slug}${sortParam}`)
    }
  }

  const updateSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'created_at') {
      params.delete('sort')
    } else {
      params.set('sort', value)
    }
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false })
  }

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-8 mb-8 border-b border-bone2">
      <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
            className={cn(
              "whitespace-nowrap px-4 py-2 text-label uppercase tracking-widest rounded-brand transition-colors",
              activeCategory === cat.id 
                ? "bg-clay text-linen" 
                : "bg-bone text-smoke hover:bg-bone2"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-label-sm uppercase tracking-widest text-smoke">Sort by</span>
        <select 
          value={currentSort}
          onChange={(e) => updateSort(e.target.value)}
          className="bg-transparent text-night font-sans text-sm focus:outline-none border-b border-smoke/30 pb-1 cursor-pointer"
        >
          <option value="created_at">Newest Arrivals</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  )
}
