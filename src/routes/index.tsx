import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Onboarding from "@/pages/Onboarding";
import PageNotFound from "@/pages/PageNotFound";
import { RouteObject } from "react-router";

const routes: RouteObject[] = [
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
];
export default routes;
