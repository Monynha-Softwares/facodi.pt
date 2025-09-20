import * as React from 'react'

import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'flex h-12 w-full rounded-lg border border-border bg-card/80 px-4 text-base text-foreground shadow-inner transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
