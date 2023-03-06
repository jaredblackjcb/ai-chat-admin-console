import axios from "axios";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    console.log(USER_LOGIN_REQUEST);

    const headerConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/users/login/", { username: email, password: password }, headerConfig);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    console.log(USER_LOGIN_SUCCESS);

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.error(error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
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
