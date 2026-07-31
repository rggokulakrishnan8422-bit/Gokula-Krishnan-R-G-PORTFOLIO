import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Tools } from "@/components/sections/tools";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

/** Information architecture (Master Prompt Section 7). */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Tools />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
