import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Login from "../pages/admin/Login";
import ProtectedRoute from "../components/admin/ProtectedRoute";

// Public — split
const Project = lazy(() => import("../pages/Project"));
const Coulisses = lazy(() => import("../pages/Coulisses"));
const Uses = lazy(() => import("../pages/Uses"));
const Blog = lazy(() => import("../pages/Blog"));
const BlogPost = lazy(() => import("../pages/BlogPost"));

// Admin — split (never loaded for public visitors)
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Projects = lazy(() => import("../pages/admin/Projects"));
const Settings = lazy(() => import("../pages/admin/Settings"));
const Skills = lazy(() => import("../pages/admin/Skills"));
const Experiences = lazy(() => import("../pages/admin/Experiences"));
const Contacts = lazy(() => import("../pages/admin/Contacts"));
const Technologies = lazy(() => import("../pages/admin/Technologies"));
const Analytics = lazy(() => import("../pages/admin/Analytics"));
const Posts = lazy(() => import("../pages/admin/Posts"));
const Testimonials = lazy(() => import("../pages/admin/Testimonials"));

function Fallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
    </div>
  );
}

// Routes publiques : le <Routes> est re-clé sur le pathname pour
// qu'AnimatePresence détecte le changement de page et anime la transition
// (voir MainLayout, qui anime son <main>).
function PublicRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<Fallback />}>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/project/:slug" element={<Project />} />
          <Route path="/coulisses" element={<Coulisses />} />
          <Route path="/uses" element={<Uses />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

// Routes admin : pas de re-clé ni de transition ici — AdminLayout (sidebar,
// scroll de la liste...) doit rester monté d'une page du dashboard à l'autre.
function AdminRoutes() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="login" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="technologies" element={<Technologies />} />
          <Route path="settings" element={<Settings />} />
          <Route path="skills" element={<Skills />} />
          <Route path="experiences" element={<Experiences />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="posts" element={<Posts />} />
          <Route path="testimonials" element={<Testimonials />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default function Router() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/*" element={<PublicRoutes />} />
    </Routes>
  );
}
