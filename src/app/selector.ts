import { RootState } from './store'

export const getUserFirstName = (state: RootState) => state?.user?.firstName
