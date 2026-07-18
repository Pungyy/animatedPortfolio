import Button from "../../ui/Button";
import usePortfolio from "../../../hooks/usePortfolio";

export default function HeroContent() {
  const { settings, loading } = usePortfolio();

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!settings) {
    return <p>Aucune donnée trouvée.</p>;
  }

  return (
    <div className="max-w-2xl">
      <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-neutral-500">
        Portfolio
      </p>

      <h1 className="text-6xl font-semibold leading-none tracking-tight text-neutral-950 md:text-7xl xl:text-8xl">
        {settings.hero_title}
      </h1>

      {settings.hero_subtitle && (
        <h2 className="mt-4 text-3xl text-neutral-700">
          {settings.hero_subtitle}
        </h2>
      )}

      <p className="mt-8 max-w-xl text-xl leading-9 text-neutral-600">
        {settings.hero_description}
      </p>

      <div className="mt-12 flex flex-wrap gap-4">
        <Button>Voir mes projets</Button>
        <Button variant="secondary">Me contacter</Button>
      </div>
    </div>
  );
}