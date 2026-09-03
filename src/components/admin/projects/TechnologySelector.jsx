import { useEffect, useState } from "react";
import { Check } from "lucide-react";

import { getTechnologies } from "../../../services/technologies.service";
import TechnologyIcon from "../../ui/TechnologyIcon";

export default function TechnologySelector({ selected = [], onChange }) {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const data = await getTechnologies();
        if (!ignore) setTechnologies(data);
      } catch (error) {
        console.error(error);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  function toggle(id) {
    onChange(
      selected.includes(id)
        ? selected.filter((techId) => techId !== id)
        : [...selected, id]
    );
  }

  if (loading) {
    return (
      <p className="text-sm text-[var(--text-muted)]">
        Chargement des technologies...
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => {
        const active = selected.includes(tech.id);

        return (
          <button
            key={tech.id}
            type="button"
            onClick={() => toggle(tech.id)}
            className={
              "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition " +
              (active
                ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]")
            }
          >
            <span style={{ color: active ? undefined : tech.color }}>
              <TechnologyIcon name={tech.icon} size={14} />
            </span>
            {tech.name}
            {active && <Check size={13} />}
          </button>
        );
      })}
    </div>
  );
}
