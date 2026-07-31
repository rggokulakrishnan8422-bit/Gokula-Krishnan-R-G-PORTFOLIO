import { professionalSkills, technicalSkills } from "@/config/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import type { Skill } from "@/types";

function SkillGrid({ skills }: { skills: Skill[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {skills.map((skill, i) => {
        const Icon = skill.icon;
        return (
          <Reveal key={skill.label} delay={Math.min(i * 0.04, 0.4)} y={20}>
            <GlassCard hover className="flex h-full flex-col items-start gap-3 p-4">
              <span className="rounded-md bg-primary/10 p-2 text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="text-sm font-medium">{skill.label}</span>
            </GlassCard>
          </Reveal>
        );
      })}
    </div>
  );
}

/** Skills (Master Prompt Sections 7, 8) — Technical + Professional groups. */
export function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="section-pad relative scroll-mt-24">
      <div className="container-x flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="02 · Skills"
            title="A toolkit built for delivery."
            description="Two halves of one practice: the methods and software that structure the work, and the professional skills that move it forward."
          />
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal>
            <h3 className="flex items-center gap-3 font-display text-lg font-semibold">
              <span aria-hidden className="h-px w-8 bg-primary/60" />
              Technical
            </h3>
          </Reveal>
          <SkillGrid skills={technicalSkills} />
        </div>

        <div className="flex flex-col gap-6">
          <Reveal>
            <h3 className="flex items-center gap-3 font-display text-lg font-semibold">
              <span aria-hidden className="h-px w-8 bg-secondary/60" />
              Professional
            </h3>
          </Reveal>
          <SkillGrid skills={professionalSkills} />
        </div>
      </div>
    </section>
  );
}
