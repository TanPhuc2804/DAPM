import { configureStore } from '@reduxjs/toolkit'
import orderReducer from './select/selectOrder'
import productReducer from './Product/productSlice'
export const store = configureStore({
  reducer: {
    orders:orderReducer,
    product:productReducer
  },
})