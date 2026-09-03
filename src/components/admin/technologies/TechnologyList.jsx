import { Boxes } from "lucide-react";

import TechnologyCard from "./TechnologyCard";
import EmptyState from "../ui/EmptyState";

export default function TechnologyList({ technologies = [], onEdit, onDelete }) {
  if (!technologies.length) {
    return (
      <EmptyState icon={Boxes} title="Aucune technologie">
        Les technologies servent à tagger tes projets.
      </EmptyState>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {technologies.map((technology) => (
        <TechnologyCard
          key={technology.id}
          technology={technology}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
