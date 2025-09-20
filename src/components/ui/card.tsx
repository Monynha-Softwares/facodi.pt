import * as React from 'react'

import { cn } from '@/lib/utils'

export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('rounded-xl border border-border bg-card/90 p-6 shadow-subtle transition hover:shadow-soft', className)}
    {...props}
  />
)

export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4 flex flex-col gap-2', className)} {...props} />
)

export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('font-display text-xl font-semibold text-foreground', className)} {...props} />
)

export const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-base text-muted-foreground', className)} {...props} />
)

export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('space-y-2 text-base text-foreground', className)} {...props} />
)
