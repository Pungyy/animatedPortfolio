import {
  NavLink,
} from "react-router-dom";



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






export default function Sidebar() {


  return (

    <aside
      className="
        flex
        min-h-screen
        w-72
        flex-col
        border-r
        border-zinc-800
        bg-zinc-950
      "
    >


      <div
        className="
          border-b
          border-zinc-800
          p-8
        "
      >

        <h1
          className="
            text-2xl
            font-bold
            text-white
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
          links.map((link) => (

            <NavLink

              key={link.to}

              to={link.to}

              end={
                link.to === "/admin"
              }

              className={({isActive}) =>

                isActive

                  ? `
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

  );

}