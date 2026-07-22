export default function AnalyticsCard({

  title,

  value,

  icon: Icon,

}) {



  return (


    <div

      className="
        rounded-[28px]
        border
        border-zinc-800
        bg-zinc-900
        p-6
        shadow-lg
        shadow-black/20
      "

    >





      <div

        className="
          flex
          items-center
          justify-between
        "

      >



        <p

          className="
            text-sm
            text-zinc-400
          "

        >

          {title}


        </p>







        {
          Icon && (


            <div

              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-violet-500/10
                text-violet-400
              "

            >


              <Icon size={20}/>


            </div>


          )
        }



      </div>








      <p

        className="
          mt-6
          text-4xl
          font-bold
          tracking-tight
          text-white
        "

      >

        {value}


      </p>





    </div>


  );


}