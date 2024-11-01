import { useSelector } from "react-redux";

export function useAuth() {
  const { id, token, email, name, pasword } = useSelector(
    (state) => state.user
  );
    return {
      isAuth: !!email,
      id,
      token,
      email,
      name,
      pasword,
    };
}
