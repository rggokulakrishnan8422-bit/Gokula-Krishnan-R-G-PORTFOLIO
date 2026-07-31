import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/** Textarea (Master Prompt Section 9 — Forms). Mirrors Input states. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
  error?: string;
}

const fieldClasses =
  "min-h-[140px] w-full resize-y rounded-md border bg-[rgb(var(--color-glass)/var(--glass-alpha))] px-4 py-3 text-base transition-colors duration-micro placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-error aria-[invalid=true]:focus:ring-error/30";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, label, error, className, ...props }, ref) => (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldClasses, className)}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-caption text-error">
          {error}
        </p>
      )}
    </div>
  ),
);

Textarea.displayName = "Textarea";
