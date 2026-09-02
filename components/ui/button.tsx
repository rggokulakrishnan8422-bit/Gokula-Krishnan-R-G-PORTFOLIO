import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./loading";

/**
 * Button — luxury gold variants.
 * primary  : champagne gradient pill, dark label, soft gold glow on hover
 * secondary: hairline gold outline on glass
 * ghost / outline: quiet text treatments
 */
type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-medium tracking-[0.01em] transition-all duration-small active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-gold-300 via-primary to-gold-600 text-[rgb(var(--color-background))] shadow-[0_10px_30px_-10px_rgb(var(--color-primary)/0.55),inset_0_1px_0_rgb(255_255_255/0.35)] hover:-translate-y-0.5 hover:shadow-[0_16px_38px_-10px_rgb(var(--color-primary)/0.6),inset_0_1px_0_rgb(255_255_255/0.4)]",
  secondary:
    "border border-gold-500/30 bg-glass/[0.03] text-text backdrop-blur-md hover:-translate-y-0.5 hover:border-gold-500/60 hover:text-gold-200",
  ghost: "text-muted hover:text-gold-200",
  outline:
    "border border-gold-500/40 bg-transparent text-gold-300 hover:bg-gold-500/10 hover:border-gold-400/70",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-5 text-[13px]",
  md: "h-11 px-6 text-sm",
  lg: "h-[52px] px-8 text-[15px]",
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
      {/* traveling light sweep on hover (primary) */}
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full"
        />
      )}
      {loading && <Spinner className="size-4" />}
      {children}
    </button>
  ),
);

Button.displayName = "Button";
