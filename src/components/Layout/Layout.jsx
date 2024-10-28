import { Outlet } from "react-router-dom";
import "./Layout.scss";
import { Footer } from "../Footer/Footer";

export const Layout = () => {
    return (
      <div className="layout ">
        <header> header </header>
        <main  >
          <Outlet />
        </main>
        <Footer/>
      </div>
    );
}
