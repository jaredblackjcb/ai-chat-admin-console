import { configureStore, createSlice } from "@reduxjs/toolkit";

const someSlice = createSlice({
  name: "something", // this is like the base route where the reducers live
  initialState: [],
  reducers: {
    // used in store.dispatch({type: "sliceName/reducerName"})
    addSomething(state, action) {
      state.push(action.payload);
    },
    removeSomething(state, action) {
      // Remove
    },
  },
});

export const store = configureStore({
  reducer: {
    slice1: someSlice.reducer,
  },
});

//Examples of modifying state
const startingState = store.getState();

console.log(JSON.stringify(startingState));

store.dispatch({
  type: "nothing/addSomething",
  payload: "thing1",
});

console.log(JSON.stringify(store.getState()));
