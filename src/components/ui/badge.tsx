import * as React from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-gray-100 text-gray-700 border-gray-200",
  accent: "bg-brand-teal text-white border-brand-teal",
  gold: "bg-brand-gold text-white border-brand-gold",
  outline: "border border-gray-300 text-gray-600",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge, type BadgeProps };
