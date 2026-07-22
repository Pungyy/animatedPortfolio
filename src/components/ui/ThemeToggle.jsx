import {
  Sun,
  Moon,
} from "lucide-react";


import {
  useContext,
} from "react";


import ThemeContext from "../../contexts/ThemeContext";



export default function ThemeToggle(){


  const {
    theme,
    toggleTheme,
  } = useContext(ThemeContext);




  return (

    <button

      onClick={toggleTheme}


      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-[var(--border)]
        bg-[var(--surface)]
        text-[var(--text-primary)]
        transition
        hover:bg-[var(--surface-muted)]
      "

    >

      {
        theme === "light"
          ?
          <Moon size={18}/>
          :
          <Sun size={18}/>
      }


    </button>

  );

}