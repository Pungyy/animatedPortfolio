import {
  useState,
} from "react";


import {
  toast,
} from "sonner";


import Drawer from "../ui/Drawer";

import Button from "../ui/Button";


import ProjectForm from "./ProjectForm";



import {
  createProject,
  updateProject,
} from "../../../services/projects.service";


import {
  syncProjectTechnologies,
} from "../../../services/projectTechnologies.service";


import {
  syncProjectFeatures,
} from "../../../services/projectFeatures.service";


import {
  uploadImage,
  deleteImage,
} from "../../../services/storage.service";








const emptyProject = {


  title: "",


  slug: "",


  short_description: "",


  description: "",


  cover_image: "",


  github_url: "",


  demo_url: "",


  featured: false,


  published: true,


  display_order: 0,


  year: new Date().getFullYear(),


  client: "",


  category: "",


  status: "",


  technologies: [],


  features: [],


  gallery: [],


};









export default function ProjectDrawer({

  open,

  project,

  onClose,

  onSaved,

}) {


  const buildForm = () => {

    if (!project) {
      return { ...emptyProject };
    }

    return {
      ...emptyProject,
      ...project,
      technologies:
        project.technologies?.map((tech) =>
          typeof tech === "object" ? tech.id : tech
        ) || [],
      features: project.features || [],
      gallery: project.gallery || [],
    };

  };

  const [
    form,
    setForm,
  ] = useState(buildForm);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [syncKey, setSyncKey] = useState({ project, open });

  if (syncKey.project !== project || syncKey.open !== open) {
    setSyncKey({ project, open });
    setForm(buildForm());
  }









  function handleChange(e){


    const {

      name,

      value,

      type,

      checked,

    } = e.target;



    setForm((prev)=>({


      ...prev,


      [name]:

        type === "checkbox"

          ?

          checked

          :

          value,


    }));


  }









  async function handleUploadImage(file){


    try{


      if(!file){



        if(form.cover_image){


          await deleteImage(
            form.cover_image
          );


        }



        setForm((prev)=>({


          ...prev,


          cover_image:"",


        }));



        toast.success(
          "Image supprimée."
        );


        return;


      }








      toast.loading(

        "Upload en cours...",

        {
          id:"upload",
        }

      );








      const url =

        await uploadImage(

          file,

          "projects"

        );








      setForm((prev)=>({


        ...prev,


        cover_image:url,


      }));








      toast.success(

        "Image ajoutée.",

        {
          id:"upload",
        }

      );



    }


    catch(error){


      console.error(error);



      toast.error(

        "Erreur upload image.",

        {
          id:"upload",
        }

      );


    }


  }









  async function handleSubmit(){


    if(!form.title.trim()){


      toast.error(
        "Le titre est obligatoire."
      );


      return;


    }








    try{


      setSaving(true);








      const {


        technologies = [],


        features = [],


        gallery = [],


        ...projectData


      } = form;









      let result;








      if(form.id){


        result =

          await updateProject(

            projectData

          );


      }


      else{


        result =

          await createProject(

            projectData

          );


      }









      await syncProjectTechnologies(

        result.id,

        technologies

      );








      await syncProjectFeatures(

        result.id,

        features

      );








      onSaved({

        ...result,

        technologies,

        features,

        gallery,

      });








      toast.success(

        form.id

          ?

          "Projet modifié."

          :

          "Projet créé."

      );








      onClose();



    }


    catch(error){


      console.error(

        "PROJECT SAVE ERROR:",

        error

      );



      toast.error(

        "Erreur lors de l'enregistrement."

      );


    }


    finally{


      setSaving(false);


    }


  }









  return (


    <Drawer


      open={open}


      title={

        form.id

          ?

          "Modifier le projet"

          :

          "Nouveau projet"

      }


      onClose={onClose}


    >








      <div

        className="
          flex
          h-full
          flex-col
        "

      >






        <div

          className="
            flex-1
            overflow-y-auto
            pb-6
          "

        >



          <ProjectForm

            project={form}

            onChange={handleChange}

            onUploadImage={handleUploadImage}

          />



        </div>








        <div


          className="
            sticky
            bottom-0
            mt-6
            flex
            flex-col
            gap-3
            border-t
            border-zinc-800
            bg-zinc-950
            pt-5

            sm:flex-row
            sm:justify-end
          "


        >






          <button


            onClick={onClose}


            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              px-6
              py-3
              text-zinc-300
              transition
              hover:bg-zinc-800

              sm:w-auto
            "


          >

            Annuler


          </button>









          <Button


            onClick={handleSubmit}


            disabled={saving}


          >


            {

              saving

                ?

                "Enregistrement..."

                :

                "Enregistrer"

            }


          </Button>








        </div>







      </div>






    </Drawer>


  );


}