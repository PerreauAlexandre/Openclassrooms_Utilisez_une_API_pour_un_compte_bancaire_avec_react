import { createSlice } from '@reduxjs/toolkit'

type signInState = {
  rememberMe: boolean
  token: string | null
}

const initialState: signInState = {
  rememberMe: false,
  token: null,
}

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    signOut: (state) => {
      state.token = null
    },
  },
})

export const { setRememberMe, setToken, signOut } = signInSlice.actions

export default signInSlice.reducer
