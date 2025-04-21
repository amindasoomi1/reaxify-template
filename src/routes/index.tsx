import MainLayout from "@/layouts/MainLayout";
import Error404 from "@/pages/Error404";
import Home from "@/pages/Home";
import { RouteObject } from "react-router";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "", element: <Home /> }],
  },
  { path: "*", element: <Error404 /> },
];
export default routes;
