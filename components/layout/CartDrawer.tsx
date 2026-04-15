'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Trash } from 'phosphor-react'
import { useUI } from '@/store/ui'
import { useCart } from '@/store/cart'
import { Button } from '@/components/ui/button'
import { formatPrice, cn } from '@/lib/utils'

export function CartDrawer() {
  const { isCartOpen, closeCart } = useUI()
  const { items, removeItem, total } = useCart()

  // Prevent scroll when open
  React.useEffect(() => {
    if (isCartOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isCartOpen])

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 z-50 bg-night/50 backdrop-blur-sm transition-opacity duration-300",
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
      />
      
      <div 
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-linen border-l border-bone2 transform transition-transform duration-300 ease-in-out flex flex-col",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-bone2">
          <h2 className="text-label uppercase tracking-widest text-night">Your Cart ({items.length})</h2>
          <button onClick={closeCart} className="text-smoke hover:text-clay">
            <X size={24} weight="light" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center gap-4">
              <p className="text-smoke text-sm">Your cart is currently empty.</p>
              <Link href="/collections" className="btn-secondary" onClick={closeCart}>Shop All Rugs</Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4 p-4 border border-bone2 rounded-brand bg-linen/50 relative">
                  <div className="relative w-24 aspect-rug flex-shrink-0 bg-bone rounded-brand overflow-hidden">
                    <Image 
                      src={item.image_url} 
                      alt={item.title} 
                      fill 
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  
                  <div className="flex flex-col flex-1 py-1">
                    <h3 className="font-display text-lg text-night leading-tight mb-1">{item.title}</h3>
                    {item.weaverName && (
                      <p className="text-[11px] text-smoke mb-auto">By {item.weaverName}</p>
                    )}
                    <span className="font-mono text-night">{formatPrice(item.price_usd)}</span>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.productId)}
                    className="absolute top-4 right-4 text-smoke hover:text-clay transition-colors"
                  >
                    <Trash size={18} weight="light" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-6 border-t border-bone2 bg-linen/90 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <span className="text-label uppercase tracking-widest text-smoke">Subtotal</span>
              <span className="font-mono text-xl text-night">{formatPrice(total())}</span>
            </div>
            
            <p className="text-[11px] text-smoke mb-6">
              Visit a product page and click &quot;Acquire This Piece&quot; to purchase on our partner marketplace.
            </p>
            
            <Link href="/collections" className="btn-primary w-full text-center block" onClick={closeCart}>Continue Shopping</Link>
          </div>
        )}
      </div>
    </>
  )
}
