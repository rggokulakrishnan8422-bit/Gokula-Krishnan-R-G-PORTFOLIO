"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ToastItem, ToastType } from "@/types";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Toast (Master Prompt Section 9 — Feedback).
 * Announces via aria-live, caps at 3 visible, auto-dismisses after 4.2s.
 */
type ToastContextValue = {
  toast: (t: Omit<ToastItem, "id">) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

const icons: Record<ToastType, LucideIcon> = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const iconColor: Record<ToastType, string> = {
  success: "text-success",
  error: "text-error",
  info: "text-primary",
};

const barColor: Record<ToastType, string> = {
  success: "rgb(var(--color-success))",
  error: "rgb(var(--color-error))",
  info: "rgb(var(--color-primary))",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (t: Omit<ToastItem, "id">) => {
      const id = Math.random().toString(36).slice(2, 9);
      setToasts((prev) => [...prev.slice(-2), { ...t, id }]);
      window.setTimeout(() => dismiss(id), 4200);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed bottom-4 right-4 z-[90] flex w-[min(92vw,360px)] flex-col gap-2"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const Icon = icons[t.type];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: DURATION.component, ease: EASE_OUT }}
                className="glass-card pointer-events-auto flex items-start gap-3 border-l-2 p-4 shadow-lg"
                style={{ borderLeftColor: barColor[t.type] }}
              >
                <Icon className={cn("mt-0.5 size-5 shrink-0", iconColor[t.type])} aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{t.title}</p>
                  {t.description && (
                    <p className="mt-0.5 text-caption text-muted">{t.description}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(t.id)}
                  aria-label="Dismiss notification"
                  className="rounded-sm p-1 text-muted transition-colors duration-micro hover:opacity-70"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
