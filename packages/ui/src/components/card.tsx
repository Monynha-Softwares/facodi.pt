import * as React from "react";

import { cn } from "../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border border-primary/10 bg-card/80 p-6 shadow-md backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export const CardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn(
      "text-xl font-semibold text-foreground/90 tracking-tight",
      className
    )}
    {...props}
  />
);

export const CardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("mt-2 text-sm text-muted-foreground", className)} {...props} />
);

export const CardFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-6 flex items-center justify-between", className)} {...props} />
);
