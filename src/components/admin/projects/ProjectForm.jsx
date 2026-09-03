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
        description: "",
      },

    ];



    onChange({

      target: {

        name:"features",

        value:features,

      },

    });


  }








  function updateFeature(index, field, value) {


    const features = [

      ...(project.features || [])

    ];



    features[index] = {

      ...features[index],

      [field]: value,

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









      <Divider title="Étude de cas" />

      <Textarea
        label="Contexte"
        name="context"
        rows={3}
        value={project.context || ""}
        onChange={onChange}
        placeholder="Le problème / la situation de départ."
      />

      <Textarea
        label="Ma contribution"
        name="contribution"
        rows={3}
        value={project.contribution || ""}
        onChange={onChange}
        placeholder="Ton rôle, ce que tu as fait concrètement."
      />

      <Textarea
        label="Résultat"
        name="outcome"
        rows={3}
        value={project.outcome || ""}
        onChange={onChange}
        placeholder="L'impact, idéalement avec des chiffres."
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

        {(project.features || []).map((feature, index) => (
          <div
            key={feature.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium text-[var(--text-secondary)]">
                Fonctionnalité {index + 1}
              </p>
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="rounded-lg px-2 py-1 text-sm text-[var(--text-muted)] transition hover:bg-[var(--danger-soft)] hover:text-[var(--danger)]"
              >
                Retirer
              </button>
            </div>

            <div className="mt-3 space-y-3">
              <Input
                name={`feature_title_${index}`}
                value={feature.title}
                placeholder="Titre de la fonctionnalité"
                onChange={(e) => updateFeature(index, "title", e.target.value)}
              />
              <Textarea
                name={`feature_desc_${index}`}
                rows={2}
                value={feature.description || ""}
                placeholder="Explique brièvement le problème résolu ou l'impact."
                onChange={(e) => updateFeature(index, "description", e.target.value)}
              />
            </div>
          </div>
        ))}



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