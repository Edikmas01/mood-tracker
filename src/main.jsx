import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout/Layout.jsx";
import { MainPage } from "./pages/MainPage/MainPage.jsx";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage.jsx";
import { LoginPage } from "./pages/LoginPage/LoginPage.jsx";
// import App from "./App.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <Suspense fallback={<div>Loading...</div>} />
  </RouterProvider>
);
