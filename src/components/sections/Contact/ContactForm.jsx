import {
  useState,
} from "react";


import {
  toast,
} from "sonner";


import Button from "../../ui/Button";


import {
  createContact,
} from "../../../services/contacts.service";



export default function ContactForm() {


  const [form,setForm] = useState({

    name:"",

    email:"",

    message:"",

  });



  const [loading,setLoading] = useState(false);





  function handleChange(e){


    setForm((prev)=>({

      ...prev,

      [e.target.name]:e.target.value,

    }));

  }






  async function handleSubmit(e){


    e.preventDefault();



    setLoading(true);



    try{


      await createContact(form);



      toast.success(
        "Message envoyé avec succès."
      );



      setForm({

        name:"",

        email:"",

        message:"",

      });



    }
    catch(error){


      console.error(error);



      toast.error(
        "Impossible d'envoyer le message."
      );


    }
    finally{


      setLoading(false);


    }


  }






  return (

    <form

      onSubmit={handleSubmit}

      className="
        rounded-[40px]
        border
        border-neutral-200
        bg-white
        p-10
        shadow-[0_30px_80px_rgba(0,0,0,.08)]
      "

    >



      <div className="space-y-6">



        <input

          type="text"

          name="name"

          placeholder="Votre nom"

          value={form.name}

          onChange={handleChange}

          className="
            w-full
            rounded-2xl
            border
            border-neutral-200
            bg-neutral-50
            px-5
            py-4
            outline-none
            transition
            focus:border-black
          "

        />






        <input

          type="email"

          name="email"

          placeholder="Votre email"

          value={form.email}

          onChange={handleChange}

          className="
            w-full
            rounded-2xl
            border
            border-neutral-200
            bg-neutral-50
            px-5
            py-4
            outline-none
            transition
            focus:border-black
          "

        />







        <textarea

          name="message"

          placeholder="Votre message"

          rows="5"

          value={form.message}

          onChange={handleChange}

          className="
            w-full
            resize-none
            rounded-2xl
            border
            border-neutral-200
            bg-neutral-50
            px-5
            py-4
            outline-none
            transition
            focus:border-black
          "

        />




        <Button

          type="submit"

          disabled={loading}

        >

          {
            loading
              ? "Envoi..."
              : "Envoyer le message"
          }


        </Button>



      </div>


    </form>

  );

}