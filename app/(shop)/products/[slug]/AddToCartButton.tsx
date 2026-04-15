'use client'

import { useCart } from '@/store/cart'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'phosphor-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function AddToCartButton({ product }: { product: any }) {
  const { addItem, items } = useCart()
  const router = useRouter()
  const [added, setAdded] = useState(false)

  const isAlreadyInCart = items.some(item => item.productId === product.id)
  
  // If it's a 1-of-1 and already sold, we shouldn't allow adding to cart
  const isSoldOut = product.status !== 'available'

  const handleAdd = () => {
    if (isAlreadyInCart) {
      router.push('/cart')
      return
    }

    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price_usd: product.price_usd,
      image_url: product.primary_image_url,
      sku: product.sku,
      weaverName: product.weavers?.name
    })

    setAdded(true)
    setTimeout(() => {
      router.push('/cart')
    }, 600)
  }

  if (isSoldOut) {
    return (
      <Button disabled className="w-full justify-center h-14 bg-smoke/20 text-smoke cursor-not-allowed">
        Sold Out
      </Button>
    )
  }

  return (
    <Button 
      onClick={handleAdd} 
      className={`w-full justify-center h-14 transition-all ${added ? 'bg-clay text-linen border-clay' : ''}`}
    >
      {isAlreadyInCart ? (
        <>View in Cart <ArrowRight size={18} className="ml-2" /></>
      ) : added ? (
        'Added to Cart'
      ) : (
        'Acquire Piece'
      )}
    </Button>
  )
}
