import { RootState } from './store'

export const getUserFirstName = (state: RootState) => state?.user?.firstName

export const getUserLastName = (state: RootState) => state?.user?.lastName

export const getToken = (state: RootState) => state?.signIn?.token

export const getRememberMe = (state: RootState) => state?.signIn?.rememberMe