import {
  Routes,
  Route,
} from "react-router-dom";


// Public
import Home from "../pages/Home";
import Project from "../pages/Project";
import NotFound from "../pages/NotFound";


// Auth
import Login from "../pages/admin/Login";


// Admin pages
import Dashboard from "../pages/admin/Dashboard";
import Projects from "../pages/admin/Projects";
import Settings from "../pages/admin/Settings";
import Skills from "../pages/admin/Skills";
import Experiences from "../pages/admin/Experiences";
import Contacts from "../pages/admin/Contacts";
import Technologies from "../pages/admin/Technologies";
import Analytics from "../pages/admin/Analytics";


// Admin components
import ProtectedRoute from "../components/admin/ProtectedRoute";


// Layout
import AdminLayout from "../layouts/AdminLayout";






export default function Router() {


  return (


    <Routes>


      {/* =========================
          Portfolio public
      ========================== */}


      <Route

        path="/"

        element={
          <Home />
        }

      />



      <Route

        path="/project/:slug"

        element={
          <Project />
        }

      />








      {/* =========================
          Authentication
      ========================== */}


      <Route

        path="/admin/login"

        element={
          <Login />
        }

      />










      {/* =========================
          Administration protégée
      ========================== */}


      <Route


        element={

          <ProtectedRoute>

            <AdminLayout />

          </ProtectedRoute>

        }


      >



        <Route

          path="/admin"

          element={
            <Dashboard />
          }

        />





        <Route

          path="/admin/projects"

          element={
            <Projects />
          }

        />





        <Route

          path="/admin/technologies"

          element={
            <Technologies />
          }

        />





        <Route

          path="/admin/settings"

          element={
            <Settings />
          }

        />





        <Route

          path="/admin/skills"

          element={
            <Skills />
          }

        />





        <Route

          path="/admin/experiences"

          element={
            <Experiences />
          }

        />





        <Route

          path="/admin/contacts"

          element={
            <Contacts />
          }

        />





        <Route

          path="/admin/analytics"

          element={
            <Analytics />
          }

        />



      </Route>









      {/* =========================
          404
      ========================== */}


      <Route

        path="*"

        element={
          <NotFound />
        }

      />



    </Routes>


  );


}