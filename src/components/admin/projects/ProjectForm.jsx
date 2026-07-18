import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";
import Checkbox from "../ui/Checkbox";
import Divider from "../ui/Divider";

const categoryOptions = [
  { value: "Web", label: "Web" },
  { value: "Mobile", label: "Mobile" },
  { value: "API", label: "API" },
  { value: "Desktop", label: "Desktop" },
  { value: "Full Stack", label: "Full Stack" },
  { value: "UI/UX", label: "UI / UX" },
];

const statusOptions = [
  { value: "En cours", label: "En cours" },
  { value: "Terminé", label: "Terminé" },
  { value: "Maintenance", label: "Maintenance" },
  { value: "Archivé", label: "Archivé" },
];

export default function ProjectForm({
  project,
  onChange,
}) {
  return (
    <div className="space-y-10">
      <Divider title="Informations générales" />

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Titre"
          name="title"
          value={project.title}
          onChange={onChange}
        />

        <Input
          label="Slug"
          name="slug"
          value={project.slug}
          onChange={onChange}
        />

        <Input
          label="Client"
          name="client"
          value={project.client}
          onChange={onChange}
        />

        <Input
          label="Année"
          name="year"
          type="number"
          value={project.year}
          onChange={onChange}
        />
      </div>

      <Divider title="Descriptions" />

      <Textarea
        label="Description courte"
        name="short_description"
        value={project.short_description}
        onChange={onChange}
      />

      <Textarea
        label="Description complète"
        name="description"
        value={project.description}
        onChange={onChange}
      />

      <Divider title="Publication" />

      <div className="grid gap-6 md:grid-cols-2">
        <Select
          label="Catégorie"
          name="category"
          value={project.category}
          onChange={onChange}
          options={categoryOptions}
        />

        <Select
          label="Statut"
          name="status"
          value={project.status}
          onChange={onChange}
          options={statusOptions}
        />

        <Input
          label="Ordre d'affichage"
          name="display_order"
          type="number"
          value={project.display_order}
          onChange={onChange}
        />
      </div>

      <div className="flex flex-wrap gap-8">
        <Checkbox
          label="Projet mis en avant"
          name="featured"
          checked={project.featured}
          onChange={onChange}
        />

        <Checkbox
          label="Publié"
          name="published"
          checked={project.published}
          onChange={onChange}
        />
      </div>

      <Divider title="Liens" />

      <Input
        label="GitHub"
        name="github_url"
        value={project.github_url}
        onChange={onChange}
      />

      <Input
        label="Démo"
        name="demo_url"
        value={project.demo_url}
        onChange={onChange}
      />

      <Divider title="Image principale" />

      <div className="rounded-2xl border-2 border-dashed border-zinc-700 p-10 text-center text-zinc-400">
        Upload de l'image (étape suivante)
      </div>
    </div>
  );
}