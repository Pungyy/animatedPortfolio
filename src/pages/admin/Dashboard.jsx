import {
  FolderKanban,
  Briefcase,
  Wrench,
  Mail,
} from "lucide-react";

const cards = [
  {
    title: "Projets",
    value: "4",
    icon: FolderKanban,
  },
  {
    title: "Expériences",
    value: "3",
    icon: Briefcase,
  },
  {
    title: "Compétences",
    value: "12",
    icon: Wrench,
  },
  {
    title: "Messages",
    value: "0",
    icon: Mail,
  },
];

export default function Dashboard() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-zinc-400">
          Bienvenue sur ton Portfolio CMS.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <Icon size={28} />

                <span className="text-4xl font-bold">
                  {card.value}
                </span>
              </div>

              <h2 className="text-zinc-400">
                {card.title}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}