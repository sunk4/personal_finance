import { createRoot } from "react-dom/client";
import "normalize.css";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "react-oidc-context";
import oidcConfig from "./config/oidcConfig.ts";
import { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider {...oidcConfig}>
        <App />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
