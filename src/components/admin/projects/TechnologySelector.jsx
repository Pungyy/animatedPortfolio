import { useEffect, useState } from "react";
import { getTechnologies } from "../../../services/technologies.service";


export default function TechnologySelector({
  selected = [],
  onChange,
}) {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function load() {
      try {
        const data = await getTechnologies();
        setTechnologies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);



  function toggleTechnology(id) {
    if (selected.includes(id)) {
      onChange(
        selected.filter((techId) => techId !== id)
      );
    } else {
      onChange([
        ...selected,
        id,
      ]);
    }
  }



  if (loading) {
    return (
      <div className="text-sm text-[var(--text-secondary)]">
        Chargement des technologies...
      </div>
    );
  }



  return (
    <div className="space-y-4">

      <h3 className="text-sm font-medium text-[var(--text-primary)]">
        Technologies utilisées
      </h3>


      <div className="grid gap-3 md:grid-cols-2">

        {technologies.map((tech) => (
          <label
            key={tech.id}
            className="
              flex
              cursor-pointer
              items-center
              gap-3
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-3
              transition
              hover:border-[var(--border)]
            "
          >

            <input
              type="checkbox"
              checked={selected.includes(tech.id)}
              onChange={() => toggleTechnology(tech.id)}
            />


            <span className="text-sm text-[var(--text-primary)]">
              {tech.name}
            </span>

          </label>
        ))}

      </div>

    </div>
  );
}