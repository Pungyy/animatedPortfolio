import MainLayout from "../layouts/MainLayout";

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Stats from "../components/sections/Stats";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <About />
      <Stats />
    </MainLayout>
  );
}