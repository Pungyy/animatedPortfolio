import { Pencil, Trash2, Star } from "lucide-react";

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-violet-500">
      <div>
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-white">
            {project.title}
          </h3>

          {project.featured && (
            <Star
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
          )}
        </div>

        <p className="mt-2 text-sm text-zinc-400">
          {project.category}
        </p>

        <p className="mt-1 text-sm text-zinc-500">
          {project.year}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(project)}
          className="rounded-lg bg-zinc-800 p-3 transition hover:bg-violet-600"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(project)}
          className="rounded-lg bg-zinc-800 p-3 transition hover:bg-red-600"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}