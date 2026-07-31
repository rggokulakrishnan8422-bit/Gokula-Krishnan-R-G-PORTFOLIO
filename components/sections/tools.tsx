import Image from "next/image";
import { toolsWall } from "@/config/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";

/** Tools (Master Prompt Section 7) — the software stack as a tool wall. */
export function Tools() {
  return (
    <section
      id="tools"
      aria-label="Tools"
      className="section-pad relative scroll-mt-24 overflow-hidden"
    >
      {/* Background silhouette treatment (Section 5) */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 hidden h-[440px] w-[360px] -translate-y-1/2 opacity-[0.14] [mask-image:linear-gradient(to_left,black,transparent)] lg:block"
      >
        <Image
          src="/images/portrait-silhouette.jpg"
          alt=""
          fill
          sizes="360px"
          className="object-cover"
        />
      </div>

      <div className="container-x relative flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="03 · Tools"
            title="Fluent in the modern PM stack."
            description="The platforms I use to plan, track and report — and I adapt to whatever stack your team already runs on."
          />
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {toolsWall.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <Reveal key={tool.label} delay={Math.min(i * 0.05, 0.35)} y={20}>
                <GlassCard
                  hover
                  className="flex h-full flex-col items-center gap-2 p-6 text-center"
                >
                  <Icon className="size-7 text-primary" aria-hidden />
                  <span className="font-medium">{tool.label}</span>
                  <span className="text-caption text-muted">{tool.hint}</span>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
