import { cn } from "@/lib/utils";

/**
 * Editorial section heading — reference style:
 * oversized ghost index ("01") beside a letter-spaced caps eyebrow,
 * then a large display title with a gold accent word option.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  /** Section number, e.g. "01" */
  index?: string;
  eyebrow: string;
  title?: React.ReactNode;
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
      <div className={cn("flex items-center gap-5", align === "center" && "justify-center")}>
        {index && (
          <span
            aria-hidden
            className="font-display text-[15px] font-semibold tracking-[0.3em] text-gold-500/90"
          >
            {index}
          </span>
        )}
        <p className="overline-caps">{eyebrow}</p>
        <span
          aria-hidden
          className="h-px w-16 bg-gradient-to-r from-gold-500/70 to-transparent"
        />
      </div>
      {title && (
        <h2 className="text-balance font-display text-section font-semibold text-text">
          {title}
        </h2>
      )}
      {description && (
        <p className="max-w-2xl text-caption text-muted">{description}</p>
      )}
    </div>
  );
}
