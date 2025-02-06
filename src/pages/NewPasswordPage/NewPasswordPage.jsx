import { useState } from "react";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import { useSearchParams } from "react-router-dom";

export const NewPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode"); 
console.log("oobCode:", oobCode);
  const handleReset = async () => {
    if (!oobCode) {
      setMessage("Error: Password reset code missing.");
      return;
    }

    const auth = getAuth();

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("Password changed successfully!");
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div>
      <h2>Enter new password</h2>
      <input
        type="password"
        placeholder="new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleReset}>update password</button>
      {message && <p>{message}</p>}
    </div>
  );
};
