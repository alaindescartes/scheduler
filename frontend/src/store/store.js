import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./error/errorSlice";
import loadingreducer from "./loading/loadingSlice";

const store = configureStore({
  reducer: {
    loading: loadingreducer,
    error: errorReducer,
  },
});

export default store;
