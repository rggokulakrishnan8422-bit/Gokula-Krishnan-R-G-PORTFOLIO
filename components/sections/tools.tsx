import Image from "next/image";
import { toolsWall } from "@/config/content";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { ToolBrandIcon } from "@/components/ui/icons";

/** Tools — centered pill strip with the silhouette treatment as backdrop. */
export function Tools() {
  return (
    <section
      id="tools"
      aria-label="Tools"
      className="section-line relative scroll-mt-24 overflow-hidden py-16 md:py-24"
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

      <div className="container-x relative flex flex-col items-center gap-8">
        <Reveal>
          <Badge variant="primary" className="uppercase tracking-[0.14em]">
            Tools I Use
          </Badge>
        </Reveal>

        {/* Brand pill strip (Aug 5 mockup) */}
        <div className="flex w-full max-w-5xl flex-wrap items-center justify-center gap-3 rounded-2xl border border-primary/20 bg-[rgb(var(--color-surface)/0.6)] px-4 py-5 backdrop-blur-md sm:gap-4 sm:px-8">
          {toolsWall.map((tool, i) => (
            <Reveal key={tool.label} delay={Math.min(i * 0.05, 0.35)} y={16}>
              <span
                title={tool.hint}
                className="flex items-center gap-2.5 rounded-xl border border-transparent px-3 py-2 shadow-sm transition-all duration-small hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/10 hover:shadow-lg"
              >
                <ToolBrandIcon label={tool.label} className="size-5" />
                <span className="text-sm font-medium">{tool.label}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
