import { AlertTriangle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

/** Error state (Master Prompt Section 9 — Feedback). */
export function ErrorState({
  title = "Something went wrong",
  description,
  retryLabel = "Try again",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn("glass-card flex flex-col items-center gap-3 p-10 text-center", className)}
    >
      <span className="rounded-md bg-error/10 p-3 text-error">
        <AlertTriangle className="size-6" aria-hidden />
      </span>
      <p className="font-semibold">{title}</p>
      {description && <p className="max-w-sm text-caption text-muted">{description}</p>}
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          <RotateCcw className="size-4" aria-hidden />
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
