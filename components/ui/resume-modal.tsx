"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CheckSquare, Download, Eye, FileText, Square, X } from "lucide-react";
import { site } from "@/config/site";
import type { ResumeItem } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import { PDFViewer } from "@/components/ui/pdf-viewer";
import { cn } from "@/lib/utils";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(site.resumes.map((r) => r.id));
  const [previewResume, setPreviewResume] = useState<ResumeItem | null>(null);

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
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, idx * 300);
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Download Resumes"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-primary/20 bg-surface p-6 shadow-2xl sm:p-8"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-border/40">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-2">
                  <FileText className="size-3.5" />
                  Official Resume Files
                </div>
                <h2 className="font-display text-2xl font-bold text-text">
                  Download & Preview Resumes
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Select individual or multiple versions tailored for Project Coordination & Management.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex size-9 items-center justify-center rounded-lg border border-border/40 bg-glass/10 text-muted transition-colors hover:bg-glass/30 hover:text-text"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Select All Bar */}
            <div className="flex items-center justify-between py-4">
              <button
                type="button"
                onClick={toggleSelectAll}
                className="inline-flex items-center gap-2 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
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

            {/* Resume Cards */}
            <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
              {site.resumes.map((resume) => {
                const isSelected = selectedIds.includes(resume.id);
                return (
                  <div
                    key={resume.id}
                    className={cn(
                      "group relative flex flex-col gap-4 rounded-xl border p-5 transition-all duration-200 sm:flex-row sm:items-center sm:justify-between",
                      isSelected
                        ? "border-primary/60 bg-primary/5 shadow-md shadow-primary/5"
                        : "border-border/40 bg-glass/5 hover:border-primary/30 hover:bg-glass/10",
                    )}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <button
                        type="button"
                        onClick={() => toggleSelect(resume.id)}
                        className={cn(
                          "mt-1 flex size-5 shrink-0 items-center justify-center rounded border transition-colors",
                          isSelected
                            ? "border-primary bg-primary text-white"
                            : "border-border/60 bg-surface hover:border-primary/60",
                        )}
                        aria-label={`Select ${resume.title}`}
                      >
                        {isSelected && <Check className="size-3.5" />}
                      </button>

                      {/* Info */}
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-base font-semibold text-text">
                            {resume.title}
                          </h3>
                          {resume.primary && (
                            <span className="rounded bg-primary/20 px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase text-primary">
                              Primary
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-primary/90">{resume.subtitle}</p>
                        <p className="text-xs text-muted line-clamp-2 mt-0.5">
                          {resume.description}
                        </p>

                        <div className="mt-2 flex items-center gap-3 text-[11px] font-mono text-muted/80">
                          <span>Size: {resume.size}</span>
                          <span>•</span>
                          <span>Updated: {resume.updated}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0 pt-2 sm:pt-0">
                      <button
                        type="button"
                        onClick={() => setPreviewResume(resume)}
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                        title="Preview PDF"
                      >
                        <Eye className="size-3.5 mr-1" />
                        Preview
                      </button>

                      <a
                        href={resume.path}
                        download={resume.filename}
                        className={buttonVariants({ variant: "primary", size: "sm" })}
                        title="Download PDF"
                      >
                        <Download className="size-3.5 mr-1" />
                        Download
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-6 flex flex-col-reverse items-center justify-between gap-3 border-t border-border/40 pt-4 sm:flex-row">
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
                  "w-full sm:w-auto min-w-[200px]",
                )}
              >
                <Download className="size-4 mr-2" />
                Download Selected ({selectedIds.length})
              </button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Embedded PDF Viewer Modal */}
      <PDFViewer resume={previewResume} onClose={() => setPreviewResume(null)} />
    </>
  );
}
