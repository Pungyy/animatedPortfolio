import {
  motion,
} from "framer-motion";


import Container from "../../ui/Container";
import Heading from "../../ui/Heading";

import ContactForm from "./ContactForm";



export default function Contact() {


  return (

    <section

      id="contact"

      className="
        relative
        overflow-hidden
        py-40
      "

    >


      <Container>


        <Heading

          eyebrow="CONTACT"

          title="Un projet en tête ?"

          description="
            Une idée, une collaboration ou simplement
            envie d'échanger ? Je serai ravi d'en discuter.
          "

          align="center"

        />






        <motion.div


          initial={{
            opacity:0,
            y:40,
          }}


          whileInView={{
            opacity:1,
            y:0,
          }}


          viewport={{
            once:true,
          }}


          transition={{
            duration:.8,
          }}



          className="
            mx-auto
            mt-20
            max-w-3xl
          "


        >


          <ContactForm />


        </motion.div>



      </Container>


    </section>

  );

}