import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // Default is localStorage
import errorReducer from "./error/errorSlice"
import loadingReducer from "./loading/loadingSlice"
import userReducer from "./user/userSlice"
import { combineReducers } from "redux"

// Configuration for redux-persist
const persistConfig = {
  key: "root", // Key for storing state in localStorage
  storage, // Specify storage engine (localStorage by default)
  whitelist: ["user"], // Specify which reducers to persist
}

// Combine your reducers
const rootReducer = combineReducers({
  loading: loadingReducer,
  error: errorReducer,
  user: userReducer,
})

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
})

// Create a persistor
export const persistor = persistStore(store)
