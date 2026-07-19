import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";
import Checkbox from "../ui/Checkbox";
import Divider from "../ui/Divider";
import Button from "../ui/Button";

import ImageUploader from "../upload/ImageUploader";

import TechnologySelector from "./TechnologySelector";
import GalleryUploader from "./GalleryUploader";



const categoryOptions = [

  {
    value: "Web",
    label: "Web",
  },

  {
    value: "Mobile",
    label: "Mobile",
  },

  {
    value: "API",
    label: "API",
  },

  {
    value: "Desktop",
    label: "Desktop",
  },

  {
    value: "Full Stack",
    label: "Full Stack",
  },

  {
    value: "UI/UX",
    label: "UI / UX",
  },

];





const statusOptions = [

  {
    value: "En cours",
    label: "En cours",
  },

  {
    value: "Terminé",
    label: "Terminé",
  },

  {
    value: "Maintenance",
    label: "Maintenance",
  },

  {
    value: "Archivé",
    label: "Archivé",
  },

];









export default function ProjectForm({

  project,

  onChange,

  onUploadImage,

}) {




  function addFeature() {


    const features = [

      ...(project.features || []),

      {
        id: Date.now(),

        title: "",
      },

    ];



    onChange({

      target: {

        name:"features",

        value:features,

      },

    });


  }








  function updateFeature(index,value){


    const features = [

      ...(project.features || [])

    ];



    features[index] = {

      ...features[index],

      title:value,

    };



    onChange({

      target:{

        name:"features",

        value:features,

      },

    });


  }








  function removeFeature(index){


    const features =

      project.features.filter(

        (_,i)=>i !== index

      );



    onChange({

      target:{

        name:"features",

        value:features,

      },

    });


  }









  return (

    <div className="space-y-10">





      <Divider title="Informations générales" />



      <div className="grid gap-6 md:grid-cols-2">


        <Input
          label="Titre"
          name="title"
          value={project.title}
          onChange={onChange}
        />



        <Input
          label="Slug"
          name="slug"
          value={project.slug}
          onChange={onChange}
        />



        <Input
          label="Client"
          name="client"
          value={project.client}
          onChange={onChange}
        />



        <Input
          label="Année"
          type="number"
          name="year"
          value={project.year}
          onChange={onChange}
        />


      </div>









      <Divider title="Descriptions" />



      <Textarea

        label="Description courte"

        name="short_description"

        value={project.short_description}

        onChange={onChange}

      />



      <Textarea

        label="Description complète"

        name="description"

        value={project.description}

        onChange={onChange}

      />









      <Divider title="Publication" />



      <div className="grid gap-6 md:grid-cols-2">


        <Select

          label="Catégorie"

          name="category"

          value={project.category}

          onChange={onChange}

          options={categoryOptions}

        />



        <Select

          label="Statut"

          name="status"

          value={project.status}

          onChange={onChange}

          options={statusOptions}

        />



        <Input

          label="Ordre d'affichage"

          type="number"

          name="display_order"

          value={project.display_order}

          onChange={onChange}

        />


      </div>






      <div className="flex flex-wrap gap-8">


        <Checkbox

          label="Projet mis en avant"

          name="featured"

          checked={project.featured}

          onChange={onChange}

        />



        <Checkbox

          label="Publié"

          name="published"

          checked={project.published}

          onChange={onChange}

        />


      </div>









      <Divider title="Liens" />



      <Input

        label="GitHub"

        name="github_url"

        value={project.github_url}

        onChange={onChange}

      />



      <Input

        label="Démo"

        name="demo_url"

        value={project.demo_url}

        onChange={onChange}

      />









      <Divider title="Technologies" />



      <TechnologySelector

        selected={project.technologies || []}

        onChange={(values)=>

          onChange({

            target:{

              name:"technologies",

              value:values,

            },

          })

        }

      />









      <Divider title="Fonctionnalités" />



      <div className="space-y-4">


        {
          (project.features || []).map(

            (feature,index)=>(

              <div
                key={feature.id}
                className="flex gap-3"
              >


                <Input

                  label={`Fonctionnalité ${index + 1}`}

                  value={feature.title}

                  onChange={(e)=>

                    updateFeature(
                      index,
                      e.target.value
                    )

                  }

                />



                <button

                  type="button"

                  onClick={()=>removeFeature(index)}

                  className="
                    mt-8
                    rounded-xl
                    px-4
                    text-red-400
                  "

                >

                  ×

                </button>


              </div>


            )
          )
        }



        <Button

          type="button"

          onClick={addFeature}

        >

          + Ajouter une fonctionnalité

        </Button>


      </div>









      <Divider title="Image principale" />



      <ImageUploader

        value={project.cover_image}

        onUpload={onUploadImage}

      />









      {
        project.id && (

          <>

            <Divider title="Galerie du projet" />


            <GalleryUploader

              projectId={project.id}

            />


          </>

        )
      }





    </div>

  );

}