import * as React from 'react';

import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'min-h-[160px] w-full rounded-2xl border border-border-light bg-surface-light px-4 py-3 text-base text-foreground-light placeholder:text-muted-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:border-border-dark dark:bg-surface-dark dark:text-foreground-dark dark:placeholder:text-muted-dark',
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';
