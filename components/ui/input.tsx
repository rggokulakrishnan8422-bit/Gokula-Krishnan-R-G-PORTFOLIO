import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Input (Master Prompt Section 9 — Forms).
 * States: default · focus (primary ring) · error (aria-invalid + message)
 * · disabled. Requires an explicit id so labels and error text stay wired.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: string;
}

const fieldClasses =
  "h-12 w-full rounded-xl border border-border/50 bg-glass/[0.035] px-4 text-[15px] backdrop-blur-sm transition-all duration-small placeholder:text-muted/60 focus:border-gold-500/60 focus:outline-none focus:ring-4 focus:ring-gold-500/15 focus:shadow-[0_0_24px_-6px_rgb(var(--color-primary)/0.4)] disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-error aria-[invalid=true]:focus:ring-error/20";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, className, ...props }, ref) => (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}
      <input
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

Input.displayName = "Input";
