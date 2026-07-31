import { Hero } from "@/components/sections/hero";
import { Treatments } from "@/components/sections/treatments";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Tools } from "@/components/sections/tools";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";

/** Page order follows the approved mockup. */
export default function Home() {
  return (
    <>
      <Hero />
      <Treatments />
      <About />
      <Skills />
      <Tools />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
