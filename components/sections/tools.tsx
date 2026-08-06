import Image from "next/image";
import { toolsWall } from "@/config/content";
import { Reveal } from "@/components/ui/reveal";
import { ToolBrandIcon } from "@/components/ui/icons";

/**
 * Tools (Aug 5 mockup) — one continuous rounded bar:
 * "TOOLS I USE" label at left, brand glyphs + names spread across.
 */
export function Tools() {
  return (
    <section
      id="tools"
      aria-label="Tools"
      className="section-line relative scroll-mt-24 overflow-hidden py-6 md:py-10"
    >
      {/* Background silhouette treatment (Section 5) */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 hidden h-[420px] w-[330px] -translate-y-1/2 opacity-[0.12] [mask-image:linear-gradient(to_left,black,transparent)] lg:block"
      >
        <Image
          src="/images/portrait-silhouette.jpg"
          alt=""
          fill
          sizes="330px"
          className="object-cover"
        />
      </div>

      <div className="container-x relative">
        <Reveal>
          <div className="flex flex-col gap-4 rounded-2xl border border-primary/20 bg-[rgb(var(--color-surface)/0.6)] px-5 py-5 backdrop-blur-md sm:px-8 lg:flex-row lg:items-center lg:gap-0">
            <h2 className="shrink-0 font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-muted lg:pr-8">
              Tools I Use
            </h2>
            <div className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-4 lg:justify-between">
              {toolsWall.map((tool, i) => (
                <Reveal key={tool.label} delay={Math.min(i * 0.04, 0.28)} y={12}>
                  <span
                    title={tool.hint}
                    className="group flex items-center gap-2.5 transition-transform duration-small hover:-translate-y-0.5"
                  >
                    <ToolBrandIcon
                      label={tool.label}
                      className="size-6 sm:size-7"
                    />
                    <span className="text-sm font-medium text-text/90 transition-colors duration-micro group-hover:text-text">
                      {tool.label}
                    </span>
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
