'use client'

import { ProductCardProps, ProductCard } from './ProductCard'

export function ProductGrid({ products }: { products: ProductCardProps['product'][] }) {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <h3 className="font-display text-2xl text-night mb-2">No rugs found</h3>
        <p className="text-smoke">Try adjusting your filters to find what you're looking for.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
      {products.map((product, idx) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          priority={idx < 4} // Preload first row of images
        />
      ))}
    </div>
  )
}
