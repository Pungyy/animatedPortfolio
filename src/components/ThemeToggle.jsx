import { Moon, Sun } from "lucide-react";
import useTheme from "../hooks/useTheme";


export default function ThemeToggle() {

  const {
    theme,
    toggleTheme,
  } = useTheme();


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
        hover:scale-105
      "
    >
      {
        theme === "light"
          ? <Moon size={18} />
          : <Sun size={18} />
      }
    </button>
  );
}