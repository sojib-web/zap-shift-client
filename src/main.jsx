// @ts-nocheck
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./router/routers.jsx";

import "aos/dist/aos.css";
import Aos from "aos";
import AuthProvider from "./contexts/AuthContext/Authprovider.jsx";

Aos.init();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="font-urbanist bg-gray-100 p-4">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>
);
