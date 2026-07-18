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
          border-zinc-800
          bg-zinc-900
          p-10
          text-center
          text-zinc-400
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