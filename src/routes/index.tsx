import MainLayout from "@/layouts/MainLayout";
import Error404 from "@/pages/Error404";
import Home from "@/pages/Home";
import Onboarding from "@/pages/Onboarding";
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
  { path: "*", element: <Error404 /> },
];
export default routes;
