import Input from "../ui/Input";
import TechnologyIcon from "../../ui/TechnologyIcon";

export default function SkillForm({ skill, onChange }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Nom"
          name="name"
          value={skill.name}
          onChange={onChange}
          placeholder="React"
        />

        <Input
          label="Catégorie"
          name="category"
          value={skill.category}
          onChange={onChange}
          placeholder="Front-end"
        />
      </div>

      <Input
        label="Icône"
        name="icon"
        value={skill.icon}
        onChange={onChange}
        placeholder="react, typescript, nodejs..."
        hint="Nom d'une icône Simple Icons / Font Awesome."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Niveau (0–100)"
          name="level"
          type="number"
          min="0"
          max="100"
          value={skill.level}
          onChange={onChange}
        />

        <Input
          label="Ordre d'affichage"
          name="display_order"
          type="number"
          value={skill.display_order}
          onChange={onChange}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--text-secondary)]">
          Couleur
        </label>

        <div className="flex items-center gap-3">
          <input
            name="color"
            type="color"
            value={skill.color || "#ffffff"}
            onChange={onChange}
            className="h-10 w-14 cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--surface-muted)]"
          />

          <span
            className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-sm text-[var(--text-primary)]"
            style={{ color: skill.color || undefined }}
          >
            <TechnologyIcon name={skill.icon} size={16} />
            {skill.name || "Aperçu"}
          </span>
        </div>
      </div>
    </div>
  );
}
