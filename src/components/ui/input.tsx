import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-brand-ink/80">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={cn(
            "flex h-11 w-full rounded-lg border-2 border-brand-teal/20 bg-white px-4 py-2 text-base ring-offset-white placeholder:text-brand-ink/40 focus-visible:outline-none focus-visible:border-brand-teal focus-visible:ring-2 focus-visible:ring-brand-teal/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-150",
            error && "border-brand-coral focus-visible:border-brand-coral focus-visible:ring-brand-coral/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-brand-coral">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
export { Input, type InputProps };
