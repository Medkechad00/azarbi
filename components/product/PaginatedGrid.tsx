'use client'

import { useState } from 'react'
import { ProductGrid } from './ProductGrid'
import { ProductCardProps } from './ProductCard'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'

interface PaginatedGridProps {
  initialProducts: ProductCardProps['product'][]
  totalCount: number
  category?: string
}

export function PaginatedGrid({ initialProducts, totalCount, category = 'all' }: PaginatedGridProps) {
  const [products, setProducts] = useState(initialProducts)
  const [offset, setOffset] = useState(24) // Initial limit is 24
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()

  // Whenever the URL filters change (client-side nav), we should technically reset the state.
  // Because Next.js layout preserves client state, we need to track the current search string to reset.
  const [currentQuery, setCurrentQuery] = useState(searchParams.toString())
  
  if (searchParams.toString() !== currentQuery) {
    setProducts(initialProducts)
    setOffset(24)
    setCurrentQuery(searchParams.toString())
  }

  const hasMore = offset < totalCount

  const loadMore = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams(searchParams.toString())
      params.set('offset', offset.toString())
      params.set('limit', '24')
      if (category !== 'all') {
        params.set('category', category)
      }
      
      const res = await fetch(`/api/products?${params.toString()}`)
      const json = await res.json()
      
      if (json.data) {
        setProducts(prev => [...prev, ...json.data])
        setOffset(prev => prev + 24)
      }
    } catch (error) {
      console.error('Failed to load more products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-16">
      <ProductGrid products={products} />
      
      {hasMore && (
        <div className="flex justify-center mt-12 mb-24">
          <Button 
            variant="secondary" 
            onClick={loadMore} 
            disabled={isLoading}
            className="w-full md:w-auto px-12"
          >
            {isLoading ? 'Loading...' : 'Load More Rugs'}
          </Button>
        </div>
      )}
    </div>
  )
}
