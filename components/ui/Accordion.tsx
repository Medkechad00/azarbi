'use client'

import * as React from 'react'
import { CaretDown } from 'phosphor-react'
import { cn } from '@/lib/utils'

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  isOpen?: boolean
  onClick?: () => void
}

export function AccordionItem({ title, children, isOpen = false, onClick }: AccordionItemProps) {
  return (
    <div className="border-b border-bone2 last:border-0">
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 text-left font-sans text-label uppercase tracking-widest text-night transition-colors hover:text-clay"
        onClick={onClick}
      >
        {title}
        <CaretDown
          size={16}
          weight="light"
          className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
        )}
      >
        <div className="text-[15px] leading-relaxed text-smoke text-primary">
          {children}
        </div>
      </div>
    </div>
  )
}

export function Accordion({ items }: { items: Omit<AccordionItemProps, 'isOpen' | 'onClick'>[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          {item.children}
        </AccordionItem>
      ))}
    </div>
  )
}
