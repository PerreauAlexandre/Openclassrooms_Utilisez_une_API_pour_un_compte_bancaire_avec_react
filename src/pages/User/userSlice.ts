import { createSlice } from '@reduxjs/toolkit'

type UserState = {
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
    updateUserNames(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    clearUser() {
      return initialState
    },
  },
})

export const { setUser, updateUserNames, clearUser } = userSlice.actions

export default userSlice.reducer
