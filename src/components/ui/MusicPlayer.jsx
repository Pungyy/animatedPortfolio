import {
  useEffect,
  useRef,
  useState,
} from "react";


import {
  motion,
  AnimatePresence,
} from "framer-motion";


import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Music,
} from "lucide-react";



import digitalNight from "../../assets/audio/digital-night.mp3";
import cyberDreams from "../../assets/audio/cyber-dreams.mp3";


const tracks = [


    {
    id: 1,
    title: "Interstellar",
    artist: "Space Ambient",
    src: cyberDreams,
  },
  
  {
    id: 2,
    title: "Digital Night",
    artist: "Synthwave",
    src: digitalNight,
  },

   

];



export default function MusicPlayer() {


  const audioRef = useRef(null);




  const [open,setOpen] = useState(false);



  const [playing,setPlaying] = useState(() =>

    localStorage.getItem(
      "musicPlaying"
    ) === "true"

  );



  const [muted,setMuted] = useState(() =>

    localStorage.getItem(
      "musicMuted"
    ) === "true"

  );



  const [volume,setVolume] = useState(() =>

    Number(
      localStorage.getItem(
        "musicVolume"
      )
    ) || 0.35

  );



  const [current,setCurrent] = useState(() =>

    Number(
      localStorage.getItem(
        "musicTrack"
      )
    ) || 0

  );







  const track = tracks[current];









  useEffect(() => {


    const audio = audioRef.current;


    if(!audio) return;



    audio.volume = volume;

    audio.muted = muted;





    if(playing){


      audio.play()
        .catch(()=>{});


    }else{


      audio.pause();


    }






    localStorage.setItem(
      "musicPlaying",
      playing
    );


    localStorage.setItem(
      "musicMuted",
      muted
    );


    localStorage.setItem(
      "musicVolume",
      volume
    );


    localStorage.setItem(
      "musicTrack",
      current
    );



  },[
    playing,
    muted,
    volume,
    current,
  ]);









  function togglePlay(){


    setPlaying(
      prev => !prev
    );


  }









  function changeTrack(direction){


    let next =
      current + direction;



    if(next < 0){

      next = tracks.length - 1;

    }



    if(next >= tracks.length){

      next = 0;

    }



    setCurrent(next);

    setPlaying(true);


  }









  return (

    <>





      <audio

        ref={audioRef}

        src={track.src}

        loop

      />









      <motion.div

        initial={{
          opacity:0,
          y:30,
        }}

        animate={{
          opacity:1,
          y:0,
        }}

        transition={{
          duration:.6,
          delay:1,
        }}

        className="
          fixed
          bottom-6
          right-6
          z-50
        "

      >







        <AnimatePresence>

          {
            open && (


              <motion.div


                initial={{
                  opacity:0,
                  y:20,
                  scale:.95,
                }}


                animate={{
                  opacity:1,
                  y:0,
                  scale:1,
                }}


                exit={{
                  opacity:0,
                  y:20,
                  scale:.95,
                }}



                className="
                  mb-4
                  w-80
                  rounded-[32px]
                  border
                  border-neutral-200
                  bg-white/80
                  p-6
                  shadow-[0_30px_90px_rgba(0,0,0,.15)]
                  backdrop-blur-xl
                "


              >







                <div

                  className="
                    flex
                    items-center
                    gap-4
                  "

                >





                  <motion.div

                    animate={

                      playing
                      ?
                      {
                        rotate:360,
                      }
                      :
                      {}

                    }


                    transition={{

                      duration:6,

                      repeat:Infinity,

                      ease:"linear",

                    }}



                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-black
                      text-white
                    "

                  >

                    <Music size={22}/>


                  </motion.div>








                  <div>

                    <p

                      className="
                        font-semibold
                        text-neutral-950
                      "

                    >

                      {track.title}


                    </p>




                    <p

                      className="
                        text-sm
                        text-neutral-500
                      "

                    >

                      {track.artist}


                    </p>


                  </div>



                </div>









                <div

                  className="
                    mt-7
                    flex
                    items-center
                    justify-center
                    gap-4
                  "

                >





                  <button

                    onClick={() =>
                      changeTrack(-1)
                    }

                    className="
                      rounded-full
                      p-2
                      transition
                      hover:bg-neutral-100
                    "

                  >

                    <ChevronLeft size={18}/>


                  </button>







                  <button

                    onClick={togglePlay}

                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      bg-black
                      text-white
                      transition
                      hover:scale-105
                    "

                  >

                    {
                      playing

                      ?

                      <Pause size={20}/>

                      :

                      <Play size={20}/>

                    }


                  </button>







                  <button

                    onClick={() =>
                      changeTrack(1)
                    }

                    className="
                      rounded-full
                      p-2
                      transition
                      hover:bg-neutral-100
                    "

                  >

                    <ChevronRight size={18}/>


                  </button>





                </div>









                <div

                  className="
                    mt-6
                    flex
                    items-center
                    gap-3
                  "

                >



                  <button

                    onClick={() =>
                      setMuted(
                        prev => !prev
                      )
                    }

                    className="
                      rounded-full
                      p-2
                      transition
                      hover:bg-neutral-100
                    "

                  >

                    {
                      muted

                      ?

                      <VolumeX size={18}/>

                      :

                      <Volume2 size={18}/>

                    }


                  </button>






                  <input

                    type="range"

                    min="0"

                    max="1"

                    step="0.01"

                    value={volume}

                    onChange={(e)=>

                      setVolume(
                        Number(
                          e.target.value
                        )
                      )

                    }

                    className="
                      w-full
                    "

                  />



                </div>






              </motion.div>


            )
          }

        </AnimatePresence>









        <motion.button


          onClick={() =>
            setOpen(
              prev => !prev
            )
          }



          whileHover={{
            scale:1.08,
          }}



          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-neutral-200
            bg-white/80
            shadow-[0_20px_60px_rgba(0,0,0,.15)]
            backdrop-blur-xl
          "


        >


          <Music size={22}/>


        </motion.button>





      </motion.div>






    </>

  );

}