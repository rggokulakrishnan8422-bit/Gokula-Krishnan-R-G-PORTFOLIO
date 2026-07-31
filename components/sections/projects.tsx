import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { projects } from "@/config/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";

/** Projects (Master Prompt Section 7) — case-study cards. */
export function Projects() {
  return (
    <section
      id="projects"
      aria-label="Projects"
      className="section-pad relative scroll-mt-24 overflow-hidden"
    >
      {/* Enterprise dashboard overlay treatment (Section 5) as ambience */}
      <div
        aria-hidden
        className="absolute left-0 top-1/2 hidden h-[460px] w-[380px] -translate-y-1/2 opacity-[0.1] [mask-image:linear-gradient(to_right,black,transparent)] lg:block"
      >
        <Image
          src="/images/portrait-dashboard.jpg"
          alt=""
          fill
          sizes="380px"
          className="object-cover"
        />
      </div>

      <div className="container-x relative flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="05 · Projects"
            title="Selected work & case studies."
            description="Delivery systems and workflows I've designed, built and run — each measured by the calm it created."
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <Reveal key={project.id} delay={(i % 2) * 0.1} y={24}>
                <GlassCard
                  hover
                  className="group relative flex h-full flex-col gap-4 overflow-hidden p-6 md:p-8"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity duration-component group-hover:opacity-100"
                  />
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-lg bg-primary/10 p-3 text-primary">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 text-muted transition-all duration-small group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    />
                  </div>

                  <h3 className="font-display text-card font-semibold">{project.title}</h3>
                  <p className="flex-1 text-body text-muted">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-2 border-t pt-4 text-caption text-muted">
                    <CheckCircle2 className="size-4 shrink-0 text-success" aria-hidden />
                    {project.outcome}
                  </div>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
