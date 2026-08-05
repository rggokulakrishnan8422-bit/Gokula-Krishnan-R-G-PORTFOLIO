import { Hero } from "@/components/sections/hero";
import { PortraitShowcase } from "@/components/sections/portrait-showcase";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Tools } from "@/components/sections/tools";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";

/** Home page layout incorporating Hero, Portrait Showcase, and Core Sections */
export default function Home() {
  return (
    <>
      <Hero />
      <PortraitShowcase />
      <About />
      <Skills />
      <Tools />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
