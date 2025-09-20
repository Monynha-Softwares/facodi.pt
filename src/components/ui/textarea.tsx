import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => <textarea ref={ref} className={cn('min-h-[140px] w-full rounded-2xl border border-input bg-background px-5 py-3 text-base shadow-soft/20 transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50', className)} {...props} />);

Textarea.displayName = 'Textarea';
