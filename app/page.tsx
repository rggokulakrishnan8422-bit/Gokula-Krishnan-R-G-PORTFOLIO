import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Tools } from "@/components/sections/tools";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";

/** Home page layout incorporating contextual portrait treatments across sections */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Tools />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
