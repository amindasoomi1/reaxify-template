import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { ConfirmProvider } from "./infra/confirm";
import { PwaUpdateProvider } from "./infra/pwa";

export default function App() {
  return (
    <Fragment>
      <Outlet />
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      <ConfirmProvider />
      <PwaUpdateProvider />
      <ScrollRestoration />
    </Fragment>
  );
}
