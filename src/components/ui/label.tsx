import * as React from 'react';

import { cn } from '@/lib/utils';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  requiredIndicator?: boolean;
};

export const Label = ({ className, children, requiredIndicator, ...props }: LabelProps) => (
  <label className={cn('flex flex-col gap-1 text-sm font-medium text-foreground', className)} {...props}>
    <span className="flex items-center gap-1">
      {children}
      {requiredIndicator ? <span aria-hidden="true" className="text-primary">*</span> : null}
    </span>
  </label>
);
