import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/settings", label: "Settings" },
  { to: "/admin/skills", label: "Skills" },
  { to: "/admin/experiences", label: "Experiences" },
  { to: "/admin/contacts", label: "Contacts" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 p-8">
        <h1 className="text-2xl font-bold">Portfolio CMS</h1>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/admin"}
            className={({ isActive }) =>
              `rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}