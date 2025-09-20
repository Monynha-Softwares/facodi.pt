'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        default:
          'bg-brand-600 text-surface-light shadow-soft hover:bg-brand-500 dark:bg-brand-500 dark:hover:bg-brand-400',
        secondary:
          'bg-surface-light text-brand-600 shadow-subtle hover:shadow-soft border border-border-light dark:bg-surface-dark dark:text-foreground-dark dark:border-border-dark',
        ghost:
          'bg-transparent text-foreground-light hover:bg-muted-light/70 dark:text-foreground-dark dark:hover:bg-muted-dark/60',
        outline:
          'border border-border-light bg-transparent text-foreground-light hover:bg-surface-light/70 dark:text-foreground-dark dark:border-border-dark dark:hover:bg-surface-dark/60',
      },
      size: {
        default: 'h-11 px-5 py-2.5 gap-2',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';
    return (
      <Component className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
