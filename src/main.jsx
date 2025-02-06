import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Layout } from "./components/Layout/Layout.jsx";
import { MainPage } from "./pages/MainPage/MainPage.jsx";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage.jsx";
import { LoginPage } from "./pages/LoginPage/LoginPage.jsx";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword.jsx";

// import App from "./App.jsx";
import { StatisticsPage } from "./pages/StatisticsPage/StatisticsPage.jsx";
import { CalendarPage } from "./pages/CalendarPage/CalendarPage.jsx";

import "./index.css";
import { HomePage } from "./pages/HomePage/HomePage.jsx";
import { store } from "./store/index.js"
import "./firebase.js"
import { NewPasswordPage } from "./pages/NewPasswordPage/NewPasswordPage.jsx";
// import{ PublicRoute }from "./components/PrivateRoute/PrivateRoute.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        // element: <PublicRoute element={<HomePage />} />,
        element: <HomePage />,
      },
      {
        path: "main",
        element: <MainPage />,
      },

      {
        path: "statistics",
        element: <StatisticsPage />,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      // {
      //   path: "new-password",
      //   element: <NewPasswordPage />,
      // },
      // { path: "*", element: <NewPasswordPage /> },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}> 
  <RouterProvider router={router}>
    <Suspense fallback={<div>Loading...</div>} />
    </RouterProvider>
    </Provider>
);

