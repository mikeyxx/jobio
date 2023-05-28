import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../utils/DataTypes";

interface UserState {
  user: User | null;
  isAuth: boolean;
  name: null | string;
  id: null | string;
}

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem("isAuth");

  if (isAuth && JSON.parse(isAuth) === true) {
    return true;
  }

  return false;
};

const info = localStorage.getItem("user");
let userData = info !== null ? JSON.parse(info) : "";

const initialState: UserState = {
  user: null,
  isAuth: userAuthFromLocalStorage(),
  name: userData.name,
  id: userData.id,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.isAuth = true;
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    unAuthenticateUser: (state) => {
      state.isAuth = false;
      state.name = null;
    },
  },
});

export const { authenticateUser, unAuthenticateUser } = AuthSlice.actions;
export default AuthSlice.reducer;
