import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "reaxify/providers";
import "reaxify/style.css";
import App from "./App.tsx";
import "./assets/css/index.css";
import { i18n } from "./boot";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <ThemeProvider classes={{ card: { base: "shadow-soft" } }}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
