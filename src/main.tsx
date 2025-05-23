import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router";
import { AxiosProvider } from "reaxify/axios";
import { ThemeProvider } from "reaxify/providers";
import "reaxify/style.css";
import App from "./App.tsx";
import "./assets/css/index.css";
import { i18n } from "./boot";
import appConfig from "./constants/appConfig.ts";

declare module "reaxify/types" {
  interface ExtendBadgeVariant {}
  interface ExtendButtonVariant {}
  interface ExtendTypographyVariant {}
  interface ExtendColor {}
  interface ExtendSize {}
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <ThemeProvider
          extendClasses={{
            card: { base: "shadow-soft" },
            progress: { color: { primary: "bg-gray-200" } },
            button: {
              color: {
                primary: { solid: "ring-2 ring-offset-2 focus:ring-primary" },
                secondary: {
                  solid: "ring-2 ring-offset-2 focus:ring-secondary",
                },
                info: { solid: "ring-2 ring-offset-2 focus:ring-info" },
                success: { solid: "ring-2 ring-offset-2 focus:ring-success" },
                warning: { solid: "ring-2 ring-offset-2 focus:ring-warning" },
                danger: { solid: "ring-2 ring-offset-2 focus:ring-danger" },
                dark: { solid: "ring-2 ring-offset-2 focus:ring-dark" },
                light: { solid: "ring-2 ring-offset-2 focus:ring-light" },
              },
            },
          }}
        >
          <AxiosProvider
            config={{ baseURL: appConfig.baseUrl }}
            cancelOnUnmount
            cancelDuplicatedRequests
          >
            <App />
          </AxiosProvider>
        </ThemeProvider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
