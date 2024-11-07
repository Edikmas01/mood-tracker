import { MoodTracker } from "../../components/MoodTracker/MoodTracker";
import "./MainPage.scss";
import { useAuth } from "../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const MainPage = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);
  return isAuth ? (
    <div className="mainPage">
      <MoodTracker />
    </div>
  ) : null;
};
