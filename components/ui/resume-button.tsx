import { Download } from "lucide-react";
import { site } from "@/config/site";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";

/**
 * Resume Download Button (Master Prompt Sections 9, 12).
 * The path comes from config/site.ts — swapping public/resume.pdf is the
 * only action needed to update what every instance downloads.
 */
export function ResumeButton({
  variant = "secondary",
  size = "md",
  className,
}: {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <a
      href={site.resumePath}
      download="Gokula-Krishnan-RG-Resume.pdf"
      className={cn(buttonVariants({ variant, size }), "group", className)}
      aria-label={`Download resume (PDF) — ${site.name}`}
    >
      <Download
        className="size-4 transition-transform duration-small group-hover:-translate-y-0.5"
        aria-hidden
      />
      Download Resume
    </a>
  );
}
