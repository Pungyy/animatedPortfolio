import {
  motion,
} from "framer-motion";


import usePortfolio from "../../../hooks/usePortfolio";

import TechnologyIcon from "../../ui/TechnologyIcon";



export default function TechStack() {


  const {
    skills,
    loading,
  } = usePortfolio();




  if (loading || !skills?.length) {
    return null;
  }




  return (

    <div

      className="
        flex
        flex-wrap
        gap-3
      "

    >


      {
        skills.slice(0,8).map(
          (skill,index)=>(


            <motion.div


              key={skill.id}


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
                duration:.5,
              }}



              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                px-5
                py-2
                text-sm
                font-medium
              "



              style={{

                backgroundColor:
                  `${skill.color}12`,

                borderColor:
                  `${skill.color}40`,

                color:
                  skill.color,

              }}



            >



              {
                skill.icon && (

                  <TechnologyIcon

                    name={skill.icon}

                    size={15}

                  />

                )
              }





              {skill.name}



            </motion.div>


          )
        )
      }


    </div>

  );

}