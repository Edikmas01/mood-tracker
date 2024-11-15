import { Link } from "react-router-dom";
import "./backHome.scss";

export const BackHome = () => {
    return (
      <button className="btn-back">
        <Link to="/">{"⇐home 🚀"}</Link>
      </button>
    );
}
