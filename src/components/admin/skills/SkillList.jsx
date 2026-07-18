import SkillCard from "./SkillCard";


export default function SkillList({
  skills = [],
  onEdit,
  onDelete,
}) {


  if (!skills.length) {

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

        Aucune compétence.

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

      {skills.map((skill) => (

        <SkillCard

          key={skill.id}

          skill={skill}

          onEdit={onEdit}

          onDelete={onDelete}

        />

      ))}

    </div>

  );

}