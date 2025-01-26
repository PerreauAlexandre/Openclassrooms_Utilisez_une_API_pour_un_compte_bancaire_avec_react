import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  email: string
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
  id: string
}

const initialState: UserState = {
  email: '',
  firstName: '',
  lastName: '',
  createdAt: '',
  updatedAt: '',
  id: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return { ...state, ...action.payload }
    },
    clearUser() {
      return initialState
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
