import { NavLink } from "react-router-dom";
import {
  X,
  LayoutDashboard,
  FolderKanban,
  Sparkles,
  Boxes,
  Briefcase,
  FileText,
  BarChart3,
  Mail,
  Settings,
} from "lucide-react";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/projects", label: "Projets", icon: FolderKanban },
  { to: "/admin/skills", label: "Compétences", icon: Sparkles },
  { to: "/admin/technologies", label: "Technologies", icon: Boxes },
  { to: "/admin/experiences", label: "Expériences", icon: Briefcase },
  { to: "/admin/posts", label: "Blog", icon: FileText },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/contacts", label: "Messages", icon: Mail },
  { to: "/admin/settings", label: "Paramètres", icon: Settings },
];

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden " +
          (open ? "opacity-100" : "pointer-events-none opacity-0")
        }
      />

      <aside
        className={
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[var(--border)] " +
          "bg-[var(--surface)] transition-transform duration-300 " +
          "lg:static lg:translate-x-0 " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              Portfolio
            </p>
            <p className="text-xs text-[var(--text-muted)]">Administration</p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition " +
                (isActive
                  ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]")
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-6 py-4">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
          >
            Voir le site →
          </a>
        </div>
      </aside>
    </>
  );
}
