"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, CheckSquare, Download, Eye, FileText, Square, X } from "lucide-react";
import { site } from "@/config/site";
import type { ResumeItem } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import { PDFViewer } from "@/components/ui/pdf-viewer";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { modalBackdrop, modalPanel } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(site.resumes.map((r) => r.id));
  const [previewResume, setPreviewResume] = useState<ResumeItem | null>(null);

  /* Lock body scroll while the modal (or PDF preview) is active;
     restores exact scroll position on close. */
  useScrollLock(isOpen || previewResume !== null);

  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !previewResume) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, previewResume, onClose]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === site.resumes.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(site.resumes.map((r) => r.id));
    }
  };

  const downloadSelected = () => {
    const selectedResumes = site.resumes.filter((r) => selectedIds.includes(r.id));
    selectedResumes.forEach((resume, idx) => {
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = resume.path;
        link.download = resume.filename;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, idx * 300);
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Download Resumes"
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <motion.div
              variants={modalBackdrop}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={onClose}
              className="absolute inset-0 bg-background/85 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <motion.div
              ref={panelRef}
              variants={modalPanel}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="glass-card relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden p-6 sm:p-8"
            >
              {/* Header */}
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-gold-500/10 pb-5">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/[0.08] px-3 py-1 text-xs font-medium text-gold-300">
                    <FileText className="size-3.5" />
                    Official Resume Files
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-text">
                    Download &amp; Preview Resumes
                  </h2>
                  <p className="mt-1 text-xs text-muted sm:text-sm">
                    Select individual or multiple versions of Gokula Krishnan&apos;s Project
                    Manager resumes.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="neu-control inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-micro hover:text-gold-300"
                  aria-label="Close modal"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Select All Bar */}
              <div className="flex shrink-0 items-center justify-between py-3">
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-gold-400 transition-colors hover:text-gold-300"
                >
                  {selectedIds.length === site.resumes.length ? (
                    <>
                      <CheckSquare className="size-4" /> Deselect All
                    </>
                  ) : (
                    <>
                      <Square className="size-4" /> Select All ({site.resumes.length})
                    </>
                  )}
                </button>

                <span className="text-xs text-muted">
                  {selectedIds.length} of {site.resumes.length} selected
                </span>
              </div>

              {/* Resume Cards Container — ONLY this region scrolls */}
              <div
                data-lenis-prevent
                className="my-1 flex flex-1 flex-col gap-4 overflow-y-auto overscroll-contain py-1 pr-1"
              >
                {site.resumes.map((resume) => {
                  const isSelected = selectedIds.includes(resume.id);
                  return (
                    <div
                      key={resume.id}
                      className={cn(
                        "group relative flex flex-col gap-4 rounded-xl border p-5 transition-all duration-200 sm:flex-row sm:items-center sm:justify-between",
                        isSelected
                          ? "border-gold-500/50 bg-gold-500/[0.06] shadow-[0_8px_30px_-12px_rgb(var(--color-primary)/0.35)]"
                          : "border-border/50 bg-glass/[0.03] hover:border-gold-500/30 hover:bg-glass/[0.05]",
                      )}
                    >
                      <div className="flex min-w-0 flex-1 items-start gap-4">
                        {/* Checkbox */}
                        <button
                          type="button"
                          onClick={() => toggleSelect(resume.id)}
                          className={cn(
                            "mt-1 flex size-5 shrink-0 items-center justify-center rounded border transition-colors",
                            isSelected
                              ? "border-gold-500 bg-gold-500 text-background"
                              : "border-border/60 bg-transparent hover:border-gold-500/60",
                          )}
                          aria-label={`Select ${resume.title}`}
                        >
                          {isSelected && <Check className="size-3.5" />}
                        </button>

                        {/* Info */}
                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-base font-semibold text-text">
                              {resume.title}
                            </h3>
                            {resume.primary && (
                              <span className="rounded bg-gold-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-300">
                                ATS Primary
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-medium text-gold-400/90">{resume.subtitle}</p>
                          <p className="mt-0.5 line-clamp-2 text-xs text-muted">
                            {resume.description}
                          </p>

                          <div className="mt-2 flex items-center gap-3 font-mono text-[11px] text-muted/80">
                            <span>Size: {resume.size}</span>
                            <span>•</span>
                            <span>Updated: {resume.updated}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex shrink-0 items-center gap-2.5 self-end pt-2 sm:self-center sm:pt-0">
                        <button
                          type="button"
                          onClick={() => setPreviewResume(resume)}
                          className={buttonVariants({ variant: "outline", size: "sm" })}
                          title="Preview PDF"
                        >
                          <Eye className="mr-1.5 size-3.5" />
                          Preview
                        </button>

                        <a
                          href={resume.path}
                          download={resume.filename}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={buttonVariants({ variant: "primary", size: "sm" })}
                          title="Download PDF"
                        >
                          <Download className="mr-1.5 size-3.5" />
                          Download
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mt-4 flex shrink-0 flex-col-reverse items-center justify-between gap-3 border-t border-gold-500/10 pt-4 sm:flex-row">
                <button
                  type="button"
                  onClick={onClose}
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  Close
                </button>

                <button
                  type="button"
                  disabled={selectedIds.length === 0}
                  onClick={downloadSelected}
                  className={cn(
                    buttonVariants({ variant: "primary", size: "md" }),
                    "w-full min-w-[200px] sm:w-auto",
                  )}
                >
                  <Download className="mr-2 size-4" />
                  Download Selected ({selectedIds.length})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Embedded PDF Viewer Modal */}
      <PDFViewer resume={previewResume} onClose={() => setPreviewResume(null)} />
    </>
  );
}
