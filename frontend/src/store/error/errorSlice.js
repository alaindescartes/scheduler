import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  error: false,
  errorMessage: null,
}

export const errorSlice = createSlice({
  name: "errorState",
  initialState,
  reducers: {
    setErrorState: (state, action) => {
      state.error = true
      state.errorMessage = action.payload
    },
    resetErrorState: (state) => {
      state.error = false
      state.errorMessage = null
    },
  },
})

export const { setErrorState, resetErrorState } = errorSlice.actions

export default errorSlice.reducer
