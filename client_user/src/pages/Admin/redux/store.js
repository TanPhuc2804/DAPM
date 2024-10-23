import { configureStore } from '@reduxjs/toolkit'
import orderReducer from './select/selectOrder'

export const store = configureStore({
  reducer: {
    orders:orderReducer
  },
})