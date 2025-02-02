import { configureStore } from '@reduxjs/toolkit'
import signInReducer from '../pages/SignIn/signInSlice'
import userReducer  from '../pages/User/userSlice'
import { userApi } from '../services/userApi'

export const store = configureStore({
  reducer: {
    signIn : signInReducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
