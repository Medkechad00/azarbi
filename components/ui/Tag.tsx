import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'cta' | 'fair-trade'
}

export function Tag({ className, variant = 'default', children, ...props }: TagProps) {
  return (
    <span
      className={cn(
        {
          'tag': variant === 'default',
          'tag-cta': variant === 'cta',
          'tag-fair-trade': variant === 'fair-trade',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
