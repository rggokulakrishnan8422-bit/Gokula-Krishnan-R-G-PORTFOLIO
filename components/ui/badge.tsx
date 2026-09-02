import { cn } from "@/lib/utils";

/** Badge / Tag — hairline gold-tinted pill. */
type BadgeVariant = "default" | "primary" | "outline";

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-gold-500/20 bg-gold-500/[0.06] text-gold-200/90",
  primary: "border-gold-500/30 bg-gold-500/10 text-gold-300",
  outline: "border-border/60 text-muted",
};

export function Badge({
  variant = "default",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-[0.02em]",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
