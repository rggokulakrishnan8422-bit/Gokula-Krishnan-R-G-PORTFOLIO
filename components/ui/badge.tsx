import { cn } from "@/lib/utils";

/** Badge / Pill (Master Prompt Section 9). */
type BadgeVariant = "default" | "primary" | "outline";

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "border-[rgb(var(--color-border)/var(--border-alpha))] bg-[rgb(var(--color-glass)/var(--glass-alpha))] backdrop-blur-md",
  primary: "border-primary/25 bg-primary/10 text-primary",
  outline: "border-[rgb(var(--color-border)/var(--border-alpha))] text-muted",
};

export function Badge({
  variant = "default",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-caption font-medium",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
