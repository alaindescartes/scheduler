import { configureStore } from "@reduxjs/toolkit";
import loadingreducer from "./loading/loadingSlice";

const store = configureStore({
  reducer: {
    loading: loadingreducer,
  },
});

export default store;
