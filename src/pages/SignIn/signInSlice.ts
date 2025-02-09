import { createSlice } from '@reduxjs/toolkit'

const storedRememberMe = localStorage.getItem('rememberMe') === 'true'

localStorage.setItem('rememberMe', storedRememberMe.toString())

type signInState = {
  rememberMe: boolean
  token: string | null
}

const initialState: signInState = {
  rememberMe: storedRememberMe,
  token:
    localStorage.getItem('token') || sessionStorage.getItem('token') || null,
}

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload
      console.log(action.payload.toString())
      localStorage.setItem('rememberMe', action.payload.toString())
    },
    setToken: (state, action) => {
      state.token = action.payload
      if (state.rememberMe) {
        localStorage.setItem('token', action.payload)
      } else {
        sessionStorage.setItem('token', action.payload)
      }
    },
    signOut: (state) => {
      state.token = null
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
    },
  },
})

export const { setRememberMe, setToken, signOut } = signInSlice.actions

export default signInSlice.reducer
