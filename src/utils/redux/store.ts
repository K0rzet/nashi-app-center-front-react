import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.ts'
import adminReducer from './adminSlice.ts'

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
