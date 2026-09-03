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
        border-[var(--border)]
        bg-[var(--surface)]
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
            text-[var(--text-secondary)]
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
                bg-[var(--accent-soft)]
                text-[var(--accent)]
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
          text-[var(--text-primary)]
        "

      >

        {value}


      </p>





    </div>


  );


}