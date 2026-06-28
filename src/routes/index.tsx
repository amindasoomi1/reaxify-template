import App from "@/App";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Onboarding from "@/pages/Onboarding";
import PageNotFound from "@/pages/PageNotFound";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "", element: <Home /> },
          { path: "onboarding", element: <Onboarding /> },
        ],
      },
      { path: "login", element: <Login /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);
export default routes;
