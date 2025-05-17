import { lazy } from "react";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Identify = lazy(() => import("./pages/Identify"));
const ScanHistory = lazy(() => import("./pages/ScanHistory"));

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "identify", element: <Identify /> },
      { path: "scans", element: <ScanHistory /> },
    ],
  },
];

export default routes;
