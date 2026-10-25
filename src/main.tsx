import "@/assets/css/index.css";
import { i18n } from "@/boot";
import { whoami } from "@/constants";
import { queryClient } from "@/infra/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "reaxify/providers";
import { registerServiceWorker } from "./infra/pwa";
import { RouterProvider } from "./providers";

// declare module "reaxify/types" {
//   interface ExtendBadgeVariant {}
//   interface ExtendButtonVariant {}
//   interface ExtendTypographyVariant {}
//   interface ExtendColor {}
//   interface ExtendSize {}
// }

if (whoami.isWeb) registerServiceWorker();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider
        extendClasses={{
          table: { body: { base: "*:animate-card-enter" } },
          card: { base: "animate-card-enter shadow-soft glass-card" },
          // button: {
          //   color: {
          //     primary: {
          //       solid:
          //         "ring-2 ring-transparent ring-offset-2 focus:ring-primary",
          //     },
          //     secondary: {
          //       solid:
          //         "ring-2 ring-transparent ring-offset-2 focus:ring-secondary",
          //     },
          //     info: {
          //       solid: "ring-2 ring-transparent ring-offset-2 focus:ring-info",
          //     },
          //     success: {
          //       solid:
          //         "ring-2 ring-transparent ring-offset-2 focus:ring-success",
          //     },
          //     warning: {
          //       solid:
          //         "ring-2 ring-transparent ring-offset-2 focus:ring-warning",
          //     },
          //     danger: {
          //       solid:
          //         "ring-2 ring-transparent ring-offset-2 focus:ring-danger",
          //     },
          //     dark: {
          //       solid: "ring-2 ring-transparent ring-offset-2 focus:ring-dark",
          //     },
          //     light: {
          //       solid: "ring-2 ring-transparent ring-offset-2 focus:ring-light",
          //     },
          //   },
          // },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider />
        </QueryClientProvider>
      </ThemeProvider>
    </I18nextProvider>
  </React.StrictMode>,
);
