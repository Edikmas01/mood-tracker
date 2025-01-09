import { Outlet, useLocation } from "react-router-dom";
import "./Layout.scss";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const Layout = () => {
  const location = useLocation();

  
  const pageClass =
    location.pathname === "/statistics" ? "statistics-page" : "";

  return (
    <div className="layout">
      <Header />
      <main className={pageClass}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
