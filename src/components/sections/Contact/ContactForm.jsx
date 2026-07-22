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








  const inputClass = `

    w-full

    rounded-2xl

    border

    border-[var(--border)]

    bg-[var(--surface-muted)]

    px-5

    py-4

    text-[var(--text-primary)]

    placeholder:text-[var(--text-secondary)]

    outline-none

    transition

    focus:border-[var(--text-primary)]

    focus:ring-2

    focus:ring-[var(--accent)]/20

  `;








  return (


    <form


      onSubmit={handleSubmit}



      className="

        rounded-[40px]

        border

        border-[var(--border)]

        bg-[var(--surface)]

        p-10

        shadow-[var(--shadow-card)]

      "



    >





      <div className="space-y-6">







        <input


          type="text"


          name="name"


          placeholder="Votre nom"


          value={form.name}


          onChange={handleChange}



          className={inputClass}



        />









        <input


          type="email"


          name="email"


          placeholder="Votre email"


          value={form.email}


          onChange={handleChange}



          className={inputClass}



        />









        <textarea



          name="message"



          placeholder="Votre message"



          rows="5"



          value={form.message}



          onChange={handleChange}



          className={`
            ${inputClass}

            resize-none
          `}



        />









        <Button


          type="submit"



          disabled={loading}



        >


          {
            loading

            ?

            "Envoi..."

            :

            "Envoyer le message"
          }



        </Button>





      </div>




    </form>


  );

}