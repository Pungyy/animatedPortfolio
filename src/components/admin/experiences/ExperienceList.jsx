import ExperienceCard from "./ExperienceCard";



export default function ExperienceList({
  experiences = [],
  onEdit,
  onDelete,
}) {


  if (!experiences.length) {

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

        Aucune expérience.

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

      {
        experiences.map((experience) => (

          <ExperienceCard

            key={experience.id}

            experience={experience}

            onEdit={onEdit}

            onDelete={onDelete}

          />

        ))
      }


    </div>

  );

}