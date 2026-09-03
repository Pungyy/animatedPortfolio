import MainLayout from "../layouts/MainLayout";
import Seo from "../components/common/Seo";
import usePortfolio from "../hooks/usePortfolio";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "../lib/site";

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Stats from "../components/sections/Stats";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Contact from "../components/sections/Contact";
import Skills from "../components/sections/Skills";
import CTA from "../components/sections/CTA";

export default function Home() {
  const { settings } = usePortfolio();

  const fullName =
    [settings?.first_name, settings?.last_name].filter(Boolean).join(" ") ||
    SITE_NAME;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: fullName,
    jobTitle: SITE_TAGLINE,
    url: SITE_URL,
    ...(settings?.profile_image && { image: settings.profile_image }),
    ...(settings?.email && { email: `mailto:${settings.email}` }),
    ...(settings?.location && {
      address: {
        "@type": "PostalAddress",
        addressLocality: settings.location,
      },
    }),
    sameAs: [
      settings?.github_url,
      settings?.linkedin_url,
      settings?.instagram_url,
    ].filter(Boolean),
  };

  return (
    <MainLayout>
      <Seo
        description={
          settings?.hero_description ||
          `Portfolio de ${fullName}, ${SITE_TAGLINE.toLowerCase()} — projets, expérience et notes techniques.`
        }
        jsonLd={jsonLd}
      />

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
