import * as React from 'react';

import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'flex h-11 w-full rounded-2xl border border-border-light bg-surface-light px-4 py-2 text-base text-foreground-light placeholder:text-muted-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:border-border-dark dark:bg-surface-dark dark:text-foreground-dark dark:placeholder:text-muted-dark',
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';
