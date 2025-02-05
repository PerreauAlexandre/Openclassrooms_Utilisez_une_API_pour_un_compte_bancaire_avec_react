import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit'
import signInReducer from '../pages/SignIn/signInSlice'
import userReducer from '../pages/User/userSlice'
import { UserState } from '../pages/User/userSlice'
import { userApi } from '../services/userApi'
import { persistReducer, persistStore, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

type dataTransformState = {
  user: UserState | null
  token: string | null
  rememberMe: boolean
}

const rememberMeTransform = createTransform(
  (inboundState: dataTransformState) => {
    console.log('🔹 Avant stockage:')
    if (!inboundState.rememberMe) {
      console.log('🛠️ Transformation appliquée:')
      return { ...inboundState, user: null, token: null }
    }
    return inboundState
  },

  (outboundState: dataTransformState) => {
    console.log('📤 Récupération des données du storage:')
    return outboundState
  },

  { whitelist: ['root'] }
)

const persistConfig = {
  key: 'root',
  storage,
  transforms: [rememberMeTransform],
}

const rootReducer = combineReducers({
  signIn: signInReducer,
  user: userReducer,
  [userApi.reducerPath]: userApi.reducer,
})

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer as Reducer<ReturnType<typeof rootReducer>>
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['register'],
      },
    }).concat(userApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
