import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  Briefcase,
  Sparkles,
  Mail,
  ArrowUpRight,
} from "lucide-react";

import {
  getDashboardStats,
  getRecentProjects,
  getRecentContacts,
} from "../../services/dashboard.service";

import SectionTitle from "../../components/admin/ui/SectionTitle";
import Card from "../../components/admin/ui/Card";

const STAT_META = [
  { key: "projects", label: "Projets", icon: FolderKanban, to: "/admin/projects" },
  { key: "experiences", label: "Expériences", icon: Briefcase, to: "/admin/experiences" },
  { key: "skills", label: "Compétences", icon: Sparkles, to: "/admin/skills" },
  { key: "contacts", label: "Messages", icon: Mail, to: "/admin/contacts" },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    experiences: 0,
    skills: 0,
    contacts: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const [statsData, projectsData, contactsData] = await Promise.all([
          getDashboardStats(),
          getRecentProjects(),
          getRecentContacts(),
        ]);

        if (!ignore) {
          setStats(statsData);
          setRecentProjects(projectsData);
          setRecentContacts(contactsData);
        }
      } catch (error) {
        console.error("Dashboard error :", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="space-y-8">
      <SectionTitle
        title="Dashboard"
        description="Vue d'ensemble de ton portfolio."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STAT_META.map(({ key, label, icon: Icon, to }) => (
          <Link
            key={key}
            to={to}
            className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Icon size={18} />
              </span>
              <ArrowUpRight
                size={16}
                className="text-[var(--text-muted)] opacity-0 transition group-hover:opacity-100"
              />
            </div>

            <p className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
              {loading ? "—" : stats[key]}
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card
          title="Derniers projets"
          actions={
            <Link
              to="/admin/projects"
              className="text-sm font-medium text-[var(--accent)] hover:opacity-80"
            >
              Tout voir
            </Link>
          }
        >
          <div className="space-y-2">
            {loading && (
              <p className="text-sm text-[var(--text-muted)]">Chargement...</p>
            )}

            {!loading && recentProjects.length === 0 && (
              <p className="text-sm text-[var(--text-muted)]">Aucun projet.</p>
            )}

            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-[var(--surface-muted)]"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                    {project.title}
                  </p>
                  <p className="truncate text-xs text-[var(--text-secondary)]">
                    {project.short_description}
                  </p>
                </div>
                {project.year && (
                  <span className="ml-3 shrink-0 rounded-full bg-[var(--surface-muted)] px-2.5 py-1 text-xs text-[var(--text-secondary)]">
                    {project.year}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Derniers messages"
          actions={
            <Link
              to="/admin/contacts"
              className="text-sm font-medium text-[var(--accent)] hover:opacity-80"
            >
              Tout voir
            </Link>
          }
        >
          <div className="space-y-2">
            {loading && (
              <p className="text-sm text-[var(--text-muted)]">Chargement...</p>
            )}

            {!loading && recentContacts.length === 0 && (
              <p className="text-sm text-[var(--text-muted)]">Aucun message.</p>
            )}

            {recentContacts.map((contact) => (
              <div
                key={contact.id}
                className="rounded-xl px-3 py-2.5 transition hover:bg-[var(--surface-muted)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                    {contact.name}
                  </p>
                  {!contact.read && (
                    <span className="shrink-0 rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-xs font-medium text-[var(--accent)]">
                      Nouveau
                    </span>
                  )}
                </div>
                <p className="mt-1 line-clamp-1 text-xs text-[var(--text-secondary)]">
                  {contact.subject || contact.message}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
