import { getAuth } from "firebase/auth";

export const getCurrentUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return {
      email: user.email,
      uid: user.uid,
    };
  } else {
    console.error("User is not authorized.");
    return null;
  }
};
