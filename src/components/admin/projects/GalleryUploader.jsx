import { useEffect, useState } from "react";
import { Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

import {
  uploadImage,
  deleteImage,
} from "../../../services/storage.service";

import {
  getProjectGallery,
  createGalleryImage,
  deleteGalleryImage,
} from "../../../services/gallery.service";



export default function GalleryUploader({
  projectId,
}) {


  const [images, setImages] = useState([]);

  const [uploading, setUploading] = useState(false);





  useEffect(() => {

    if (!projectId) return;

    loadGallery();

  }, [projectId]);







  async function loadGallery() {

    try {

      const data =
        await getProjectGallery(
          projectId
        );


      setImages(data);


    } catch (error) {

      console.error(error);

      toast.error(
        "Impossible de charger la galerie."
      );

    }

  }









  async function handleUpload(e) {

    const files =
      Array.from(
        e.target.files
      );


    if (!files.length) return;



    try {

      setUploading(true);



      for (const file of files) {


        const url =
          await uploadImage(
            file,
            "projects"
          );



        await createGalleryImage({

          project_id: projectId,

          image_url: url,

          display_order:
            images.length,

        });


      }




      await loadGallery();



      toast.success(
        "Images ajoutées."
      );



    } catch(error) {


      console.error(error);


      toast.error(
        "Erreur upload galerie."
      );



    } finally {


      setUploading(false);


    }

  }









  async function handleDelete(image) {


    try {


      await deleteGalleryImage(
        image.id
      );


      await deleteImage(
        image.image_url
      );



      setImages((prev) =>
        prev.filter(
          (item) =>
            item.id !== image.id
        )
      );



      toast.success(
        "Image supprimée."
      );



    } catch(error) {


      console.error(error);


      toast.error(
        "Erreur suppression."
      );


    }

  }









  return (

    <div
      className="
        space-y-5
      "
    >



      <label
        className="
          flex
          cursor-pointer
          items-center
          justify-center
          gap-3
          rounded-xl
          border
          border-dashed
          border-zinc-700
          bg-zinc-900
          p-6
          text-zinc-400
          transition
          hover:border-violet-500
          hover:text-white
        "
      >


        <Upload size={20}/>


        {
          uploading
            ? "Upload en cours..."
            : "Ajouter des images"
        }



        <input

          type="file"

          multiple

          accept="image/*"

          onChange={handleUpload}

          className="hidden"

        />


      </label>








      {
        images.length > 0 && (

          <div
            className="
              grid
              grid-cols-2
              gap-4
              md:grid-cols-3
            "
          >


            {
              images.map((image) => (

                <div

                  key={image.id}

                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-xl
                    border
                    border-zinc-800
                  "

                >


                  <img

                    src={image.image_url}

                    alt="Projet"

                    className="
                      h-32
                      w-full
                      object-cover
                    "

                  />



                  <button

                    onClick={() =>
                      handleDelete(image)
                    }

                    className="
                      absolute
                      right-2
                      top-2
                      rounded-lg
                      bg-red-600/80
                      p-2
                      text-white
                      opacity-0
                      transition
                      group-hover:opacity-100
                    "

                  >

                    <Trash2 size={16}/>


                  </button>



                </div>


              ))
            }



          </div>

        )
      }





    </div>

  );

}