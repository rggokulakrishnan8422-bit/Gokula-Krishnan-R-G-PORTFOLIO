import Image from "next/image";
import { toolsWall } from "@/config/content";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

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

        <div className="flex flex-wrap items-center justify-center gap-3">
          {toolsWall.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <Reveal key={tool.label} delay={Math.min(i * 0.05, 0.35)} y={16}>
                <span className="flex items-center gap-2.5 rounded-full border bg-[rgb(var(--color-glass)/var(--glass-alpha))] px-5 py-3 shadow-sm backdrop-blur-md transition-all duration-component hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                  <Icon className="size-5 text-primary" aria-hidden />
                  <span className="text-sm font-medium">{tool.label}</span>
                </span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
