import { useEffect, useState } from "react";

import {
  getSettings,
  updateSettings,
} from "../../services/settings.service";

import Card from "../../components/admin/ui/Card";
import Input from "../../components/admin/ui/Input";
import Textarea from "../../components/admin/ui/Textarea";
import Button from "../../components/admin/ui/Button";
import SectionTitle from "../../components/admin/ui/SectionTitle";
import ProfileUploader from "../../components/admin/upload/ProfileUploader";

import { toast } from "sonner";


export default function Settings() {


  const [settings, setSettings] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);





  useEffect(() => {

    loadSettings();

  }, []);






  async function loadSettings() {

    try {

      const data = await getSettings();

      setSettings(data);


    } catch (error) {

      console.error(error);

      toast.error(
        "Impossible de charger les paramètres."
      );


    } finally {

      setLoading(false);

    }

  }







  function handleChange(e) {

    const {
      name,
      value,
    } = e.target;



    setSettings((prev) => ({

      ...prev,

      [name]: value,

    }));

  }








  async function handleSubmit(e) {

    e.preventDefault();


    setSaving(true);



    try {


      const updated =
        await updateSettings(settings);



      setSettings(updated);



      toast.success(
        "Paramètres enregistrés avec succès !"
      );



    } catch(error) {


      console.error(error);



      toast.error(
        "Impossible d'enregistrer les paramètres."
      );



    } finally {


      setSaving(false);


    }


  }







  if (loading) {

    return (

      <p className="text-white">

        Chargement...

      </p>

    );

  }







  return (

    <form

      onSubmit={handleSubmit}

      className="
        mx-auto
        max-w-6xl
        space-y-8
      "

    >



      <SectionTitle

        title="Paramètres"

        description="
          Gère les informations de ton portfolio.
        "

      />







      {/* INFORMATIONS PERSONNELLES */}


      <Card title="👤 Informations personnelles">


        <div className="space-y-8">



          {/* PHOTO */}


          <div>


            <h3

              className="
                mb-4
                text-sm
                font-medium
                text-zinc-400
              "

            >

              Photo de profil

            </h3>



            <ProfileUploader

              image={
                settings.profile_image
              }

              onChange={(url)=>{

                setSettings((prev)=>({

                  ...prev,

                  profile_image:url,

                }));

              }}

            />


          </div>







          <div

            className="
              grid
              gap-6
              md:grid-cols-2
            "

          >


            <Input

              label="Prénom"

              name="first_name"

              value={
                settings.first_name || ""
              }

              onChange={handleChange}

            />



            <Input

              label="Nom"

              name="last_name"

              value={
                settings.last_name || ""
              }

              onChange={handleChange}

            />




            <Input

              label="Email"

              name="email"

              value={
                settings.email || ""
              }

              onChange={handleChange}

            />




            <Input

              label="Téléphone"

              name="phone"

              value={
                settings.phone || ""
              }

              onChange={handleChange}

            />






            <div className="md:col-span-2">


              <Input

                label="Localisation"

                name="location"

                value={
                  settings.location || ""
                }

                onChange={handleChange}

              />


            </div>



          </div>



        </div>



      </Card>









      {/* HERO */}


      <Card title="🚀 Hero">


        <div className="space-y-6">


          <Input

            label="Titre"

            name="hero_title"

            value={
              settings.hero_title || ""
            }

            onChange={handleChange}

          />




          <Input

            label="Sous-titre"

            name="hero_subtitle"

            value={
              settings.hero_subtitle || ""
            }

            onChange={handleChange}

          />




          <Textarea

            label="Description"

            name="hero_description"

            value={
              settings.hero_description || ""
            }

            onChange={handleChange}

          />


        </div>


      </Card>









      {/* ABOUT */}


      <Card title="👨 À propos">


        <div className="space-y-6">


          <Input

            label="Titre"

            name="about_title"

            value={
              settings.about_title || ""
            }

            onChange={handleChange}

          />




          <Textarea

            label="Description"

            name="about_description"

            value={
              settings.about_description || ""
            }

            onChange={handleChange}

          />


        </div>


      </Card>









      {/* RESEAUX */}


      <Card title="🌐 Réseaux sociaux">


        <div

          className="
            grid
            gap-6
            md:grid-cols-2
          "

        >



          <Input

            label="GitHub"

            name="github_url"

            value={
              settings.github_url || ""
            }

            onChange={handleChange}

          />




          <Input

            label="LinkedIn"

            name="linkedin_url"

            value={
              settings.linkedin_url || ""
            }

            onChange={handleChange}

          />




          <Input

            label="Instagram"

            name="instagram_url"

            value={
              settings.instagram_url || ""
            }

            onChange={handleChange}

          />




          <Input

            label="Discord"

            name="discord"

            value={
              settings.discord || ""
            }

            onChange={handleChange}

          />




          <div className="md:col-span-2">


            <Input

              label="Calendly"

              name="calendly_url"

              value={
                settings.calendly_url || ""
              }

              onChange={handleChange}

            />


          </div>



        </div>



      </Card>









      <div className="flex justify-end">


        <Button

          type="submit"

          disabled={saving}

        >

          {
            saving
              ? "Enregistrement..."
              : "Enregistrer"
          }


        </Button>


      </div>





    </form>

  );

}