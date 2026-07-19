import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-brand-teal text-white hover:bg-brand-teal-dark shadow-xs",
  accent: "bg-brand-saffron text-white hover:bg-brand-saffron-dark shadow-xs",
  outline: "border-2 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white",
  ghost: "text-brand-ink hover:bg-brand-teal/10",
  link: "text-brand-teal underline-offset-4 hover:underline",
};

const sizes = {
  sm: "h-9 px-3 text-sm rounded-md",
  md: "h-11 px-5 text-base rounded-lg",
  lg: "h-13 px-8 text-lg rounded-lg",
  xl: "h-14 px-10 text-lg rounded-xl",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", asChild, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-saffron disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        )}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";
export { Button, type ButtonProps };
