'use client'

import { WhatsappLogo } from 'phosphor-react'

export function WhatsAppCTA({ title, sku }: { title: string; sku: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-argane z-40 transform translate-y-0 lg:hidden flex items-center justify-center gap-2 shadow-2xl">
      <WhatsappLogo size={20} weight="fill" className="text-bone" />
      <a 
        href={`https://wa.me/?text=${encodeURIComponent(`Hi Azarbi! I'm interested in ${title} (Ref: ${sku}). Can I ask a few questions?`)}`}
        className="text-bone text-sm font-sans tracking-wide"
      >
        Chat about this rug
      </a>
    </div>
  )
}
