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
          border-[var(--border)]
          bg-[var(--surface)]
          p-10
          text-center
          text-[var(--text-secondary)]
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