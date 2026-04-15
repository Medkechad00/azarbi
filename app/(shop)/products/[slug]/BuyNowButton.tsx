'use client'

import { ArrowRight } from 'phosphor-react'
import Link from 'next/link'

interface BuyNowButtonProps {
  slug: string
  status: string
}

export function BuyNowButton({ slug, status }: BuyNowButtonProps) {
  const isSoldOut = status !== 'available'

  if (isSoldOut) {
    return (
      <button 
        disabled 
        className="btn-primary w-full justify-center h-14 bg-smoke/20 text-smoke cursor-not-allowed opacity-60"
      >
        Sold Out
      </button>
    )
  }

  return (
    <Link 
      href={`/checkout/${slug}`}
      className="btn-primary w-full justify-center h-14 flex items-center gap-3 text-center group"
    >
      Acquire This Piece
      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
    </Link>
  )
}
