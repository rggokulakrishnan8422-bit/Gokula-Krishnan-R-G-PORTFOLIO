import { toolsWall } from "@/config/content";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

/** Tools — centered pill strip (mockup "Tools I Use"). */
export function Tools() {
  return (
    <section id="tools" aria-label="Tools" className="section-line scroll-mt-24 py-16 md:py-24">
      <div className="container-x flex flex-col items-center gap-8">
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
