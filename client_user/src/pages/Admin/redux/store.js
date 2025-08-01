import { configureStore } from '@reduxjs/toolkit'
import orderReducer from './select/selectOrder'
import productReducer from './Product/productSlice'
import voucherReducer from './Voucher/voucherSlice'
import staffSlice from './staff/staff'
import customerSlice from './customer/CustomerSlice'
import supplierSlice from "./supplier/supplierSclice"
export const store = configureStore({
  reducer: {
    orders: orderReducer,
    product: productReducer,
    voucher: voucherReducer,
    staffs: staffSlice,
    customers:customerSlice,
    suppliers:supplierSlice
  },
})