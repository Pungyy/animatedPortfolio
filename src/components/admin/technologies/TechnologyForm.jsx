import Input from "../ui/Input";
import Divider from "../ui/Divider";


export default function TechnologyForm({
  technology,
  onChange,
}) {

  return (

    <div
      className="
        space-y-10
      "
    >


      <Divider title="Informations générales" />



      <div
        className="
          space-y-6
        "
      >

        <Input
          label="Nom"
          name="name"
          value={technology.name}
          onChange={onChange}
        />



        <Input
          label="Icône"
          name="icon"
          value={technology.icon}
          onChange={onChange}
          placeholder="react, nextjs, tailwindcss..."
        />



        <Input
          label="Couleur"
          name="color"
          value={technology.color}
          onChange={onChange}
          placeholder="#61DAFB"
        />

      </div>





      {technology.color && (

        <div
          className="
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900
            p-6
          "
        >

          <p
            className="
              mb-4
              text-sm
              text-zinc-400
            "
          >
            Aperçu
          </p>



          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              px-4
              py-2
              text-sm
              font-medium
            "

            style={{
              backgroundColor:
                `${technology.color}20`,

              color:
                technology.color,

              border:
                `1px solid ${technology.color}50`,
            }}
          >

            {technology.name || "Technologie"}

          </div>


        </div>

      )}


    </div>

  );

}