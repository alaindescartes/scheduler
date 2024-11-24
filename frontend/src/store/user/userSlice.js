import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: { isAuthenticated: false, details: {} },
}

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.details = action.payload
      state.user.isAuthenticated = true
    },
    logout(state) {
      state.user.isAuthenticated = false
      state.user.details = {}
    },
  },
})

export const { setUser, logout } = userSlice.actions

export default userSlice.reducer
