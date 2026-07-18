export default function ExperienceForm({
  experience,
  onChange,
}) {


  const inputClass = `
    w-full
    rounded-xl
    border
    border-zinc-800
    bg-zinc-900
    px-4
    py-3
    text-sm
    text-white
    outline-none
    transition
    placeholder:text-zinc-600
    focus:border-violet-500
  `;


  const labelClass = `
    mb-2
    block
    text-sm
    text-zinc-400
  `;



  return (

    <div className="space-y-6">



      {/* ENTREPRISE + POSTE */}

      <div
        className="
          grid
          gap-5
          md:grid-cols-2
        "
      >

        <div>

          <label className={labelClass}>
            Entreprise
          </label>


          <input

            name="company"

            value={
              experience.company || ""
            }

            onChange={onChange}

            placeholder="Ex: Novances IT"

            className={inputClass}

          />


        </div>





        <div>

          <label className={labelClass}>
            Poste
          </label>


          <input

            name="position"

            value={
              experience.position || ""
            }

            onChange={onChange}

            placeholder="Ex: Développeur Full Stack"

            className={inputClass}

          />


        </div>


      </div>







      {/* LIEU */}

      <div>

        <label className={labelClass}>
          Lieu
        </label>


        <input

          name="location"

          value={
            experience.location || ""
          }

          onChange={onChange}

          placeholder="Ex: Lyon, France"

          className={inputClass}

        />


      </div>









      {/* DESCRIPTION */}

      <div>

        <label className={labelClass}>
          Description
        </label>


        <textarea

          name="description"

          value={
            experience.description || ""
          }

          onChange={onChange}

          rows={5}

          placeholder="Décris tes missions..."

          className={`
            ${inputClass}
            resize-none
          `}

        />


      </div>









      {/* DATES */}

      <div
        className="
          grid
          gap-5
          md:grid-cols-2
        "
      >


        <div>

          <label className={labelClass}>
            Date début
          </label>


          <input

            type="date"

            name="start_date"

            value={
              experience.start_date || ""
            }

            onChange={onChange}

            className={inputClass}

          />


        </div>








        <div>

          <label className={labelClass}>
            Date fin
          </label>


          <input

            type="date"

            name="end_date"

            value={
              experience.end_date || ""
            }

            onChange={onChange}

            disabled={
              experience.current_job
            }

            className={`
              ${inputClass}
              disabled:opacity-40
            `}

          />


        </div>


      </div>









      {/* POSTE ACTUEL */}

      <label

        className="
          flex
          cursor-pointer
          items-center
          gap-3
          text-sm
          text-zinc-300
        "

      >


        <input

          type="checkbox"

          name="current_job"

          checked={
            experience.current_job || false
          }

          onChange={onChange}

          className="
            h-4
            w-4
            rounded
            border-zinc-700
            bg-zinc-900
          "

        />


        Poste actuel


      </label>









      {/* ORDRE */}

      <div>

        <label className={labelClass}>
          Ordre d'affichage
        </label>


        <input

          type="number"

          name="display_order"

          value={
            experience.display_order ?? 0
          }

          onChange={onChange}

          className={inputClass}

        />


      </div>




    </div>

  );

}