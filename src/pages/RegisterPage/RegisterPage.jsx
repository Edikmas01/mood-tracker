import { Link } from "react-router-dom";
import { Form } from "../../components/Form/Form";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.scss"

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
    <div className="registerPage">
      <h1 className="registerPage-title">Register Page</h1>
      <Form title="Register" handleClick={handleRegistern} />
      <p className="registerPage-text">
        or <Link to="/login">login</Link>
      </p>
    </div>
  );
};
/*
edikmaslovskiy@gmail.com
123456gg
*/
