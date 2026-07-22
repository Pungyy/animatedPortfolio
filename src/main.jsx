import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import {
  Toaster,
} from "sonner";


import App from "./App";


import AuthProvider from "./providers/AuthProvider";

import PortfolioProvider from "./providers/PortfolioProvider";

import {
  ThemeProvider,
} from "./contexts/ThemeContext";


import "./styles/globals.css";





ReactDOM.createRoot(
  document.getElementById("root")
)
.render(

  <React.StrictMode>


    <BrowserRouter>


      <ThemeProvider>


        <AuthProvider>


          <PortfolioProvider>


            <App />


            <Toaster

              position="top-right"

              richColors

              closeButton

            />


          </PortfolioProvider>


        </AuthProvider>


      </ThemeProvider>


    </BrowserRouter>


  </React.StrictMode>

);