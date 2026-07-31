import { cn } from "@/lib/utils";

/**
 * Glass Card (Master Prompt Section 9).
 * Surface uses the tokenized glass alpha per theme. `hover` lifts the card
 * and brightens the border toward the primary token (400ms component timing).
 */
export function GlassCard({
  hover = false,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        "glass-card",
        hover &&
          "transition-all duration-component hover:-translate-y-1 hover:shadow-lg hover:border-primary/35",
        className,
      )}
      {...props}
    />
  );
}
