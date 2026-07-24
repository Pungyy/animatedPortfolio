import {
  useState,
} from "react";

import {
  Outlet,
} from "react-router-dom";


import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";



export default function AdminLayout() {


  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);



  return (

    <div
      className="
        flex
        min-h-screen
        bg-zinc-950
        text-white
      "
    >



      <Sidebar

        open={sidebarOpen}

        setOpen={setSidebarOpen}

      />





      <div
        className="
          flex
          flex-1
          flex-col
          overflow-hidden
        "
      >


        <Header

          setSidebarOpen={setSidebarOpen}

        />



        <main
          className="
            flex-1
            overflow-y-auto
            p-4
            sm:p-6
            lg:p-8
          "
        >

          <Outlet />

        </main>


      </div>



    </div>

  );

}