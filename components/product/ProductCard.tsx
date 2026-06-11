'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { useCart } from '@/store/cart'
import { useUI } from '@/store/ui'

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
    purchase_url?: string
    weavers?: { name: string; slug: string } | null
  }
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [flyAnim, setFlyAnim] = useState(false)
  const [showCheck, setShowCheck] = useState(false)
  const { items, addItem, removeItem } = useCart()
  const { openCart } = useUI()
  const btnRef = useRef<HTMLButtonElement>(null)
  
  // Prevent hydration mismatches with persistent stores
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isInCart = mounted ? items.some(i => i.productId === product.id) : false

  const categoryLabel: Record<string, string> = {
    beni_ourain: 'Beni Ourain',
    azilal: 'Azilal',
    kilim: 'Kilim',
    boucherouite: 'Boucherouite',
    bespoke: 'Bespoke',
  }

  const handleCartToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInCart) {
      removeItem(product.id)
    } else {
      // Trigger fly animation
      setFlyAnim(true)
      setTimeout(() => {
        addItem({
          productId: product.id,
          sku: product.sku,
          slug: product.slug,
          title: product.title,
          price_usd: product.price_usd,
          image_url: product.primary_image_url,
          weaverName: product.weavers?.name,
          purchase_url: product.purchase_url,
        })
        setFlyAnim(false)
        setShowCheck(true)
        setTimeout(() => setShowCheck(false), 1200)
      }, 400)
    }
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
          alt={`${product.title} — ${categoryLabel[product.category] || product.category} rug woven by ${product.weavers?.name}`}
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

        {/* Fly animation ghost element */}
        {flyAnim && (
          <div className="absolute top-3 right-3 z-20 pointer-events-none animate-fly-to-cart">
            <div className="w-8 h-8 rounded-full bg-clay flex items-center justify-center shadow-lg">
              <Heart weight="fill" size={16} className="text-white" />
            </div>
          </div>
        )}

        {/* Added to cart confirmation */}
        {showCheck && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-night/60 animate-fade-in pointer-events-none">
            <div className="bg-white rounded-full p-3 shadow-2xl animate-bounce-in">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-clay">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        )}

        {/* Add to Cart button (heart icon) */}
        <button
          ref={btnRef}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10",
            isInCart 
              ? "bg-clay shadow-md scale-110" 
              : "bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white hover:shadow-md hover:scale-110",
            flyAnim && "opacity-0"
          )}
          onClick={handleCartToggle}
          aria-label={isInCart ? "Remove from cart" : "Add to cart"}
        >
          <Heart
            weight={isInCart ? "fill" : "regular"}
            size={16}
            className={cn(
              "transition-colors duration-200",
              isInCart ? "text-white" : "text-night"
            )}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Category + region */}
        <p className="text-label-sm text-smoke uppercase tracking-widest mb-1.5">
          {categoryLabel[product.category] || product.category} · {product.region}
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
