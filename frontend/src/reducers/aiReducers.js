import { createSlice } from "@reduxjs/toolkit";

const initialAiState = {
  loading: false,
  error: null,
  data_sources: [],
};

const aiInfoFromStorage = localStorage.getItem("aiInfo") ? JSON.parse(localStorage.getItem("aiInfo")) : initialAiState;

// createSlice uses Immer under the hood to maintain the immutability of the state so you don't have to spread the ...state
export const aiSlice = createSlice({
  name: "ai",
  initialState: { aiInfo: aiInfoFromStorage },
  reducers: {
    encodeFilesRequest(state) {
      return { loading: true };
    },
    encodeFilesSuccess(state, action) {
      return { loading: false, aiInfo: action.payload };
    },
    encodeFilesError(state, action) {
      return { loading: false, error: action.payload };
    },
    fetchNamespacesRequest(state) {
      return { loading: true };
    },
    fetchNamespacesSuccess(state, action) {
      return { loading: false, aiInfo: action.payload };
    },
    fetchNamespacesError(state, action) {
      return { loading: false, error: action.payload };
    },
    fetchDataSourcesRequest(state) {
      return { loading: true };
    },
    fetchDataSourcesSuccess(state, action) {
      return { loading: false, aiInfo: action.payload };
    },
    fetchDataSourcesError(state, action) {
      return { loading: false, error: action.payload };
    },
    deleteDataSourceRequest(state) {
      return { ...state, loading: true };
    },
    deleteDataSourceSuccess(state, action) {
      const deletedItemId = action.payload.deletedItemId; // Assuming you get the ID of the deleted item from the payload
      console.log(deletedItemId);
      // Create a new array excluding the deleted item
      const updatedDataSources = state.aiInfo?.data_sources.filter((dataSource) => dataSource.id !== deletedItemId);
      console.log("data sources: ", state?.aiInfo?.data_sources);
      console.log(updatedDataSources);
      // Return the updated state with the modified dataSources array
      return {
        ...state,
        loading: false,
        aiInfo: {
          ...state.aiInfo,
          data_sources: updatedDataSources,
        },
      };
    },
    deleteDataSourceError(state, action) {
      return { loading: false, error: action.payload };
    },
  },
});
