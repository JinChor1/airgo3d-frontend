import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ThemeState {
  darkMode: boolean
}

const initialState: ThemeState = {
  darkMode: false,
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDark(state) {
      state.darkMode = !state.darkMode
    },
    setDark(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload
    },
  },
})

export const { toggleDark, setDark } = themeSlice.actions
export default themeSlice.reducer
