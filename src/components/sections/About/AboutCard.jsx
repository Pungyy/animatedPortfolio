import Badge from "../../ui/Badge";

export default function AboutCard() {
  return (
    <div className="rounded-[40px] border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="aspect-square rounded-3xl bg-neutral-200" />

      <div className="mt-8 space-y-4">
        <h3 className="text-3xl font-semibold">
          Ibrahim ANIL
        </h3>

        <p className="text-neutral-600">
          Développeur Full-Stack
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge>Lyon 🇫🇷</Badge>
          <Badge>Alternance</Badge>
          <Badge>Bac+3</Badge>
        </div>

        <p className="pt-4 text-neutral-600 leading-8">
          Passionné par la création d'interfaces modernes,
          je conçois des applications web performantes,
          intuitives et évolutives.
        </p>
      </div>
    </div>
  );
}