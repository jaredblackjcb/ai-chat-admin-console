import axios from "axios";

import {
  ENCODE_FILES_REQUEST,
  ENCODE_FILES_SUCCESS,
  ENCODE_FILES_ERROR,
  FETCH_DATA_SOURCES_REQUEST,
  FETCH_DATA_SOURCES_SUCCESS,
  FETCH_DATA_SOURCES_ERROR,
  FETCH_NAMESPACES_REQUEST,
  FETCH_NAMESPACES_SUCCESS,
  FETCH_NAMESPACES_ERROR,
} from "../constants/aiConstants";

export const encodeFiles = (formData, namespace, userId) => async (dispatch) => {
  try {
    dispatch({
      type: ENCODE_FILES_REQUEST,
    });
    const { data } = await axios.post("chat/encode/files", formData, {
      headers: { "Content-Type": "multipart/form-data", namespace: namespace, userId: userId },
    });
    dispatch({
      type: ENCODE_FILES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ENCODE_FILES_ERROR,
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
  }
};

export const fetchNamespaces = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_NAMESPACES_REQUEST,
    });
    const { data } = await axios.get("chat/namespaces/" + userId);
    dispatch({
      type: FETCH_NAMESPACES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_NAMESPACES_ERROR,
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
  }
};

export const fetchDataSources = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_DATA_SOURCES_REQUEST,
    });
    const { data } = await axios.get("chat/dataSources/" + userId);
    dispatch({
      type: FETCH_DATA_SOURCES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DATA_SOURCES_ERROR,
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
  }
};
