import { createSlice } from "@reduxjs/toolkit";

const aiInfoFromStorage = localStorage.getItem("aiInfo") ? JSON.parse(localStorage.getItem("aiInfo")) : null;

// createSlice uses Immer under the hood to maintain the immutability of the state so you don't have to spread the ...state
export const aiSlice = createSlice({
  name: "ai",
  initialState: { aiInfo: aiInfoFromStorage },
  reducers: {
    encodeFilesRequest(state) {
      return { loading: true };
    },
    encodeFilesResponse(state, action) {
      return { loading: false, aiInfo: action.payload };
    },
    encodeFilesError(state, action) {
      return { loading: false, error: action.payload };
    },
  },
});
