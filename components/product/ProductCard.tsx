'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'phosphor-react'
import { cn } from '@/lib/utils'
import { useWishlist } from '@/store/wishlist'

export interface ProductCardProps {
  product: {
    id: string
    slug: string
    title: string
    sku: string
    category: string
    price_usd: number
    width_cm: number
    length_cm: number
    region: string
    status: string
    is_one_of_one: boolean
    is_new_arrival: boolean
    primary_image_url: string
    weavers?: { name: string; slug: string } | null
  }
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { hasItem, addItem, removeItem } = useWishlist()
  
  // Prevent hydration mismatches with persistent stores
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isWishlisted = mounted ? hasItem(product.id) : false

  const categoryLabel: Record<string, string> = {
    beni_ourain: 'Beni Ourain',
    azilal: 'Azilal',
    kilim: 'Kilim',
    boucherouite: 'Boucherouite',
    bespoke: 'Bespoke',
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-rug overflow-hidden bg-bone">
        <Image
          src={product.primary_image_url}
          alt={`${product.title} — ${categoryLabel[product.category]} rug woven by ${product.weavers?.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "object-cover transition-transform duration-700",
            isHovered && "scale-105"
          )}
          priority={priority}
        />

        {/* Only 1 Left badge */}
        {product.is_one_of_one && product.status === 'available' && (
          <span className="absolute top-3 left-3 tag-cta text-[8px]">
            Only 1 Left
          </span>
        )}

        {/* New arrival */}
        {product.is_new_arrival && (
          <span className="absolute top-3 right-3 tag text-[8px]">
            New
          </span>
        )}

        {/* Hover overlay */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 bg-night/88 py-3 px-4",
          "transition-transform duration-200",
          isHovered ? "translate-y-0" : "translate-y-full"
        )}>
          <span className="text-label-sm text-bone/80 uppercase tracking-widest">
            Quick View · See in Room
          </span>
        </div>

        {/* Wishlist button */}
        <button
          className="absolute top-3 right-3 p-1.5 rounded-full transition-colors z-10"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            if (isWishlisted) {
              removeItem(product.id)
            } else {
              addItem({ productId: product.id, slug: product.slug })
            }
          }}
          aria-label="Add to wishlist"
        >
          <Heart
            weight={isWishlisted ? "fill" : "light"}
            size={18}
            className={isWishlisted ? "text-clay" : "text-smoke"}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Category + region */}
        <p className="text-label-sm text-smoke uppercase tracking-widest mb-1.5">
          {categoryLabel[product.category]} · {product.region}
        </p>

        {/* Title */}
        <h3 className="font-display text-[17px] text-night leading-tight mb-1">
          {product.title}
        </h3>

        {/* Weaver credit */}
        {product.weavers && (
          <p className="text-[11px] text-smoke italic mb-4">
            Woven by {product.weavers.name}
          </p>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[17px] text-night">
            ${product.price_usd.toLocaleString()}
          </span>
          <span className={cn(
            "text-label-sm uppercase tracking-wider transition-all duration-200",
            isHovered
              ? "bg-argane text-bone px-3 py-1.5 rounded-brand"
              : "text-argane border-b border-argane/60"
          )}>
            View Rug
          </span>
        </div>
      </div>
    </Link>
  )
}
