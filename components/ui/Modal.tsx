'use client'

import * as React from 'react'
import { X } from 'phosphor-react'
import { cn } from '@/lib/utils'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  title?: string
}

export function Modal({ isOpen, onClose, children, className, title }: ModalProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-night/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal core */}
      <div 
        className={cn(
          "relative w-full max-w-lg bg-linen border border-bone2 rounded-brand shadow-2xl overflow-hidden",
          className
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-bone2">
          <h2 className="font-sans text-label tracking-widest uppercase text-night">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-smoke hover:text-clay transition-colors"
          >
            <X size={18} weight="light" />
          </button>
        </div>
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
