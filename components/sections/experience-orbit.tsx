"use client";

import dynamic from "next/dynamic";

/** Client boundary so the scene can be code-split with ssr:false. */
const ExperienceOrbitScene = dynamic(() => import("@/components/three/experience-orbit"), {
  ssr: false,
});

export function ExperienceOrbit() {
  return (
    <div className="flex h-full min-h-[380px] flex-col items-center justify-center gap-8">
      <p className="text-center text-caption font-medium uppercase tracking-[0.18em] text-muted">
        Delivery Lifecycle
      </p>
      <ExperienceOrbitScene />
    </div>
  );
}
