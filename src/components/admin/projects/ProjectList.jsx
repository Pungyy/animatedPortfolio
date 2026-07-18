import ProjectCard from "./ProjectCard";

export default function ProjectList({
  projects,
  onEdit,
  onDelete,
}) {
  if (!projects.length) {
    return (
      <p className="text-zinc-400">
        Aucun projet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
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