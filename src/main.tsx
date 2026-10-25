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
          table: {
            body: { base: "*:animate-card-enter" },
            header: { base: "bg-gray-50/80" },
            headerCell: {
              base: "py-2.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-gray-500",
            },
            dataCell: { base: "py-2.5 text-[0.8125rem]" },
            row: { hover: "hover:bg-gray-50" },
          },
          card: {
            base: "rounded-card border border-border shadow-soft",
            header: { base: "px-5 pt-5 pb-1" },
            body: { base: "p-5" },
            footer: { base: "px-5 py-3" },
          },
          button: { base: "rounded-lg" },
          badge: { base: "rounded-full font-semibold" },
          inputGroup: { stack: { base: "rounded-lg" } },
          progress: { base: "h-1.5" },
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
