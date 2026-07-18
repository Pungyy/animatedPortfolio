import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Project from "../pages/Project";
import NotFound from "../pages/NotFound";

import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import Projects from "../pages/admin/Projects";
import Settings from "../pages/admin/Settings";
import Skills from "../pages/admin/Skills";
import Experiences from "../pages/admin/Experiences";
import Contacts from "../pages/admin/Contacts";

import ProtectedRoute from "../components/admin/ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";

export default function Router() {
  return (
    <Routes>
      {/* Portfolio public */}
      <Route path="/" element={<Home />} />
      <Route path="/project/:slug" element={<Project />} />

      {/* Auth */}
      <Route path="/admin/login" element={<Login />} />

      {/* Dashboard */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/projects" element={<Projects />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/skills" element={<Skills />} />
        <Route path="/admin/experiences" element={<Experiences />} />
        <Route path="/admin/contacts" element={<Contacts />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}