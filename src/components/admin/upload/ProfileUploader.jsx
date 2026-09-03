import {
  Upload,
  Trash2,
} from "lucide-react";

import {
  uploadImage,
  deleteImage,
} from "../../../services/storage.service";

import {
  toast,
} from "sonner";


export default function ProfileUploader({
  image,
  onChange,
}) {



  async function handleUpload(e) {

    const file = e.target.files[0];


    if (!file) return;



    try {


      toast.loading(
        "Upload de la photo...",
        {
          id:"profile-upload",
        }
      );



      const url = await uploadImage(
        file,
        "profile"
      );



      onChange(url);



      toast.success(
        "Photo mise à jour.",
        {
          id:"profile-upload",
        }
      );



    } catch(error) {


      console.error(error);


      toast.error(
        "Erreur lors de l'upload.",
        {
          id:"profile-upload",
        }
      );

    }


  }






  async function handleDelete(){


    try {


      await deleteImage(image);



      onChange("");



      toast.success(
        "Photo supprimée."
      );



    } catch(error){

      console.error(error);

      toast.error(
        "Impossible de supprimer l'image."
      );

    }


  }






  return (

    <div
      className="
        flex
        items-center
        gap-8
      "
    >


      <div
        className="
          relative
          h-40
          w-40
          overflow-hidden
          rounded-[32px]
          border
          border-[var(--border)]
          bg-[var(--surface)]
        "
      >


        {
          image ? (

            <img

              src={image}

              alt="Profil"

              className="
                h-full
                w-full
                object-cover
              "

            />

          )

          :

          (

            <div
              className="
                flex
                h-full
                items-center
                justify-center
                text-[var(--text-primary)]0
              "
            >

              Aucune image

            </div>

          )

        }



      </div>






      <div
        className="
          space-y-3
        "
      >


        <label

          className="
            flex
            cursor-pointer
            items-center
            gap-2
            rounded-xl
            bg-[var(--accent)]
            px-5
            py-3
            text-sm
            font-medium
            text-[var(--accent-foreground)]
            transition
            hover:opacity-90
          "

        >

          <Upload size={16}/>

          Choisir une image


          <input

            type="file"

            accept="image/*"

            onChange={handleUpload}

            className="hidden"

          />

        </label>





        {
          image && (

            <button

              type="button"

              onClick={handleDelete}

              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-[var(--danger)]
                px-5
                py-3
                text-sm
                text-[var(--danger)]
                transition
                hover:opacity-90/10
              "

            >

              <Trash2 size={16}/>

              Supprimer

            </button>

          )
        }


      </div>



    </div>

  );

}