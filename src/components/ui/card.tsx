'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps): JSX.Element {
  return (
    <div
      data-card
      className={cn(
        'relative rounded-3xl border border-border/40 bg-card/90 p-6 shadow-md shadow-primary-500/10 transition hover:shadow-lg hover:shadow-primary-500/20',
        className
      )}
      {...props}
    />
  );
}

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function CardHeader({ className, ...props }: CardHeaderProps): JSX.Element {
  return <div className={cn('mb-4 flex flex-col gap-1', className)} {...props} />;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function CardTitle({ className, children, ...props }: CardTitleProps): JSX.Element {
  return (
    <h3 className={cn('font-display text-xl font-semibold text-foreground', className)} {...props}>
      {children}
    </h3>
  );
}

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export function CardContent({ className, ...props }: CardContentProps): JSX.Element {
  return <div className={cn('text-sm text-foreground/80', className)} {...props} />;
}
