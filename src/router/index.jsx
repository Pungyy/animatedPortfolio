import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

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

export default function Router() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<Project />} />
        <Route path="/coulisses" element={<Coulisses />} />
        <Route path="/uses" element={<Uses />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        <Route path="/admin/login" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/projects" element={<Projects />} />
          <Route path="/admin/technologies" element={<Technologies />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/skills" element={<Skills />} />
          <Route path="/admin/experiences" element={<Experiences />} />
          <Route path="/admin/contacts" element={<Contacts />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/posts" element={<Posts />} />
          <Route path="/admin/testimonials" element={<Testimonials />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
