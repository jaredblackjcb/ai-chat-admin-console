import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

export const userSlice = createSlice({
  name: "user",
  initialState: { userInfo: userInfoFromStorage },
  reducers: {
    userRegisterRequest(state) {
      return { loading: true };
    },
    userRegisterSuccess(state, action) {
      return { loading: false, userInfo: action.payload };
    },
    userRegisterFail(state, action) {
      return { loading: false, error: action.payload };
    },
    userLoginRequest(state) {
      return { loading: true };
    },
    userLoginSuccess(state, action) {
      return { loading: false, userInfo: action.payload };
    },
    userLoginFail(state, action) {
      return { loading: false, error: action.payload };
    },
    googleAuthRequest(state) {
      return { ...state, loading: true };
    },
    googleAuthSuccess(state, action) {
      return { ...state, loading: false, userInfo: action.payload };
    },
    googleAuthFail(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    userLogout(state) {
      return {};
    },
  },
});
