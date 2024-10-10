import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface AdminSlice {
  adminModeToggled: boolean
}

const initialState: AdminSlice = {
  adminModeToggled: false,
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setModeToggled: (state: AdminSlice, action: PayloadAction<boolean>) => {
      state.adminModeToggled = action.payload
    },
  },
})

export const { setModeToggled } = adminSlice.actions
export default adminSlice.reducer
