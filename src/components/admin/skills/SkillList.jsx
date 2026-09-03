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
          border-[var(--border)]
          bg-[var(--surface)]
          p-10
          text-center
          text-[var(--text-secondary)]
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