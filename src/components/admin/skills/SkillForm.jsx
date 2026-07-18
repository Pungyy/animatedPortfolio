export default function SkillForm({
  skill,
  onChange,
}) {


  return (

    <div
      className="
        space-y-5
      "
    >


      <input
        name="name"
        value={skill.name || ""}
        onChange={onChange}
        placeholder="Nom"
        className="
          w-full
          rounded-xl
          bg-zinc-900
          border
          border-zinc-800
          px-4
          py-3
          text-white
        "
      />



      <input
        name="category"
        value={skill.category || ""}
        onChange={onChange}
        placeholder="Catégorie"
        className="
          w-full
          rounded-xl
          bg-zinc-900
          border
          border-zinc-800
          px-4
          py-3
          text-white
        "
      />



      <input
        name="level"
        type="number"
        min="0"
        max="100"
        value={skill.level || ""}
        onChange={onChange}
        placeholder="Niveau"
        className="
          w-full
          rounded-xl
          bg-zinc-900
          border
          border-zinc-800
          px-4
          py-3
          text-white
        "
      />



      <input
        name="icon"
        value={skill.icon || ""}
        onChange={onChange}
        placeholder="Icon (react, js...)"
        className="
          w-full
          rounded-xl
          bg-zinc-900
          border
          border-zinc-800
          px-4
          py-3
          text-white
        "
      />



      <div>

        <label className="text-sm text-zinc-400">
          Couleur
        </label>


        <input
          name="color"
          type="color"
          value={skill.color || ""}
          onChange={onChange}
          className="
            mt-2
            h-12
            w-full
          "
        />

      </div>




      <input
        name="display_order"
        type="number"
        value={skill.display_order || ""}
        onChange={onChange}
        placeholder="Ordre"
        className="
          w-full
          rounded-xl
          bg-zinc-900
          border
          border-zinc-800
          px-4
          py-3
          text-white
        "
      />


    </div>

  );

}