import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { BackHome } from "../../components/BackHome/BackHome";
import "./ResetPassword.scss";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("A link to reset your password has been sent to your email.");
    } catch (error) {
      setMessage("Error:" + error.message);
    }
  };

    return (
      <>
        <BackHome />
        <div className="reset-form">
          <h2 className="reset-title">Reset Password</h2>
          <input
            type="email"
            placeholder="your email"
            value={email}
            className="reset-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="reset-btn" onClick={handleResetPassword}>
            Reset
          </button>
          {message && <p>{message}</p>}
        </div>
      </>
    );
};
