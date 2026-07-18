import { motion } from "framer-motion";

import usePortfolio from "../../../hooks/usePortfolio";

import TechnologyIcon from "../../ui/TechnologyIcon";



export default function TechStack() {


  const {
    technologies,
  } = usePortfolio();




  return (

    <div

      className="
        flex
        flex-wrap
        gap-3
      "

    >

      {
        technologies
        ?.slice(0,8)
        .map((tech,index)=>(


          <motion.div


            key={tech.id}


            initial={{
              opacity:0,
              y:20,
            }}


            whileInView={{
              opacity:1,
              y:0,
            }}


            viewport={{
              once:true,
            }}


            transition={{
              delay:index * .08,
            }}



            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              px-5
              py-2.5
              text-sm
              font-medium
              transition
              hover:-translate-y-1
            "



            style={{

              backgroundColor:
                `${tech.color}12`,

              borderColor:
                `${tech.color}40`,

              color:
                tech.color,

            }}


          >


            <TechnologyIcon

              name={tech.icon}

              size={15}

            />


            {tech.name}



          </motion.div>


        ))
      }


    </div>

  );

}