'use client'

import * as React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export interface CategoryTab {
  id: string
  slug: string
  label: string
}

interface ProductFiltersProps {
  categories?: CategoryTab[]
}

export function ProductFilters({ categories: categoriesProp }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  
  const currentSort = searchParams.get('sort') || 'created_at'

  // Prepend "All Rugs" tab to whatever categories come from the database
  const categories: CategoryTab[] = [
    { id: 'all', slug: '', label: 'All Rugs' },
    ...(categoriesProp || []),
  ]

  // Detect which category is active from the URL path
  const pathSegment = pathname.split('/').pop() || ''
  const normalizedSegment = pathSegment.replace(/-/g, '_')
  
  const activeCategory = pathname === '/collections'
    ? 'all'
    : categories.find(c => 
        c.slug === pathSegment || 
        c.slug.replace(/-/g, '_') === normalizedSegment ||
        c.id === normalizedSegment
      )?.id || 'all'

  const handleCategoryClick = (cat: CategoryTab) => {
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
    <div className="py-8 mb-8 border-b border-bone2 space-y-4">
      {/* Category tabs — wrapping flex on all screens */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
            className={cn(
              "whitespace-nowrap px-4 py-2 text-label uppercase tracking-widest rounded-brand transition-all duration-200",
              activeCategory === cat.id 
                ? "bg-clay text-linen shadow-sm" 
                : "bg-bone text-smoke hover:bg-bone2 hover:text-night"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sort — always visible below the tabs */}
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
