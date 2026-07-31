import { cn } from "@/lib/utils";
import { Badge } from "./badge";

/**
 * Section heading — guarantees identical hierarchy/spacing across every
 * section (Master Prompt Section 7 consistency rule).
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Badge variant="primary" className="uppercase tracking-[0.14em]">
        {eyebrow}
      </Badge>
      <h2 className="text-balance font-display text-section font-semibold">{title}</h2>
      {description && <p className="max-w-2xl text-body text-muted">{description}</p>}
    </div>
  );
}
