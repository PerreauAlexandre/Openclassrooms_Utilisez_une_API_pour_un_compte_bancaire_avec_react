import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type LoginRequest = {
  email: string
  password: string
}

type LoginResponse = {
  status: number
  message: string
  body: {
    token: string
  }
}

type getUserResponse = {
  status: number
  message: string
  body: {
    email: string
    firstName: string
    lastName: string
    createdAt: string
    updatedAt: string
    id: string
  }
}

type updateRequest = {
  firstName: string
  lastName: string
}

type updateResponse = {
  status: number
  message: string
  body: {
    id: string
    email: string
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
    getUser: builder.mutation<getUserResponse, null>({
      query: () => ({
        url: 'user/profile',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    updateUser: builder.mutation<updateResponse, updateRequest>({
      query: (updateParams) => ({
        url: 'user/profile',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: updateParams,
      }),
    }),
  }),
})

export const { useLoginMutation, useGetUserMutation, useUpdateUserMutation } = userApi
