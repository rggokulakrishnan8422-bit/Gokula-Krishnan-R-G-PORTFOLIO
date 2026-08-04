import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./loading";

/**
 * Button — primary / secondary / ghost / outline
 */
type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-micro active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-white shadow-md hover:-translate-y-0.5 hover:shadow-lg",
  secondary:
    "border border-border/40 bg-glass/10 backdrop-blur-md hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary",
  ghost: "hover:bg-glass/10 hover:text-primary",
  outline:
    "border border-primary/40 bg-transparent text-primary hover:bg-primary/10 hover:border-primary",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
}: { variant?: Variant; size?: Size } = {}): string {
  return cn(base, variantClasses[variant], sizeClasses[size]);
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, loading = false, className, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Spinner className="size-4" />}
      {children}
    </button>
  ),
);

Button.displayName = "Button";
