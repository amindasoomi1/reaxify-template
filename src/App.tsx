import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router";
import routes from "./routes";

export default function App() {
  const elements = useRoutes(routes);
  return (
    <Fragment>
      {elements}
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
    </Fragment>
  );
}
