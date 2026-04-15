'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'phosphor-react'
import { Button } from '@/components/ui/button'
import { useWishlist } from '@/store/wishlist'

export function WishlistButton({ productId, slug }: { productId: string, slug: string }) {
  const { hasItem, addItem, removeItem } = useWishlist()
  
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isWishlisted = mounted ? hasItem(productId) : false

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeItem(productId)
    } else {
      addItem({ productId, slug })
    }
  }

  return (
    <Button 
      variant="ghost" 
      className="w-full justify-center"
      onClick={toggleWishlist}
    >
      <Heart 
        size={18} 
        className="mr-2" 
        weight={isWishlisted ? "fill" : "light"}
        color={isWishlisted ? "var(--color-clay)" : "currentColor"}
      /> 
      {isWishlisted ? "Saved to Wishlist" : "Save to Wishlist"}
    </Button>
  )
}
