import { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "../../utils/@reduxjs/toolkit"
import { User } from "../../types"

export const initialState: { isSignedIn: boolean; user: User } = {
  isSignedIn: false,
  user: { id: "", name: "", email: "", googleId: "", facebookId: "", appleId: "" },
}

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsSignedIn(state, action: PayloadAction<boolean>) {
      state.isSignedIn = action.payload
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
  },
})

export const { setUser, setIsSignedIn } = slice.actions
