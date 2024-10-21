import { Outlet } from "react-router-dom";
import "./Layout.scss";

export const Layout = () => {
    return (
      <div className="layout ">
        <header> header </header>
        <main  >
          <Outlet />
        </main>
        <footer>Footer</footer>
      </div>
    );
}
