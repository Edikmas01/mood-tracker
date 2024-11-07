import { useSelector } from "react-redux";

export function useAuth() {
  const { id, token, email, name, pasword } = useSelector(
    (state) => state.user
  );
    return {
      // isAuth: !!email,
      isAuth: !!token,
      id,
      token,
      email,
      name,
      pasword,
    };
}
