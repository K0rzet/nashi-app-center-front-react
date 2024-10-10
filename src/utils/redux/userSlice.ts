import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { User } from '@/types/api'

export interface UserSlice {
  user?: User
}

const initialState: UserSlice = {
  user: undefined,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserSlice, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
