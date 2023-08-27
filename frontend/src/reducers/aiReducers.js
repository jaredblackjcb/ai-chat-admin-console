import { createSlice } from "@reduxjs/toolkit";

const initialAiState = {
  loading: false,
  error: null,
  dataSources: [],
};

const aiInfoFromStorage = localStorage.getItem("aiInfo") ? JSON.parse(localStorage.getItem("aiInfo")) : initialAiState;

// createSlice uses Immer under the hood to maintain the immutability of the state so you don't have to spread the ...state
export const aiSlice = createSlice({
  name: "ai",
  initialState: { aiInfo: aiInfoFromStorage },
  reducers: {
    createBotRequest(state) {
      return { ...state, loading: true, error: null };
    },
    createBotSuccess(state, action) {
      return { ...state, loading: false, error: null };
    },
    createBotError(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    fetchBotsRequest(state) {
      return { ...state, loading: true, error: null };
    },
    fetchBotsSuccess(state, action) {
      return { ...state, loading: false, error: null, bots: action.payload };
    },
    encodeFilesRequest(state) {
      return { ...state, loading: true, error: null };
    },
    encodeFilesSuccess(state, action) {
      return { ...state, loading: false, error: null };
    },
    encodeFilesError(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    fetchDataSourcesRequest(state) {
      return { ...state, loading: true, error: null };
    },
    fetchDataSourcesSuccess(state, action) {
      return { ...state, loading: false, error: null, dataSources: action.payload };
    },
    fetchDataSourcesError(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    deleteDataSourceRequest(state) {
      return { ...state, loading: true, error: null };
    },
    deleteDataSourceSuccess(state, action) {
      return { ...state, loading: false, error: null };
    },
    deleteDataSourceError(state, action) {
      return { loading: false, error: action.payload };
    },
  },
});
