import { ExternalLink, Eye, EyeOff } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import TechnologyIcon from "../../ui/TechnologyIcon";
import CardActions from "../ui/CardActions";

export default function ProjectCard({ project, onEdit, onDelete }) {
  const tags = [project.category, project.status, project.year].filter(Boolean);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)]">
      <div className="relative h-44 bg-[var(--surface-muted)]">
        {project.cover_image ? (
          <img
            src={project.cover_image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-[var(--text-muted)]">
            Pas d'image
          </div>
        )}

        {project.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent-foreground)]">
            Featured
          </span>
        )}

        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--background)]/80 backdrop-blur">
          {project.published ? (
            <Eye size={14} className="text-[var(--success)]" />
          ) : (
            <EyeOff size={14} className="text-[var(--text-muted)]" />
          )}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-semibold text-[var(--text-primary)]">
          {project.title}
        </p>
        <p className="mt-1 line-clamp-2 text-sm text-[var(--text-secondary)]">
          {project.short_description}
        </p>

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--surface-muted)] px-2.5 py-0.5 text-xs text-[var(--text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {project.technologies?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 6).map((tech) => (
              <span
                key={tech.id}
                className="flex items-center gap-1 text-[var(--text-secondary)]"
                title={tech.name}
                style={{ color: tech.color }}
              >
                <TechnologyIcon name={tech.icon} size={15} />
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center gap-2 pt-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg p-1.5 text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
            >
              <FaGithub size={16} />
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg p-1.5 text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>

        <CardActions
          onEdit={() => onEdit(project)}
          onDelete={() => onDelete(project)}
        />
      </div>
    </div>
  );
}
