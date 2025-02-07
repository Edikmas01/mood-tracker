import { Link } from "react-router-dom";
import { Form } from "../../components/Form/Form";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss"
import {BackHome} from "../../components/BackHome/BackHome"

export const LoginPage = () => {
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  
  const handleLogin = (email, password) => {
  const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            id: user.uid,
            token: user.accessToken,
            email: user.email,
            name: user.displayName,
            // password: user.password,
          })
        );
        navigate("/main");
        
      })
      .catch(() => alert("invalid user!"));
  };
  
  return (
    <>
      <BackHome />
      <div className="loginForm">
        <h1 className="loginForm-title">Login Page </h1>
        <Form title="Login" handleClick={handleLogin} />
        <Link className="reset-password" to="/reset-password">
          Forgotten password?
        </Link>
        <p className="loginForm-text">
          or <Link to="/register">register</Link>
        </p>
      </div>
    </>
  );
};
