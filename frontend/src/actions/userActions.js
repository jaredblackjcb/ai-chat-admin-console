import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_HEADER_CONFIG,
} from "../constants/userConstants";

export const register = (email, password) => async (dispatch) => {
  try {
    // Set the state of the userLogin slice to loading: true
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    console.log(`User registration request`);

    // Send the registration request. The trailing slash is required
    const { data } = await axios.post("api/users/register/", { email: email, password: password }, USER_HEADER_CONFIG);

    // Save the userInfo to the userLogin redux slice
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    // Save the userInfo JSON to local storage so it can be used to set initial state on page refresh
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    console.error(err);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: err.response && err.response.data.detail ? err.response.data.detail : err.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    // Set the state of the userLogin slice to loading: true
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    console.log(USER_LOGIN_REQUEST);

    // Send the login request
    const { data } = await axios.post("/api/users/login/", { username: email, password: password }, USER_HEADER_CONFIG);

    // Save the userInfo to the userLogin redux slice
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    console.log(USER_LOGIN_SUCCESS);

    // Save the userInfo JSON to local storage so it can be used to set initial state on page refresh
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    console.error(err);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err.response && err.response.data.detail ? err.response.data.detail : err.message,
    });
    console.log(USER_LOGIN_FAIL);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
  console.log(USER_LOGOUT);
};
