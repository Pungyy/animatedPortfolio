import {
  NavLink,
} from "react-router-dom";

import {
  X,
} from "lucide-react";



const links = [

  {
    to: "/admin",
    label: "Dashboard",
  },

  {
    to: "/admin/projects",
    label: "Projects",
  },

  {
    to: "/admin/technologies",
    label: "Technologies",
  },

  {
    to: "/admin/settings",
    label: "Settings",
  },

  {
    to: "/admin/skills",
    label: "Skills",
  },

  {
    to: "/admin/experiences",
    label: "Experiences",
  },

  {
    to: "/admin/contacts",
    label: "Contacts",
  },

  {
    to: "/admin/analytics",
    label: "Analytics",
  },

];





export default function Sidebar({

  open,

  setOpen,

}) {


  return (


    <>


      {
        open && (

          <div

            onClick={() => setOpen(false)}

            className="
              fixed
              inset-0
              z-40
              bg-black/60
              lg:hidden
            "

          />

        )
      }





      <aside

        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          w-72
          flex-col
          border-r
          border-zinc-800
          bg-zinc-950
          transition-transform
          duration-300

          lg:static
          lg:translate-x-0

          ${
            open
            ? "translate-x-0"
            : "-translate-x-full"
          }
        `}

      >





        <div

          className="
            flex
            items-center
            justify-between
            border-b
            border-zinc-800
            p-8
          "

        >

          <div>

            <h1
              className="
                text-2xl
                font-bold
              "
            >
              Portfolio CMS
            </h1>


            <p
              className="
                mt-1
                text-sm
                text-zinc-500
              "
            >
              Administration
            </p>

          </div>



          <button

            onClick={() => setOpen(false)}

            className="
              lg:hidden
              text-zinc-400
            "

          >

            <X size={22}/>

          </button>


        </div>






        <nav

          className="
            flex
            flex-1
            flex-col
            gap-2
            p-4
          "

        >

          {
            links.map((link)=>(


              <NavLink

                key={link.to}

                to={link.to}

                onClick={() => setOpen(false)}

                end={
                  link.to === "/admin"
                }


                className={({isActive}) =>

                  isActive

                  ?

                  `
                  rounded-xl
                  bg-violet-600
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-white
                  `

                  :

                  `
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-zinc-400
                  transition
                  hover:bg-zinc-900
                  hover:text-white
                  `

                }

              >

                {link.label}

              </NavLink>


            ))
          }


        </nav>



      </aside>


    </>

  );

}