import * as React from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-brand-teal/10 text-brand-teal border-brand-teal/20",
  accent: "bg-brand-saffron/15 text-brand-saffron-dark border-brand-saffron/20",
  coral: "bg-brand-coral/10 text-brand-coral border-brand-coral/20",
  outline: "border border-brand-ink/20 text-brand-ink/70",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge, type BadgeProps };
