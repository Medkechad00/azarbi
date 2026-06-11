'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Trash, ShoppingCart, ArrowRight } from 'phosphor-react'
import { useUI } from '@/store/ui'
import { useCart } from '@/store/cart'
import { formatPrice, cn } from '@/lib/utils'

export function CartDrawer() {
  const { isCartOpen, closeCart } = useUI()
  const { items, removeItem, total, count, justAdded, clearJustAdded } = useCart()
  const [removingId, setRemovingId] = React.useState<string | null>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  // Auto-clear the "just added" indicator
  React.useEffect(() => {
    if (justAdded) {
      const t = setTimeout(clearJustAdded, 2000)
      return () => clearTimeout(t)
    }
  }, [justAdded, clearJustAdded])

  // Prevent scroll when open
  React.useEffect(() => {
    if (isCartOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isCartOpen])

  const handleRemove = (productId: string) => {
    setRemovingId(productId)
    setTimeout(() => {
      removeItem(productId)
      setRemovingId(null)
    }, 300)
  }

  const itemCount = mounted ? count() : 0
  const cartTotal = mounted ? total() : 0
  const cartItems = mounted ? items : []

  // Get the first product's purchase_url for the "Pay Now" link
  const firstPurchaseUrl = cartItems.find(i => i.purchase_url)?.purchase_url

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 z-50 bg-night/40 backdrop-blur-[6px] transition-opacity duration-400",
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div 
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-full max-w-[420px] bg-linen transform transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col shadow-2xl",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-bone2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-clay/10 flex items-center justify-center">
              <ShoppingCart size={16} weight="light" className="text-clay" />
            </div>
            <div>
              <h2 className="text-sm font-display text-night">Your Cart</h2>
              <p className="text-[11px] text-smoke">
                {itemCount === 0 ? 'Empty' : `${itemCount} ${itemCount === 1 ? 'piece' : 'pieces'}`}
              </p>
            </div>
          </div>
          <button 
            onClick={closeCart} 
            className="w-8 h-8 rounded-full bg-bone hover:bg-bone2 flex items-center justify-center transition-colors"
          >
            <X size={16} weight="bold" className="text-night" />
          </button>
        </div>
        
        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {itemCount === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center gap-6">
              <div className="w-20 h-20 rounded-full bg-bone flex items-center justify-center">
                <ShoppingCart size={32} weight="thin" className="text-smoke" />
              </div>
              <div>
                <p className="font-display text-lg text-night mb-1">Your cart is empty</p>
                <p className="text-sm text-smoke">Discover our collection of unique handwoven rugs</p>
              </div>
              <Link 
                href="/collections" 
                className="inline-flex items-center gap-2 bg-night text-linen px-6 py-3 rounded-brand text-sm font-sans uppercase tracking-widest hover:bg-clay transition-colors"
                onClick={closeCart}
              >
                Explore Collection
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {cartItems.map((item, idx) => (
                <div 
                  key={item.productId} 
                  className={cn(
                    "flex gap-4 p-3 bg-white rounded-xl border border-bone2 relative transition-all duration-300",
                    removingId === item.productId && "opacity-0 -translate-x-full scale-95",
                    justAdded === item.productId && "ring-2 ring-clay/30 animate-pulse-once",
                  )}
                  style={isCartOpen ? { 
                    animationName: 'slideInRight',
                    animationDuration: '0.4s',
                    animationTimingFunction: 'ease',
                    animationDelay: `${idx * 80}ms`,
                    animationFillMode: 'both',
                  } : undefined}
                >
                  {/* Product thumbnail */}
                  <Link 
                    href={`/products/${item.slug}`} 
                    onClick={closeCart}
                    className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-bone group"
                  >
                    <Image 
                      src={item.image_url} 
                      alt={item.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="80px"
                    />
                  </Link>
                  
                  {/* Info */}
                  <div className="flex flex-col flex-1 min-w-0 py-0.5">
                    <h3 className="font-display text-sm text-night leading-snug truncate">{item.title}</h3>
                    {item.weaverName && (
                      <p className="text-[10px] text-smoke mt-0.5">By {item.weaverName}</p>
                    )}
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-mono text-sm text-night font-medium">{formatPrice(item.price_usd)}</span>
                      <button 
                        onClick={() => handleRemove(item.productId)}
                        className="p-1.5 rounded-full text-smoke hover:text-red-500 hover:bg-red-50 transition-all"
                        aria-label="Remove item"
                      >
                        <Trash size={14} weight="regular" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {itemCount > 0 && (
          <div className="border-t border-bone2 bg-white/80 backdrop-blur-md p-5 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest text-smoke font-sans">Subtotal</span>
              <span className="font-mono text-xl text-night">{formatPrice(cartTotal)}</span>
            </div>

            {/* Decorative line */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-bone2" />
              <div className="w-1.5 h-1.5 rotate-45 bg-clay/40" />
              <div className="flex-1 h-px bg-bone2" />
            </div>

            {/* Checkout button */}
              <Link 
                href="/cart"
                className="flex items-center justify-center gap-2 w-full bg-clay hover:bg-clay/90 text-white py-3.5 rounded-brand text-sm font-sans uppercase tracking-widest transition-all hover:shadow-lg active:scale-[0.98]"
                onClick={closeCart}
              >
                Go to Checkout
                <ArrowRight size={14} weight="bold" />
              </Link>
          </div>
        )}
      </div>

    </>
  )
}
