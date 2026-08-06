import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import { projects } from "@/config/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Tilt } from "@/components/ui/tilt";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

/** Projects — image-forward cards (mockup "Projects That I'm Proud Of"). */
export function Projects() {
  return (
    <section
      id="projects"
      aria-label="Projects"
      className="section-line section-pad relative scroll-mt-24 overflow-hidden"
    >
      {/* Enterprise dashboard overlay treatment as faint ambience */}
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
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading eyebrow="FEATURED PROJECTS" title="Some Projects I'm Proud Of" />
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              View All Projects
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <Reveal key={project.id} delay={Math.min(i * 0.08, 0.24)} y={24}>
                <Tilt className="h-full">
                  <GlassCard hover className="group relative flex h-full flex-col overflow-hidden p-0">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 400px"
                      className="object-cover transition-transform duration-component group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-surface)/0.45)] to-transparent"
                    />
                  </div>

                  <div className="relative z-10 -mt-7 ml-6 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
                    <Icon className="size-6" aria-hidden />
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6 pt-4">
                    <h3 className="font-display text-card font-semibold">{project.title}</h3>
                    <p className="flex-1 text-caption text-muted">{project.description}</p>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span
                        aria-hidden
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border text-muted transition-all duration-small group-hover:-translate-y-0.5 group-hover:border-primary/50 group-hover:text-primary"
                      >
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                  </div>
                  </GlassCard>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
