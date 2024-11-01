import { configureStore } from '@reduxjs/toolkit'
import orderReducer from './select/selectOrder'
import productReducer from './Product/productSlice'
import voucherReducer from './Voucher/voucherSlice'
export const store = configureStore({
  reducer: {
    orders:orderReducer,
    product:productReducer,
    voucher:voucherReducer
  },
})