'use client'

import { useCart } from '@/store/cart'
import Image from 'next/image'
import Link from 'next/link'
import { Trash, ArrowRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { items, removeItem, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-linen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display text-4xl text-night mb-4">Your Cart is Empty</h1>
        <p className="text-smoke mb-8">It seems you haven't added any pieces to your collection yet.</p>
        <Link href="/collections" className="btn-primary">Explore Our Collections</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linen pt-24 pb-32">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <h1 className="font-display text-4xl md:text-5xl text-night mb-4">Your Cart</h1>
        
        {/* Purchase process info */}
        <div className="mb-12 bg-white rounded-xl border border-bone2 px-6 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-clay/10 flex items-center justify-center flex-shrink-0">
            <span className="text-clay text-lg">✦</span>
          </div>
          <div>
            <p className="text-sm text-night font-medium">Each rug links to its own purchase page</p>
            <p className="text-xs text-smoke mt-0.5">Click on any product below to view details and complete your purchase securely.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 ml-auto flex-shrink-0 text-[10px] uppercase tracking-widest text-smoke">
            <span className="bg-bone px-2.5 py-1 rounded-full">Select</span>
            <span className="text-clay">→</span>
            <span className="bg-bone px-2.5 py-1 rounded-full">View</span>
            <span className="text-clay">→</span>
            <span className="bg-clay/10 text-clay px-2.5 py-1 rounded-full font-medium">Buy</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-6 pb-8 border-b border-bone2 relative group">
                <Link href={`/products/${item.slug}`} className="relative w-32 md:w-40 aspect-rug bg-bone rounded-brand overflow-hidden flex-shrink-0">
                  <Image src={item.image_url} alt={item.title} fill className="object-cover transition-transform group-hover:scale-105" />
                </Link>

                <div className="flex flex-col flex-1 py-2">
                  <span className="text-label-sm text-smoke uppercase tracking-widest mb-2">Unique Piece</span>
                  <h3 className="font-display text-2xl text-night mb-2">{item.title}</h3>
                  {item.weaverName && (
                    <p className="text-sm text-smoke mb-auto">By {item.weaverName}</p>
                  )}

                  <div className="flex items-center justify-between mt-6">
                    <span className="font-mono text-xl text-night">{formatPrice(item.price_usd)}</span>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-smoke hover:text-clay transition-colors flex items-center gap-2 text-sm"
                    >
                      <Trash size={16} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-bone/30 rounded-brand p-8 border border-bone2 sticky top-32">
              <h2 className="text-label uppercase tracking-widest text-night mb-6">Order Summary</h2>

              <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-bone2 text-night">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-mono">{formatPrice(total())}</span>
                </div>
                <div className="flex justify-between">
                  <span>International Shipping</span>
                  <span>Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span>Import Taxes & Duties</span>
                  <span className="text-smoke text-sm">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="font-sans text-lg text-night">Estimated Total</span>
                <span className="font-mono text-3xl text-night">{formatPrice(total())}</span>
              </div>

              <p className="text-xs text-smoke text-center mt-4 flex flex-col gap-1">
                <span>Secure purchase via our partner marketplace</span>
                <span>Returns accepted within 14 days</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
