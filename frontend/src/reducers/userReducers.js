import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

export const userSlice = createSlice({
  name: "user",
  initialState: { userInfo: userInfoFromStorage },
  reducers: {
    userLoginRequest(state) {
      return { loading: true };
    },
    userLoginSuccess(state, action) {
      return { loading: false, userInfo: action.payload };
    },
    userLoginFail(state, action) {
      return { loading: false, error: action.payload };
    },
    userLogout(state) {
      return {};
    },
  },
});
