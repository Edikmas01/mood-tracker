import { useState } from "react";
import "./Form.scss"

export const Form = ({ title, handleClick }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="form">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        className="imput-form"
      />
      <input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="password"
        className="imput-form"
      />
      <button className="form-btn" onClick={() => handleClick(email, pass)}>{title}</button>
    </div>
  );
};
