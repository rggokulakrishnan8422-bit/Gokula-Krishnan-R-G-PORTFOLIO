import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

/**
 * Portrait treatments gallery (Section 5) — the visual identity strip.
 * Per the spec's "never a circular avatar" rule, the fourth treatment is
 * the gradient-mask variant instead of a circular avatar.
 */
const treatments = [
  { label: "Floating Glass Card", image: "/images/portrait-glass.jpg" },
  { label: "Monochrome Blue", image: "/images/portrait-blue.jpg" },
  { label: "Holographic Effect", image: "/images/portrait-holo.jpg" },
  { label: "Gradient Mask", image: "/images/portrait-hero.jpg", mask: true },
  { label: "Background Silhouette", image: "/images/portrait-silhouette.jpg" },
] as const;

export function Treatments() {
  return (
    <section aria-label="Visual identity treatments" className="section-line py-16 md:py-20">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {treatments.map((treatment, i) => (
            <Reveal key={treatment.label} delay={Math.min(i * 0.06, 0.3)} y={20}>
              <GlassCard hover className="group overflow-hidden p-0">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={treatment.image}
                    alt={`Portrait treatment — ${treatment.label}`}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"
                    className={cn(
                      "object-cover object-top transition-transform duration-component group-hover:scale-105",
                      "mask" in treatment && treatment.mask && "mask-fade-b",
                    )}
                  />
                </div>
                <div className="flex items-center justify-center gap-2 border-t px-3 py-3">
                  <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                  <p className="text-caption font-medium">{treatment.label}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
