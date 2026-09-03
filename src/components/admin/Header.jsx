import { useContext } from "react";
import { Menu, Sun, Moon, LogOut } from "lucide-react";

import useAuth from "../../hooks/useAuth";
import ThemeContext from "../../contexts/ThemeContext";

export default function Header({ setSidebarOpen }) {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/80 px-5 backdrop-blur-xl sm:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] lg:hidden"
        >
          <Menu size={20} />
        </button>

        <p className="hidden text-sm text-[var(--text-secondary)] sm:block">
          {user?.email}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
          title="Changer de thème"
        >
          {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
        </button>

        <button
          onClick={signOut}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--danger-soft)] hover:text-[var(--danger)]"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Déconnexion</span>
        </button>
      </div>
    </header>
  );
}
