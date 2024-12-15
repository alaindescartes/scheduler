import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  residences: [],
}

export const residenceSlide = createSlice({
  name: "residence",
  initialState,
  reducers: {
    setResidences: (state, action) => {
      state.residences = action.payload || []
    },
  },
})

export const { setResidences } = residenceSlide.actions
export default residenceSlide.reducer
