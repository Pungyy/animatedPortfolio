import {
  Menu,
} from "lucide-react";


import useAuth from "../../hooks/useAuth";



export default function Header({

  setSidebarOpen,

}) {


  const {
    user,
    signOut,
  } = useAuth();



  return (


    <header

      className="
        flex
        h-20
        items-center
        justify-between
        border-b
        border-zinc-800
        bg-zinc-900
        px-4
        sm:px-8
      "

    >



      <div

        className="
          flex
          items-center
          gap-4
        "

      >

        <button

          onClick={() => setSidebarOpen(true)}

          className="
            rounded-lg
            p-2
            text-zinc-400
            hover:bg-zinc-800
            lg:hidden
          "

        >

          <Menu size={24}/>

        </button>




        <div>

          <h2 className="text-xl font-semibold">

            Bonjour 👋

          </h2>


          <p className="text-sm text-zinc-400">

            {user?.email}

          </p>


        </div>


      </div>





      <button

        onClick={signOut}

        className="
          rounded-lg
          bg-red-500
          px-4
          py-2
          text-sm
          transition
          hover:bg-red-600
          sm:px-5
        "

      >

        Déconnexion

      </button>



    </header>

  );

}