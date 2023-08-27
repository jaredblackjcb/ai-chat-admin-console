import axios from "axios";

import {
  CREATE_BOT_REQUEST,
  CREATE_BOT_SUCCESS,
  CREATE_BOT_ERROR,
  FETCH_BOTS_REQUEST,
  FETCH_BOTS_SUCCESS,
  FETCH_BOTS_ERROR,
  ENCODE_FILES_REQUEST,
  ENCODE_FILES_SUCCESS,
  ENCODE_FILES_ERROR,
  FETCH_DATA_SOURCES_REQUEST,
  FETCH_DATA_SOURCES_SUCCESS,
  FETCH_DATA_SOURCES_ERROR,
  DELETE_DATA_SOURCE_REQUEST,
  DELETE_DATA_SOURCE_SUCCESS,
  DELETE_DATA_SOURCE_ERROR,
} from "../constants/aiConstants";

// Creates a bot with the given title and userId
export const createBot = (userId, title) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_BOT_REQUEST,
    });
    const { data } = await axios.post("/api/chat/create/bot", { title: title }, { headers: { userId } });
    dispatch({
      type: CREATE_BOT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_BOT_ERROR,
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
  }
};

// Fetches all bots associated with a user
export const fetchBots = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_BOTS_REQUEST,
    });
    const { data } = await axios.get("/api/chat/bots", { headers: { userId } });
    dispatch({
      type: FETCH_BOTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_BOTS_ERROR,
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
  }
};

export const encodeFiles = (formData, namespace, botId) => async (dispatch) => {
  try {
    dispatch({
      type: ENCODE_FILES_REQUEST,
    });
    const { data } = await axios.post("/api/chat/encode/files", formData, {
      headers: { "Content-Type": "multipart/form-data", namespace: namespace, botId: botId },
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

export const fetchDataSources = (botId) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_DATA_SOURCES_REQUEST,
    });
    const { data } = await axios.get("/api/chat/dataSources/" + botId);
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

export const deleteDataSource = (dataSourceId, botId, fileName, namespace) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_DATA_SOURCE_REQUEST,
    });
    const response = await axios.delete(`/api/chat/bot/${botId}/file/${fileName}/delete`, {
      headers: { namespace: namespace },
    });
    dispatch({
      type: DELETE_DATA_SOURCE_SUCCESS,
      payload: { deletedItemId: dataSourceId },
    });
  } catch (error) {
    dispatch({
      type: DELETE_DATA_SOURCE_ERROR,
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
  }
};
