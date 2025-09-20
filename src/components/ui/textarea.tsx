'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        // eslint-disable-next-line tailwindcss/classnames-order
        className={cn(
          'w-full rounded-2xl border-border border bg-card/60 px-4 py-3 text-base text-foreground shadow-inner shadow-primary-500/5 transition',
          'placeholder:text-foreground/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:cursor-not-allowed disabled:opacity-60',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
