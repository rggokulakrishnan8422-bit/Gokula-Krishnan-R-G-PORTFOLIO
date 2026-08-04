"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { buttonVariants } from "./button";
import { ResumeModal } from "./resume-modal";
import { cn } from "@/lib/utils";

export function ResumeButton({
  variant = "secondary",
  size = "md",
  className,
  label = "Download Resume",
}: {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={cn(buttonVariants({ variant, size }), "group cursor-pointer", className)}
        aria-label="Download or preview resumes"
      >
        <Download
          className="size-4 transition-transform duration-micro group-hover:-translate-y-0.5"
          aria-hidden
        />
        <span>{label}</span>
      </button>

      <ResumeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
