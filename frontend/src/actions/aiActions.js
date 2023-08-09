import axios from "axios";

import { ENCODE_FILES_REQUEST, ENCODE_FILES_RESPONSE, ENCODE_FILES_ERROR } from "../constants/aiConstants";

export const encodeFiles = (formData, namespace, userId) => async (dispatch) => {
  try {
    dispatch({
      type: ENCODE_FILES_REQUEST,
    });
    const { data } = await axios.post("chat/encode/files", formData, {
      headers: { "Content-Type": "multipart/form-data", namespace: namespace, userId: userId },
    });
    dispatch({
      type: ENCODE_FILES_RESPONSE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ENCODE_FILES_ERROR,
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
  }
};
