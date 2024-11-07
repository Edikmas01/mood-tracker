import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import "./Header.scss";

import { useAuth } from "../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Header = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return isAuth ? (
    <>
      <BurgerMenu />
    </>
  ) : null;
};
