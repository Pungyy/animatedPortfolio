import TechnologyCard from "./TechnologyCard";


export default function TechnologyList({
  technologies,
  onEdit,
  onDelete,
}) {


  if (!technologies.length) {

    return (

      <div
        className="
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--surface)]
          p-10
          text-center
          text-[var(--text-secondary)]
        "
      >

        Aucune technologie.

      </div>

    );

  }





  return (

    <div
      className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >

      {technologies.map((technology) => (

        <TechnologyCard

          key={technology.id}

          technology={technology}

          onEdit={onEdit}

          onDelete={onDelete}

        />

      ))}

    </div>

  );

}