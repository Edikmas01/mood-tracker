import { MoodTracker } from "../../components/MoodTracker/MoodTracker"
import "./MainPage.scss"
import { useAuth } from "../../hooks/use-auth";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const { isAuth} = useAuth();
  const navigate = useNavigate();

  return (
    isAuth ? (
      <div className="mainPage">
      <MoodTracker />
    </div>) : (
        navigate("/login")
    )
   
  );
};
