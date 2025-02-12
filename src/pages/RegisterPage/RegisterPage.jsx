import { Link } from "react-router-dom";
import { Form } from "../../components/Form/Form";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.scss"
import { BackHome } from "../../components/BackHome/BackHome";


export const RegisterPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleRegistern = (email, password) => {
    const auth = getAuth();
    console.log(auth);

    createUserWithEmailAndPassword(auth, email, password)
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
      .catch(console.error);
  };

  return (
    <>
      <BackHome />
      <div className="registerForm">
        <h1 className="registerForm-title">Register Page</h1>
        <Form title="Register" handleClick={handleRegistern} />
        <p className="registerForm-text">
          or <Link to="/login">login</Link>
        </p>
      </div>
    </>
  );
};
