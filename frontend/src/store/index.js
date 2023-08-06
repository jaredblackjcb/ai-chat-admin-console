import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../reducers/userReducers";
import { aiSlice } from "../reducers/aiReducers";

export const store = configureStore({
  reducer: {
    userLogin: userSlice.reducer,
    aiInfo: aiSlice.reducer,
  },
});

//Examples of modifying state
// const startingState = store.getState();

// console.log(JSON.stringify(startingState));

// store.dispatch({
//   type: "user/userLoginRequest",
// });

// console.log(JSON.stringify(store.getState()));

// store.dispatch({
//   type: "user/userLoginSuccess",
//   payload: {
//     id: 2,
//     last_login: null,
//     is_superuser: false,
//     username: "jbtest0304.1@mailinator.com",
//     first_name: "",
//     last_name: "",
//     email: "jbtest0304.1@mailinator.com",
//     is_staff: false,
//     is_active: true,
//     date_joined: "2023-03-04T16:19:52.902879Z",
//     avatar: null,
//     groups: [],
//     user_permissions: [],
//   },
// });
// console.log(JSON.stringify(store.getState()));

// store.dispatch({
//   type: "user/userLoginFail",
//   payload: {
//     detail: "No active account found with the given credentials",
//   },
// });
// console.log(JSON.stringify(store.getState()));

// store.dispatch({
//   type: "user/userLogout",
// });
// console.log(JSON.stringify(store.getState()));
