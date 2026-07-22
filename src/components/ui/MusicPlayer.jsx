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
        "musicChoice"
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
      "musicChoice",
      "enabled"
    );


    setShowIntro(false);

    setPlaying(true);

  }






  function refuseMusic(){


    localStorage.setItem(
      "musicChoice",
      "disabled"
    );


    setShowIntro(false);

    setPlaying(false);

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









      {/* INTRO MUSIC */}


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
                z-[999]
                flex
                items-center
                justify-center
                bg-black/40
                backdrop-blur-xl
              "


            >




              <motion.div


                initial={{
                  opacity:0,
                  scale:.9,
                }}


                animate={{
                  opacity:1,
                  scale:1,
                }}


                transition={{
                  duration:.5,
                }}



                className="
                  w-[360px]
                  rounded-[40px]
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  p-8
                  text-center
                  shadow-[0_40px_120px_rgba(0,0,0,.3)]
                "


              >





                <div

                  className="
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--surface-muted)]
                    text-[var(--text-primary)]
                  "

                >

                  <Music size={28}/>


                </div>







                <h2

                  className="
                    mt-8
                    text-3xl
                    font-semibold
                    tracking-tight
                    text-[var(--text-primary)]
                  "

                >

                  Bienvenue


                </h2>







                <p

                  className="
                    mt-4
                    text-sm
                    leading-7
                    text-[var(--text-secondary)]
                  "

                >

                  Activer une ambiance musicale
                  pendant votre visite ?


                </p>








                <div

                  className="
                    mt-8
                    flex
                    gap-3
                  "

                >






                  <button


                    onClick={refuseMusic}



                    className="
                      flex-1
                      rounded-full
                      border
                      border-[var(--border)]
                      px-5
                      py-3
                      text-sm
                      font-medium
                      text-[var(--text-primary)]
                      transition
                      hover:bg-[var(--surface-muted)]
                    "


                  >

                    Non


                  </button>







                  <button


                    onClick={acceptMusic}



                    className="
                      flex-1
                      rounded-full
                      bg-[var(--text-primary)]
                      px-5
                      py-3
                      text-sm
                      font-medium
                      text-[var(--background)]
                      transition
                      hover:opacity-80
                    "


                  >

                    Oui


                  </button>






                </div>





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
                fixed
                bottom-28
                right-6
                z-50
                w-[340px]
                overflow-hidden
                rounded-[36px]
                border
                border-[var(--border)]
                bg-[var(--surface)]
                p-5
                shadow-[0_30px_100px_rgba(0,0,0,.25)]
              "


            >






              <div

                className="
                  flex
                  items-center
                  gap-4
                "

              >





                <img

                  src={track.cover}

                  alt={track.title}

                  className="
                    h-16
                    w-16
                    rounded-2xl
                    object-cover
                  "

                />








                <div className="flex-1">


                  <h3

                    className="
                      text-sm
                      font-semibold
                      text-[var(--text-primary)]
                    "

                  >

                    {track.title}


                  </h3>





                  <p

                    className="
                      mt-1
                      text-xs
                      text-[var(--text-secondary)]
                    "

                  >

                    {track.artist}


                  </p>


                </div>






              </div>

                            {/* PROGRESS */}


              <div

                className="
                  mt-6
                "

              >


                <input

                  type="range"

                  min="0"

                  max={duration || 0}

                  value={progress}

                  onChange={handleSeek}

                  className="
                    w-full
                    accent-[var(--text-primary)]
                  "

                />



                <div

                  className="
                    mt-2
                    flex
                    justify-between
                    text-xs
                    text-[var(--text-secondary)]
                  "

                >

                  <span>
                    {formatTime(progress)}
                  </span>


                  <span>
                    {formatTime(duration)}
                  </span>


                </div>


              </div>









              {/* CONTROLS */}



              <div

                className="
                  mt-6
                  flex
                  items-center
                  justify-between
                "

              >





                <button

                  onClick={() =>
                    changeTrack(-1)
                  }


                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--border)]
                    text-[var(--text-primary)]
                    transition
                    hover:bg-[var(--surface-muted)]
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
                    bg-[var(--text-primary)]
                    text-[var(--background)]
                    transition
                    hover:opacity-80
                  "


                >

                  {
                    playing

                    ?

                    <Pause size={22}/>

                    :

                    <Play size={22}/>

                  }


                </button>







                <button

                  onClick={() =>
                    changeTrack(1)
                  }



                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--border)]
                    text-[var(--text-primary)]
                    transition
                    hover:bg-[var(--surface-muted)]
                  "


                >

                  <ChevronRight size={18}/>


                </button>





              </div>









              {/* VOLUME */}



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
                    setMuted(!muted)
                  }



                  className="
                    text-[var(--text-secondary)]
                    transition
                    hover:text-[var(--text-primary)]
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

                  value={
                    muted
                    ? 0
                    : volume
                  }


                  onChange={(e)=>{

                    setVolume(
                      Number(e.target.value)
                    );

                    setMuted(false);

                  }}



                  className="
                    flex-1
                    accent-[var(--text-primary)]
                  "


                />





              </div>





            </motion.div>


          )
        }


      </AnimatePresence>













      {/* FLOATING BUTTON */}



      <motion.button


        onClick={() =>
          setOpen(!open)
        }



        whileHover={{
          scale:1.05,
        }}



        whileTap={{
          scale:.95,
        }}



        className="
          fixed
          bottom-6
          right-6
          z-50
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          border
          border-[var(--border)]
          bg-[var(--surface)]
          text-[var(--text-primary)]
          shadow-[0_20px_60px_rgba(0,0,0,.15)]
          transition
        "


      >


        <Music size={22}/>


      </motion.button>





    </>

  );

}