import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectVoucher: {}
}

const voucherSlice = createSlice({
    name:"voucher",
    initialState,
    reducers:{
        selectVoucher:(state,action)=>{
            state.selectVoucher = action.payload
        }
    }
})
export const {selectVoucher} = voucherSlice.actions
export default voucherSlice.reducer