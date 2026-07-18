import MainLayout from "../layouts/MainLayout";

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Stats from "../components/sections/Stats";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Contact from "../components/sections/Contact";
import Skills from "../components/sections/Skills";
import CTA from "../components/sections/CTA";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <About />
      
      <Stats />
      <Experience />
      <Skills />
      <Projects />
      <CTA />
      <Contact />
    </MainLayout>
  );
}