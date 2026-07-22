import {
  motion,
} from "framer-motion";






export default function ProjectGallery({
  project,
}) {



  if (
    !project.gallery ||
    project.gallery.length === 0
  ) {

    return null;

  }







  const images = project.gallery;








  return (


    <motion.section


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
        margin:"-100px",
      }}


      transition={{
        duration:.7,
      }}



    >







      <div


        className="
          mb-10
        "


      >



        <h2


          className="
            text-4xl

            font-semibold

            tracking-tight

            text-[var(--text-primary)]
          "


        >

          Galerie


        </h2>








        <p


          className="
            mt-4

            text-lg

            text-[var(--text-secondary)]
          "


        >

          Quelques aperçus du projet.


        </p>



      </div>












      <div


        className="
          grid

          gap-6

          lg:grid-cols-12
        "


      >







        {/* IMAGE PRINCIPALE */}



        {
          images[0] && (



            <motion.div



              initial={{
                opacity:0,
                scale:.96,
              }}



              whileInView={{
                opacity:1,
                scale:1,
              }}



              viewport={{
                once:true,
              }}



              transition={{
                duration:.7,
              }}



              className="
                group

                overflow-hidden

                rounded-[44px]

                border

                border-[var(--border)]

                bg-[var(--surface)]

                p-3

                shadow-[var(--shadow-card)]

                lg:col-span-12
              "



            >



              <motion.img



                src={images[0].image_url}



                alt="Aperçu projet"




                whileHover={{
                  scale:1.04,
                }}




                transition={{
                  duration:.6,
                }}




                className="
                  aspect-[16/8]

                  w-full

                  rounded-[34px]

                  object-cover
                "



              />



            </motion.div>



          )
        }












        {/* IMAGES SECONDAIRES */}



        {
          images.slice(1).map(

            (image,index)=>(



              <motion.div



                key={image.id}



                initial={{
                  opacity:0,
                  y:30,
                }}



                whileInView={{
                  opacity:1,
                  y:0,
                }}



                viewport={{
                  once:true,
                }}



                transition={{
                  duration:.5,
                  delay:index * .1,
                }}




                className="
                  group

                  overflow-hidden

                  rounded-[36px]

                  border

                  border-[var(--border)]

                  bg-[var(--surface)]

                  p-3

                  shadow-[var(--shadow-card)]

                  lg:col-span-6
                "



              >





                <motion.img



                  src={image.image_url}



                  alt="Capture projet"




                  whileHover={{
                    scale:1.05,
                  }}




                  transition={{
                    duration:.6,
                  }}





                  className="
                    aspect-[16/10]

                    w-full

                    rounded-[28px]

                    object-cover
                  "




                />







              </motion.div>



            )

          )
        }








      </div>







    </motion.section>


  );

}