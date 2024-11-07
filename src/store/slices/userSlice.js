
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  token: localStorage.getItem("token") || null,
  email: localStorage.getItem("email") || null,
  name: null,
  // password: null,
};

const userSlise = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.name = action.payload.name;
      // state.password = action.payload.password;
       localStorage.setItem("token", action.payload.token);
       localStorage.setItem("email", action.payload.email);
    },
    removeUser(state) {
      state.id = null;
      state.token = null;
      state.email = null;
      state.name = null;
      // state.password = null;
        localStorage.removeItem("token");
        localStorage.removeItem("email");
    },
  },
});
 export const { setUser, removeUser } = userSlise.actions;

 
export default userSlise.reducer;
