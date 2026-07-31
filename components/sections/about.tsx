import Image from "next/image";
import { CheckCircle2, MapPin } from "lucide-react";
import { site } from "@/config/site";
import { projects, professionalSkills, technicalSkills, toolsWall } from "@/config/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";

const highlights = [
  "Agile & Scrum, practiced daily",
  "Stakeholder-first communication",
  "Documentation teams actually read",
];

/** About (Master Prompt Section 7). Stats derive from config — always honest. */
export function About() {
  const stats = [
    { value: toolsWall.length, suffix: "+", label: "Tools & platforms" },
    { value: technicalSkills.length + professionalSkills.length, suffix: "", label: "Core PM skills" },
    { value: projects.length, suffix: "+", label: "Projects delivered" },
  ];

  return (
    <section id="about" aria-label="About" className="section-pad relative scroll-mt-24">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        {/* Glass portrait treatment (Section 5) */}
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-[400px]">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-full bg-primary/20 blur-3xl"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-xl">
              <Image
                src="/images/portrait-glass.jpg"
                alt={`${site.name} — portrait through frosted glass`}
                fill
                sizes="(max-width: 1024px) 90vw, 400px"
                className="object-cover"
              />
            </div>
            <div className="glass-card absolute -bottom-5 left-4 flex items-center gap-3 p-3 shadow-lg">
              <div className="relative size-10 overflow-hidden rounded-md">
                <Image
                  src="/images/portrait-blue.jpg"
                  alt=""
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col pr-1 leading-tight">
                <span className="text-sm font-semibold">Enterprise mindset</span>
                <span className="text-xs text-muted">Calm under deadlines</span>
              </div>
            </div>
            <div
              aria-hidden
              className="glass-card absolute -right-2 top-6 hidden items-center gap-2 px-3 py-2 text-xs sm:flex"
            >
              <MapPin className="size-3.5 text-primary" />
              {site.location}
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-8 lg:col-span-7">
          <Reveal>
            <SectionHeading eyebrow="01 · About" title="Turning plans into reliable delivery." />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-4 text-body text-muted">
              <p>
                I&apos;m Gokula Krishnan — a Junior Project Manager based in{" "}
                {site.location}. I work at the intersection of planning and
                people: building the roadmaps, boards and rituals that keep
                cross-functional teams moving in the same direction.
              </p>
              <p>
                My approach is simple — make priorities visible, surface risks
                early, and keep stakeholders informed before they have to ask.
                Whether it&apos;s a Jira board, a weekly report or a sprint
                review, I care about clarity that holds up under pressure.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="flex flex-col gap-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 shrink-0 text-success" aria-hidden />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-8 border-t pt-6">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-display text-2xl font-bold text-gradient">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-caption text-muted">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
