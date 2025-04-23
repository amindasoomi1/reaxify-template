import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router";
import { appConfig } from "./constants";
import routes from "./routes";

export default function App() {
  const elements = useRoutes(routes);
  return (
    <Fragment>
      <title>{appConfig.title}</title>
      {elements}
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
    </Fragment>
  );
}
