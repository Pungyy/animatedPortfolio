import ProjectCard from "./ProjectCard";
import EmptyProjects from "./EmptyProjects";

export default function ProjectList({
  projects = [],
  onEdit,
  onDelete,
}) {
  if (!projects.length) {
    return <EmptyProjects />;
  }


  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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