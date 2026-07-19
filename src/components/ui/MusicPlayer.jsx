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



import cyberDreams from "../../assets/audio/cyber-dreams.mp3";
import digitalNight from "../../assets/audio/digital-night.mp3";


import spaceCover from "../../assets/covers/space-ambient.png";
import digitalCover from "../../assets/covers/digital-night.png";








const tracks = [

  {
    id:1,
    title:"Interstellar",
    artist:"Space Ambient",
    src:cyberDreams,
    cover:spaceCover,
  },


  {
    id:2,
    title:"Digital Night",
    artist:"Synthwave",
    src:digitalNight,
    cover:digitalCover,
  },


];









export default function MusicPlayer(){


  const audioRef = useRef(null);




  const [open,setOpen] = useState(false);



  const [showIntro,setShowIntro] = useState(
    () =>
      !localStorage.getItem(
        "musicAccepted"
      )
  );



  const [playing,setPlaying] = useState(
    () =>
      localStorage.getItem(
        "musicPlaying"
      ) === "true"
  );



  const [muted,setMuted] = useState(
    () =>
      localStorage.getItem(
        "musicMuted"
      ) === "true"
  );



  const [volume,setVolume] = useState(
    () =>
      Number(
        localStorage.getItem(
          "musicVolume"
        )
      ) || 0.35
  );



  const [current,setCurrent] = useState(
    () =>
      Number(
        localStorage.getItem(
          "musicTrack"
        )
      ) || 0
  );



  const [progress,setProgress] = useState(0);


  const [duration,setDuration] = useState(0);





  const track = tracks[current];









  useEffect(()=>{


    const audio =
      audioRef.current;



    if(!audio)
      return;



    audio.volume = volume;

    audio.muted = muted;





    if(playing){


      audio.play()
        .catch(()=>{});


    }
    else{


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









  useEffect(()=>{


    const audio =
      audioRef.current;



    if(!audio)
      return;



    audio.load();



    if(playing){

      audio.play()
        .catch(()=>{});

    }



  },[current]);









  useEffect(()=>{


    const audio =
      audioRef.current;



    if(!audio)
      return;




    function updateProgress(){


      setProgress(
        audio.currentTime
      );


    }




    function updateDuration(){


      setDuration(
        audio.duration
      );


    }




    audio.addEventListener(
      "timeupdate",
      updateProgress
    );


    audio.addEventListener(
      "loadedmetadata",
      updateDuration
    );




    return ()=>{


      audio.removeEventListener(
        "timeupdate",
        updateProgress
      );


      audio.removeEventListener(
        "loadedmetadata",
        updateDuration
      );


    };



  },[]);









  function togglePlay(){


    setPlaying(
      prev=>!prev
    );


  }









  function changeTrack(direction){


    let next =
      current + direction;



    if(next < 0){

      next =
        tracks.length - 1;

    }



    if(next >= tracks.length){

      next = 0;

    }



    setCurrent(next);

    setPlaying(true);


  }









  function acceptMusic(){


    localStorage.setItem(
      "musicAccepted",
      "true"
    );


    setShowIntro(false);

    setPlaying(true);


  }









  function handleSeek(e){


    const audio =
      audioRef.current;



    if(!audio)
      return;



    audio.currentTime =
      Number(
        e.target.value
      );


  }









  function formatTime(time){


    if(!time || isNaN(time))
      return "0:00";



    const minutes =
      Math.floor(
        time / 60
      );


    const seconds =
      Math.floor(
        time % 60
      )
      .toString()
      .padStart(2,"0");



    return `${minutes}:${seconds}`;


  }









  return (

    <>





      <audio

        ref={audioRef}

        src={track.src}

        loop

      />









      {/* INTRO AUDIO */}


      <AnimatePresence>

      {
        showIntro && (


          <motion.div

            initial={{
              opacity:0,
            }}

            animate={{
              opacity:1,
            }}

            exit={{
              opacity:0,
            }}


            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/30
              backdrop-blur-xl
            "

          >



            <motion.div

              initial={{
                scale:.9,
                opacity:0,
              }}

              animate={{
                scale:1,
                opacity:1,
              }}

              className="
                w-[360px]
                rounded-[40px]
                bg-white
                p-6
                shadow-[0_40px_120px_rgba(0,0,0,.3)]
              "

            >



              <img

                src={track.cover}

                alt={track.title}

                className="
                  aspect-square
                  w-full
                  rounded-[32px]
                  object-cover
                "

              />





              <h2

                className="
                  mt-6
                  text-center
                  text-2xl
                  font-semibold
                  text-neutral-950
                "

              >

                Expérience immersive

              </h2>





              <p

                className="
                  mt-3
                  text-center
                  text-sm
                  text-neutral-500
                "

              >

                Activez la musique d'ambiance
                pendant votre visite.

              </p>





              <button

                onClick={acceptMusic}

                className="
                  mt-8
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-black
                  py-4
                  text-white
                "

              >

                <Play size={18}/>

                Démarrer

              </button>



            </motion.div>



          </motion.div>


        )
      }

      </AnimatePresence>









      {/* PLAYER */}



      <AnimatePresence>


      {
        open && (


          <motion.div


            initial={{
              opacity:0,
              y:30,
              scale:.95,
            }}


            animate={{
              opacity:1,
              y:0,
              scale:1,
            }}


            exit={{
              opacity:0,
              y:30,
              scale:.95,
            }}



            className="
              fixed
              bottom-24
              right-6
              z-50
              w-[340px]
              rounded-[36px]
              border
              border-neutral-200
              bg-white/80
              p-5
              shadow-[0_40px_120px_rgba(0,0,0,.18)]
              backdrop-blur-2xl
            "

          >




            <motion.img

                src={track.cover}

                initial={{
                    opacity:0,
                    scale:.95,
                }}

                animate={{
                    opacity:1,
                    scale:1,
                }}

                transition={{
                    duration:.5,
                }}

                whileHover={{
                    scale:1.03,
                }}

                className="
                    mx-auto
                    h-44
                    w-44
                    rounded-[32px]
                    object-cover
                    shadow-[0_25px_70px_rgba(0,0,0,.18)]
                "

            />







            <div className="mt-5 text-center">


              <h3 className="
                text-lg
                font-semibold
                text-neutral-950
              ">

                {track.title}

              </h3>


              <p className="
                text-sm
                text-neutral-500
              ">

                {track.artist}

              </p>


            </div>







            <input

              type="range"

              min="0"

              max={duration || 0}

              value={progress}

              onChange={handleSeek}

              className="
                mt-6
                w-full
                accent-black
              "

            />



            <div className="
              mt-2
              flex
              justify-between
              text-xs
              text-neutral-400
            ">

              <span>
                {formatTime(progress)}
              </span>

              <span>
                {formatTime(duration)}
              </span>


            </div>








            <div className="
              mt-6
              flex
              justify-center
              items-center
              gap-5
            ">


              <button
                onClick={() =>
                  changeTrack(-1)
                }
              >

                <ChevronLeft/>

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
                "

              >

                {
                  playing
                  ?
                  <Pause/>
                  :
                  <Play/>
                }

              </button>




              <button
                onClick={() =>
                  changeTrack(1)
                }
              >

                <ChevronRight/>

              </button>



            </div>







            <div className="
              mt-6
              flex
              items-center
              gap-3
            ">


              <button

                onClick={() =>
                  setMuted(
                    prev=>!prev
                  )
                }

              >

                {
                  muted
                  ?
                  <VolumeX/>
                  :
                  <Volume2/>
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
                  accent-black
                "

              />


            </div>



          </motion.div>


        )
      }


      </AnimatePresence>









      {/* FLOAT BUTTON */}


      <motion.button


        onClick={() =>
          setOpen(
            prev=>!prev
          )
        }


        whileHover={{
          scale:1.08,
        }}



        className="
          fixed
          bottom-6
          right-6
          z-50
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          border
          border-neutral-200
          bg-white/80
          shadow-[0_30px_80px_rgba(0,0,0,.18)]
          backdrop-blur-xl
        "


      >

        <Music size={24}/>


      </motion.button>





    </>

  );

}