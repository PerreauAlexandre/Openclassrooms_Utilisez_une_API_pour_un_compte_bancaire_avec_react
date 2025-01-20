import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type LoginRequest = {
  email: string
  password: string
}

type LoginResponse = {
  message: string
  body: {
    token: string
  }
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1/' }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (loginParams) => ({
        url: 'user/login',
        method: 'POST',
        body: loginParams,
      }),
    }),
  }),
})

export const { useLoginMutation } = userApi
