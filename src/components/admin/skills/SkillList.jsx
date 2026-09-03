import { Sparkles } from "lucide-react";

import SkillCard from "./SkillCard";
import EmptyState from "../ui/EmptyState";

export default function SkillList({ skills = [], onEdit, onDelete }) {
  if (!skills.length) {
    return (
      <EmptyState icon={Sparkles} title="Aucune compétence">
        Ajoute tes compétences pour les afficher sur le portfolio.
      </EmptyState>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {skills.map((skill) => (
        <SkillCard
          key={skill.id}
          skill={skill}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
