'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        // eslint-disable-next-line tailwindcss/classnames-order
        className={cn(
          'flex h-11 w-full rounded-2xl border-border border bg-card/60 px-4 text-base text-foreground shadow-inner shadow-primary-500/5 transition',
          'placeholder:text-foreground/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:cursor-not-allowed disabled:opacity-60',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
