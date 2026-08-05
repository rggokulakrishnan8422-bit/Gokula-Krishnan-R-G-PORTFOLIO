"use client";

import { useEffect, useState } from "react";
import { Download, ExternalLink, Maximize2, Minimize2, X } from "lucide-react";
import type { ResumeItem } from "@/types";
import { buttonVariants } from "@/components/ui/button";

interface PDFViewerProps {
  resume: ResumeItem | null;
  onClose: () => void;
}

export function PDFViewer({ resume, onClose }: PDFViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (resume) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [resume]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!resume) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Previewing ${resume.title}`}
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity animate-in fade-in-0 duration-200"
      />

      {/* Modal Container */}
      <div
        className={`relative flex w-full flex-col overflow-hidden rounded-xl border border-primary/30 bg-surface shadow-2xl transition-all duration-300 ${
          isFullscreen ? "h-full max-w-none" : "h-[88vh] max-w-5xl"
        }`}
      >
        {/* Header toolbar */}
        <div className="flex flex-wrap items-center justify-between border-b border-border/40 bg-surface/95 px-4 py-3 backdrop-blur-md sm:px-6 gap-3 shrink-0">
          <div className="flex min-w-0 flex-col">
            <h3 className="truncate font-display text-base font-semibold text-text sm:text-lg">
              {resume.title}
            </h3>
            <p className="truncate text-xs text-muted">
              {resume.subtitle} ({resume.size})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={resume.path}
              download={resume.filename}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "primary", size: "sm" })}
              title="Download PDF"
            >
              <Download className="size-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            <a
              href={resume.path}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "sm" })}
              title="Open in new tab"
            >
              <ExternalLink className="size-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Open PDF</span>
            </a>

            <button
              type="button"
              onClick={() => setIsFullscreen((prev) => !prev)}
              className="inline-flex size-9 items-center justify-center rounded-md border border-border/40 bg-glass/10 text-muted transition-colors hover:bg-glass/30 hover:text-text"
              aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors hover:bg-primary/20"
              aria-label="Close preview"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Content body with iframe preview */}
        <div className="relative flex-1 bg-surface/80">
          <iframe
            src={`${resume.path}#toolbar=1&navpanes=0&view=FitH`}
            title={`PDF Preview of ${resume.title}`}
            className="h-full w-full border-none"
          />
        </div>
      </div>
    </div>
  );
}
