import { createSlice } from '@reduxjs/toolkit'

type signInState = {
  token: string | null
}

const initialState: signInState = {
  token: localStorage.getItem('token') || null,
}

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      localStorage.setItem('token', action.payload)
    },
    signOut: (state) => {
      state.token = null
      localStorage.removeItem('token')
    },
  },
})

export const { setToken, signOut } = signInSlice.actions

export default signInSlice.reducer
