import { cn } from "@/lib/utils";

/**
 * Section heading — Aug 5 mockup style: small violet caps overline (no pill)
 * + compact display title.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title?: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted">
        {eyebrow}
      </p>
      {title && (
        <h2 className="text-balance font-display text-[clamp(26px,3.2vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em]">
          {title}
        </h2>
      )}
      {description && <p className="max-w-2xl text-caption text-muted">{description}</p>}
    </div>
  );
}
