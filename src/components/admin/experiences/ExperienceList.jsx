import { Briefcase } from "lucide-react";

import ExperienceCard from "./ExperienceCard";
import EmptyState from "../ui/EmptyState";

export default function ExperienceList({ experiences = [], onEdit, onDelete }) {
  if (!experiences.length) {
    return (
      <EmptyState icon={Briefcase} title="Aucune expérience">
        Ajoute ton parcours professionnel.
      </EmptyState>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {experiences.map((experience) => (
        <ExperienceCard
          key={experience.id}
          experience={experience}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
