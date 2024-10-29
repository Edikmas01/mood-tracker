import { Outlet, useLocation } from "react-router-dom";
import "./Layout.scss";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const Layout = () => {
    const location = useLocation();
    return (
      <div
        className={`layout ${
          location.pathname === "/statistics" ? "no-background" : ""
        }`}
      >
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    );
}
