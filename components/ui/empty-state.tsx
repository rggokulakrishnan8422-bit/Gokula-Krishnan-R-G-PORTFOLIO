import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

/** Empty state (Master Prompt Section 9 — Feedback). */
export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("glass-card flex flex-col items-center gap-3 p-10 text-center", className)}
    >
      <span className="rounded-md bg-primary/10 p-3 text-primary">
        <Inbox className="size-6" aria-hidden />
      </span>
      <p className="font-semibold">{title}</p>
      {description && <p className="max-w-sm text-caption text-muted">{description}</p>}
      {action}
    </div>
  );
}
