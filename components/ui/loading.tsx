import { cn } from "@/lib/utils";

/** CSS-only spinner — no icon dependency, honors the reduced-motion CSS guard. */
export function Spinner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-current border-t-transparent",
        className,
      )}
    />
  );
}

/** Loading state (Master Prompt Section 9 — Feedback). */
export function LoadingState({
  label = "Loading…",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div role="status" className={cn("flex items-center justify-center gap-3 p-8 text-muted", className)}>
      <Spinner className="size-5" />
      <span className="text-caption">{label}</span>
    </div>
  );
}
