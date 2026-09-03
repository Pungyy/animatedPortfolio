import { FolderKanban } from "lucide-react";

import ProjectCard from "./ProjectCard";
import EmptyState from "../ui/EmptyState";

export default function ProjectList({ projects = [], onEdit, onDelete }) {
  if (!projects.length) {
    return (
      <EmptyState icon={FolderKanban} title="Aucun projet">
        Crée ton premier projet pour l'afficher sur le portfolio.
      </EmptyState>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
