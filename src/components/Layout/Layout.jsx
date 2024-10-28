import { Outlet } from "react-router-dom";
import "./Layout.scss";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const Layout = () => {
    return (
      <div className="layout ">
        <Header/>
        <main  >
          <Outlet />
        </main>
        <Footer/>
      </div>
    );
}
